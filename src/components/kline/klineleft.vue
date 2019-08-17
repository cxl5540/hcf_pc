<template>
  <div >
    <div class="klineleft">

    <p class="title" style="color:#2E9FFF;background:#1E232C;display: flex;
    justify-content: space-around;">
     <span @click='back' style='color:#fff;font-size: 18px;'><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></span>
      <span>自选股</span>
      <span></span>
    </p>
    <p class="title" style="color:#848FA3;background:#1E232C">
    <span>股票代码</span>
    <span>最新价</span>
    <span>涨幅跌%</span>
    </p>
    <div v-for="(item,index) in owndata">
      <div class="content1">
      <p><span>{{item.prod_name}}</span><span>{{item.prod_code}}</span></p>
      <span :style="getStyle(item, index)">{{item.last_px}}</span>
      <span :style="getStyle(item, index)">{{item.px_change_rate}}</span>
      </div>
    </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     owndata:[],
      timer:'',
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
   
  },
  mounted(){
    let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
           /* setInterval(function(){
              _this.getdata();
            },5000);*/
          this.timer = setInterval(() => {
                this.getdata();
           }, 5000)
          }
     }
      this.getdata(); 
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods:{
   getdata(){
      let url=_const.requestUrl+'/hcfshares/optional/queryOptionalQuotation'
      let data={
        token:this.token,
        uid:this.uid,
         fields:'prod_name,prod_code,px_change_rate,px_change,last_px,',
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              for(var i=0;i<res.data.length;i++){
                res.data[i].px_change_rate=Number(res.data[i].px_change_rate).toFixed(2);
               /*res.data[i].px_change_rate>0?res.data[i].style='true':res.data[i].style='false'
                Number(res.data[i].px_change_rate)>0?$('.content1>span').css('color','red'):$('.content1>span').css('color','#00FF00')*/
              }
            _this.owndata=res.data;
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
      },
     getStyle(item){
        if(item.px_change_rate>0){
           return 'color:red'
        }else{
            return 'color:#00FF00'
        }
      },
     back(){
      this.$router.push({path:'/index',query:{scode:this.$route.query.scode}})
     } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.klineleft{
width: 16%;
font-size: 0.22rem;
float: left;
border-right: 1px solid rgb(19, 21, 26);
height: 100%;
}

.title{
  padding: 8px 0;
}
.klineleft>p:nth-child(1){
margin-bottom: 2px;
}
.klineleft>p:nth-child(2){
  display: flex;
  justify-content: space-around;
}
.content1{
  display: flex;
  justify-content: space-around;
  height: 60px;
  margin: 10px 0; 
}
.content1>p{
  display: inline-block;
  flex:1;
  line-height: 30px;
  color: #FFF3A9;
}
.content1>p>span{
  display: block;
}
.content1>span{
  display: inline-block;
   flex:1;
   /* height: 30px; */
   line-height: 60px;
   color:#fff; 
}
.red{
  color:red;
}
.green{
  color: #00FF00;
}
</style>
