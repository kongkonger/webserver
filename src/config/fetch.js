import { baseUrl } from './env'

// export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
// 	type = type.toUpperCase();
// 	//baseUrl 是服务器ip地址  url则为接口对应地址  cmc add
// 	debugger
// 	url = baseUrl + url;
//     console.log('cmc_tag ' + url)
// 	if (type == 'GET') {
// 		let dataStr = ''; //数据拼接字符串
// 		Object.keys(data).forEach(key => {
// 			dataStr += key + '=' + data[key] + '&';
// 		})

// 		if (dataStr !== '') {
// 			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
// 			url = url + '?' + dataStr;
// 		}
// 	}
// 	// cmc change code
// 	// 
// 	// if (window.fetch &&  method == 'fetch') {
// 		if (false) {
// 		let requestConfig = {
// 			credentials: 'include',
// 			method: type,
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			// mode: "cors",
// 			//cmc change for 跨域问题
// 			mode: "no-cors",
// 			cache: "force-cache"
// 		}

// 		if (type == 'POST') {
// 			Object.defineProperty(requestConfig, 'body', {
// 				value: JSON.stringify(data)
// 			})
// 		}
		
// 		try {
// 			debugger
// 			const response = await fetch(url, requestConfig);
// 			debugger
// 			const responseJson = await response.json();
// 			return responseJson
// 		} catch (error) {
// 			throw new Error(error)
// 		}
// 	} else {
// 		return new Promise((resolve, reject) => {
// 			let requestObj;
// 			if (window.XMLHttpRequest) {
// 				requestObj = new XMLHttpRequest();
// 			} else {
// 				requestObj = new ActiveXObject;
// 			}

// 			let sendData = '';
// 			if (type == 'POST') {
// 				sendData = JSON.stringify(data);
// 			}

// 			requestObj.open(type, url, true);
// 			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 			requestObj.send(sendData);

// 			requestObj.onreadystatechange = () => {
// 				if (requestObj.readyState == 4) {
// 					if (requestObj.status == 200) {
// 						let obj = requestObj.response
// 						if (typeof obj !== 'object') {
// 							obj = JSON.parse(obj);
// 						}
// 						resolve(obj)
// 					} else {
// 						reject(requestObj)
// 					}
// 				}
// 			}
// 		})
// 	}
// }



import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.request.use(
	config=> {
  return config;
//cmc change code
// config => {
// 	if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
// 		config.headers.Authorization = `token ${store.state.token}`;
// 	}
// 	return config;

}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error({message: data.data.msg});
    return;
  }
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  }else {
    Message.error({message: '未知错误!'});
  }
  return Promise.resolve(err);
})

// let base = 'http://localhost/api';
// let base = 'http://localhost/api';
// let base = 'http://localhost:80/api';
// produce
// let base = 'http://155.138.237.169/api';
// let baseimage = 'http://155.138.237.169/api';
let base = 'http://localhost/api';
let baseimage = 'http://localhost/api';
//test 
// let base = 'http://localhost:80/api';
// let baseimage = 'http://localhost:80/api';
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${baseimage}${url}`,
    data: params
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    //   'Access-Control-Allow-Origin': '*',//允许所有来源访问,
    //   'Access-Control-Allow-Method': 'POST,GET,OPTIONS'//允许访问的方式
    // }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',//允许所有来源访问,
      'Access-Control-Allow-Method': 'POST,GET'//允许访问的方式
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url,data) => {
  debugger
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
  return axios({
    method: 'get',
    url: `${base}${url}`
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Access-Control-Allow-Origin': '*',//允许所有来源访问,
    //   'Access-Control-Allow-Method': 'POST,GET'//允许访问的方式
    // }
  });
}
