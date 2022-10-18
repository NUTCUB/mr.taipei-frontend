import Vue from 'vue'

let Snackbar = {
  install(vueInstance, options) {
    vueInstance.prototype.$snackbar = async ({
      message = "",
      duration = 5000
    }) => {
      let element = document.createElement("div")
      element.classList.add("snackbar")
      element.innerHTML = message
      document.body.appendChild(element)
      setTimeout(() => {
        document.body.removeChild(element)
      }, duration + 1000)
    }
  }
}

Vue.use(Snackbar)
