import axios from 'axios';
import { addAuthorizationHeader } from './interceptors/request';

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
api.defaults.headers.common['Content-Type'] = 'application/json';
//apiはaxiosのインスタンス。axiosがリクエストを送る直前に指定した処理を挟む仕組み。今後api.get()やapi.post()を呼ぶたびに送信前にaddAuthorizationHeaderが自動で実行される
api.interceptors.request.use(addAuthorizationHeader);

export default api;
