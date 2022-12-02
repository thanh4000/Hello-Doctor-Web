import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    //thực hiện 1 post request
    return axios.post("/api/login", { email: userEmail, password: userPassword});
}

export {  handleLoginApi  }