<template>
  <div>
    <!-- <div>
      <h2>Search and add a pin</h2>
      <GmapAutocomplete
        @place_changed='setPlace'
      />
      <button
        @click='addMarker'
      >
        Add
      </button>
    </div>
    <br> -->
    <GmapMap
      :center='center'
      :zoom='9'
      style='width:100%;  height: 400px;'
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: {},
      currentPlace: null,
      markers: [],
      places: [],
    }
  },
  mounted() {
  	this.geolocate();
    this.addMarker();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      // if (this.currentPlace) {
        const marker = {
          lat: -6.418797,
          lng: 106.062877,
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;

  //     }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: -6.418797,
          lng: 106.062877,
        };
      });
    },
  },
};
</script>