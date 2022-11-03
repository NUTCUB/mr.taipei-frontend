<template>
  <div class="wrapper">
    <Panel>
      <div class="justify-content-space-between align-items-flex-end">
        <span class="font-size-huge color-focus"> 路線收藏 </span>
      </div>

      <div
        v-for="(route, index) in routes"
        :key="index"
        @click="$emit('next', 'getInfoPanel'),data.fromLocation = route.start ,data.toLocation=route.end"
        :class="{ route: true, active: selectedRoute == route }"
      >
      
        {{ route.start }} - {{ route.end }}
      </div>
      <div>

      </div>
      

      <div class="cols mt-4 p-1">
        <!-- <Button @click="$emit('next', 'getDetail')" size="small" class="w-100"
          >搜尋最佳路線</Button
        > -->
        <Button @click="$emit('next', 'getInfoPanel')" size="small" class="w-100"
          >返回規劃路線</Button
        >
      </div>
    </Panel>
         
  </div>
  
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
    },
  },
  
  data() {
    return {
      selectedRoute: null,
      routes: [
        { start: '信愛公園', end: '實踐大學台北校區' },
        { start: '臺北商業大學', end: '臺北科技大學' },
        { start: '光華商場', end: '大安森林公園' },
        { start: '臺北101', end: 'Apple A13' },
        { start: '台北車站', end: '寧夏夜市' },
      ],
    }
  },
  mounted() {},
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-sizing: border-box;
}

.route {
  width: 100%;
  box-sizing: border-box;

  margin-top: 1rem;
  background: white;
  border: 4px solid #eca468;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 500;

  padding: 1rem 0.2rem;
}

.active {
  background: #eca468;
}
</style>
