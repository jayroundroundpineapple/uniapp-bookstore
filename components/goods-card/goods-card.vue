<template>
		<navigator class="goods_item" :url="'/pages/goods/show?id='+goods.id">
				<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="goods.cover_url"></u-image>
				<view class="title u-line-1 u-skeleton-rect">{{goods.title ? goods.title : '商品名称'}}</view>
				<view class="u-flex u-row-between">
					<view class="price u-skeleton-rect">￥{{goods.price}}</view>
					<view class="sales u-skeleton-rect">月销：{{goods.sales}}</view>
				</view>
		</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
			goods:{
				type:Object,
				default(){
					return {};
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.goods_item{
		margin-top: 25rpx;
		padding: 40rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0,0,0,.1);
		.title{
			margin:10rpx 0;
			font-weight: 550;
			font-size: 32rpx;
			width: 100%;
		}
		.price{
			color: red;
			width: 40%;
		}
		.sales{
			color: #888;
			width: 40%;
		}
	}
</style>
