<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-30 md-xsmall-size-30 md-size-30">
                <h4 class="title" style="margin-left: 40px;">Data Content</h4>
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
                <md-table-head>Judul Content</md-table-head>
                <md-table-head>Deskripsi Singkat</md-table-head>
                <md-table-head>Image Header</md-table-head>
                <md-table-head>Counter Visit</md-table-head>
                <md-table-head>Created By</md-table-head>
                <md-table-head>Created At</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>

              <md-table-row v-for="(row, i) in table.data" :key="i">
                <md-table-cell>{{row.judul_content}}</md-table-cell>
                <md-table-cell>{{row.deskripsi_singkat.substring(0,15)+"..."}}</md-table-cell>
                <md-table-cell><a :href="storageUrl+'image_content/'+row.image_content" target="_BLANK">{{row.image_content}}</a></md-table-cell>
                <md-table-cell>{{row.counter_visit}}</md-table-cell>
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
                      <li style="margin: 20px;">
                          <span style="cursor: pointer;" @click="detail(row.id)"><p>Detail Content</p></span>
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
          <label>Judul Content <span class="text-danger">*</span></label>
          <md-input v-model="content.judul_content" style="padding-top: 10%"></md-input>
        </md-field>
        <md-field>
          <label for="Category">Category <span class="text-danger">*</span></label>
          <md-select v-model="content.category_content" name="category" id="category" multiple style="padding-top: 5%">
            <md-option value="Serang">Serang</md-option>
            <md-option value="Kota Serang">Kota Serang</md-option>
            <md-option value="Kota Cilegon">Kota Cilegon</md-option>
            <md-option value="Tanggerang">Tanggerang</md-option>
            <md-option value="Kota Tanggerang">Kota Tanggerang</md-option>
            <md-option value="Kota Tanggerang Selatan">Kota Tanggerang Selatan</md-option>
            <md-option value="Pandeglang">Pandeglang</md-option>
            <md-option value="Lebak">Lebak</md-option>
            <md-option value="Budaya">Budaya</md-option>
            <md-option value="Kuliner">Kuliner</md-option>
            <md-option value="Sejarah">Sejarah</md-option>
            <md-option value="Wisata">Wisata</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Image Header <span class="text-danger">*</span></label>
          <md-file @change="filesChange" md-change="FileList" style="padding-top: 5%"/>
        </md-field>
        <md-field>
          <label>Deskripsi Singkat <span class="text-danger">*</span></label>
          <md-input v-model="content.deskripsi_singkat" style="padding-top: 10%"></md-input>
        </md-field>
        <label style="margin-top: 50px;">Deskripsi<span class="text-danger">*</span></label>
        <md-field>
          <ckeditor :editor="editor" v-model="content.description_content" :config="editorConfig"></ckeditor>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary md-sm" @click="showDialog = false" style="margin-left: 500px;">Close</md-button>
        <md-button class="md-primary md-sm" @click="save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Api from '@/helpers/api';
  import content from '@/services/content.service';
  import config from '@/configs/config';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import MyUploadAdapter from "./MyUploadAdapter.js";
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
      editor: ClassicEditor,
      editorConfig: {
          table: {
              toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
          },
          extraPlugins: [this.onReady]
      },
      selected: [],
      table: {
        data: []
      },
      loadTimeout: null,
      showDialog: false,
      formTitle: '',
      content: {
        category_content: []
      },
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
      Api(context, content.index({search: this.search})).onSuccess(function(response) {    
          context.table.data = response.data.data.data.data;
      }).onError(function(error) {                    
          if (error.response.status == 404) {
              context.table.data = [];
              context.notifyVue(error.response.data.message, 'top', 'right', 'danger')
          }
      })
      .call()
    },
    onReady(editor) {
       // Customize upload picture plugin
      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    },
    filter() {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = setTimeout(() => {
          this.get()
      }, 100);
    },
    loadImage(image) {
      return config.storageUrl+'image_content/'+image;
    },
    create() {
        this.showDialog = true
        this.formTitle = 'Add Data';
        this.content = {};
    },
    edit(id) {
      let context = this;               
      Api(context, content.show(id)).onSuccess(function(response) {
          context.content                  = response.data.data.content;
          // context.content.category_content = response.data.data.category;
          context.showDialog = true;
          context.formTitle  = 'Edit Data';                        
      })
      .call()        
    },
    filesChange(e) {
      this.content.image_content = e.target.files[0];
    },
    save(){
      let api = null;
      let context = this;
      let formData = new FormData(); 

      if (this.content.judul_content != undefined && this.content.image_content != undefined && this.content.deskripsi_singkat != undefined && this.content.description_content != undefined) {
        formData.append('judul_content', this.content.judul_content);
        formData.append('deskripsi_singkat', this.content.deskripsi_singkat);
        formData.append('description_content', this.content.description_content);
        formData.append('image_content', this.content.image_content);
        for (var i = 0; i < this.content.category_content.length; i++) {
          formData.append('category_content[' + i + ']', this.content.category_content[i]);
        }
      }else{
        alert('Field Berbintang Merah Wajib Di Isi')
      }

      if (this.formTitle == 'Add Data') {
          api = Api(context, content.create(formData));
      } else {
          api = Api(context, content.update(this.content.id, formData));
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

        Api(context, content.delete(id)).onSuccess(function(response) {
            context.get();
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).call();
      }
    },
    detail(id){
      this.$router.push({path: '/detail-content/'+id});
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
  height: 1000px;
  margin-top: -20px;
  padding:20px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

<style>
.md-ripple > span {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    margin-left: 50px;
    margin-top: 30px;
    z-index: -1;
}

.scroll{
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>


