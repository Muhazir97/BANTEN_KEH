<template>
  <div class="content">
    <div class="md-layout">

      <!-- COUNT DATA KAMUS -->
      <div
        class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-30"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>library_books</md-icon>
          </template>
          <template slot="content">
            <p class="category">Jumlah Data Kamus</p>
            <h3 class="title">
              {{ card_kamus.total_data }}
              <small></small>
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last New Data {{ moment(card_kamus.last_update_data).locale('id').format('LL') }}
            </div>
          </template>
        </stats-card>
      </div>

      <!-- COUNT DATA CONTENT -->
      <div
        class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-30"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">Jumlah Data Content</p>
            <h3 class="title">{{ card_content.total_data }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Last New Data {{ moment(card_content.last_update_data).locale('id').format('LL') }}
            </div>
          </template>
        </stats-card>
      </div>

      <!-- COUNT DATA QUIZ -->
      <div
        class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-30"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>quiz</md-icon>
          </template>

          <template slot="content">
            <p class="category">Jumlah Data Quiz</p>
            <h3 class="title">{{ card_quiz.total_data }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Last New Data {{ moment(card_quiz.last_update_data).locale('id').format('LL') }}
            </div>
          </template>
        </stats-card>
      </div>

      <!-- TABLE RANKING -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <h4 class="title">Content Terpopuler</h4>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <md-table class="scroll">
              <md-table-row style="background-color:  #F0F8FF">
                <md-table-head>Rank</md-table-head>
                <md-table-head>Judul Content</md-table-head>
                <md-table-head>Description Content</md-table-head>
                <md-table-head>Image Header</md-table-head>
                <md-table-head>Counter Visit</md-table-head>
                <md-table-head>Created By</md-table-head>
                <md-table-head>Created At</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>

              <md-table-row v-for="(row, i) in table.data" :key="i">
                <md-table-cell><h3> #{{ i+1 }} </h3></md-table-cell>
                <md-table-cell>{{row.judul_content}}</md-table-cell>
                <md-table-cell>{{row.deskripsi_singkat.substring(0,15)+"..."}}</md-table-cell>
                <md-table-cell><a :href="storageUrl+'image_content/'+row.image_content" target="_BLANK">{{row.image_content}}</a></md-table-cell>
                <md-table-cell>{{row.counter_visit}}</md-table-cell>
                <md-table-cell>{{row.created_by}}</md-table-cell>
                <md-table-cell>{{ moment(row.created_at).locale('id').format('LLL') }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import StatsCard from "@/components/cards/StatsCard";
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import dashboard from '@/services/dashboard.service';
  var moment = require('moment');

export default {
  name: "simple-table",
  components: {
    StatsCard,
  },
  data() {
    return {
      moment:moment,
      table: {
        data: []
      },
      card_kamus: {
        total_data: '',
        last_update_data: ''
      },
      card_content: {
        total_data: '',
        last_update_data: ''
      },
      card_quiz: {
        total_data: '',
        last_update_data: ''
      },
      contentTerpopuler: [],
      storageUrl : config.storageUrl,
    };
  },
  mounted(){
    this.get();
    this.cardKamus();
    this.cardContent();
    this.cardQuiz();
  },
  methods: {
    get(){
      let context = this;               
      Api(context, dashboard.contentPopuler()).onSuccess(function(response) {    
          context.table.data = response.data.data;   
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.table.data = [];
          }
      })
      .call()
    },
    cardKamus(){
      let context = this;               
      Api(context, dashboard.cardKamus()).onSuccess(function(response) {    
          context.card_kamus = response.data.data;      
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.card_kamus = [];
          }
      })
      .call()
    },
    cardContent(){
      let context = this;               
      Api(context, dashboard.cardContent()).onSuccess(function(response) {    
          context.card_content = response.data.data;      
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.card_content = [];
          }
      })
      .call()
    },
    cardQuiz(){
      let context = this;               
      Api(context, dashboard.cardQuiz()).onSuccess(function(response) {    
          context.card_quiz = response.data.data;      
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.card_quiz = [];
          }
      })
      .call()
    },
  }
};
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/material-dashboard.scss";
</style>
