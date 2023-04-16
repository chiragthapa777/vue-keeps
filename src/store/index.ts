import { createStore } from "vuex";
import AuthModule from "./module/authModule";
import NoteModule from "./module/noteModule";
import HttpErrorHandler from "../helper/httpErrorHandler";
import authModule from "./module/authModule";
import noteModule from "./module/noteModule";

export default createStore({
    state: {
        loading: false,
        toast: {
            show: false,
            type: "",
            msg: "",
            bg:''
        },
        authState : authModule.state,
        noteState : noteModule.state
    },
    getters: {
        getToastState : function (state){
            return state.toast
        },
        getAuthState: function (state){
            return state.authState
        },
        getNoteState: function (state){
            return state.noteState
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setToast(state, payload) {
            state.toast = payload
        }
    },
    actions: {
        setToastAction({commit},payload){
            if(payload.type === "error"){
                payload.bg = "bg-red-600"
            }else if(payload.type === "success"){
                payload.bg = "bg-green-600"
            }
            commit('setToast',payload,{root:true})
            if(payload.show){
                setTimeout(()=>{
                    commit('setToast',{
                        msg : '',
                        type : '',
                        bg:'',
                        show : false
                    },{root:true})
                },3000)
            }

        }
    },
    modules: {
        auth: AuthModule,
        note: NoteModule
    },
    strict: true
});
