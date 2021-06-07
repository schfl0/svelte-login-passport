<script>
    import { user } from '../stores/user'
    import { onMount } from 'svelte';
    import { Link } from 'svelte-navigator';
    import { useNavigate } from 'svelte-navigator';
    
    const navigate = useNavigate();
    let redirect = false;
    let regUsername;
    let regPassword;
    let errorMsg = '';

    function redirectDashboard() {
        redirect = true;
        window.location.replace('http://localhost:5000/dashboard')
    }
    onMount(() => {
        if($user !== 'null' && $user !== '' && $user !== null && $user !== undefined) {
        redirectDashboard();
        }
    })
    
    function handleRegister() {
        const regUser = {
            username: regUsername,
            password: regPassword
        }
        fetch('http://localhost:3000/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(regUser)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.msg === 'User already exists') {
                errorMsg = data.msg;
            }
            if(data.msg === 'User created...') {
                errorMsg = '';
                navigate('/', {
                replace: true,
                 });
            }
        });
    }
    </script>
    <div class="register-container">
    {#if redirect}
    <p>Redirecting...</p>
    {:else}
    <h1>✍ Register</h1>
    <form on:submit|preventDefault={handleRegister}>
        <input
          bind:value={regUsername}
          on:input={() => errorMsg = ''}
          type="text"
          name="username"
          placeholder="Username"
        />
        {#if errorMsg !== ''}
        <span>{''+ errorMsg}</span>
        {/if}
        <br />
        <input
          bind:value={regPassword}
          type="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">🏁 Register</button>
      </form>
      <nav>
		Or <Link to="/">Login</Link> into existing account.
	</nav>
    {/if}
</div>
    
    <style>
       .register-container {
        position: absolute;
        top: 0px;
        height: 100vh;
        width:  100vw;
        padding: 10px;
        background-image: linear-gradient( 359.8deg,  rgba(252,255,222,1) 2.2%, rgba(182,241,171,1) 99.3% );
    }
    h1:focus {
      outline: none;
    }
    </style>