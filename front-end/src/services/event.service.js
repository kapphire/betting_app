import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/event/";

export const getBasicData = () => {
  return axios.get(API_URL + "basic-data", { headers: authHeader() });
};

export const addEvent = (data) => {
  return axios.post(API_URL + "create", data, { headers: authHeader() });
}

export const resolveEvent = (id, data) => {
  return axios.put(API_URL + `${id}`, data, { headers: authHeader() });
}

export const resolveAllEvent = () => {
  return axios.get(API_URL + "resolve-all", { headers: authHeader() });
}