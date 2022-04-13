<template>
	<!-- 1.昵称 -->
	<!-- 邮箱 -->
	<!-- 密码 -->
	<!-- 确认密码 -->
	<!-- 注册按钮 -->
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册用户</view>
			<input class="u-border-bottom" type="" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<view class="tips">123</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				email:'',
				password:'',
				password_confirmation:''
			}
		},
		methods: {
			//注册
			async submit(){
				//1表单验证
				//2.准备提交参数
				const params={
					name:this.name,
					email:this.email,
					password_confirmation:this.password_confirmation,
					password:this.password
				}
				//3.请求api，执行注册
				const res=this.$u.api.authRegister(params)
				//注册成功重定向到登录页面（关闭当前页面，redirect）
			}
		}
	}
</script>
<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 40rpx !important;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
