<template>
  <h1 class="text-xl font-bold mt-5">Your Notes</h1>
  <div v-if="!noteState.noteLoader" class="w-full grid grid-cols-1  sm:grid-cols-2  gap-3 py-5 mx-auto">
    <note-card v-for="(item, index) in noteState.notes" :note="item"/>
  </div>
  <div v-else class="py-5 w-full content-center">
    <button class="btn btn-block btn-xl btn-ghost loading"></button>
  </div>
  <div class="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 ">
    <router-link to="/note/add" className="btn btn-circle btn-xl" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus h-7 w-7" viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> </svg>
    </router-link>
  </div>

</template>

<script>
import NoteCard from "./noteCard.vue";
export default {
  name: "Note",
  components: {NoteCard},
  created() {
    this.$store.dispatch('note/getNotes')
  },
  computed:{
    noteState(){
      return this.$store.getters['getNoteState']
    }
  }
}
</script>

<style scoped>

</style>
