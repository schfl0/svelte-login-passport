<script>
    import { user } from '../stores/user'
    import { onMount } from 'svelte';
    import { Link } from 'svelte-navigator';
    import Loginform from './Loginform.svelte'
    let redirect = false;
    function redirectDashboard() {
        redirect = true;
        window.location.replace('http://localhost:5000/dashboard')
    }
    onMount(() => {
        if($user !== 'null' && $user !== '' && $user !== null && $user !== undefined) {
            redirectDashboard();
        }
    })
</script>
<div class="login-container">
{#if redirect}
<p>Redirecting...</p>
{:else}
 <Loginform />
<nav>
    Or <Link to="register">Register</Link> to create an account.
</nav>
{/if}
</div>
<style>
    .login-container {
        position: absolute;
        top: 0px;
        padding: 10px;
        height: 100vh;
        width:  100vw;
        background-image: linear-gradient( 179.4deg,  rgba(33,150,243,1) 1.8%, rgba(22,255,245,0.60) 97.1% );
    }
</style>