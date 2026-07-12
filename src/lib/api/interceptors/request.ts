import type { InternalAxiosRequestConfig } from 'axios';

export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  //ブラウザのlocalStorageから保存済みのtokenを取り出している。signin.tsxたsignup.tsxで保存したもの
  const token = localStorage.getItem('token');
  //   tokenがなければ変更せずにそのままリクエストを返す
  if (!token) return config;
  //tokenがある場合はリクエストヘッダーにAuthorizationを追加
  config.headers.Authorization = `Bearer ${token}`;
  //axiosにAuthorizationヘッダーを追加したリクエスト設定を返す
  return config;
};
