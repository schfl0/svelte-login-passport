<script>
	 import { Router, Route } from 'svelte-navigator';
	 //import { user } from './stores/user';
	 //import PrivateRoute from './components/PrivateRoute.svelte'
	import Login from './routes/Login.svelte'
	import Registerform from './routes/Registerform.svelte'
	import Dashboard from './routes/Dashboard.svelte'
</script>

<Router>
	<Route path="/">
		<Login />
	</Route>
	<Route path="register">
        <Registerform />
    </Route>
	<Route path="/dashboard">
		<Dashboard />
	</Route>
</Router>

<style>
	
</style>