<script>
    import { useNavigate, useLocation } from 'svelte-navigator';
    import { user } from '../stores/user';
  
    const navigate = useNavigate();
    const location = useLocation();
  
    $: if (!$user) {
      navigate('/login', {
        replace: true,
      });
    }
  </script>
  
  {#if $user}
    <slot />
  {/if}