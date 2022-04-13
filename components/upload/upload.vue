<template>
	<u-upload :action="action"
	ref='upload'
	 :max-size="5 * 1024 * 1024" 
	 max-count="1"
	 :multiple="false"
	 :deletable="false"
	:before-upload="beforeUpload"
	:custom-btn="true"
	:form-data="formData"
	height="0"
	width="0"
	@on-success="onSuccess"
	>
	<u-avatar slot='addBtn' :src="vuex_user.avatar_url" size="140"></u-avatar>
	
	</u-upload>
</template>

<script>
	let _this={}
	export default {
		name: "upload",
		data() {
			return {
				action: '',
				formData:{},
				upFileName:''
			};
		},
		created() {
				_this=this
		},
		methods:{
			//上传前的钩子函数
			async beforeUpload(index, list){
				const {file}=list[0]
				//#ifdef H5
				const fileName=file.name
				//#endif
				
				//#ifndef H5
				const fileName=file.path
				//#endif
				
				//请求api
				const ossToken=await _this.$u.api.authOssToken()
				console.log(ossToken)
				//设置上传域名
				_this.action=ossToken.host
				
				//处理文件名
				const suffix=fileName.split('.')[1]
				// const suffix=fileName.slice(fileName.lastIndexOf('.'))
				const upFileName=_this.$u.guid(20)+'.'+suffix  //上传url,生成随机20guid
				_this.upFileName=upFileName
				
				_this.formData={
					'key':upFileName,//上传后的文件名
					'policy':ossToken.policy,
					 'OSSAccessKeyId':ossToken.accessid,
					 'success_action_status' : '200', 
					 'signature': ossToken.signature
				}
				return true
			},
			async onSuccess(){  //上传成功后，移除预览区图片，请求api，更新头像，更新缓存用户信息
				this.$refs.upload.remove(0)
				await this.$u.api.userAvatar({avatar:this.upFileName})
				this.$u.utils.updateUser() //更新缓存
				this.$u.toast('更新成功')
			}
		}
	}
</script>

<style>

</style>
