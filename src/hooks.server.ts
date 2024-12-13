import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { redirect } from '@sveltejs/kit'

import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL
} from '$env/static/public' // Use private environment variables for sensitive keys

// Initialize Supabase client with service role key for server-side operations
const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Safe session retrieval ensures the JWT is validated
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()

    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()

    if (error) {
      // JWT validation has failed
      return { session: null, user: null }
    }

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      // Allow specific headers to pass through
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession()
  event.locals.session = session
  event.locals.user = user

  // Protect routes that require authentication
  if (
    !event.locals.session &&
    ['/account', '/dashboard', '/edit'].some((path) =>
      event.url.pathname.startsWith(path)
    )
  ) {
    throw redirect(303, '/auth')
  }

  // Redirect authenticated users away from auth page
  if (event.locals.session && event.url.pathname === '/auth') {
    throw redirect(303, '/')
  }

  return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)