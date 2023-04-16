<template>
  <div class="hero mt-10">
    <div class="hero-content p-1 w-full sm:w-['180px'] ">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="tabs mx-auto">
          <a class="tab tab-bordered " :class="{'tab-active' : mode === 'login'}" @click="toggleMode()">Login</a>
          <a class="tab tab-bordered" :class="{'tab-active' : mode === 'register'}" @click="toggleMode()">Register</a>
        </div>
        <div class="card-body p-3 pb-10 pt-7 w-full ">
          <div v-if="mode==='register'" class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input type="text" placeholder="name" class="input input-bordered " :class="{'input-error' : user.errors.nameError !== ''}" v-model="user.name" />
            <label class="label">
              <p class=" text-red-600 text-xs">{{ user.errors.nameError }}</p>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" class="input input-bordered" :class="{'input-error' : user.errors.emailError !== ''}"  v-model="user.email" />
            <label class="label">
              <p class=" text-red-600 text-xs">{{ user.errors.emailError }}</p>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" class="input input-bordered" :class="{'input-error' : user.errors.passwordError !== ''}"  v-model="user.password" />
            <label class="label">
              <p class=" text-red-600 text-xs">{{ user.errors.passwordError }}</p>
            </label>
          </div>
          <div v-if="mode==='register'" class="form-control">
            <label class="label">
              <span class="label-text">Re-password</span>
            </label>
            <input type="password" placeholder="re password" class="input input-bordered" :class="{'input-error' : user.errors.rePasswordError !== ''}"  v-model="user.rePassword" />
            <label class="label">
              <p class=" text-red-600 text-xs">{{ user.errors.rePasswordError }}</p>
            </label>
          </div>
          <div class="form-control mt-6">
            <button @click="submit"  class="btn btn-primary" :class="{'loading' : loading}"  >{{mode}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const errors ={
  nameError:'',
  emailError:'',
  rePasswordError:'',
  passwordError:'',

}
const userDefault ={
  name:'',
  email:'',
  password:'',
  rePassword:'',
  errors
}
export default {
  name: "Auth.vue",
  data() {
    return {
      mode: "login",
      user: {...userDefault}
    }
  },
  methods: {
    toggleMode() {
      if (this.mode === "login") {
        this.mode = "register"
      } else {
        this.mode = "login"
      }
    },
    async submit() {
      this.user.errors = {...errors}
      if (!this.user.email) {
        this.user.errors.emailError = "Email is required"
      } else {
        const reg = /\S+@\S+\.\S+/;
        if (!reg.test(this.user.email)) {
          this.user.errors.emailError = "Invalid Email"
        }
      }
      if (!this.user.password) {
        this.user.errors.passwordError = "Password is required"
      }
      if (this.mode === 'register') {
        if (!this.user.name) {
          this.user.errors.nameError = "Name is required"
        }
        if (!this.user.rePassword) {
          this.user.errors.rePasswordError = "Re-Password is required"
        } else {
          if (this.user.password !== this.user.rePassword) {
            this.user.errors.rePasswordError = "Password must same"
          }
        }
      }
      for (const key in this.user.errors) {
        if (this.user.errors[key] !== '') {
          return;
        }
      }
      if (this.mode === "login") {
        this.$store.dispatch('auth/login', {email: this.user.email, password: this.user.password})
      }else{
        this.$store.dispatch('auth/register', {email: this.user.email, password: this.user.password, name: this.user.name})
      }

    }
  },
  computed: {
    loading(){
      return this.$store.getters['getAuthState'].authLoader
    },
  }
}
</script>

<style scoped>

</style>
