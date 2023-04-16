<template>
  <div class="navbar bg-neutral text-neutral-content sticky top-0 z-40">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact text-neutral dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li class="hover-bordered" :class="{'underline': path ==='/'}"><router-link to="/">Home</router-link></li>
          <li class="hover-bordered" :class="{'underline': path ==='/auth'}"><router-link to="/auth">Auth</router-link></li>
          <li class="hover-bordered" :class="{'underline': path ==='/note'}"><router-link to="/note">Note</router-link></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <router-link to="/"  class="btn btn-ghost normal-case text-xl">Keep Note</router-link >
    </div>
    <div class="navbar-end">
      <p class="text-sm cursor-pointer">
        {{user.name || ''}}
      </p>
      <button class="btn btn-ghost btn-circle" @click="logout()">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather h-5 w-5 feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { Bars3BottomLeftIcon } from '@heroicons/vue/24/solid'
export default {
  name: "Navbar",
  data(){
    return{
      path : ''
    }
  },
  computed: {
    user() {
      return this.$store.getters['getAuthState'].user
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
      this.$router.push('/auth')
    }
  },
  mounted() {
    this.path = this.$route.path
  },
  watch:{
    '$route.path'(newPath, oldPath){
      this.path = newPath
    }
  }

}
</script>

<style scoped>

</style>
