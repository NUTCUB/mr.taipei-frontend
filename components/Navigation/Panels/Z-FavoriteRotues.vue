<template>
  <div class="wrapper">
    <Panel>
      <div class="justify-content-space-between align-items-flex-end">
        <span class="font-size-huge color-focus"> 路線收藏 </span>
      </div>

      <div
        v-for="(route, index) in routes"
        :key="index"
        @click="selectedRoute = route"
        :class="{ route: true, active: selectedRoute == route }"
      >
        {{ route.start }} - {{ route.end }}
      </div>

      <div class="cols mt-4 p-1">
        <Button @click="$emit('next', 'getDetail')" size="small" class="w-100"
          >搜尋最佳路線</Button
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
        { start: '租屋處', end: '實踐大學台北校區' },
        { start: '租屋處', end: '實踐大學台北校區' },
        { start: '租屋處', end: '實踐大學台北校區' },
        { start: '租屋處', end: '實踐大學台北校區' },
        { start: '租屋處', end: '實踐大學台北校區' },
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
