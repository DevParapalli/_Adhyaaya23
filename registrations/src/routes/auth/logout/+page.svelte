<script>
	import { onMount } from "svelte";


    onMount(async () => {
        document.forms[0].submit();
    })
</script>

<form class="hidden" method="post">
    <button type="submit">LOGOUT</button>
</form>