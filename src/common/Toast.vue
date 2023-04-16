<template>
  <div v-if="toast.show" class="toast toast-top toast-end cursor-pointer z-50" @click="disapperToast()" >
    <div class="alert alert-info " :class="toast.bg" >
      <div>
        <span>{{ toast.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Toast",
  computed: {
    toast(){
      return {...this.$store.getters['getToastState']}
    }
  },
  methods:{
    disapperToast(){
      this.$store.dispatch('setToastAction',{msg:'',show:false,bg:'',type:''})
    }
  },
  mounted() {
  }
}
</script>


<style scoped>

</style>
