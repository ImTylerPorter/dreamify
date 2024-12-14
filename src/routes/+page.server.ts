import { interpretDream } from '$lib/openai';
import type { Dream } from '$lib/types';
import { error } from '@sveltejs/kit';
import { handleAddDream, handleLogin } from '$lib/server/serverHandlers';

export const actions = {
  default: async (event) => {
    const { request, locals } = event;

    // Parse form data once
    const data = await request.formData();

    // Check if the form submission is for login/signup
    const isLogin = data.get('isLogin');
    const email = data.get('email');
    const password = data.get('password');
    if (isLogin !== null || (email && password)) {
      return await handleLogin(data, locals);
    }

    // Check if the form submission is for adding a dream
    const title = data.get('title')?.toString();
    const content = data.get('content')?.toString();

    if (title && content) {
      const { user } = await locals.safeGetSession();

      if (!user) {
        throw error(401, 'User not authenticated.');
      }

      const interpretation = await interpretDream(content);
      const dream: Dream = {
        title,
        content,
        interpretation,
        mood: 'neutral',
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const savedDream = await handleAddDream(dream);
      return { dream: savedDream };
    }

    throw error(400, 'Invalid form submission.');
  },
};
