<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <router-link :to="'/'"><h3 class="md-title">Banten Keh!</h3></router-link>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <li class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">apps</i>
                        <p>Category</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-menu-right scroll">
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Serang'}}">
                            <p>Serang</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Kota Serang'}}">
                            <p>Kota Serang</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Kota Cilegon'}}">
                            <p>Kota Cilegon</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Tanggerang'}}">
                            <p>Tanggerang</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Kota Tanggerang'}}">
                            <p>Kota Tanggerang</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Kota Tanggerang Selatan'}}">
                            <p>Kota Tanggerang Selatan</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Pandeglang'}}">
                            <p>Pandeglang</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Lebak'}}">
                            <p>Lebak</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Budaya'}}">
                            <p>Budaya</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Kuliner'}}">
                            <p>Kuliner</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Sejarah'}}">
                            <p>Sejarah</p>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'List Content', query: { category: 'Wisata'}}">
                            <p>Wisata</p>
                          </router-link>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <md-list-item
                href="#/kamus"
              >
                <i class="material-icons">translate</i>
                <p>Kamus</p>
              </md-list-item>

              <md-list-item
                href="#/quis-pengetahuan"
              >
                <i class="material-icons">quiz</i>
                <p>Quiz</p>
              </md-list-item>

              <md-list-item
                href="#/login"
              >
                <i class="material-icons">account_circle</i>
                <p>Login</p>
              </md-list-item>

              <!-- <li class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">local_dining</i>
                        <p>Kuliner</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/landing">
                            <i class="material-icons">view_day</i>
                            <p>Landing Page</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/login">
                            <i class="material-icons">fingerprint</i>
                            <p>Login Page</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/profile">
                            <i class="material-icons">account_circle</i>
                            <p>Profile Page</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li> -->

              <!-- <md-list-item
                href="https://twitter.com/CreativeTim"
                target="_blank"
              >
                <i class="fab fa-twitter"></i>
                <p class="hidden-lg">Twitter</p>
                <md-tooltip md-direction="bottom"
                  >Follow us on Twitter</md-tooltip
                >
              </md-list-item>
              <md-list-item
                href="https://www.facebook.com/CreativeTim"
                target="_blank"
              >
                <i class="fab fa-facebook-square"></i>
                <p class="hidden-lg">Facebook</p>
                <md-tooltip md-direction="bottom"
                  >Like us on Facebook</md-tooltip
                >
              </md-list-item>
              <md-list-item
                href="https://www.instagram.com/CreativeTimOfficial"
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
                <p class="hidden-lg">Instagram</p>
                <md-tooltip md-direction="bottom"
                  >Follow us on Instagram</md-tooltip
                >
              </md-list-item> -->
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent-user");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent-user");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>

<style scoped>
.scroll{
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
