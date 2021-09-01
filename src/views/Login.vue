<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h5 slot="title" class="card-title">Halo! Selamat Datang di Banten Keh! </h5>
              
              <p slot="description" class="description">.</p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>person</md-icon>
                <label>Username...</label>
                <md-input v-model="username" type="text" v-on:keyup.enter="login()"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password" v-on:keyup.enter="login()"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="login()">
                Login
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { LoginCard } from "@/components";
  import config from '@/configs/config';
  import axios from 'axios';

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      username: '',
      password: '',
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/kota/debus-banten.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
      // ...mapActions({
      //   authToken: 'auth/setToken',
      //   authAttemp: 'auth/attemp'  
      // }),
    login() {             
      if (this.username && this.password) {
        var formData = new FormData()
        formData.append('username',  this.username)
        formData.append('password', this.password)

        axios.post(config.apiUrl +"auth/login", formData)
        .then(response => {
          localStorage.setItem('token', response.data.access_token)                                        
          localStorage.setItem('authenticated', true)                                        
          this.$router.push('/dashboard')
        })
        .catch(err => {
         alert(err)
        })
      } else {
        alert('Error Username Password Required')
      }
    },
  }
};
</script>

<style scoped>
.md-field label {
     top: 8px; 
}
</style>
