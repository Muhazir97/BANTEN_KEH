<template>
  <div class="wrapper">
    <carousel
      :per-page="1"
      loop
      :speed="700"
      autoplay
      :autoplay-timeout="5000"
      class="VueCarousel-wrapper"
    >
      <slide>
        <img :src="carousel1" alt="carousel1" width="100%"/>
      </slide>
      <slide>
        <img :src="carousel2" alt="carousel2" width="100%"/>
      </slide>
      <slide>
        <img :src="carousel3" alt="carousel3" width="100%"/>
      </slide>
    </carousel>
    <div class="main main-raised">
      <div class="section">
        <div class="container">

          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
              <h4 class="title text-center">Display By : {{this.$route.query.category}}</h4>
            </div>
          </div>

          <!-- LIST CONTENT -->
          <div v-if="table.data == 'Data Is Empty'">
            <div class="md-layout">
              <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
                <h4 class="title text-center">{{table.data}}</h4>
              </div>
            </div>
          </div>
          <div class="features text-center" v-else>
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-25 md-small-size-100" v-for="(row, index) in table.data" :key="index">
                <div class="info">
                  <md-card style="margin-top: -70px;">
                    <md-ripple>
                      <router-link :to="'/detail-content/'+row.id"><img :src="loadImage(row.image_content)" class="rounded"/></router-link>
                      <div style="margin-top: 10px;">
                        <span class="badge badge-info" v-for="(badge, i) in row.content_category" :key="i" @click="searchByCategory(badge.category_content)" style="cursor: pointer;">
                          {{ badge.category_content }}
                        </span>
                      </div>
                      <md-card-content>
                        <router-link :to="'/detail-content/'+row.id">
                          <h4 class="info-title" style="margin-top: -5px; margin-bottom: -5px;">{{ row.judul_content }}</h4>
                        </router-link>
                      </md-card-content>
                      <md-card-actions>
                        <p>By {{ row.created_by +', '+ moment(row.created_at).locale('id').format('LL') }} </p>
                      </md-card-actions>
                    </md-ripple>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
          <!-- END LIST CONTENT -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/configs/config';
  import axios from 'axios';
  var moment = require('moment');

export default {
  bodyClass: "landing-page",
  data() {
    return {
      carousel1: require("@/assets/img/baduy.jpg"),
      carousel2: require("@/assets/img/Beluk.jpg"),
      carousel3: require("@/assets/img/rudat2.png"),
      moment:moment,
      table: {
        data: []
      },
      search: {
        category: '',
      },
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  mounted(){
    this.get();
  },
  watch: {
    $route() {
        this.get(this.$route.query)
    }
  },
  methods: {
    searchByCategory(category) {
        this.search.category = category;
        this.$router.push({ name: 'List Content', query: this.search });
        this.get();
    },
    get(){
      let params = this.$route.query
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      axios.get(config.apiUrl +"content/search-by-category", {params} )
      .then(response => {
       this.table.data = response.data.data
      })
      .catch(err => {
        this.table.data = "Data Is Empty"
       // alert("Terjadi error server")
      })
    },
    loadImage(image) {
      return config.storageUrl+'image_content/'+image;
    },
    test(){
      alert('oke')
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}

.md-sm{
  text-size:8px;
}


/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
   .VueCarousel-wrapper {
      width: 100%;
      height: 230px;
      position: relative;
      overflow: hidden;
  }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
   .VueCarousel-wrapper {
      width: 100%;
      height: 700px;
      position: relative;
      overflow: hidden;
  }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
   .VueCarousel-wrapper {
      width: 100%;
      height: 200px;
      position: relative;
      overflow: hidden;
  }
}
</style>
