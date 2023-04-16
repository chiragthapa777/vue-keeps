import axios from 'axios';
import {LoginPayloadInterface} from "../../types/LoginPayload";
import baseUrl from "../../helper/baseapi";
import HttpErrorHandler from "../../helper/httpErrorHandler";
import router from "../../router";


const noteModule= {
    namespaced: true,
    state:{
        noteLoader : false,
        notes: [],
        currLoaderId : '',
        updateObj : {}
    },
    getters:{},
    mutations: {
        // @ts-ignore
        setNoteLoader(state, {loader, id}) {
            state.noteLoader = loader;
            state.currLoaderId = id
        },
        // @ts-ignore
        setNotes(state, payload) {
            state.notes = payload;
        },
    },
    actions:{
        async getNotes({commit, dispatch, state}:any){
            commit('setNoteLoader', {loader:true})
            try{
                const res = await axios.get(`${baseUrl}/note`);
                commit('setNotes',res.data)
            }catch (e) {
                dispatch('setToastAction', {
                    msg: HttpErrorHandler(e),
                    type: 'error',
                    show: true
                }, {root: true});
            }finally {
                commit('setNoteLoader',{loader:false})
            }
        },
        async addNote({commit, dispatch, state}:any, payload:any){
            commit('setNoteLoader',{loader:true})
            try{
                const res = await axios.post(`${baseUrl}/note`,payload);
                dispatch('setToastAction', {
                    msg: 'Note added successfully',
                    type: 'success',
                    show: true
                }, {root: true});
                router.push('/note')
            }catch (e) {
                dispatch('setToastAction', {
                    msg: HttpErrorHandler(e),
                    type: 'error',
                    show: true
                }, {root: true});
            }finally {
                commit('setNoteLoader',{loader:false})
            }
        },
        async deleteNote({commit, dispatch, state}:any, payload:string){
            commit('setNoteLoader',{loader:false, id:payload})
            try{
                const res = await axios.delete(`${baseUrl}/note/${payload}`);
                commit('setNotes',state.notes.filter((n:any)=>{
                    if(n._id!==payload){
                        return n;
                    }
                }))
            }catch (e) {
                dispatch('setToastAction', {
                    msg: HttpErrorHandler(e),
                    type: 'error',
                    show: true
                }, {root: true});
            }finally {
                commit('setNoteLoader',{loader:false})
            }
        },
        async updateNote({commit, dispatch, state}:any, payload:any){
            commit('setNoteLoader',{loader:false, id:payload.id})
            try{
                const res = await axios.patch(`${baseUrl}/note/${payload.id}`,payload.data);
                commit('setNotes',state.notes.map((n:any)=>{
                    if(n._id===payload){
                        return {
                            ...n,
                            ...res.data
                        };
                    }
                    return n
                }))
                return res.data
            }catch (e) {
                dispatch('setToastAction', {
                    msg: HttpErrorHandler(e),
                    type: 'error',
                    show: true
                }, {root: true});
            }finally {
                commit('setNoteLoader',{loader:false})
            }
        },
        setUpdateObj({commit}:any, payload:any){
            commit("set")
        }
    }
}
export default noteModule;
