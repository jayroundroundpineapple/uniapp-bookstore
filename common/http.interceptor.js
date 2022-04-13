const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
			baseUrl: 'https://api.shop.eduwork.cn', // 请求的本域名
			// method: 'POST',
			// 设置为json，返回后会对数据进行一次JSON.parse()
			dataType: 'json',
			showLoading: true, // 是否显示请求中的loading
			loadingText: '请求中...', // 请求loading中的文字提示
			loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			originalData: true, // 是否在拦截器中返回服务端的原始数据
			loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
			// 配置请求头信息
			// header: {
			// 	'content-type': 'application/json;charset=UTF-8'
			// },
	});
	
	// 请求拦截部分，如配置，每次请求前都会执行，见上方说明
	Vue.prototype.$u.http.interceptor.request = (config) => {
		
		config.header.Authorization="Bearer "+vm.vuex_token;
		//if(config.url=='/user/login')config.header.noToken=true;
		return config;
	}
	
	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		const {statusCode,data}=res
		if(statusCode < 400) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return data;
		} else if(statusCode == 400) {
			// 400,请求错误
			vm.$u.toast(data.message);
			return false;
		} else if(statusCode == 401) {
			// 401两种情况，1.认证未通过 2token没有或者过期
			if(data.message=="Unauthorized"){
				vm.$u.toast('账号或密码错误，请重新输入');
			}else{
				//如果请求了登录的api，跳转到登录
				vm.$u.utils.isLogin()
			}
			return false;
		} else if(statusCode == 422) {
				// 表单验证未通过
				const {errors}=data;
				vm.$u.toast(Object.values(errors)[0][0]);
				return false;
		}else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
	//增加patch请求
	vm.$u.patch=(url,params = {},header={})=>{
		//模拟patch请求
		const _params={
			...params,
			_method:'PATCH'
		}
		return vm.$u.post(url,_params,header);
	}
}

export default {
	install
}