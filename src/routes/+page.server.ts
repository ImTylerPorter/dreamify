// src/routes/dashboard/+page.server.ts (or wherever your action is defined)
import { interpretDream } from '$lib/openai'
import type { Dream } from '$lib/types'
import { fail } from '@sveltejs/kit'

export const actions = {
  default: async (event) => {
    const { request, locals } = event

    const data = await request.formData()
    const title = data.get('title')?.toString()
    const content = data.get('content')?.toString()

    if (!title || !content) {
      return fail(400, { error: 'Title and content are required' })
    }

    try {
      // Get dream interpretation from OpenAI
      const interpretation = await interpretDream(content)
      const mood = 'neutral' // Placeholder for now
      // Convert null to undefined


      // Retrieve the authenticated user
      const { user } = await locals.safeGetSession()

      if (!user) {
        return fail(401, { error: 'User not authenticated' })
      }

      // Construct the dream object
      const dream: Dream = {
        title,
        content,
        interpretation,
        mood,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Insert the dream into Supabase
      const { data: savedDream, error } = await locals.supabase
        .from('dreams')
        .insert(dream)
        .select()
        .single()

      if (error) throw error

      return { dream: savedDream }
    } catch (error) {
      console.error('Error processing dream:', error)
      return fail(500, {
        error: error instanceof Error ? error.message : 'Failed to process dream',
      })
    }
  },
}
