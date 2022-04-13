<template>
	<view>
		<view class="u-flex user-box u-p-t-30 u-p-l-20 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 avatar-body">
					<upload></upload>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息" @click='toBaseInfo'></u-cell-item>
				<u-cell-item icon="rmb-circle" title="我的订单"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="书籍收藏"></u-cell-item>
				<u-cell-item icon="map" title="地址管理"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="backspace" title="退出登录" @click='logout'></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				show: true
			}
		},
		onLoad() {
			if (!this.$u.utils.isLogin()) return
		},
		methods: {
			toBaseInfo() {
				this.$u.route({
					url: 'pages/center/baseInfo'
				})
			}, //退出登录
			async logout() {
				await this.$u.api.authLogout()
				this.$u.toast('退出成功')

				setTimeout(() => {
					//清除缓存token和用户信息
					this.$u.vuex('vuex_token', null)
					this.$u.vuex('vuex_user', {})
					//退出跳转
					this.$u.route({
						type: 'reLaunch', //关闭所有页面
						url: 'pages/index/index'
					})
				}, 1500)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
	.avatar-body{
		width: 70px;
		height: 70px;
	}
</style>
