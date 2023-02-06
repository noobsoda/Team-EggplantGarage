import axios from "axios";

let api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
  },
});

let OVApi = axios.create({
  baseURL: process.env.REACT_APP_OV_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
    Authorization:
      "Basic " + btoa("OPENVIDUAPP:" + process.env.REACT_APP_OV_SECRET),
  },
});

let fileApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
  },
});

export { api, fileApi, OVApi };
