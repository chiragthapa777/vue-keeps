import axios, {AxiosError, AxiosResponse} from 'axios';
import {LoginPayloadInterface, RegisterPayloadInterface} from "../../types/LoginPayload";
import baseUrl from "../../helper/baseapi";
import HttpErrorHandler from "../../helper/httpErrorHandler";
import router from "../../router";
const userDefault = {
    name: '',
    _id: '',
    email: ''
}
const authModule = {
    namespaced: true,
    state: {
        user: localStorage.getItem('user') || {...userDefault},
        token: localStorage.getItem('token') || '',
        authLoader: false,
    },
    getters: {},
    mutations: {
        setUser(state:any, payload:any) {
            state.user = payload;
            localStorage.setItem('user',JSON.stringify(payload))
        },
        setToken(state:any, payload:any) {
            state.token = payload;
            localStorage.setItem('token',payload)
        },
        setAuthLoader(state:any, payload:any) {
            state.authLoader = payload;
        },
    },
    actions: {
        async login({commit, dispatch, state}:any, payload:LoginPayloadInterface) {
            commit('setAuthLoader', true);
            try {
                const res : AxiosResponse = await axios.post(`${baseUrl}/user/login`, payload);
                commit('setUser', res.data);
                commit('setToken', res.data.token);
                dispatch('setToastAction', {
                    msg: 'Login in successful',
                    type: 'success',
                    show: true
                }, {root: true});
                router.push('/');
            } catch (e) {
                dispatch('setToastAction', {
                    msg: HttpErrorHandler(e),
                    type: 'error',
                    show: true
                }, {root: true});
            } finally {
                commit('setAuthLoader', false);
            }
        },
        async register({commit, dispatch, state}:any, payload:RegisterPayloadInterface) {
            commit('setAuthLoader', true);
            try {
                const res : AxiosResponse = await axios.post(`${baseUrl}/user/register`, payload);
                commit('setUser', res.data);
                commit('setToken', res.data.token);
                dispatch('setToastAction', {
                    msg: 'Account created successfully',
                    type: 'success',
                    show: true
                }, {root: true});
                router.push('/');
            } catch (e) {
                dispatch('setToastAction', {
                    msg: HttpErrorHandler(e),
                    type: 'error',
                    show: true
                }, {root: true});
            } finally {
                commit('setAuthLoader', false);
            }
        },
        async logout({commit}:any){
            commit('setUser', '');
            commit('setToken', '');
            router.push('/auth');
        },
        async initializeAuthFromLocalStorage({commit}:any){
            commit('setUser', JSON.parse(localStorage.getItem('user') ||"{}"));
            commit('setToken', localStorage.getItem('token'));
            commit('setAuthLoader', false);
        }
    }
};


export default authModule;

