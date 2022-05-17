 ,<template>
  <div class="elements" v-if="displayElements">
    <div
      v-for="(element, index) in displayElements"
      :key="index"
      :class="element.type"
    >
      <div class="icon">
        <MetroStation
          v-if="element.type == 'station' && element.station.transit != null"
          :color="element.station.transit.line.color"
          :code="codes[element.station.transit.departure_stop.name]"
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
      <div
        class="content"
        v-if="element.type == 'station' && element.station.transit != null"
      >
        <div class="title font-size-regular color-text">
          <!-- {{ element.station.title }} -->
          捷運{{ element.station.transit.departure_stop.name }}
          <Icon v-if="element.station.notice" icon="bell-ring"></Icon>
        </div>
        <div class="tips font-size-small color-text">
          <!-- {{ element.station.tips }} -->
          往{{ element.station.transit.headsign }}
          <br />
          <span v-if="element.station.transit.arrival_stop.name == '大直站'"> 
            {{ element.station.transit.arrival_stop.name }}下車</span>

          <span style="color: #17e68e"> 出口2</span>
        </div>
      </div>
      <div
        class="datetime font-size-small color-text"
        v-if="element.type == 'station' && element.station.transit != null"
      >
        <!-- {{ element.station.datetime }} -->
        {{ element.station.duration.text }}
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
  data() {
    return {
      codes: {
        東門站: 'R07',
        大安站: 'BR09',
      },
    }
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
