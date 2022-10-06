<script>
    import {page} from '$app/stores'
</script>

{#if !$page.data.session.user}
<a href="/auth/login">LOGIN</a>
{:else} 
<form action="/auth/logout" method="post">
<button type="submit">LOGOUT</button>
</form>
{/if}
