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
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">Banten</h2>
              <h5 class="description">
                Banten adalah sebuah provinsi, wilayah paling barat di Pulau Jawa, Indonesia. Provinsi ini pernah menjadi bagian dari Provinsi Jawa Barat, daerah ini menjadi wilayah pemekaran sejak tahun 2000, dengan keputusan Undang-Undang Nomor 23 Tahun 2000. Pusat pemerintahannya berada di Kota Serang.
                Wilayah Banten terletak di antara 5º7'50"-7º1'11" Lintang Selatan dan 105º1'11"-106º7'12" Bujur Timur, berdasarkan Undang-Undang Republik Indonesia Nomor 23 Tahun 2000 luas wilayah Banten adalah 9.160,70 km². Provinsi Banten terdiri dari 4 kota, 4 kabupaten, 154 kecamatan, 262 kelurahan, dan 1.273 desa.
              </h5>
            </div>
          </div>

          <!-- KOTA -->
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kot_serang"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kota Serang</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kot_tangerang"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kota Tangerang</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kot_tangsel"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kota Tangerang Selatan</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kot_cilegon"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kota Cilegon</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- KABUPATEN -->
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kab_serang"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kabupaten Serang</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kab_tangerang"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kabupaten Tangerang</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kab_pandeglang"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kabupaten Pandeglang</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-25 md-small-size-100">
                <div class="info">
                  <div class="md-layout-item md-size-80 mx-auto">
                    <img
                      :src="kab_lebak"
                      alt="Thumbnail Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <h4 class="info-title">Kabupaten Lebak</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="section text-center">
        <div class="container">
          <h2 class="title">Here is our team</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="kab_lebak"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Gigi Hadid
                      <br />
                      <small class="card-description text-muted">Model</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="kot_serang"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Carla Hortensia
                      <br />
                      <small class="card-description text-muted"
                        >Designer</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-linkedin"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg3"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Kendall Jenner
                      <br />
                      <small class="card-description text-muted">Model</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Work with us</h2>
              <h4 class="text-center description">
                Divide details about your product or agency work into parts.
                Write a few lines about each one and contact us about any
                further collaboration. We will responde get back to you in a
                couple of hours.
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Name</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Email</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Your Message</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success">Send Message</md-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    kot_serang: {
      type: String,
      default: require("@/assets/img/kota/kot_angerang.png")
    },
    kot_tangerang: {
      type: String,
      default: require("@/assets/img/kota/kot_angerang.png")
    },
    kot_tangsel: {
      type: String,
      default: require("@/assets/img/kota/kot_tangsel.png")
    },
    kot_cilegon: {
      type: String,
      default: require("@/assets/img/kota/kot_cilegon.png")
    },
    kab_serang: {
      type: String,
      default: require("@/assets/img/kota/kab_serang.png")
    },
    kab_tangerang: {
      type: String,
      default: require("@/assets/img/kota/kab_serang.png")
    },
    kab_pandeglang: {
      type: String,
      default: require("@/assets/img/kota/Pandeglang.png")
    },
    kab_lebak: {
      type: String,
      default: require("@/assets/img/kota/Lebak.png")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      carousel1: require("@/assets/img/oldbanten.png"),
      carousel2: require("@/assets/img/badak2.jpg"),
      carousel3: require("@/assets/img/nature-3.jpg")
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
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
