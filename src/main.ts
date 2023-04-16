import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import axios from 'axios';
import store from "./store";

const app = createApp(App)

// Axios interceptor for setting token in headers
axios.interceptors.request.use(
    (config) => {
        // Get token from local storage
        const token = localStorage.getItem('token');
        // config.withCredentials = true

        // Set token in headers
        if (token) {
            config.headers['token'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

app.use(store)


app.use(router)

app.mount('#app')
