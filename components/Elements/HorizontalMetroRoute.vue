<template>
  <div class="route" v-if="displayElements">
    <div
      v-for="(element, index) in displayElements"
      :key="index"
      :class="element.type"
    >
      <MetroStation
        v-if="element.type == 'station'"
        :color="element.station.color"
        :code="element.station.code"
        :exit="element.station.exit"
      ></MetroStation>
      <div
        class="lineBackground"
        :style="{
          background: element.color,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Array,
    },
  },
  computed: {
    displayElements() {
      let elements = []
      let lastStation = null
      for (let station of this.route) {
        if (lastStation != null) {
          elements.push({
            type: 'line',
            color: lastStation.color,
          })
          elements.push({
            type: 'line',
            color: station.color,
          })
        }
        elements.push({
          type: 'station',
          station: station,
        })
        lastStation = station
      }
      return elements
    },
  },
}
</script>

<style scoped>
.route {
  display: flex;
  flex-direction: row;
}

.line {
  flex: 1;
  transform: translateY(1rem);
}
.lineBackground {
  width: 100%;
  height: 8px;
  transform: scale(1.02);
}
</style>
