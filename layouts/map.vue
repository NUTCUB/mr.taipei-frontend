<template>
  <div>
    <!-- <div style="height: 100vh">
      <client-only>
        <l-map :zoom="15" :center="[latitude, longitude]">
          <l-tile-layer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[latitude, longitude]"></l-marker>
        </l-map>
      </client-only>
    </div> -->
    <section id="map"></section>

    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: "",
      longitude: "",
      fromLocation: "",
      toLocation: "",
      geocoder: null,
      newlatitude: null,
      newlongitude: null,
    };
  },

  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((postion) => {
        console.log(postion.coords.latitude);
        console.log(postion.coords.longitude);
        this.latitude = postion.coords.latitude;
        this.longitude = postion.coords.longitude;
        this.mapTrue = true;
        this.showLocationMap(this.latitude, this.longitude);
      });
    } else {
      console.log("Your brower does not suppot gelocation api");
    }

    window.addEventListener("foo-key-localstorage-changed", (event) => {
      this.fromLocation = event.detail.storage;
      this.toLocation = event.detail2.storage2;
    });

    this.geocoder = new google.maps.Geocoder();
    const address = this.fromLocation;
    this.geocoder.geocode(
      // GeocoderRequest 物件: 帶入要轉換的地址與相關設定
      {
        // 地址
        address: address,
        // 限制轉換的結果必須是在台灣的範圍
        componentRestrictions: {
          country: "TW",
        },
      },
      // 轉換完成後呼叫的 callback 函式
      (results, status) => {
        if (status === "OK") {
          // 當轉換成功時，將第一筆結果的經緯度存取起來

          this.newlatitude = results[0].geometry.location.lat();
          this.newlongitude = results[0].geometry.location.lng();
          // this.showLocationMap(this.newlatitude, this.newlongitude);
          // 更新狀態為已經獲得經緯度
          this.hasGeo = true;
        } else {
          // 更新狀態為未經獲得經緯度
          this.hasGeo = false;
          // 當轉換失敗時，顯示錯誤原因
          this.errormsg = status;
        }
      }
    );
  },
  methods: {
    showLocationMap(latitude, longitude) {
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
  },
};
</script>

<style scoped>
#map {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;

  z-index: 1000;

  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
