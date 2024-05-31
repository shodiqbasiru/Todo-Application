import {createApp} from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from "@/router/router";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPlus, faEdit, faTrash, faCheck, faSearch} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

library.add(faPlus, faEdit, faTrash, faCheck, faSearch)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
