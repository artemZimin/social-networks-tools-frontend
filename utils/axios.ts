import axios from "axios";

const instance = axios.create({
  // baseURL: `${process.env?.BACKEND_HOST}:${process.env?.BACKEND_PORT}`
  baseURL: `http://127.0.0.1:4000`
});

export default instance
