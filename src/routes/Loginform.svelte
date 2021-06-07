<script>
//import { useNavigate, useLocation } from 'svelte-navigator';
import { user } from '../stores/user';

//const navigate = useNavigate();
//const location = useLocation();

let loginUsername;
let loginPassword;
let errorMsg = '';

function handleLogin() {
    const loginUser = {
      username: loginUsername,
      password: loginPassword
    };
    fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginUser)
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if(data.msg === 'Not authorized') {
            $user = null;
            errorMsg = data.msg;
          }
          if(data.msg === 'Success') {
            $user = data.id;
            console.log($user);
            window.location.replace('http://localhost:5000/dashboard')
          }
        });
  
  //$user = { username, password };
    //navigate('/', {
     //   replace: true,
   //   });
}
</script>

<h1>👤 Login</h1>
<form on:submit|preventDefault={handleLogin}>
    <input
      bind:value={loginUsername}
      on:input={()=> errorMsg = ''}
      type="text"
      name="username"
      placeholder="Username"
    />
    {#if errorMsg !== ''}
    <span>{''+ errorMsg}</span>
    {/if}
    <br />
    <input
      bind:value={loginPassword}
      on:input={()=> errorMsg = ''}
      type="password"
      name="password"
      placeholder="Password"
    />
    <br />
    <button type="submit">🔑 Login</button>
  </form>

<style>
    h1:focus {
      outline: none;
    }
</style>