import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import MaterialKit from "./plugins/material-kit";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;

Vue.use(MaterialKit);
Vue.use(CKEditor);

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD6kRgkY6queKr6mB018l-56HTScH2Aq6Q',
    libraries: 'places',
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
