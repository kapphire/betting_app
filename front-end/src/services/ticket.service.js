import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/ticket/";

export const addTicket = (data) => {
  return axios.post(API_URL + "create", data, { headers: authHeader() });
}

export const fetchAllTickets = (id) => {
  return axios.get(API_URL + id,  { headers: authHeader() });
}
