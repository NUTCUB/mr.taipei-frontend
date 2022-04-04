<template>
  <div class="wrapper">
    <Panel>
      <div class="cols">
        <div class="col-6 p-2">
          <Input v-model="data.fromLocation" title="起點"></Input>
        </div>
        <div class="col-6 p-2">
          <Input v-model="data.toLocation" title="目的地"></Input>
        </div>
      </div>
      <div class="rows align-items-center mt-4 mb-2">
        <span class="color-secondary font-size-small">出發時間</span>
        <span class="color-text font-size-huge">{{
          data.leaveTime
            .toLocaleTimeString(undefined, {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace('24:', '00:')
        }}</span>
      </div>
    </Panel>
    <Button @click="$emit('next', 'getRoute')">搜尋最佳路線</Button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-sizing: border-box;
}

.wrapper > div {
  margin-top: 1rem;
}
</style>
