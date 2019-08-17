<template>
  <div class="klinesright">
    <div class="right_hd">
      <p class="title" style='color:#FFF3A9'>{{prod_name}}{{prod_code}}</p>
      <p class="detal">
      <span>{{prices}}</span>
      <div class="num" style="background:#000">
        <span>{{px_change}}</span>
        <span>{{px_change_rate}}</span>
      </div>
      </p>
    </div>
    <div class="right_mid" >
      <p :style="getStyle(singledata)">
        <span>最新</span>
        <span>{{singledata.last_px | num}}</span>
        <span>开盘</span>
        <span>{{singledata.open_px | num}}</span>
      </p>
      <p :style="getStyle(singledata)">
        <span>涨跌</span>
        <span>{{singledata.px_change | num}}</span>
        <span>最高</span>
        <span>{{singledata.high_px | num}}</span>
      </p>
      <p :style="getStyle(singledata)">
        <span>涨幅</span>
        <span >{{singledata.px_change_rate | num}}</span>
        <span>最低</span>
        <span>{{singledata.low_px | num}}</span>
      </p>   
      <p :style="getStyle(singledata)">
        <span>振幅</span>
        <span>{{singledata.amplitude | num}}</span>
        <span>总市值</span>
        <span>{{singledata.market_value | numval}}</span>
      </p>
      <p>
        <span style='color:red'>涨停</span>
        <span style='color:red'>{{singledata.zt | num}}</span>
        <span style='color:#19d006'>跌停</span>
        <span style='color:#19d006'>{{singledata.dt | num}}</span>
      </p>
    </div>
    <div class="right_mid right_mid2">
      <p><span>卖五</span><span>{{singledata.s5 | num}}</span> <span>{{singledata.sv5 |numval}}</span><span></span></p>
      <p><span>卖四</span><span>{{singledata.s4 | num}}</span><span>{{singledata.sv4|numval}}</span><span></span></p>  
      <p><span>卖三</span><span>{{singledata.s3 | num}}</span> <span>{{singledata.sv3|numval}}</span><span></span></p> 
      <p><span>卖二</span><span>{{singledata.s2 | num}}</span> <span>{{singledata.sv2|numval}}</span><span></span></p>
      <p><span>卖一</span><span>{{singledata.s1 | num}}</span> <span>{{singledata.sv1|numval}}</span><span></span></p>
    </div>
    <div class="right_mid right_mid3">
      <p><span>买一</span><span>{{singledata.b1 | num}}</span><span>{{singledata.bv1  |numval }}</span><span></span></p>
      <p><span>买二</span><span>{{singledata.b2 | num}}</span><span>{{singledata.bv2 |numval}}</span><span></span></p> 
      <p><span>买三</span><span>{{singledata.b3 | num}}</span><span>{{singledata.bv3 |numval}}</span><span></span></p> 
      <p><span>买四</span><span>{{singledata.b4 | num}}</span> <span>{{singledata.bv4 |numval}}</span><span></span></p>
      <p><span>买五</span><span>{{singledata.b5 | num}}</span> <span>{{singledata.bv5 |numval}}</span><span></span></p>
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
    singledata:'',
     prod_code:'',
     prices:'',
     prod_name:'',
     px_change:'',
     px_change_rate:'',
     scode:this.$route.query.scode,
     timer:'',
    token:localStorage.getItem('token'),
    uid:localStorage.getItem('uid'),
    }
  },
  created(){
 this.getdata()

  },
  mounted(){
 let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
              this.timer = setInterval(() => {
                this.getdata();
           }, 5000)
         /*   setInterval(function(){
              _this.getdata();
            },5000);*/
          }
     } 
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  watch:{
    '$route'(){
      this.getdata();
    }
  },
  methods:{
    getStyle(item){
        if(item.px_change_rate>0){
           return 'color:#de0b1c'
        }else{
            return 'color:#19d006'
        }
      },
  getdata(){        //获取个股详情
    let url=_const.requestUrl+'/hcfshares/optional/singleScodeInfo'
      let data={
        token:this.token,
        uid:this.uid,
        scode:this.$route.query.scode
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              if(res.data.length!==0){
                  _this.singledata=res.data[0];
                 _this.prod_code=res.data[0].prod_code;
                 _this.prices=res.data[0].last_px;
                 _this.prod_name=res.data[0].prod_name;
                 _this.px_change_rate=Number(res.data[0].px_change_rate).toFixed(2)+'%';
                 _this.px_change=Number(res.data[0].px_change).toFixed(2);
                 if( _this.px_change>0){
                  $('.detal').css('color','#de0b1c');
                  $('.num').css('color','#de0b1c');
                 }else{
                   $('.detal').css('color','#19d006');
                   $('.num').css('color','#19d006');
                 }
              }
           
            }else if(res.code==400){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    }, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.klinesright{
  width: 20%;
  display: inline-block;
  float: left;
  box-sizing:border-box;
  padding-left: 10px;
  border-left: 1px solid rgb(19, 21, 26);
  height: 100%;
}
.right_hd{
  text-align: left;
   box-sizing:border-box;
   border-bottom: 1px solid rgb(19, 21, 26);
}
.title{
  font-size: 32px;
  color: #fff;
  font-weight: bold;
}
.detal{
  display: inline-block;
/*   color:#00FF00; */
  font-size: 32px;
  font-weight: bold;
  margin-right: 70px;
}
.num{
  display: inline-block;
/*   color:#00FF00; */
  width: 13%;
  position: relative;
  top: 10px;
  margin-top: 2px;
  height: 7vh;

}
.num>span{
  display: inline-block;
  margin: 8px 0;
  font-weight: bold;
}
.right_mid{
/*   box-shadow:0 1px 1px 0 #ccc; */
  margin-top: 10px; 
     border-bottom: 1px solid rgb(19, 21, 26);
}
.right_mid2 span{
  color:#19d006; 
}
.right_mid3 span{
  color:#de0b1c; 
}
.right_mid>p{
 display: flex;
 justify-content: space-between;
 color: rgb(220,220,220);
 text-align: left;
 margin:0.01rem 0;
}
.right_mid>p>span{
  flex:1;
}
</style>
