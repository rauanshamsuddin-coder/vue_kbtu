import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Глобальные компоненты: доступны в любом шаблоне без import
import BaseButton from './components/global/BaseButton.vue'
import BaseBadge from './components/global/BaseBadge.vue'
import BasePanel from './components/global/BasePanel.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)
app.component('BasePanel', BasePanel)

app.mount('#app')
