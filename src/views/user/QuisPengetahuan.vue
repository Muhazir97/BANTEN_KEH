<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          
          <div class="features box">
            <div class="md-layout">
              <div class="md-layout-item md-size-100 ml-auto md-medium-size-100 md-small-size-100 text-right">
                <md-button v-model="next_page.current_page" @click="nextPage()" class="md-info md-round">Lompati</md-button>
              </div>          
              <div class="md-layout-item md-size-100 ml-auto md-medium-size-100 md-small-size-100 text-center">
                <h3><b> {{soal.soal}} </b></h3>
              </div> 
              <div class="md-layout-item md-size-100 ml-auto md-medium-size-100 md-small-size-100 text-center">
                <img style="margin-bottom: 50px; margin-top: 30px;" :src="loadImage(soal.image)" width="400" class="rounded" v-if="soal.image"/> 
                <span v-else><br></span>        
              </div>
              <div class="md-layout-item md-size-100 ml-auto md-medium-size-100 md-small-size-100 text-center">
                <md-button @click="checkAnswer(soal.pil_a)" class="md-success md-round" style="margin-right: 10px">{{soal.pil_a}}</md-button>
                <md-button @click="checkAnswer(soal.pil_b)" class="md-success md-round" style="margin-right: 10px">{{soal.pil_b}}</md-button>
                <md-button @click="checkAnswer(soal.pil_c)" class="md-success md-round" style="margin-right: 10px">{{soal.pil_c}}</md-button>
                <md-button @click="checkAnswer(soal.pil_d)" class="md-success md-round" style="margin-right: 10px">{{soal.pil_d}}</md-button>
              </div>
            </div>
          </div>

          <!-- MODAL RESULT -->
          <md-dialog :md-active.sync="showDialog" class="md-lg" style="background-color: rgba(0, 0, 0, 0); box-shadow: none">
            <div >
              <div v-if="result == true" class="text-center">
                <img style="margin-bottom: 50px;" :src="imgTrue" width="400" class="rounded"/> 
                <h3 style="color: white; margin-top: -80px; text-shadow: 2px 2px 4px #000000;"><b> Selamat Jawaban Kamu Benar !!! </b></h3>
                <md-button style="margin-right: 10px" @click="showDialog = false" class="md-dark md-round">Kembali</md-button>
                <md-button @click="nextPage()" class="md-success md-round">Lanjutkan</md-button>
              </div>
              <div v-else-if="result == false" class="text-center">
                <img style="margin-bottom: -40px; margin-top: -20px" :src="imgFalse" width="400" class="rounded"/> 
                <span style="color: white; text-shadow: 2px 2px 4px #000000;">
                  <h3><b> Jawaban Kamu Salah !!!</b></h3>
                </span>
                <md-button style="margin-right: 10px" @click="showDialog = false" class="md-dark md-round">Kembali</md-button>
                <md-button @click="nextPage()" class="md-success md-round">Lompati</md-button>
              </div>
            </div>
          </md-dialog>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/configs/config';
  import axios from 'axios';

export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    imgTrue: {
      type: String,
      default: require("@/assets/img/Emot oke 2.gif")
    },
    imgFalse: {
      type: String,
      default: require("@/assets/img/Emot_no_2.gif")
    }
  },
  data() {
    return {
      loadTimeout: null,
      showDialog: false,
      result: '',
      soal: {},
      next_page: {
          current_page: 1,
          per_page: 1,
      },
    };
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
  methods: {
    get(){
      axios.get(config.apiUrl +"quiz?page="+this.next_page.current_page)
         .then(response => {
          console.log(response.data.data.data)
           this.soal = response.data.data.data.data[0]
           this.next_page = response.data.data.data
         })
         .catch(err => {
           // alert("Terjadi error server")
         })
    },
    checkAnswer(param){
      if (param == this.soal.jawaban) {
        this.showDialog = true
        this.result = true
      }else{
        this.showDialog = true
        this.result = false
      }
    },
    loadImage(image) {
      return config.storageUrl+'image/'+image;
    },
    nextPage() {
      this.showDialog = false
      this.next_page.current_page = this.next_page.current_page + 1
      clearTimeout(this.loadTimeout);
      this.loadTimeout = setTimeout(() => {
          this.get()
      }, 100);
    }
  }
};
</script>

<style scoped>

.section {
  padding: 0;
}

/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
   .box {
    margin-top: 50px; 
  }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
   .box {
      width: 100%;
      position: relative;
      overflow: hidden;
  }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
   .box {
      justify-content: center;
      margin-top: 90px; 
      margin-bottom: 50px;
  }
}
</style>
