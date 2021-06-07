<script>
import { user } from '../stores/user';
import { onMount } from 'svelte';

let redirect = true;
let reqUser = '';

function redirectLogin() {
    $user = null;
    redirect = true;
    reqUser = '';
    window.location.replace('http://localhost:5000/')
}

onMount(() => {
    if($user === 'null' || $user === '' || $user === null || $user === undefined) {
    redirectLogin();
    }
    else {
        redirect = false;
        fetch('http://localhost:3000/user', { credentials: 'include'})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.msg === 'Not authorized') {
                redirectLogin();
            }
            if(data.user) {
                reqUser = data.user;
            }
        });
    }
})

function handleLogout() {
    fetch('http://localhost:3000/logout', {credentials: 'include' })
    .then((res) => res.json())
    .then((data) => {
        if(data.msg === 'Logged out') {
            redirectLogin();
        }
    })
}

</script>
<div class="dashboard-container">
{#if redirect}
<p>Redirecting...</p>
{:else}
<h1>👋 Welcome, {reqUser}</h1>
<button on:click={handleLogout}>💩 Logout</button>
{/if}
</div>

<style>
    .dashboard-container {
        position: absolute;
        top: 0px;
        height: 100vh;
        width:  100vw;
        padding: 10px;
        background-image: linear-gradient( 90.5deg,  rgba(255,207,139,0.50) 1.1%, rgba(255,207,139,1) 81.3% );
    }
    h1:focus {
        outline: none;
    }
</style>