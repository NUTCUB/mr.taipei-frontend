<template>
  <div class="wrapper">
    <div class="header p-4 w-100">
      <div class="cols justify-content-space-between w-100 mb-4">
        <div class="cols">
          <img class="avatar" src="/assets/profile.png" alt="" />
          <div class="flex justify-content-center rows pl-3">
            <div class="color-text font-size-regular mb-1">Hello, 小宋</div>
            <div class="color-text">一般訪客</div>
          </div>
        </div>
        <div class="flex cols align-items-center justify-content-center">
          <div class="home" @click="$router.push('/')">
            <Icon icon="home"></Icon>
          </div>
        </div>
      </div>
      <Notice
        class="mb-4"
        title="你最近一次通報的遺失物"
        icon="android-studio"
        message="項鍊銀色"
        tips="東門站 | 一分鐘前"
      >
      </Notice>
    </div>

    <div class="items p-4">
      <div class="rows" v-if="mode == 'list'">
        <div class="cols">
          <div class="col-6">
            <Button class="itemsButton" size="small"
              ><Icon class="font-size-huge mr-2" icon="calendar"></Icon> 排序
            </Button>
          </div>
          <div class="col-6">
            <Button class="itemsButton" size="small"
              ><Icon class="font-size-huge mr-2" icon="magnify"></Icon> 搜尋
            </Button>
          </div>
        </div>
        <div
          class="flex cols justify-content-space-between align-items-center mt-3"
        >
          <span class="font-size-regular">所有通報遺失物</span>
          <span class="font-size-mini color-secondary">查看更多</span>
        </div>

        <div
          class="item flex justify-content-space-between align-items-center mt-3"
          v-for="item in new Array(10)"
          :key="item"
        >
          <div class="cols align-items-center">
            <div class="itemIcon mr-3">
              <Icon icon="android-studio"></Icon>
            </div>
            <div>
              <div class="itemTitle">項鍊銀色</div>
              <div class="itemSubTitle">Math | 20 站點</div>
            </div>
          </div>
          <div>
            <Icon class="arrowIcon" icon="chevron-right"></Icon>
          </div>
        </div>
      </div>
      <div class="" v-if="mode == 'report'">
        <div class="reportUpload" @click="$refs.fileInput.click()">
          <img v-if="report.itemImage" :src="report.itemImage" />
          <span v-else>上傳遺失物圖片</span>
        </div>
        <input
          type="file"
          style="display: none"
          @change="fileSelected"
          ref="fileInput"
        />
        <Input
          title="物品名稱"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          v-model="report.itemName"
        ></Input>
        <Input
          title="物品站點"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          v-model="report.itemLocation"
        ></Input>
        <Input
          title="物品顏色"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          v-model="report.itemColor"
        ></Input>
        <Input
          title="通報時間"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          type="datetime-local"
          v-model="report.reportTime"
        ></Input>

        <Button textColor="#fff" color="#eca468" @click="mode = 'list'">
          確認通報</Button
        >
      </div>
    </div>

    <Button
      class="reportButton"
      textColor="#fff"
      color="#eca468"
      v-if="mode != 'report'"
      @click="mode = 'report'"
    >
      <Icon class="reportIcon" icon="bullhorn"></Icon>
      我要通報</Button
    >
  </div>
</template>

<script>
import Icon from '~/components/Elements/Icon.vue'
export default {
  components: { Icon },
  data() {
    return {
      mode: 'list',
      report: {
        itemPhoto: '',
        itemName: '',
        itemImageFile: null,
        itemImage: null,
        itemLocation: '',
        itemColor: '',
        reportTime: new Date(
          new Date().getTime() + new Date().getTimezoneOffset() * -1 * 60 * 1000
        )
          .toISOString()
          .slice(0, 16),
      },
    }
  },
  methods: {
    async fileSelected(event) {
      if (event.target.files[0] == undefined) return
      this.report.itemImageFile = event.target.files[0]
      this.report.itemImage = await this.uploadImage(this.report.itemImageFile)
      let itemInfo = await this.getItemInfo(this.report.itemImage)
      this.report.itemColor = itemInfo.item_color
      this.report.itemName = itemInfo.item_name
    },
    async uploadImage(file) {
      var authHeaders = new Headers()
      authHeaders.append('Authorization', 'Client-ID 27a8586bbc7df9a')

      var formData = new FormData()
      formData.append('image', file)

      return fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: authHeaders,
        body: formData,
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          return result.data.link
        })
        .catch((error) => console.log('error', error))
    },
    async getItemInfo(url) {
      return fetch('https://ntub.fr.rs/objectDetection?img_url=' + url)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .catch((error) => {
          console.log('error', error)
          return {}
        })
    },
  },
  layout: 'default-noPadding',
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
}
.avatar {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
}
.home {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 2rem;
  background: #fff;
  color: #00e88e;
  display: flex;
  justify-content: center;
  align-items: center;
}
.items {
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 32px 32px 0px 0px;
  overflow: auto;
}
.itemsButton {
  justify-content: flex-start !important;
  align-items: center;
  margin: 0.5rem;
  color: #fff !important  ;
  border-radius: 32px;
}

.item {
  padding: 1rem;
  border: 2px solid #444444;
  border-radius: 24px;
}
.itemIcon {
  width: 3rem;
  height: 3rem;
  border-radius: 4px;
  font-size: 2rem;
  background: #00e88e;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.itemTitle {
  font-size: 1.2rem;
  font-weight: bold;
}
.itemSubTitle {
  font-size: 0.8rem;
}
.arrowIcon {
  font-size: 2rem;
}
.reportIcon {
  font-size: 2.4rem;
}
.reportButton {
  width: 90%;
  bottom: 16px;
  left: 5%;

  box-sizing: border-box;
  position: fixed;
  padding: 0;

  display: flex;
  align-items: center;
}
.reportInput >>> input {
  margin-top: 1rem;
  border: 1px #000 solid;
}
.reportUpload {
  width: 100%;
  height: 8rem;
  background: #66f2bb;
  color: #fff;
  border-radius: 16px;

  margin-bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
.reportUpload > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
