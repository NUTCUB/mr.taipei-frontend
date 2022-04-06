<template>
  <div class="wrapper">
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
    }
  },
  methods: {
    nextPressed(event) {
      if(event =='getInfoPanel'){
         this.currentPanel = InfoPanel
      }
      if (event == 'getRoute') {
        this.currentPanel = RoutePanel
      }
      if (event == 'getDetail') {
        this.currentPanel = DetailPanel
      }
      if (event == 'getStationMap') {
        this.currentPanel = StationMapPanel
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
</style>
