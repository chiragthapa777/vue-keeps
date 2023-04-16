import Auth from "../view/auth/Auth.vue";
import Note from "../view/note/Note.vue";
import Home from "../view/home/Home.vue";
import AddNote from "../view/note/AddNote.vue";
import NoteIndex from "../view/note/NoteIndex.vue";
import {createRouter, createWebHistory} from "vue-router";
import jwt_decode from "jwt-decode";
const routes=[
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/note',
        name: 'note',
        component: NoteIndex,
        children:[
            {
                path: '',
                name: 'noteIndex',
                component: Note,
            },
            {
                path: 'add',
                name: 'addnote',
                component: AddNote,
            },

        ]
    },
    {
        name:'auth',
        path: '/auth',
        component: Auth
    },
    {
        name:'random',
        path: '/',
        component: Auth
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(async(to, from, next)=>{
    const publicRoutesArr = ['auth','random','home']
    if( !publicRoutesArr.find(r=>r===to.name)){
        const token = localStorage.getItem('token')
        const user : any = localStorage.getItem('user')
        try{
            if(!token || !user || user?._id){
                throw "Not logged in"
            }
            jwt_decode(token); // will throw error is jwt invalid
        }catch (e) {
            router.push('/auth')
        }
    }
    next()
})

export default router
