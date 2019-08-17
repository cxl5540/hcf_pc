<template>
  <div >
    <div class="model">
        <div class="content">
        <p class="head">
          <span>用户登录</span>
          <span><i class="fa fa-times"></i></span>
        </p>
         <div class="mid">         
           <p>
           <span>用户名:</span>
           <input type="text" v-model='username'>
           </p>
           <p>
           <span>密码:</span>
           <input type="password" v-model='password'>
           </p>
        </div>
        <div class="footer">
         <button @click='login'>确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
  components:{

  },

  data () {
    return {
     username:'',
     password:'',
    }
  },
  created(){
   $('.num_bottom,.footer,.leftbar,.header').hide();
  },
  mounted(){
   
  },
  methods:{
    login(){
     let url=_const.requestUrl+'/hcfshares/login/loginUser'
      let data={
        login_name:this.username,
        pwd:this.password
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _const.token=res.data.token;
              _const.uid=res.data.uid;
              _const.oldpassword=_this.password;
              _this.$message.success(res.msg);
              _const.loginusername=_this.username;
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('uid', res.data.uid);
             _this.$router.push({path:'/index',query:{scode:'000001'}});

            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: rgba(255,255,255,0.2);
  color: #000;
  font-size: 14px;
}
.content{
  width: 500px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -255px;
}
.head{
  background: #eee;
  display: flex;
  justify-content: space-between;
  box-sizing:border-box;
  padding: 8px 6px;

}
.mid{
  width: 70%;
  margin: 60px auto;
}
.mid>p{
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}
.mid>p input{
  height: 30px;
  padding: 2px 2px;
}
.footer{
  width: 70%;
  margin: auto;
  padding-bottom: 40px;
}
.footer button{
  width: 100%;
  color: #fff;
  background: #16191F;
  border: none;
  border-radius: 4px;
  padding:10px 0;
}
span{
    font-size: 0.22rem !important;
}
</style>
