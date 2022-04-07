<template>
  <div class="wrapper">
    <Icon
      v-if="panelHistory.length > 1"
      @click.native="prev"
      icon="arrow-left"
      class="prev"
    ></Icon>
    <component :is="currentPanel" :data="data" @next="nextPressed"></component>
  </div>
</template>

<script>
import InfoPanel from '~/components/Navigation/Panels/1-Info.vue'
import RoutePanel from '~/components/Navigation/Panels/2-Route.vue'
import DetailPanel from '~/components/Navigation/Panels/3-Detail.vue'
import StationMapPanel from '~/components/Navigation/Panels/4-StationMap.vue'

export default {
  name: 'NavigatoinPage',
  layout: 'map',
  data() {
    return {
      currentPanel: InfoPanel,

      data: {
        fromLocation: '',
        toLocation: '',
        leaveTime: new Date(),
      },

      panelHistory: [InfoPanel],
    }
  },
  methods: {
    nextPressed(event) {
      if (event == 'getRoute') {
        this.panelHistory.push(RoutePanel)
        this.currentPanel = RoutePanel
      }
      if (event == 'getDetail') {
        this.panelHistory.push(DetailPanel)
        this.currentPanel = DetailPanel
      }
      if (event == 'getStationMap') {
        this.panelHistory.push(StationMapPanel)
        this.currentPanel = StationMapPanel
      }
    },
    prev() {
      if (this.panelHistory.length > 1) {
        this.panelHistory.pop()
        this.currentPanel = this.panelHistory[this.panelHistory.length - 1]
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-sizing: border-box;
}
.prev {
  position: fixed;
  top: 3rem;
  left: 1rem;

  font-size: 3rem;
  color: #17e68e;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
</style>
