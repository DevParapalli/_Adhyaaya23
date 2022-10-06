import type { Actions } from './$types';
import { deleteSession } from '@supabase/auth-helpers-sveltekit/server';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ cookies }) => {
    deleteSession(cookies);
    throw redirect(303, '/');
  }
};