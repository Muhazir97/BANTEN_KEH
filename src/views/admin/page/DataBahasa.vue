<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-30 md-xsmall-size-30 md-size-30">
                <h4 class="title" style="margin-left: 40px;">Data Kamus</h4>
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
                <md-table-head>B. Indonesia</md-table-head>
                <md-table-head>B. Jawa</md-table-head>
                <md-table-head>B. Sunda</md-table-head>
                <md-table-head>Pemenggalan Indonesia</md-table-head>
                <md-table-head>Pemenggalan Jawa</md-table-head>
                <md-table-head>Pemenggalan Sunda</md-table-head>
                <md-table-head>Jenis Kata</md-table-head>
                <md-table-head>Kalimat Indonesia</md-table-head>
                <md-table-head>Kalimat Jawa</md-table-head>
                <md-table-head>Kalimat Sunda</md-table-head>
                <md-table-head>Image</md-table-head>
                <md-table-head>Created By</md-table-head>
                <md-table-head>Created At</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>

              <md-table-row v-for="(row, i) in table.data" :key="i">
                <md-table-cell>{{row.indo}}</md-table-cell>
                <md-table-cell>{{row.jawa}}</md-table-cell>
                <md-table-cell>{{row.sunda}}</md-table-cell>
                <md-table-cell>{{row.pemenggalan_indo}}</md-table-cell>
                <md-table-cell>{{row.pemenggalan_jawa}}</md-table-cell>
                <md-table-cell>{{row.pemenggalan_sunda}}</md-table-cell>
                <md-table-cell>{{row.jenis_kata}}</md-table-cell>
                <md-table-cell>{{row.kalimat_indo}}</md-table-cell>
                <md-table-cell>{{row.kalimat_jawa}}</md-table-cell>
                <md-table-cell>{{row.kalimat_sunda}}</md-table-cell>
                <md-table-cell><a :href="storageUrl+'image/'+row.image" target="_BLANK">{{row.image}}</a></md-table-cell>
                <md-table-cell>{{row.created_by}}</md-table-cell>
                <md-table-cell>{{row.created_at}}</md-table-cell>
                <md-table-cell>
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-simple "
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
          <label>B. Indonesia <span class="text-danger">*</span></label>
          <md-input v-model="kamus.indo"></md-input>
        </md-field>
        <md-field>
          <label>B. Jawa <span class="text-danger">*</span></label>
          <md-input v-model="kamus.jawa"></md-input>
        </md-field>
        <md-field>
          <label>B. Sunda <span class="text-danger">*</span></label>
          <md-input v-model="kamus.sunda"></md-input>
        </md-field>
        <md-field>
          <label>Jenis Kata</label>
          <md-input v-model="kamus.jenis_kata"></md-input>
        </md-field>
        <md-field>
          <label>Pemenggalan Indo</label>
          <md-input v-model="kamus.pemenggalan_indo"></md-input>
        </md-field>
        <md-field>
          <label>Pemenggalan Jawa</label>
          <md-input v-model="kamus.pemenggalan_jawa"></md-input>
        </md-field>
        <md-field>
          <label>Pemenggalan Sunda</label>
          <md-input v-model="kamus.pemenggalan_sunda"></md-input>
        </md-field>
        <md-field>
          <label>Kalimat Indo</label>
          <md-input v-model="kamus.kalimat_indo"></md-input>
        </md-field>
        <md-field>
          <label>Kalimat Jawa</label>
          <md-input v-model="kamus.kalimat_jawa"></md-input>
        </md-field>
        <md-field>
          <label>Kalimat Sunda</label>
          <md-input v-model="kamus.kalimat_sunda"></md-input>
        </md-field>
        <md-field>
          <label>Image</label>
          <md-file @change="filesChange" md-change="FileList"/>
        </md-field>

      </div>
      <md-dialog-actions>
        <md-button class="md-primary md-sm" @click="showDialog = false" style="margin-left: 400px;">Close</md-button>
        <md-button class="md-primary md-sm" @click="save()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Api from '@/helpers/api';
  import kamus from '@/services/kamus.service';
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
      loadTimeout: null,
      showDialog: false,
      formTitle: '',
      kamus: {},
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
      Api(context, kamus.index({search: this.search})).onSuccess(function(response) {    
          context.table.data = response.data.data.data.data;          
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
        this.kamus = {};
    }, 
    edit(id) {
      let context = this;               
      Api(context, kamus.show(id)).onSuccess(function(response) {
          context.kamus      = response.data.data;
          context.showDialog = true;
          context.formTitle  = 'Edit Data';                        
      })
      .call()        
    },
    filesChange(e) {
      this.kamus.image = e.target.files[0];
    },
    save(){
      let api = null;
      let context = this;
      let formData = new FormData(); 

      if (this.kamus.indo != undefined && this.kamus.jawa != undefined && this.kamus.sunda != undefined) {
        formData.append('indo', this.kamus.indo);
        formData.append('jawa', this.kamus.jawa);
        formData.append('sunda', this.kamus.sunda);

        if (this.kamus.jenis_kata != undefined) {
          formData.append('jenis_kata', this.kamus.jenis_kata);
        }
        if (this.kamus.pemenggalan_indo != undefined) {
          formData.append('pemenggalan_indo', this.kamus.pemenggalan_indo);
        }
        if (this.kamus.pemenggalan_jawa != undefined) {
          formData.append('pemenggalan_jawa', this.kamus.pemenggalan_jawa);
        }
        if (this.kamus.pemenggalan_sunda != undefined) {
          formData.append('pemenggalan_sunda', this.kamus.pemenggalan_sunda);
        }
        if (this.kamus.kalimat_indo != undefined) {
          formData.append('kalimat_indo', this.kamus.kalimat_indo);
        }
        if (this.kamus.kalimat_jawa != undefined) {
          formData.append('kalimat_jawa', this.kamus.kalimat_jawa);
        }
        if (this.kamus.kalimat_sunda != undefined) {
          formData.append('kalimat_sunda', this.kamus.kalimat_sunda);
        }
        if (this.kamus.image != undefined) {
          formData.append('image', this.kamus.image);
        }
      }else{
        alert('Field Berbintang Merah Wajib Di Isi')
      }

      if (this.formTitle == 'Add Data') {
          api = Api(context, kamus.create(formData));
      } else {
          api = Api(context, kamus.update(this.kamus.id, formData));
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

        Api(context, kamus.delete(id)).onSuccess(function(response) {
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

<style scoped>
.modal{
  height: 500px;
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
