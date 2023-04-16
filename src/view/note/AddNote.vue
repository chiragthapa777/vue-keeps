<template>
  <div class="my-5">
    <button class="btn btn-sm" @click="goback()">Back</button>
    <form class="w-full mt-5 bg-base-200/80 p-3 md:p-5 rounded" :onsubmit="handleSubmit" >
      <h1 class="text-2xl my-3">Add Note</h1>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Title</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="note.data.title" />
        <label class="label">
          <span class="label-text-alt text-red-600">{{ note.error.title }}</span>
        </label>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea class="textarea textarea-bordered h-24" placeholder="Bio" v-model="note.data.desc"></textarea>
        <label class="label">
          <span class="label-text-alt text-red-600">{{ note.error.desc }}</span>
        </label>
      </div>
      <button class="btn my-2" type="submit" >Save</button>
    </form>
  </div>
</template>

<script>
import note from "./Note.vue";

export default {
  name: "AddNote",
  data(){
    return{
      note:{
        data:{
          title:'',
          desc:'',
          tags:[]
        },
        error:{
          title:'',
          desc:''
        }
      }
    }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    handleSubmit(e){
      e.preventDefault()
      if(this.validateData()){
        this.$store.dispatch('note/addNote',this.note.data)
      }
    },
    validateData(){
      let isValid = true
      if(!this.note.data.title){
        isValid = false
        this.note.error.title = "Title is required"
      }
      if(!this.note.data.desc){
        isValid = false
        this.note.error.desc = "Description is required"
      }
      return isValid
    }
  }
}
</script>

<style scoped>

</style>
