<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          
          <div class="features box-translite">
            <div class="md-layout">
              <div class="md-layout-item md-size-50 ml-auto md-medium-size-50 md-small-size-50">
                <md-field>
                  <label for="movies">Bahasa</label>
                  <md-select name="bahasa" id="bahasa" v-model="params.search_input">
                    <md-option value="indo" @click.native="get()">Indonesia</md-option>
                    <md-option value="jawa" @click.native="get()">Jaseng (Babasan)</md-option>
                    <md-option value="sunda" @click.native="get()">Sunda (Banten)</md-option>
                  </md-select>
                </md-field>
                
              </div>
              <div class="md-layout-item md-size-50 mr-auto md-medium-size-50 md-small-size-50">
                <md-field>
                  <label for="movies">Bahasa</label>
                  <md-select name="bahasa" id="bahasa" v-model="params.search_output" @change="get($event)">
                    <md-option value="indo" @click.native="get()">Indonesia</md-option>
                    <md-option value="jawa" @click.native="get()">Jaseng (Babasan)</md-option>
                    <md-option value="sunda" @click.native="get()">Sunda (Banten)</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>

            <div class="md-layout" style="margin-top: 50px">
              <div class="md-layout-item md-size-100 ml-auto md-medium-size-100 md-small-size-100">
                <md-field>
                  <label>Masukkan Kata Kunci</label>
                  <md-textarea v-model="params.keyword" type="text" id="textarea" v-on:keyup="get()"></md-textarea>
                </md-field>
                <md-icon @click.native="speechToText()" class="mic-translite">mic</md-icon>
                <md-icon @click.native="textToSpechKeyword()" class="volume-translite">volume_up</md-icon>
              </div>
              <div class="md-layout-item md-size-5 ml-auto md-medium-size-5 md-small-size-50">
              </div>
            </div>
            <div class="md-layout" style="margin-top: 50px">
              <div class="md-layout-item md-size-50 ml-auto md-medium-size-50 md-small-size-100">
                <h3 style="margin-left: 20px;"><b><em>{{ result }}</em></b></h3>
                <h4>Pemenggalan : <b><em>{{ pemenggalan }}</em></b></h4>
                <h4>Jenis Kata : <b><em>{{ jenis_kata }}</em></b></h4>
                <h4>Contoh Kalimat Input : <b><em>{{ kalimat_input }}</em></b></h4>
                <h4>Contoh Kalimat Output : <b><em>{{ kalimat_output }}</em></b></h4>
                <md-icon @click.native="textToSpech()" class="speker-translite">volume_up</md-icon>
              </div>
              <div class="md-layout-item md-size-50 ml-auto md-medium-size-50 md-small-size-100">
                <template v-if="image">
                  <img style="margin-bottom: 50px; margin-top: 30px;" :src="loadImage(image)" class="rounded"/>
                </template>
                <template v-else>
                  
                </template>
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

export default {
  components: {

  },

  data() {
    return {
      result: '',
      pemenggalan: '',
      jenis_kata: '',
      kalimat_input: '',
      kalimat_output: '',
      image: '',
      params: {
        search_input: 'indo',
        search_output: 'jawa',
        keyword: ''
      }
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    }
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
      let params = this.params
      axios.get(config.apiUrl +"kamus/search-keyword", {params} )
         .then(response => {
           this.result         = response.data.data[0].result
           this.pemenggalan    = response.data.data[0].pemenggalan
           this.jenis_kata     = response.data.data[0].jenis_kata
           this.kalimat_input  = response.data.data[0].kalimat_input
           this.kalimat_output = response.data.data[0].kalimat_output
           this.image          = response.data.data[0].image
         })
         .catch(err => {
           // alert("Terjadi error server")
         })
    },
    textToSpechKeyword() {
      var msg = new SpeechSynthesisUtterance(this.params.keyword);
      msg.lang = 'id-ID';
      msg.rate  = 1;
      window.speechSynthesis.speak(msg);
    },
    textToSpech() {
      var msg = new SpeechSynthesisUtterance(this.result+'.'+'Pemenggalan nya.'+this.pemenggalan+'jenis kata nya.'+this.jenis_kata+'kalimat inputnya.'+this.kalimat_input+'kalimat output nya.'+this.kalimat_output);
      msg.lang = 'id-ID';
      msg.rate  = 1;
      window.speechSynthesis.speak(msg);
    },
    speechToText() {
      var context = this;
      var recognizing;
      var recognition = new window.webkitSpeechRecognition;
      recognition.continuous = true;

      recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            context.params.keyword = event.results[i][0].transcript;
            context.get();
            context.textToSpechKeyword();
            console.log(context.params.keyword);
          }
        }
      }

      if (recognizing) {
        recognition.stop();
      } else {
        alert('Silahkan masukan kata...')
        recognition.start();
        recognizing = true;
      }
    },
    loadImage(image) {
      return config.storageUrl+'image/'+image;
    },
  }
};
</script>

<style  scoped>
.section {
  padding: 0;
}



.mic-translite {
  cursor: pointer;
  padding-left: 20px;
  padding-right: 25px;
  margin-top: 10px;
}

.volume-translite {
  cursor: pointer;
  padding-left: 30px;
  margin-top: 10px;
}

.speker-translite {
  cursor: pointer; 
  float: left;
  padding-left: 25px;
  margin-top: 10px;
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
      margin-top: 90px; 
      margin-bottom: 50px;
  }
}
</style>
