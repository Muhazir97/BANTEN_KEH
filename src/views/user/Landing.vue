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
              <h2 class="title text-center">Banten</h2>
              <h5 class="description">
                Banten adalah sebuah provinsi, wilayah paling barat di Pulau Jawa, Indonesia. Pusat pemerintahannya berada di Kota Serang. Wilayah Banten terletak di antara 5º7'50"-7º1'11" Lintang Selatan dan 105º1'11"-106º7'12" Bujur Timur, berdasarkan Undang-Undang Republik Indonesia Nomor 23 Tahun 2000 luas wilayah Banten adalah 9.160,70 km². Provinsi Banten terdiri dari 4 kota, 4 kabupaten, 154 kecamatan, 262 kelurahan, dan 1.273 desa.
              </h5>
            </div>
          </div>

          <!-- CONTENT -->
          <div style="margin-top: 50px;">
            <div v-for="(row, index) in table.data" :key="index">
              <div class="md-layout">
                <div class="md-layout-item md-size-50 md-xsmall-size-100">
                  <span class="badge badge-info" v-for="(badge, i) in row.content_category" :key="i" @click="searchByCategory(badge.category_content)" style="cursor: pointer;">
                    {{ badge.category_content }}
                  </span>
                  <router-link :to="'/detail-content/'+row.id">
                    <h4><b style="color: black">{{ row.judul_content }}</b></h4>
                  </router-link>
                  <h5 v-html="row.deskripsi_singkat.substring(0,100)+'...'"></h5>
                  <p>By {{ row.created_by +', '+ moment(row.created_at).locale('id').format('LL') }}</p>
                </div>
                <div class="md-layout-item md-size-50 md-xsmall-size-100">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <router-link :to="'/detail-content/'+row.id"><img :src="loadImage(row.image_content)" class="rounded"/></router-link>
                  </div>
                </div>
              </div>
              <hr style="margin-top: 20px; margin-bottom: 20px;">
            </div>
          </div>
          <!-- END CONTENT -->
          <div class="md-layout">
            <div class="md-layout-item md-size-100 md-xsmall-size-100 text-center">
                <md-button @click="params.plus_page = params.length + 5, get()" class="md-success md-round">Selanjutnya</md-button>
            </div>
          </div>

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
      moment:moment,
      carousel1: require("@/assets/img/oldbanten.png"),
      carousel2: require("@/assets/img/badak2.jpg"),
      carousel3: require("@/assets/img/nature-3.jpg"),
      table: {
        data: []
      },
      search: {
        category: '',
      },
      content: {},
      params: {
        plus_page: '',
        length: ''
      }
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
    this.params.plus_page = 5
    this.get();
  },
  methods: {
    searchByCategory(category) {
        this.search.category = category;
        this.$router.push({ name: 'List Content', query: this.search });
    },
    get(){
      let params = this.params 
      axios.get(config.apiUrl +"content/branda-content", {params})
      .then(response => {
       this.table.data    = response.data.data
       this.params.length = response.data.data.length
      })
      .catch(err => {
       // alert("Terjadi error server")
      })
    },
    loadImage(image) {
      return config.storageUrl+'image_content/'+image;
    },
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
      height: 600px;
      position: relative;
      overflow: hidden;
  }
}
</style>
