import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

const fetchUser = (id) => {
	return axios.get(API_URL + `${id}`, { headers: authHeader() })
		.then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
}

const userService = {
  fetchUser,
};

export default userService;
