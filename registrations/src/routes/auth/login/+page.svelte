<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import Icon from '$lib/components/Icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';

	let redirectTo = '';
	dev ? (redirectTo = 'http://localhost:5173') : (redirectTo = 'https://events.devparapalli.in');

	let loading = false,
		email = '',
		password = '';

	async function submit() {
		if (!supabaseClient) throw new Error('Supabase client not initialized');
		loading = true;
		if (email && password) {
			const { error: signInError } = await supabaseClient.auth.signIn({
				email,
				password
			});

			if (signInError) {
				toast.push(signInError.message, {
					classes: ['toast-err']
				});
				loading = false;
				return;
			}
			toast.push('Authentication Sucessful! Redirecting...', {
				classes: ['toast-success'],
				duration: 2000
			});
			setTimeout(() => {
				goto('');
			}, 2000);
		} else if (email && !password) {
			const { error: signInError } = await supabaseClient.auth.signIn({
				email
			});
			if (signInError) {
				toast.push(signInError.message, {
					classes: ['toast-err']
				});
				loading = false;
				return;
			}
			toast.push('Magic Link sent...', {
				classes: ['toast-success'],
				duration: 2000
			});
			toast.push("Please check your email for a magic link. Click it and you'll be logged in.", {
				duration: 10000
			});
		}

		loading = false;
	}
	async function github() {
		if (!supabaseClient) throw new Error('Supabase client not initialized');
		const { error: signInError } = await supabaseClient.auth.signIn(
			{
				provider: 'github'
			},
			{
				redirectTo: redirectTo
			}
		);
		if (signInError) {
			toast.push(signInError.message, {
				classes: ['toast-err']
			});
			loading = false;
			return;
		}
		toast.push('Redirecting...', {
			classes: ['toast-success']
		});
		loading = false;
	}

	async function google() {
		if (!supabaseClient) throw new Error('Supabase client not initialized');
		const { error: signInError } = await supabaseClient.auth.signIn(
			{
				provider: 'google'
			},
			{
				redirectTo: redirectTo
			}
		);
		if (signInError) {
			toast.push(signInError.message, {
				classes: ['toast-err']
			});
			loading = false;
			return;
		}
		toast.push('Redirecting...', {
			classes: ['toast-success']
		});
		loading = false;
	}
	let validation_timeout: ReturnType<typeof setTimeout>;
	function validate_notify() {
		clearTimeout(validation_timeout);
		if (email) {
			// test to see if email is input
			if (!validate()) {
				validation_timeout = setTimeout(() => {
					toast.push('Invalid Email', {
						classes: ['toast-err']
					});
				}, 2000);
			}
		}
	}
	$: validate(email);
	let is_valid = false;
	function validate(_e: string = email) {
		if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(_e)) {
			is_valid = false;
			return false;
		}
		is_valid = true;
		return true;
	}
</script>

<div class="mb-6 text-3xl">Welcome</div>
<form
	in:fade={{ duration: 250, delay: 250 }}
	out:fly={{ x: -200, duration: 250 }}
	on:submit|preventDefault={submit}
	class="container form-control max-w-xs rounded-3xl border-2 border-[#fb6340] bg-base-200 p-6 transition-all duration-500 focus-within:border-[#f5365c]">
	<div class="grid grid-flow-row grid-cols-2 gap-4">
		<!-- <button on:click|preventDefault={() => {}} class="btn btn-outline "><Icon style="color: #555555;" icon="simple-icons:apple" /></button> -->
		<button on:click|preventDefault={github} class="btn btn-outline "><Icon class="text-3xl text-[#fafbfc] [font-size:2rem]" icon="simple-icons:github" /></button>
		<button on:click|preventDefault={google} class="btn btn-outline "><Icon icon="logos:google-icon" class="text-3xl [font-size:2rem]" /></button>
		<!-- <button on:click|preventDefault={twitter} class="btn btn-outline "><Icon icon="logos:twitter" /></button> -->
	</div>
	<hr class="mt-4 border-accent" />
	<span class="mt-4 mb-2 text-xs">If you have an account we'll sign you in, if not we'll create one for you.</span>
	<label for="email" class="label mt-0">
		<span class="label-text">What is your email address?</span>
		<span class="label-text-alt hidden opacity-30">username@domain.tld</span>
	</label>
	<div class="relative mb-2">
		<span class="pointer-events-none absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 transform">
			<Icon icon="ic:outline-alternate-email" class="text-3xl [font-size:2rem]" />
		</span>
		<input on:keypress={validate_notify} on:blur={validate_notify} class="input input-bordered w-full pl-14" name="email" type="email" label="Email address" bind:value={email} />
	</div>

	<!-- <label for="password" class="label mt-2">
		<span class="label-text">Password (Optional)</span>
		<a href="/auth/forgot_pass" sveltekit:prefetch class="label-text-alt cursor-pointer opacity-30 transition-all duration-200 hover:opacity-100">Forgot Password ?</a>
	</label>
	<div class="relative mb-4">
		<span class="pointer-events-none absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 transform">
			<Icon icon="ic:round-password" />
		</span>
		<input class="input input-bordered w-full pl-14" name="password" type="password" label="Password" bind:value={password} />
	</div> -->

	<button class="btn btn-primary btn-block mt-4 {loading ? 'loading' : ''}" disabled={loading || !is_valid}>Sign in</button>
	<div class="mt-4 -mb-6 flex justify-between">
		<a href="/" class="invisible my-4 text-xs">Help</a>
		<a href="/legal/privacy" class="my-4 text-xs">Privacy</a>
		<a href="/legal/terms" class="my-4 text-xs">Terms</a>
	</div>
	<!-- <div class="m-4 flex flex-col gap-2">
		
		<a href="/auth/register" sveltekit:prefetch class="btn btn-ghost btn-xs"> Don't have an account? Sign up </a>
	</div>  -->
</form>
