import axios from "axios"

import QS from 'qs';
let count = 0;

axios.defaults.baseURL = "/api/"
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;//session 配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.timeout = 3000
// // 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   count++;
//   Vue.iShow();
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   count--;
//   if(count == 0){
//     Vue.ihidden();
//   }
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });


export default {
    get: function(url,data){
        return new Promise(
            function(resolve,reject){
                axios.get(url, {
                    params: {
                      ID: data
                    }
                  })
                  .then(function (response) {
                    resolve(response.data);
                  })
                  .catch(function (error) {
                    reject(error);
                  })
            }
        )
        
    },

    post: function(url,params){
        return new Promise(
            function(resolve,reject){
                axios.post(url, QS.stringify(params),{ 
                  withCredentials: true  //打开cookie
                })
                  .then(function (response) {
                    resolve(response.data);
                  })
                  .catch(function (error) {
                    reject(error);
                  })
            }
        ) 
    },

    all: function(list){
      return new Promise( function(resolve,reject){
        axios.all(list)
       .then(axios.spread(function (...response) { 
         resolve(response);
       }))
       .catch(function (error) {
         reject(error);
       })
      })
    }
}