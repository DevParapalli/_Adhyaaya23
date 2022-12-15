<script>
	import auth_bg from '_/auth_bg.png';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div style="--bg: url({auth_bg})" class="auth-bg">
	<div class="flex h-full min-h-screen w-full flex-col items-center justify-center bg-base-200 bg-opacity-50"><slot /></div>
</div>
<Footer />


<style>
	.auth-bg {
		background-image: var(--bg);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
