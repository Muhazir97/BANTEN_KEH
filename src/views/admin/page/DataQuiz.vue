<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-30 md-xsmall-size-30 md-size-30">
                <h4 class="title" style="margin-left: 40px;">Data Quiz</h4>
              </div>
              <div class="md-layout-item md-medium-size-40 md-xsmall-size-40 md-size-40">
                <md-field class="text-white">
                  <label><span style="color: white;">Search</span></label>
                  <md-input v-model="search" style="padding-top: 10%" v-on:keyup="filter"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-medium-size-25 md-xsmall-size-25 md-size-25 text-right">
                <md-button class="md-raised md-default md-sm" @click="create()">Add New</md-button>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <md-table class="scroll">
              <md-table-row style="background-color:  #F0F8FF">
                <md-table-head>Soal</md-table-head>
                <md-table-head>Jawaban</md-table-head>
                <md-table-head>Pilihan A</md-table-head>
                <md-table-head>Pilihan B</md-table-head>
                <md-table-head>Pilihan C</md-table-head>
                <md-table-head>Pilihan D</md-table-head>
                <md-table-head>Image</md-table-head>
                <md-table-head>Created By</md-table-head>
                <md-table-head>Created At</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>

              <md-table-row v-for="(row, i) in table.data" :key="i">
                <md-table-cell>{{row.soal}}</md-table-cell>
                <md-table-cell>{{row.jawaban}}</md-table-cell>
                <md-table-cell>{{row.pil_a}}</md-table-cell>
                <md-table-cell>{{row.pil_b}}</md-table-cell>
                <md-table-cell>{{row.pil_c}}</md-table-cell>
                <md-table-cell>{{row.pil_d}}</md-table-cell>
                <md-table-cell><a :href="storageUrl+'image/'+row.image" target="_BLANK">{{row.image}}</a></md-table-cell>
                <md-table-cell>{{row.created_by}}</md-table-cell>
                <md-table-cell>{{row.created_at}}</md-table-cell>
                <md-table-cell>
                  <drop-down direction="down">
                    <md-button
                      slot="title"
                      class="md-button md-button-link md-simple "
                      data-toggle="dropdown"
                    >
                      <i class="material-icons">more_vert</i>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li style="margin: 20px;">
                          <span style="cursor: pointer;" @click="edit(row.id)"><p>Edit</p></span>
                      </li>
                      <li style="margin: 20px;">
                          <span style="cursor: pointer;" @click="remove(row.id)"><p>Delete</p></span>
                      </li>
                    </ul>
                  </drop-down>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <!-- MODAL ADD -->
    <md-dialog :md-active.sync="showDialog" class="md-lg">
      <md-dialog-title class="size-sm">{{ formTitle }}</md-dialog-title>
      <div class="modal"> 
        <md-field>
          <label>Soal <span class="text-danger">*</span></label>
          <md-input v-model="dataQuiz.soal" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Jawaban <span class="text-danger">*</span></label>
          <md-input v-model="dataQuiz.jawaban" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Pilihan A <span class="text-danger">*</span></label>
          <md-input v-model="dataQuiz.pil_a" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Pilihan B <span class="text-danger">*</span></label>
          <md-input v-model="dataQuiz.pil_b" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Pilihan C <span class="text-danger">*</span></label>
          <md-input v-model="dataQuiz.pil_c" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Pilihan D <span class="text-danger">*</span></label>
          <md-input v-model="dataQuiz.pil_d" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Image</label>
          <md-file @change="filesChange" md-change="FileList" style="padding-top: 5%"/>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary md-sm" @click="showDialog = false" style="margin-left: 300px;">Close</md-button>
        <md-button class="md-primary md-sm" @click="save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Api from '@/helpers/api';
  import dataQuiz from '@/services/dataQuiz.service.js';
  import config from '@/configs/config';
  var moment = require('moment');

export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      table: {
        data: []
      },
      loadTimeout: null,
      showDialog: false,
      formTitle: '',
      dataQuiz: {},
      search: '',
      storageUrl : config.storageUrl,
    };
  },
  mounted(){
    this.get();
  },
  methods: {
    get(){
      let context = this;               
      Api(context, dataQuiz.index({search: this.search})).onSuccess(function(response) {    
          context.table.data = response.data.data.data.data;          
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.table.data = [];
              context.notifyVue(error.response.data.message, 'top', 'right', 'danger')
          }
      })
      .call()
    },
    filter() {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = setTimeout(() => {
          this.get()
      }, 100);
    },
    create() {
        this.showDialog = true
        this.formTitle = 'Add Data';
        this.dataQuiz = {};
    }, 
    edit(id) {
      let context = this;               
      Api(context, dataQuiz.show(id)).onSuccess(function(response) {
          context.dataQuiz   = response.data.data;
          context.showDialog = true;
          context.formTitle  = 'Edit Data';                        
      })
      .call()        
    },
    filesChange(e) {
      this.dataQuiz.image = e.target.files[0];
    },
    save(){
      let api = null;
      let context = this;
      let formData = new FormData(); 

      if (this.dataQuiz.soal != undefined && this.dataQuiz.jawaban != undefined && this.dataQuiz.pil_a != undefined && this.dataQuiz.pil_b != undefined && this.dataQuiz.pil_c != undefined && this.dataQuiz.pil_d != undefined) {
        formData.append('soal', this.dataQuiz.soal);
        formData.append('jawaban', this.dataQuiz.jawaban);
        formData.append('pil_a', this.dataQuiz.pil_a);
        formData.append('pil_b', this.dataQuiz.pil_b);
        formData.append('pil_c', this.dataQuiz.pil_c);
        formData.append('pil_d', this.dataQuiz.pil_d);
        formData.append('image', this.dataQuiz.image);
      }else{
        alert('Field Berbintang Merah Wajib Di Isi')
      }

      if (this.formTitle == 'Add Data') {
          api = Api(context, dataQuiz.create(formData));
      } else {
          api = Api(context, dataQuiz.update(this.dataQuiz.id, formData));
      }
      api.onSuccess(function(response) {
          context.get();
          context.showDialog = false;
          context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
      }).onError(function(error) {                    
          context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
      }).onFinish(function() {
      })
      .call();
    },
    remove(id) {
      var r = confirm("Anda yakin ingin menghapus data ini ?");
      if (r == true) {
        let context = this;

        Api(context, dataQuiz.delete(id)).onSuccess(function(response) {
            context.get();
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).call();
      }
    },
    notifyVue(message, verticalAlign, horizontalAlign, type) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type
      });
    }
  }
};
</script>

<style scoped>
.modal{
  height: 300px;
  margin-top: -20px;
  padding:20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.scroll{
  height: 500px;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
