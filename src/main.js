import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import MaterialKit from "./plugins/material-kit";
import CKEditor from '@ckeditor/ckeditor5-vue2';

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

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
