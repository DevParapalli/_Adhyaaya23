<script lang="ts">
    import "@fontsource/nunito";
    import "../app.postcss";
  // we need to make sure the supabase instance is initialized on the client
  import '$lib/supabase';
  import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import {SvelteToast} from '@zerodevx/svelte-toast'

  // this sets up automatic token refreshing
  startSupabaseSessionSync({
    page,
    handleRefresh: () => invalidateAll()
  });
</script>

<slot />

<SvelteToast />