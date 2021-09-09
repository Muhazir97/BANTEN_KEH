<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-30 md-xsmall-size-30 md-size-30">
                <h4 class="title" style="margin-left: 40px;">Data Admin</h4>
              </div>
              <div class="md-layout-item md-medium-size-40 md-xsmall-size-40 md-size-40" v-if="role == 'Admin'">
                <md-field class="text-white">
                  <label><span style="color: white;">Search</span></label>
                  <md-input v-model="search" style="padding-top: 10%" v-on:keyup="filter"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-medium-size-25 md-xsmall-size-25 md-size-25 text-right">
                <md-button class="md-raised md-default md-sm" @click="create()" v-if="role == 'Admin'">Add New</md-button>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <md-table class="scroll">
              <md-table-row style="background-color:  #F0F8FF">
                <md-table-head>Username</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head>Password</md-table-head>
                <md-table-head>Role</md-table-head>
                <md-table-head>Image</md-table-head>
                <md-table-head>Created At</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>

              <md-table-row v-for="(row, i) in table.data" :key="i">
                <md-table-cell>{{row.username}}</md-table-cell>
                <md-table-cell>{{row.email}}</md-table-cell>
                <md-table-cell>PASSWORD IN BCRYPT</md-table-cell>
                <md-table-cell>{{row.role}}</md-table-cell>
                <md-table-cell><a :href="storageUrl+'image/'+row.image" target="_BLANK">{{row.image}}</a></md-table-cell>
                <md-table-cell>{{row.created_at}}</md-table-cell>
                <md-table-cell>
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-simple"
                        data-toggle="dropdown"
                        @click="clickBtRow(i)"
                      >
                        <i class="material-icons">more_vert</i>
                      </md-button>
                      <ul class="dropdown-menu dropdown-menu-right" :style="btRow == i ? 'position: relative' : null">
                        <li style="margin: 20px;">
                            <span style="cursor: pointer;" @click="edit(row.id)"><p>Edit</p></span>
                        </li>
                        <li style="margin: 20px;">
                            <span style="cursor: pointer;" @click="remove(row.id)"><p>Delete</p></span>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
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
          <label>User Name <span class="text-danger">*</span></label>
          <md-input v-model="dataAdmin.username" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Email <span class="text-danger">*</span></label>
          <md-input type="email" v-model="dataAdmin.email" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Password <span class="text-danger" v-if="formTitle != 'Edit Data'">*</span></label>
          <md-input type="password" v-model="dataAdmin.password" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label>Role <span class="text-danger">*</span></label>
          <md-select v-model="dataAdmin.role" name="role" id="role" md-dense style="padding-top: 4%">
            <md-option value="Admin">Admin</md-option>
            <md-option value="Creator">Creator</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Image</label>
          <md-file @change="filesChange" md-change="FileList" style="padding-top: 5%"/>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-default md-sm" @click="showDialog = false" style="margin-left: 300px;">Close</md-button>
        <md-button class="md-primary md-sm" @click="save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Api from '@/helpers/api';
  import dataAdmin from '@/services/dataAdmin.service';
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
      selected: [],
      table: {
        data: []
      },
      role: '',
      loadTimeout: null,
      showDialog: false,
      formTitle: '',
      dataAdmin: {},
      search: '',
      btRow: '',
      storageUrl : config.storageUrl,
    };
  },
  mounted(){
    this.get();
    this.btRow = -1;
  },
  methods: {
    get(){
      let context = this;               
      Api(context, dataAdmin.index({search: this.search})).onSuccess(function(response) {    
          context.table.data = response.data.data.data.data;  
          context.role       = response.data.data.role; 
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.table.data = [];
              context.notifyVue(error.response.data.message, 'top', 'right', 'danger')
          }
      })
      .call()
    },
    loadImage(image) {
      return config.storageUrl+'image_content/'+image;
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
        this.dataAdmin = {};
    }, 
    edit(id) {
      let context = this;               
      Api(context, dataAdmin.show(id)).onSuccess(function(response) {
          context.dataAdmin      = response.data.data;
          context.showDialog = true;
          context.formTitle  = 'Edit Data';                        
      })
      .call()        
    },
    filesChange(e) {
      this.dataAdmin.image = e.target.files[0];
    },
    save(){
      let api = null;
      let context = this;
      let formData = new FormData(); 

      if (this.dataAdmin.username != undefined && this.dataAdmin.email != undefined && this.dataAdmin.password != undefined) {
        formData.append('username', this.dataAdmin.username);
        formData.append('email', this.dataAdmin.email);
        formData.append('password', this.dataAdmin.password);
        formData.append('role', this.dataAdmin.role);
        formData.append('image', this.dataAdmin.image);
      }else{
        alert('Field Berbintang Merah Wajib Di Isi')
      }

      if (this.formTitle == 'Add Data') {
          api = Api(context, dataAdmin.create(formData));
      } else {
          api = Api(context, dataAdmin.update(this.dataAdmin.id, formData));
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

        Api(context, dataAdmin.delete(id)).onSuccess(function(response) {
            context.get();
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).call();
      }
    },
    clickBtRow(i){
      this.btRow = i;
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

<style lang="scss" scoped>

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
