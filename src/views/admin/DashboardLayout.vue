<template>
  <div class="wrapper" >
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/data-content">
        <md-icon>table_view</md-icon>
        <p>Data Content</p>
      </sidebar-link>
      <sidebar-link to="/data-bahasa">
        <md-icon>local_library</md-icon>
        <p>Data Kamus</p>
      </sidebar-link>
      <sidebar-link to="/data-admin">
        <md-icon>person</md-icon>
        <p>Data Admin</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <!-- <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin> -->

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
// import FixedPlugin from "./FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    // FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/oldbanten.png")
    };
  }
};
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/material-dashboard.scss";
</style>

