<template>
  <div class="wrapper">
    <Panel>
      <div class="justify-content-space-between align-items-flex-end">
        <span class="font-size-huge color-focus"> 路線資訊 </span>
        <span class="font-size-regular color-focus"> NT 45 </span>
      </div>
      <div class="cols mt-3">
        <div class="col-6">
          <div class="rows flex-cols-flex-start">
            <span class="font-size-small color-secondary">起點</span>
            <span class="font-size-large color-text">{{
              data.fromLocation
            }}</span>
            <span class="color-secondary font-size-small">{{
              data.leaveTime
                .toLocaleTimeString(undefined, {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                })
                .replace('24:', '00:')
            }}</span>
          </div>
        </div>
        <div class="col-6">
          <div class="rows flex-cols-flex-start">
            <span class="font-size-small color-secondary">目的地</span>
            <span class="font-size-large color-text">{{
              data.toLocation
            }}</span>
            <span class="color-secondary font-size-small">{{
              new Date(data.leaveTime.getTime() + 1000 * 60 * 20)
                .toLocaleTimeString(undefined, {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                })
                .replace('24:', '00:')
            }}</span>
          </div>
        </div>
      </div>
      <div v-if="data.detailRoutes">
        <div v-for="(detail, index) in data.detailRoutes" :key="index">
          <hr />
          <VerticalMetroRoute
            v-if="detail.type == 'metro'"
            :route="detail.route"
          ></VerticalMetroRoute>
          <VerticalUBikeRoute
            v-if="detail.type == 'ubike'"
            :route="detail.route"
          ></VerticalUBikeRoute>
        </div>
      </div>

      <div class="cols mt-4">
        <div class="col-6 p-1">
          <Button
            @click="$emit('next', 'setNotice')"
            color="#e9a668"
            size="small"
          >
            <Icon icon="bell-ring"></Icon>
            設定下車提醒
          </Button>
        </div>
        <div class="col-6 p-1">
          <Button @click="$emit('next', 'getStationMap')" size="small"
            >車站內部路線</Button
          >
        </div>
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
  mounted() {
    console.log(JSON.parse(localStorage.getItem('Routes')))

    const routes = JSON.parse(localStorage.getItem('Routes'))
    this.$set(this.data, 'detailRoutes', [
      {
        type: 'ubike',
        route: [
          {
            version: '1.0',
            name: '金山愛國路口',
            distance: '20 公尺',
            quantity: 17,
            vacancy: null,
          },
          {
            version: '1.0',
            name: '捷運東門站',
            distance: '',
            quantity: null,
            vacancy: 5,
          },
        ],
      },
      {
        type: 'metro',
        route: routes,
        // route: [
        //   {
        //     color: 'red',
        //     code: 'R07',
        //     title: '搭乘淡水信義線',
        //     tips: '往象山方向',
        //     datetime: '',
        //     notice: false,
        //   },
        //   {
        //     color: 'red',
        //     code: 'R05',
        //     title: '在大安下車',
        //     tips: '',
        //     datetime: '10:35',
        //     notice: true,
        //   },
        //   {
        //     color: '#e9a668',
        //     code: 'BR09',
        //     title: '搭乘文湖線',
        //     tips: '往南港展覽館方向',
        //     datetime: '10:38',
        //     notice: false,
        //   },
        //   {
        //     color: '#e9a668',
        //     code: 'BR14',
        //     title: '在大直下車',
        //     tips: '出口 1',
        //     datetime: '10:52',
        //     notice: true,
        //   },
        // ],
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
