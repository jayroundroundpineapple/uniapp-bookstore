const install = (Vue, vm) => {
	const isLogin=()=>{
		//是否登录
		const token=vm.vuex_token
		if(!token){
			//来自哪个页面
			const currentPage=getCurrentPages().pop()
			//获取页面路径和请求参数
			const {options,route}=currentPage
			//拿到当前页面options所有的key
			 const optionsKeys=Object.keys(options)
			 let params=''
			 if(optionsKeys.length!==0){
				 params=optionsKeys.reduce((pre,current)=>{
					 return pre+current+'='+options[current]+'&'
				 },'?').slice(0,-1)
			 }
			//缓存当前页的url，用于登录或者注册后的跳转
			uni.setStorageSync('back_url',route+params)
			vm.$u.toast('请登录')
			setTimeout(()=>{
				vm.$u.route({
					type:'redirect',
					url:'pages/auth/login'
				})
			},1500)
			return false
		}
		return true
	}
	
	/*更新用户信息*/
	const updateUser= async() =>{
		//重新请求用户信息(并缓存)，更新vuex_user
		const userInfo=await vm.$u.api.userInfo()
		vm.$u.vuex('vuex_user',userInfo)//缓存
	}
	
	vm.$u.utils={
		isLogin:isLogin,
		updateUser
	}
}

export default{
	install
}