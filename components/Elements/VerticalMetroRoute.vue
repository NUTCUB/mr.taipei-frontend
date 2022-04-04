<template>
  <div class="elements" v-if="displayElements">
    <div
      v-for="(element, index) in displayElements"
      :key="index"
      :class="element.type"
    >
      <div class="icon">
        <MetroStation
          v-if="element.type == 'station'"
          :color="element.station.color"
          :code="element.station.code"
          exit=""
        ></MetroStation>
        <div
          v-if="element.type == 'line'"
          class="lineBackground"
          :style="{
            background: element.color,
          }"
        ></div>
      </div>
      <div class="content" v-if="element.type == 'station'">
        <div class="title font-size-regular color-text">
          {{ element.station.title }}
          <span v-if="element.station.notice" class="mdi mdi-bell-ring"></span>
        </div>
        <div class="tips font-size-small color-text">
          {{ element.station.tips }}
        </div>
      </div>
      <div
        class="datetime font-size-small color-text"
        v-if="element.type == 'station'"
      >
        {{ element.station.datetime }}
      </div>
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
      for (let [index, station] of this.route.entries()) {
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
          index: index,
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
  flex-direction: column;
}

.icon {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
}

.line {
  flex: 1;
  transform: translateX(0.8rem);
}
.lineBackground {
  min-height: 8px;
  width: 4px;
}

.station {
  display: flex;
}

.content {
  padding: 0rem 1rem;
  flex: 1;
}
</style>
