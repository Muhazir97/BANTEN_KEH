<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          
          <!-- DETAIL CONTENT -->
          <div class="features box-translite">
            <div class="md-layout">
              <div class="md-layout-item md-size-50 ml-auto md-medium-size-50 md-small-size-100">
                <h4><b> {{ detailContent.judul_content }} </b></h4>
                <p>{{ detailContent.created_by +', '+ moment(detailContent.created_at).locale('id').format('LL') }}</p>
                <div>
                  <img :src="loadImage(detailContent.image_content)" alt="carousel1" width="100%" />
                </div>
                  <div style="margin-top: 20px;" v-html="detailContent.description_content" ></div>
              </div>

              <!-- CONTENT TERPOPULER -->
              <div class="md-layout-item md-size-30 mr-auto md-medium-size-30 md-small-hide">
                <h5><b> Content Terpopuler </b></h5>
                <div class="md-layout" v-for="(row, i) in contentTerpopuler" :key="i" style="margin-bottom: 10\px;">
                  <div class="md-layout-item md-size-10 mr-auto md-medium-size-10 md-small-hide">
                    <span style="font-weight: bold; color: grey;"> #{{ i+1 }} </span> 
                  </div>
                  <div class="md-layout-item">
                    <router-link :to="'/detail-content/'+row.id">
                      <span style="font-weight: bold; color: black;"> {{ row.judul_content }} </span>
                    </router-link>
                  </div>
                </div>
              </div>
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
  components: {
  },

  data() {
    return {
      carousel1: require("@/assets/img/oldbanten.png"),
      moment:moment,
      detailContent: {},
      contentTerpopuler: [],
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
        height: "300px"
      };
    },
  },
  mounted(){
    this.get();
  },
  watch: {
    $route() {
        this.get(this.$route.params.id)
    }
  },
  methods: {
    get(param){
      if (param == undefined) {
        var id = this.$route.params.id
      }else{
        var id = param
      }

      axios.get(config.apiUrl +"content/detail-content/"+id )
        .then(response => {
          this.detailContent     = response.data.data.data
          this.contentTerpopuler = response.data.data.content_terpopuler
          this.counterVisit(id);
      })
      .catch(err => {
         // alert("Terjadi error server")
      })
    },
    loadImage(image) {
      return config.storageUrl+'image_content/'+image;
    },
    counterVisit(id){
      axios.get(config.apiUrl +"content/counter-visit/"+id )
        .then(response => {
          // alert("Success")
      })
      .catch(err => {
         // alert("Terjadi error server")
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
   .box-translite {
    margin-top: 50px; 
  }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
   .box-translite {
      width: 100%;
      position: relative;
      overflow: hidden;
  }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
   .box-translite {
      justify-content: center;
      margin-top: 50px; 
      margin-bottom: 50px;
  }
}
</style>
