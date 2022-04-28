import axios from "axios";
import config from "~/config"
import lineLogin from "./lineLogin";
export default {


    async userAccess() {
       
        let user_name = await lineLogin.loadUserFromLocalStorage().data.name;
        let user_id = await lineLogin.loadUserFromLocalStorage().data.sub;
   
        let userapi = [
            {
                user_name: user_name,
                user_id: user_id,
            },
        ];

        return await new Promise((resolve, reject) => {
        
            axios.post(`${config.api}/api/user`, userapi).then(response => {
                let data = response.data;

                resolve(data);
                console.log(data);
            }).catch(error => {
                console.error("user Login", "Login error.", error)
                reject(error);
                return null
            })

        })


    }


}