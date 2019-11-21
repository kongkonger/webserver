/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;
// http://155.138.237.169:8080
let baseImageUrl = 'http://localhost:80/api'; 

if (process.env.NODE_ENV == 'development') {
	// baseUrl = '';
	// baseUrl='http://localhost:8080';
	baseUrl= 'http://localhost/api';
	baseImgPath = '/img/';
	baseImageUrl='http://localhost:80/api';
}else{
	// baseUrl = '//elm.cangdu.org';
	// baseUrl='http://localhost:8080';
	baseUrl= 'http://localhost/api';
	baseImgPath = '//elm.cangdu.org/img/';
	baseImageUrl='http://155.138.237.169:80/api';
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
	baseImageUrl
}