<template>
	<view>
		<view style="text-align: center;">
			<image style="height: 220px;" :src="goodsInfo.cover_url"></image>
		</view>
		<view class="mid_wrap" style="magin-top:-10px">
			<view class="goods_title u-m-t-20 u-m-b-30">{{goodsInfo.title}}</view>
			<view class="wrap">
				<view class="goods_price">￥{{goodsInfo.price}}</view>
				<view class="goods_sales">销量：{{goodsInfo.sales}}</view>
			</view>
		</view>
		<!-- tabbar -->
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view v-if="current==0">
			<view class="info" style="text-align: center; padding: 20px;">
				<u-parse :html="goodsInfo.details" :selectable="true"></u-parse>
			</view>
		</view>
		<view v-if="current==1">
			<view class="comment" v-for="(res,index) in commentList" :key="res.id">
				<view class="left">
					<image :src="res.user.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{res.user.name}}</view>
					</view>
					<view class="content">{{res.content}}</view>
					<view class="bottom">{{res.created_at}}</view>
				</view>
			</view>
		</view>
		<view class="u-p-b-80" v:if="current==2">
			<u-row gutter="16">
				<u-col v-for="goods in goodsList" span="6">
					<goods-card :goods="goods"></goods-card>
				</u-col>
			</u-row>
		</view>
		<!-- 底部导航栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item u-text-center" @click="collect">
					<block v-if="isCollect==0">
						<u-icon name="star" :size="40" color="black"></u-icon>
						<view class="text u-line-1" >收藏</view>
					</block>
					<block v-else>
						<u-icon name="star" :size="40" color="red"></u-icon>
						<view class="text u-line-1" style="color: red;">已收藏</view>
					</block>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3,-6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>
	<!-- tabbar三选项 -->
</template>

<script>
	export default {
		data() {
			return {
				list: [{
							name: '商品介绍'
						},
						{
							name: '商品评论',
							count:0
						},
						{
							name: '推荐商品'
						}
					],
					goodsInfo: {},
					goodsList: [],
					goodsId: null,
					current: 0,
					commentList: [],
					isCollect:0,
					cartCount:0
				}
			},
			onLoad(option) {
					this.goodsId = option.id
					this.getData()
					this.getCartCount()
				},
				methods: {
					async getData() {
						const res = await this.$u.api.goodsInfo(this.goodsId)
						this.goodsInfo = res.goods
						this.goodsList = res.like_goods
						this.commentList = res.goods.comments
						this.list[1].count=res.goods.comments.length
						this.isCollect=res.goods.is_collect
						console.log(res)
						// this.goodsList=res.goods.data
					},
					change(index) {
						this.current = index
					},
					//收藏商品
					async collect(){
						await this.$u.api.goodsCollect(this.goodsId)
						//收藏成功后，改变按钮状态
						if(isCollect==0){
							this.$u.toast('收藏成功')
							isCollect=1
						}
						else{
							this.$u.toast('取消收藏')
							isCollect=0
						}
					},
					//跳转购物车
					toCart(){
						this.$u.route({
							type:'switchTab',
							url:'pages/cart/cart'
						})
					},
					//加入购物车
					async addCart(){
						const params={
							goods_id:this.goodsId
						}
						await this.$u.api.cartAdd(params)
						this.$u.toast('添加成功')
						//重新获取购物车数组
						this.getCartCount()
					},
					async getCartCount(){
						const token=this.vuex_token
						if(token){
							const res=await this.$u.api.cartList()
							this.cartCount=res.data.length
						}
					}
				}
		}
</script>

<style lang="scss" scoped>
	.goods_title {
		font-size: 23px;
		color: #2f2f2f;
		font-weight: 800;
	}

	.mid_wrap {
		.goods_title {
			font-size: 40rpx;
		}

		.wrap {
			display: flex;
			justify-content: space-between;

			.goods_price {
				padding-left: 30rpx;
				color: #d71a21;
				font-weight: 800;
				font-size: 38rpx;
			}

			.goods_sales {
				padding-right: 30rpx;
			}
		}

	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.bottom{
				margin-top: 6px;
				color: #82848A;
				font-size: 12px;
			}
		}
	}
	.navigation {
				position: fixed;
				bottom: 0;
				height: 55px;
				display: flex;
				width: 100%;
				border: solid 2rpx #f2f2f2;
				background-color: #ffffff;
				padding: 16rpx 0;
				justify-content: space-between;
				.left {
					display: flex;
					flex:3;
					font-size: 18rpx;
					justify-content: space-around;
					.item {
						position: relative;
						text-align: center;
					}
				}
	
				.right {
					display: flex;
					padding:0 10rpx;
					flex:9;
					font-size: 28rpx;
					justify-content: flex-end;
					align-items: center;
					.btn {
						text-align: center;
						line-height: 66rpx;
						width: 80%;
						border-radius: 16rpx;
						color: #ffffff;
					}
	
					.cart {
						background-color: #2979ff;
						margin-right: 30rpx;
					}
	
					.buy {
						background-color: #e06c6c;
					}
				}
			}
</style>
