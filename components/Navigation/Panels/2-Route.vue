<template>
  <div class="wrapper">
    <Panel>
      <div class="cols">
        <div class="col-12 p-2">
          <div class="rows flex-cols-flex-start">
            <span class="font-size-small color-secondary">起點</span>

            <span class="font-size-large color-text">{{
              data.fromLocation
            }}</span>
          </div>
        </div>
      </div>
      <div class="cols">
        <div class="col-12 p-2">
          <div class="rows flex-cols-flex-start">
            <span class="font-size-small color-secondary">目的地</span>
            <span class="font-size-large color-text">{{
              data.toLocation
            }}</span>
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
          <span class="color-text font-size-regular">{{ departure_time }}</span>
        </div>
        <div class="col-4 rows">
          <span class="color-secondary font-size-small">抵達時間</span>
          <span class="color-text font-size-regular">{{ arrival_time }}</span>
        </div>
        <div class="col-4 rows">
          <span class="color-secondary font-size-small">&nbsp;</span>
          <div class="cols ml-3">
            <span class="color-focus font-size-regular">{{duration}}</span>
          </div>
        </div>
      </div>
    </Panel>
    <div class="cols">
        <div class="col-3 p-2" >
          <Button color="#f3f5f8" textColor="#00e88e">
            &nbsp;
          </Button>
        </div>
        <div class="col-9 p-2">
          <Button @click="$emit('next', 'getDetail')">詳細路線資料</Button>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    map: {
      type: google.maps.Map,
    },
  },

  mounted() {
    // let geoCoder = new google.maps.Geocoder()
    // geoCoder.geocode(
    //   {
    //     address: this.data.fromLocation,
    //     componentRestrictions: {
    //       country: 'TW',
    //     },
    //   },
    //   (results, status) => {
    //     if (status === 'OK') {
    //       let lat = results[0].geometry.location.lat()
    //       let lon = results[0].geometry.location.lng()
    //       this.map.setCenter(new google.maps.LatLng(lat, lon))

    //       new google.maps.Marker({
    //         position: new google.maps.LatLng(lat, lon),
    //         map: this.map,
    //       })
    //     } else {
    //       this.$snackbar({
    //         message: '找不到此起點',
    //       })
    //     }
    //   }
    // )
    let ds = new google.maps.DirectionsService()
    let dD = new google.maps.DirectionsRenderer()
    // let service = new google.maps.DistanceMatrixService(); 
    let request = {
      origin: this.data.fromLocation,
      destination: this.data.toLocation,
      travelMode: 'TRANSIT',
      transitOptions: { 
        modes: ['SUBWAY']},
    }
    

    dD.setMap(this.map)
    ds.route(request, function (result, status) {
      if (status == 'OK') {
        console.log(result)
        let steps = result.routes[0].legs[0].steps
        localStorage.setItem('travelTime', JSON.stringify(result.routes[0].legs[0]))
        localStorage.setItem('Routes', JSON.stringify(steps))
        steps.forEach((res, key) => {
          var map = new google.maps.Marker({
            position: {
              lat: res.start_location.lat(),
              lng: res.start_location.lng(),
            },
            label: { text: key + '', color: '#fff' },
            map: map,
          })
        })

        dD.setDirections(result)
      } else {
        this.$snackbar({
          message: '找不到此起點',
        })
      }
    })
    let  travelTime = JSON.parse(localStorage.getItem('travelTime'))
    setTimeout(() => {
      this.departure_time = travelTime.departure_time.text
      this.arrival_time = travelTime.arrival_time.text
      this.duration = travelTime.duration.text

    }, "3000")
   
    this.$set(this.data, 'route', [
      {
        color: 'red',
        code: 'R07',
        exit: '出口 2',
      },
      {
        color: '#e9a668',
        code: 'BR14',
        exit: '出口 2',
      },
    ])
  },
  data(){
    return {
      arrival_time: null,
      departure_time: null,
      duration: null
    }
  }
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
