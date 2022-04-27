import axios from "axios";
import jwtDecode from "jwt-decode"
import config from "~/config"


export default {
  user: null,
  generateLoginURL() {
    let url = new URL("https://access.line.me/oauth2/v2.1/authorize?");
    url.searchParams.append("response_type", "code");
    url.searchParams.append("client_id", config.line.client_id);
    url.searchParams.append("redirect_uri", location.protocol + "//" + location.host + "/navigation");
    url.searchParams.append("state", this.generateState());
    url.searchParams.append("scope", "profile openid");
    url.searchParams.append("nonce", "login");
    url.searchParams.append("prompt", "consent");
    url.searchParams.append("max_age", "3600");
    url.searchParams.append("ui_locales", "zh-TW");
    url.searchParams.append("bot_prompt", "normal");
    return url
  },
  async issueAccessToken(code, state) {
    if (this.checkState(state)) {
      return false
    }

    let url = new URL("https://api.line.me/oauth2/v2.1/token");

    let params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", location.protocol + "//" + location.host + "/navigation");
    params.append("client_id", config.line.client_id);
    params.append("client_secret", config.line.client_secret);

    return axios.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
      let data = response.data
      let user = {
        accessToken: data.access_token,
        expiresIn: new Date(new Date().getTime() + data.expires_in * 1000),
        data: jwtDecode(data.id_token),
        refreshToken: data.refresh_token
      }
      this.saveUserToLocalStorage(user)
      window.$nuxt.$snackbar({
        message: "登入成功！"
      })
      return user
    }).catch(error => {
      console.error("[LINE Login]", "Issue token error.", error)
      return null
    })
  },
  async verifyCurrentAccessToken() {
    let user = this.getUser()
    if (user) {
      let url = new URL("https://api.line.me/oauth2/v2.1/verify")
      url.searchParams.append("access_token", user.accessToken)
      return axios.get(url).then(response => {
        return response.data
      }).catch(error => {
        console.error("[LINE Login]", "Verify token error.", error)
        return null
      })
    }
    return false
  },
  async refreshAccessToken() {
    let user = this.getUser()
    if (user) {
      let url = new URL("https://api.line.me/oauth2/v2.1/token");

      let params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", user.refreshToken);
      params.append("client_id", config.line.client_id);
      params.append("client_secret", config.line.client_secret);

      return axios.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
        let data = response.data
        let user = {
          accessToken: data.access_token,
          expiresIn: new Date(new Date().getTime() + data.expires_in * 1000),
          data: user.data,
          refreshToken: data.refresh_token
        }
        this.saveUserToLocalStorage(user)
        return true
      }).catch(error => {
        console.error("[LINE Login]", "Refresh token error.", error)
        return false
      })
    } else {
      return false
    }
  },
  getUser() {
    if (this.user) {
      return this.user
    } else {
      this.loadUserFromLocalStorage()
      return this.user
    }
  },
  saveUserToLocalStorage(user) {
    localStorage.setItem("Auth:User", JSON.stringify(user))
    return true
  },
  loadUserFromLocalStorage() {
    let json = localStorage.getItem("Auth:User")
    if (json) {
      let user = JSON.parse(json)
      user.expiresIn = new Date(user.expiresIn)
      this.user = user
      return user
    } else {
      return null
    }
  },
  generateState() {
    let newState = crypto.randomUUID().replace(/-/g, '');
    localStorage.setItem("Auth:State", newState);
    return newState;
  },
  checkState(state) {
    let oldState = localStorage.getItem("Auth:State");
    if (oldState === state) {
      return true;
    }
    return false;
  }
}
