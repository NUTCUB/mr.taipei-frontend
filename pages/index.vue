<template>
  <div class="menu">
    <div class="title">MR.Taipei</div>
    <Button @click="lineLogin"> LINE Login </Button>
    <Button color="lightgray" @click="$router.push('/navigation')">
      跳過不進行登入
    </Button>
  </div>
</template>

<script>
import lineLogin from '~/tools/lineLogin'

export default {
  name: 'IndexPage',
  methods: {
    async lineLogin() {
      if (await lineLogin.verifyCurrentAccessToken()) {
        this.$router.push('/navigation')
      } else {
        let url = lineLogin.generateLoginURL()
        window.open(url, '_self')
      }
    },
  },
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}
.menu > * {
  margin-top: 1rem;
  width: 100%;

  box-sizing: border-box;
}
.title {
  font-size: 2rem;
  text-align: center;
  color: white;
}
</style>
