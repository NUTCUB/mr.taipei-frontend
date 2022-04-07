<template>
  <div>
    <div style="height: 100vh">
      <client-only>
        <l-map :zoom="15" :center="[position.latitude, position.longitude]">
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          ></l-tile-layer>
          <l-marker
            :lat-lng="[position.latitude, position.longitude]"
          ></l-marker>
        </l-map>
      </client-only>
    </div>
    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: {
        latitude: 25.0487269,
        longitude: 121.5181263,
      },
    }
  },
  async mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position.latitude = position.coords.latitude
        this.position.longitude = position.coords.longitude
      })
    } else {
      console.warn('Brower does not suppot gelocation API.')
    }
  },
}
</script>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;

  z-index: 1000;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
