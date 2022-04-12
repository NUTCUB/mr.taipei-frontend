<template>
  <div class="wrapper">

    <AngleLeft @click="$emit('next', 'getInfoPanel')" />

    <Panel>
      <div class="cols">
        <div class="col-6 p-2">
          <div class="rows flex-cols-flex-start">
            <span class="font-size-small color-secondary">起點</span>

            <span class="font-size-large color-text">{{ data.fromLocation }}</span>

          </div>
        </div>
        <div class="col-6 p-2">
          <div class="rows flex-cols-flex-start">
            <span class="font-size-small color-secondary">目的地</span>

            <span class="font-size-large color-text">{{ data.toLocation }}</span>

          </div>
        </div>
      </div>
      <div>
        <HorizontalMetroRoute
          v-if="data.route"
          :route="data.route"
        ></HorizontalMetroRoute>
      </div>
      <div class="cols mt-4 mb-2">
        <div class="col-4 rows">
          <span class="color-secondary font-size-small">出發時間</span>
          <span class="color-text font-size-regular">{{
            data.leaveTime
              .toLocaleTimeString(undefined, {
                hour12: false,

                hour: "2-digit",
                minute: "2-digit",
              })
              .replace("24:", "00:")

          }}</span>
        </div>
        <div class="col-4 rows">
          <span class="color-secondary font-size-small">出發時間</span>
          <span class="color-text font-size-regular">{{
            new Date(data.leaveTime.getTime() + 1000 * 60 * 20)
              .toLocaleTimeString(undefined, {
                hour12: false,

                hour: "2-digit",
                minute: "2-digit",
              })
              .replace("24:", "00:")

          }}</span>
        </div>
        <div class="col-4 rows">
          <span class="color-secondary font-size-small">&nbsp;</span>
          <div class="cols">
            <span class="color-focus font-size-regular">25</span>

            <span class="color-secondary font-size-regular">&nbsp;&nbsp;分鐘</span>

          </div>
        </div>
      </div>
    </Panel>
    <Button @click="$emit('next', 'getDetail')">詳細路線資料</Button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },

  mounted() {

    localStorage.setItem("fromLocation", this.data.fromLocation);
    localStorage.setItem("toLocation", this.data.toLocation);
    window.dispatchEvent(
      new CustomEvent("foo-key-localstorage-changed", {
        detail: {
          storage: localStorage.getItem("fromLocation"),
          storage2: localStorage.getItem("toLocation"),
        },
      })
    );
 
    this.$set(this.data, 'route', [

      {
        color: 'red',
        code: 'R07',
        exit: '出口 4',
      },
      {
        color: '#e9a668',
        code: 'BR14',
        exit: '出口 1',
      },
    ])
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
