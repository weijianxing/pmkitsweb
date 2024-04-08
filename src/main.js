import Vue from 'vue';
import App from './App.vue';
import Gantt from './components/Gantt.vue';
import Info from './components/Info.vue';

import Router from 'vue-router';
import axios from 'axios';
// vue3
// import { ElDialog } from 'element-ui';  
// Vue.use(ElDialog);  // Register the component
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'

Vue.use(Router);
Vue.prototype.$axios = axios;

const router = new Router({
  routes: [
    { 
      path: '/',
      component: Gantt
    },
    {
      path: '/info',
      component: Info
    }
  ]
});

import './styles/quasar.styl';
import iconSet from 'quasar/icon-set/mdi-v3.js';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v3/mdi-v3.css';
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel
  },
  directives: {},
  plugins: {},
  iconSet: iconSet
});
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
