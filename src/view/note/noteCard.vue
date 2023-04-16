<template>
  <div class="border rounded-md flex flex-col justify-between bg-base-200/30 relative">
    <div class="p-5 pb-0 ">
      <h1 class="text-lg pt-1">{{noteData.title}}</h1>
      <p class="text-xs">{{getFormattedDate(noteData.createdAt)}}</p>
      <p class="text-md py-1">{{noteData.desc}}</p>
    </div>
    <div class="flex flex-start p-5 ">
      <button class="btn btn-primary btn-xs mr-2">Edit</button>
      <button class="btn btn-error btn-xs mr-2" @click="deleteNote()">Delete</button>
      <button class="btn btn-success btn-xs mr-2" @click="updateDone()">Done</button>
    </div>
    <p v-if="noteData.done" class="absolute text-success font-bold top-0 right-2">
      Done
    </p>
    <p v-if="noteState.currLoaderId === noteData._id" class="absolute bg-base-200/50 w-full h-full flex justify-center items-center">
      <button class="btn btn-ghost btn-lg loading"></button>
    </p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props:['note'],
  name: "noteCard",
  data(){
    return{
      show : false,
      noteData: this.note
    }
  },
  mounted() {
  },
  methods:{
    getFormattedDate(date){
      return moment(date).format("LLLL")
    },
    deleteNote(){
      this.$store.dispatch("note/deleteNote",this.noteData._id)
    },
    async updateDone(){
      const data = await this.$store.dispatch("note/updateNote", {id:this.noteData._id,data:{done:!this.noteData.done}})
      this.noteData = {
        ...data
      };
    }
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
