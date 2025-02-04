import { baseUrl } from "../constants/constants";
import axios from "axios"


const instance = axios.create({
    baseURL: baseUrl,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance