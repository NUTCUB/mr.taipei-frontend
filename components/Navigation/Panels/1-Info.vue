<template>
  <div class="wrapper">
    <Panel v-if="!menu">
      <div class="cols">
        <div class="col-12 p-2">
          <Input v-model="data.fromLocation" title="起點" />
        </div>
      </div>
      <div class="cols">
        <div class="col-12 p-2">
          <Input v-model="data.toLocation" title="目的地" />
        </div>
      </div>
      <div class="rows align-items-center mt-4 mb-2">
        <span class="color-secondary font-size-small">出發時間</span>
        <span class="color-text font-size-huge">{{
            data.leaveTime
              .toLocaleTimeString(undefined, {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace("24:", "00:")
        }}</span>
      </div>
    </Panel>
    <Panel v-else>
      <div class="cols">
        <div class="col-5 rows align-items-center p-3">
          <img class="avatar" :src="userimg" alt="" />
          <span class="color-text font-size-regular mt-2">{{ username }}</span>
        </div>
        <div class="col-7">
          <div class="rows">
            <Button size="small" color="#eca468" class="mb-3" @click="$router.push('/find')">尋找遺失物</Button>
            <Button size="small" color="#eca468" class="mb-3" @click="$emit('next', 'getFavoriteRotues')">路線收藏</Button>
            <Button size="small" @click="menu = !menu">路線規劃</Button>
          </div>
        </div>
      </div>
    </Panel>
    <div>
      <div class="cols">
        <div class="col-3 p-2">
          <Button color="#f3f5f8" textColor="#00e88e" @click="menu = !menu">
            <Icon v-if="menu" icon="close"></Icon>
            <Icon v-else icon="menu"></Icon>
          </Button>
        </div>
        <div class="col-9 p-2">
          <Button v-if="!menu" @click="$emit('next', 'getRoute')">搜尋最佳路線</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lineLogin from '~/tools/lineLogin'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  async mounted() {

    setTimeout(() => {
      this.username = lineLogin.getUser().data.name
      this.userimg = lineLogin.getUser().data.picture

    }, "3000")





  },
  data() {
    return {
      menu: false,
      username: null,
      userimg: null
    }
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-sizing: border-box;
}

.wrapper>div {
  margin-top: 1rem;
}

.avatar {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
}
</style>
