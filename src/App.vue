<script setup>
import Navbar from "./common/Navbar.vue"
import Toast from "./common/Toast.vue";
import {onMounted} from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(()=>{
  store.dispatch("auth/initializeAuthFromLocalStorage");
})

</script>

<template>
  <div class="bg-base-200/30 min-h-screen w-full">
    <Navbar/>
    <Toast/>
    <div class="container mx-auto p-1">
      <router-view></router-view>
    </div>
  </div>


</template>
