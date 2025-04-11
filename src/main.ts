import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

library.add(faEye,faEyeSlash)

const app= createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(Vue3Toastify,{
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
} as ToastContainerOptions);

app.mount('#app')
