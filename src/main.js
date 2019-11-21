// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// 最新版改名导致
// import 'element-ui/lib/theme-chalk/index.css'

// import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  // router,
  // components: { App },
  // template: '<App/>'
  el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
