<template>
  <div >
    <div class="header">
      <div style="margin-left:.5vw;width:20%;text-align: left;"><img src="../../assets/logo1.png" alt=""><span>弘财富客户端</span></div>
      <div class="hedtag">
        <span style='color:#fff;margin-right:30px'>欢迎您：{{username}}</span>
        <span style='color:#fff;margin-right:30px' @click='esc' class='esc'>安全退出</span>
        <input  type="change" placeholder='修改密码' @click='changepassword'><i class="fa fa-lock"></i></input>
        <input  type="search" placeholder='输入股票名/号码' @click='searchval'> <i class="fa fa-search"></i></input>      
      </div>
     </div>
      <div class="model">
        <div class="content">
        
        <p class="head">
          <span>修改密码</span>
          <span @click='closemodel'><i class="fa fa-times"></i></span>
        </p>
         <div class="mid">         
           <p>
           <span>原密码:</span>
           <input type="password" v-model='oldpass'>
           </p>
           <p>
           <span>新密码:</span>
           <input type="password" v-model='newpass' >
           </p>
           <p>
           <span>确认新密码:</span>
           <input type="password" v-model='renewpass'>
           </p>
        </div>
        <div class="footer">
         <button  @click='closemodel'>取消</button>
         <button @click='upadatepass'>确认</button>
        </div>
      </div>
    </div>
    <div class="searval">
      <p><span>按键精灵</span><span @click='closeseach'><i class="fa fa-times"></i></span></p>
      <p><input type="text"  v-model="searchv" v-on:input="change"></p>
      <ul>
        <li v-for="(item,index) in searchlist" @click='goklin(item)'>
        <span>{{item.prod_name}}</span>
        <span>{{item.prod_code}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      oldpass:'',
      newpass:'',
      renewpass:'',
      username:'',
      searchv:'',
      searchlist:'',
      token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
   this.username=_const.loginusername;
  },
  mounted(){
   $('.searval ul').hide()
  },
  methods:{
    changepassword(){          //打开修改密码框
      $('.model').show();
    },
    closemodel(){              //关闭修改密码框 
        $('.model').hide();
    },
    searchval(){
      $('.searval').show();
    },
    closeseach(){
       $('.searval').hide();
    },
    upadatepass(){
      let url=_const.requestUrl+'/hcfshares/login/updateUserPwd'
      let data={
        token:this.token,
        uid:this.uid,
        pwd:this.newpass,
        ypwd:this.oldpass,
        pwdh:this.renewpass,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              localStorage.removeItem('token');
              localStorage.removeItem('uid');
              setTimeout(function(){
                 _this.$message.success(res.msg+'请重新登录');
                  _this.$router.push({path:'/'});

               },2000);
                          
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }else if(res.code==400){
                _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    },
    change(){
      $('.searval ul').slideDown();
      let url=_const.requestUrl+'/hcfshares/optional/queryWhrereShares'
      let data={
        where:this.searchv
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
             _this.searchlist=res.data;
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }else if(res.code==400){
                _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });

    },
    goklin(item){
      this.$router.push({path:'/klines',query:{scode:item.prod_code}});
    },
    esc(){
      this.$confirm('是否安全退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
       let url=_const.requestUrl+'/hcfshares/login/exitLog'
      let data={
        token:this.token,
        uid:this.uid
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.$router.push('/');
             _this.$message.success('已安全退出');
             localStorage.removeItem('token');
              localStorage.removeItem('uid');
          }
        },       
          error:function(){
             _this.$message.error(res.msg);
          }
      });
       }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  background: #16191F;
  color: #fff;
  display: flex;
  justfiy-content:space-around;
  justify-content: space-between;
  padding: 14px 10px;
box-sizing:border-box;
height: 5vh;
}
.model{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: rgba(255,255,255,0.2);
  display: none;
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
  display: flex;
  justify-content: space-around;
  background: #eee;
  padding: 30px 0;
}
.footer button{
  border: none;
  background: #606266;
  color: #fff;
  padding: 8px 18px;
  border-radius: 4px;
}
.searval{
  width: 300px;
  height: 440px;
  background: #292F39;
  color: #fff;
  position: absolute;
  right: 10px;
  top: 50px;
  z-index: 99999;
  border: 1px solid #000;
  display: none;
}
.searval>p:nth-child(1){
  display: flex;
  justify-content: space-between;
  box-sizing:border-box;
  padding: 8px 6px;
}
.searval input{
 width: 96%;
 background: #000;
 border: none;
 height: 30px;
 border: 1px solid #409EFF;
 margin: auto;
 color: #fff;
}
input[type='search'],input[type='change']{
background: #000;
border:none;
padding: 6px 10px;
width: 30%;
}
.hedtag{
  position: relative;
  width: 54%;
}
.fa-search{
  position: absolute;
  right:12%;
   top: 8px;
}
.fa-lock{
   position: absolute;
  right: 44%;
   top: 8px; 
}
.searval ul>li{
color: #fff;
display: flex;
justify-content: space-around;
margin:10px 0;
cursor: pointer;
}
.searval ul>li>span{
  display: inline-block;
  width: 50%
}
.esc:hover{
  cursor: pointer;
  color: rgb(255, 255, 0);
}

</style>
