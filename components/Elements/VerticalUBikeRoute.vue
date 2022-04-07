<template>
  <div class="elements" v-if="displayElements">
    <div
      v-for="(element, index) in displayElements"
      :key="index"
      :class="element.type"
    >
      <div class="icon">
        <Icon v-if="element.type == 'station'" icon="bike"></Icon>
        <div v-if="element.type == 'line'" class="lineBackground"></div>
      </div>
      <div class="content" v-if="element.type == 'station'">
        <div class="version font-size-regular color-focus">
          {{ element.station.version }}
        </div>
        <div class="name font-size-regular color-text">
          {{ element.station.name }}
        </div>
      </div>
      <div
        class="distance font-size-mini color-text"
        v-if="element.type == 'station' && element.station.distance"
      >
        {{ element.station.distance }}
      </div>
      <div
        class="quantity font-size-mini color-text"
        v-if="element.type == 'station' && element.station.quantity"
      >
        可租 <span class="color-focus"> {{ element.station.quantity }} </span>
      </div>
      <div
        class="vacancy font-size-mini color-text"
        v-if="element.type == 'station' && element.station.vacancy"
      >
        空位 {{ element.station.vacancy }}
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

.mdi-bike {
  color: yellow;
  font-size: 2rem;
}

.line {
  flex: 1;
  transform: translateX(0.8rem);
}
.lineBackground {
  min-height: 8px;
  width: 4px;
  background: yellow;
}

.station {
  display: flex;
}

.content {
  padding-left: 1rem;
  height: auto;
  display: flex;
  flex: 1;
  align-items: center;
}
.version {
  padding-right: 0.6rem;
}
.distance,
.quantity,
.vacancy {
  display: flex;
  align-items: center;
  padding-left: 0.4rem;
}
</style>
