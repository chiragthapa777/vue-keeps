<template>
  <div class="hero min-h-screen w-full">
    <div class="hero-content flex-col lg:flex-row-reverse justify-evenly w-full">
      <img src="./../../assets/heroImage.svg" class="max-w-sm rounded-lg " />
      <div>
        <h1 class="text-5xl font-bold">Keep Your Notes!</h1>
        <p class="py-6">This is a simple notes taking application built with vue 3 and nest js in backend.</p>
        <router-link to="/auth" class="btn btn-primary">Get Started</router-link >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home.vue"
}
</script>

<style scoped>

</style>
