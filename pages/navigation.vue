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
</template>f

<script>
import InfoPanel from "~/components/Navigation/Panels/1-Info.vue";
import RoutePanel from "~/components/Navigation/Panels/2-Route.vue";
import DetailPanel from "~/components/Navigation/Panels/3-Detail.vue";
import StationMapPanel from "~/components/Navigation/Panels/4-StationMap.vue";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Qs from "qs";
export default {
  name: "NavigatoinPage",
  layout: "map",

  data() {
    return {
      currentPanel: InfoPanel,

      data: {
        leaveTime: new Date(),
        tokenResult: {},
        idTokenDecode: {},
      },

    };
  },

  mounted() {
    this.query = this.$route.query; // 接網址的參數

    let options = Qs.stringify({
      // POST的參數  用Qs是要轉成form-urlencoded 因為LINE不吃JSON格式
      grant_type: "authorization_code",
      code: this.query.code,
      redirect_uri: "http://localhost:3000/navigation",
      client_id: 1656586136,
      client_secret: "3123ea22ad4c1a3af54d4e8525403de8",
    });

    axios
      .post("https://api.line.me/oauth2/v2.1/token", options, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        this.tokenResult = res.data; // 回傳的結果

        this.idTokenDecode = jwtDecode(res.data.id_token); // 把結果的id_token做解析
        console.log(this.idTokenDecode);
        const userdata = {
          username: this.idTokenDecode.name,
          img: this.idTokenDecode.picture,
        };
        localStorage.setItem("userData", JSON.stringify(userdata));
      });
  },

  methods: {
    nextPressed(event) {
       if (event == "getInfoPanel") {
        this.currentPanel = InfoPanel;
      }
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
};
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
