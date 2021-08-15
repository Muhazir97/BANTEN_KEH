<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="copyright md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
        &copy; {{ year }}, made with by
        <a href="https://github.com/Muhazir97" target="_blank">Muhazir</a>
        for a better web.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/material-dashboard.scss";
</style>
