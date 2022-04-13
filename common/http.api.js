// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
//let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	vm.$u.api={};
	//首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index',params);	
	//认证相关
	vm.$u.api.authLogin=params=>vm.$u.post('/api/auth/login',params);//登录
	vm.$u.api.authRegister=params=>vm.$u.post('/api/auth/register',params);//注册
	vm.$u.api.authLogout=()=>vm.$u.post('/api/auth/logout');//退出登录api
	vm.$u.api.authOssToken=()=>vm.$u.get('/api/auth/oss/token');//上传api获取osstoken
	//用户x相关
	vm.$u.api.userInfo=()=>vm.$u.get('/api/user');//用户详情
	vm.$u.api.userInfoUpdate=(params)=>vm.$u.put('/api/user',params);//修改用户信息
	vm.$u.api.userAvatar=(params)=>vm.$u.post('/api/user/avatar',params);//更新头像
	
	//商品
	vm.$u.api.goodsInfo = id => vm.$u.get(`/api/goods/${id}`);//商品详情
	vm.$u.api.goodsCollect = id => vm.$u.post(`/api/collects/goods/${id}`);//商品收藏
	vm.$u.api.getGoodsList = (params = {}) => vm.$u.get(`/api/goods`,params);//商品列表
	//购物车相关
	vm.$u.api.cartAdd = params => vm.$u.post('/api/carts',params);//加入购物车
	vm.$u.api.cartList = () => vm.$u.get('/api/carts');//购物车列表
	vm.$u.api.cartGoods = () => vm.$u.get(`/api/carts?include=goods`);//购物车列表
	vm.$u.api.numChange = (cart,num) => vm.$u.put(`/api/carts/${cart}`,{num});//购物车商品数量改变
	vm.$u.api.isCheck = cart_ids => vm.$u.patch(`/api/carts/checked`,{cart_ids});//将商品选中与否
	vm.$u.api.delCartGoods = cart => vm.$u.delete(`/api/carts/${cart}`);//将商品移出购物车
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// vm.$u.api = {
	// 	index,
	// 	authLogin
	// };
}

export default {
	install
}