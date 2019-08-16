<template>
  <div  class="num_bottom">
    <div>
      <div style="position:  relative;">
      <div style="position:absolute;right:50px;top:6px;z-index:999;color:#FFFF00"><span>总资产：{{zichan.totalAssets}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>可用资产：{{zichan.ableFunds}}</span></div>
       <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="买入" name="first">
          <div class="bootm">
            <div class="bottom_left" v-for="(item,index) in singledata" :key='index'>
              <div class="buy">
                <p style="font-size:0.34rem;color:red; font-weight: bold;">买入股票:{{prod_name}}</p>
                <p><span>股票代码：</span><input type="text" v-model='prod_code' v-on:input="change" maxlength="6"></p>
                <p><span>委托价格：</span><input type="number"  v-model='priceb' v-on:input="changenum" step='0.01'>             
                <p><span>可买数量：</span><input type="number" v-model='canbuynum' disabled></p>
                <p style="display:flex;justify:space-around" >
                  <input type="radio" name="colors" value='1' v-model=radiob>全部
                  <input type="radio" name="colors" value='2' v-model=radiob>1/2
                  <input type="radio" name="colors" value='3' v-model=radiob>1/3
                  <input type="radio" name="colors" value='4' v-model=radiob>1/4
                </p>
              <p><span>买入数量：</span><input type="number" v-model='buynum'  min="0" step='100'></p>
               
              </div>
              <div class="bottom_mid">
                <div class="right_mid2">
                  <p><span>卖五</span><span>{{item.s5 | num}}</span><span>{{item.sv5 | numval}}</span></p>
                  <p><span>卖四</span><span>{{item.s4 | num}}</span><span>{{item.sv4 | numval}}</span></p>
                  <p><span>卖三</span><span>{{item.s3 | num}}</span><span>{{item.sv3 | numval}}</span></p>
                  <p><span>卖二</span><span>{{item.s2 | num}}</span><span>{{item.sv2 | numval}}</span></p>
                  <p><span>卖一</span><span>{{item.s1 | num}}</span><span>{{item.sv1  | numval}}</span></p>
                </div>
                 <div style="margin-top:10px" class="right_mid3">
                  <p><span>买一</span><span>{{item.b1 | num}}</span><span>{{item.bv1  | numval}}</span></p>
                  <p><span>买二</span><span>{{item.b2 | num}}</span><span>{{item.bv2 | numval}}</span></p>
                  <p><span>买三</span><span>{{item.b3 | num}}</span><span>{{item.bv3 | numval}}</span></p>
                  <p><span>买四</span><span>{{item.b4 | num}}</span><span>{{item.bv4 | numval}}</span></p>
                  <p><span>买五</span><span>{{item.b5 | num}}</span><span>{{item.bv5 | numval}}</span></p>
                </div>
              </div>
              <div style="margin-left:10px;" v-show='buyshow'>
              <span >
                <el-checkbox v-model="checkedbuy" style='position: relative;top: -46px;'>市价</el-checkbox>
               </span> 
                 <button style="background:red" @click='buyin'>买入</button>
              </div>
            </div>
            <div class="bottom_right">
              <div class="numtag">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="持仓" name="first1">
                    <Hold v-on:detail='getdetal' v-on:canbuynum='getbuynum'  v-bind:state='state'></Hold>
                  </el-tab-pane>
                  <el-tab-pane label="委托" name="second2">
                    <Entrust v-on:detail='getdetal'  v-on:canbuynum='getbuynum'  v-bind:state='state'></Entrust>
                  </el-tab-pane>
                    <el-tab-pane label="成交" name="thrid">
                    <Chengjiao  v-bind:state='state'></Chengjiao>
                  </el-tab-pane>
                   <el-tab-pane label="资金" name="four">
                    <Zijin  v-bind:state='state'></Zijin>
                  </el-tab-pane>
                </el-tabs>
                </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="卖出" name="second">
          <div class="bootm">
            <div class="bottom_left" v-for="(item,inde) in singledata">
              <div class="buy">
                <p style="font-size:0.34rem;color:#00FF00; font-weight: bold;">卖出股票:{{prod_name}}</p>
                <p><span>股票代码：</span><input type="text" v-model='prod_code' v-on:input="change" maxlength="6"></p>
                <p><span>委托价格：</span><input type="number"  v-model='prices'  v-on:input="changesnum" step='0.01'></p>
                <p><span>可卖数量：</span><input  v-model='cansellnum' disabled></p>
                <p style="display:flex;justify:space-around" >
                  <input type="radio" name="colors" value='1'  v-model=radios>全部
                  <input type="radio" name="colors"  value='2' v-model=radios>1/2
                  <input type="radio" name="colors"  value='3'  v-model=radios>1/3
                  <input type="radio" name="colors"  value='4'  v-model=radios>1/4
                </p>
               <p><span>卖出数量：</span><input type="number"  min="0" step='100' v-model='sellnum'></p>
              </div>
              <div class="bottom_mid">
                <div class="right_mid2">
                  <p><span>卖五</span><span>{{item.s5 | num}}</span><span>{{item.sv5 | numval}}</span></p>
                  <p><span>卖四</span><span>{{item.s4 | num}}</span><span>{{item.sv4 | numval}}</span></p>
                  <p><span>卖三</span><span>{{item.s3 | num}}</span><span>{{item.sv3 | numval}}</span></p>
                  <p><span>卖二</span><span>{{item.s2 | num}}</span><span>{{item.sv2 | numval}}</span></p>
                  <p><span>卖一</span><span>{{item.s1 | num}}</span><span>{{item.sv1  | numval}}</span></p>
                </div>
                 <div style="margin-top:10px" class="right_mid3">
                  <p><span>买一</span><span>{{item.b1 | num}}</span><span>{{item.bv1  | numval}}</span></p>
                  <p><span>买二</span><span>{{item.b2 | num}}</span><span>{{item.bv2 | numval}}</span></p>
                  <p><span>买三</span><span>{{item.b3 | num}}</span><span>{{item.bv3 | numval}}</span></p>
                  <p><span>买四</span><span>{{item.b4 | num}}</span><span>{{item.bv4 | numval}}</span></p>
                  <p><span>买五</span><span>{{item.b5 | num}}</span><span>{{item.bv5 | numval}}</span></p>
                </div>
              </div>
              <div style="margin-left:10px;" v-show='buyshow'>
               <span style='position: relative;top: -46px;'>
                <el-checkbox v-model="checkedsell">市价</el-checkbox>
                </span>
                 <button style="background:green" @click='sellout'>卖出</button>
              </div>
            </div>
            <div class="bottom_right">
              <div class="numtag">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="持仓" name="first1">
                    <Hold  v-on:detail='getdetal' v-on:cansellnum='getsellnumchid'  v-bind:state='state'></Hold>
                  </el-tab-pane>
                  <el-tab-pane label="委托" name="second2">
                    <Entrust v-on:detail='getdetal' v-on:cansellnum='getsellnumchid'  v-bind:state='state'></Entrust>
                  </el-tab-pane>
                  <el-tab-pane label="成交" name="thrid" >
                    <Chengjiao  v-bind:state='state'></Chengjiao>
                  </el-tab-pane>
                  <el-tab-pane label="资金" name="four" >
                    <Zijin  v-bind:state='state'></Zijin>
                  </el-tab-pane>
                </el-tabs>
                </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="撤单" name="third">
        <Chedan></Chedan>
        </el-tab-pane>
        <el-tab-pane label="查询" name="fourth">
        <Search></Search>
        </el-tab-pane>
      </el-tabs>
      </div>
    </div>
    <div class="footer">
      <span><i class="fa fa-star"></i>版本：</span><span>v1.0.0.23&nbsp;&nbsp;</span>
      <span><i class="fa fa-star"></i>交易服务：</span><span>{{jyfw}}&nbsp;&nbsp;</span>
      <span><i class="fa fa-star"></i>行情服务：</span><span>{{hqfw}}</span>
    </div>
  </div>
</template>

<script>
/*import Numbottag from './numbottag'*/
import Chedan from './chedan'
import Search from './search'
import Hold from './hold'
import Entrust from './entrust'
import Chengjiao from './chengjiao'
import Zijin from './zijin'
export default {
  props:['itemdata'],
  name: 'index',
  components:{
  /* Numbottag,*/
   Chedan,
   Search,
   Entrust,
   Hold,
   Chengjiao,
   Zijin
  },

  data () {
    return {
      buyshow:true,
    activeName2: 'first',
    activeName:'first1',
      hqfw:'',
      jyfw:'',
    ids:'100011',
      num8: 1,
      checkedsell:false,
      checkedbuy:false,
      singledata:'',
      prod_code:'',
      price:'',
      canbuynum:'',
      cansellnum:'',
      sellnum:'0',
      radiob:'2',
      radios:'1',
      buynum:'0',
      priceb:'',
      scode:this.$route.query.scode,
      ztprice:'',
      zichan:'',
      prices:'',
      last_px:'',
      prod_name:'',
      timer:'',
      state:''
    }
  },
  created(){
    this.getprice(); //获取委托价格
   this.getdatazc();
    this.getdatabuy();
   this.getconcat(); //获取链接
 /*  this.activeName='first1'; */
   if(this.$route.query.scode=='399005' || this.$route.query.scode=='399006'|| this.$route.query.scode=='399001'|| this.$route.query.scode=='000001.SS'){
    this.buyshow=false;

   }else{    
     this.buyshow=true;
   }
        //获取个股详情买
  },
  mounted(){
  let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
             this.timer = setInterval(() => {
                this.getdatabuy();
          }, 5000)
            /*setInterval(function(){
              _this.getdatabuy();
            },5000);*/
          }
     } 

  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  watch:{
    activeName(val){
      if(val=='second2'){
          this.state='weituo'
          console.log(this.state);
        }else if(val=='thrid'){
          this.state='chengjiao'     
        }else if(val=='four'){
         this.state='zijin'       
        }
      },
    itemdata(val){
      this.singledata[0]=val;
      this.prod_code=val.prod_code;

    },
  '$route'(){   //搜索更新
      this.scode=this.$route.query.scode; 
      this.getdatabuy();
      this.getprice();
    },
    radiob(val){   //买入数量
     if(val=='1'){
      this.buynum=this.canbuynum;
     }else if(val=='2'){
      this.buynum=(parseInt(Number(this.canbuynum)/2/100)) * 100
     }else if(val=='3'){
       this.buynum=(parseInt(Number(this.canbuynum)/3/100)) * 100
     }else if(val=='4'){
        this.buynum=(parseInt(Number(this.canbuynum)/4/100)) * 100
     }
   
    },

    radios(val){   //卖出数量
     if(val=='1'){
      this.sellnum=this.cansellnum;
     }else if(val=='2'){
      this.sellnum=(parseInt(Number(this.cansellnum)/2/100)) * 100
     }else if(val=='3'){
       this.sellnum=(parseInt(Number(this.cansellnum)/3/100)) * 100
     }else if(val=='4'){
        this.sellnum=(parseInt(Number(this.cansellnum)/4/100)) * 100
     }
    },
    checkedbuy(val){  //判断买入市价
      if(val==true){
        this.priceb=this.last_px;
        this.buyshijia();
      }else if(val==false){
        this.getbuynum();
      }
    },
    checkedsell(val){ //判断卖出市价
      if(val==true){
        this.prices=this.last_px;
      }else if(val==false){

      }
    }
  },
  methods:{
    getdetal(data){//个股详情
      this.singledata=data;
      this.prod_code=data[0].prod_code;
      this.prod_name=data[0].prod_name;
      this.priceb=data[0].last_px;
      this.prices=data[0].last_px;
    },
    getbuynum(data){ //可买数量
    this.buynum=data;
    },
    getsellnumchid(data){ //可卖
     this.cansellnum=data; 
    },
    getdatazc(){
      let url=_const.requestUrl+'/hcfshares/codeinfo/userAssets'
      let data={
        token:_const.token,
        uid:_const.uid,

      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.zichan=res.data;
            /*_this.tableData3.push(res.data)*/
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
   getprice(){
     if(this.scode==undefined){
      return;
    }
    let url=_const.requestUrl+'/hcfshares/optional/singleScodeInfo'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.scode,
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
                _this.prices=res.data[0].last_px;
                _this.priceb=res.data[0].last_px;
                _this.prod_code=res.data[0].prod_code;
               _this.prod_name=res.data[0].prod_name;
                if(_this.prices){
                  _this.getsellnum();
                 }
                 if(_this.priceb){
                  _this.getbuynum();
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
  getdatabuy(){        //获取个股详情买入
    if(this.scode==undefined){
      return;
    }
    let code=this.scode;
    let url=_const.requestUrl+'/hcfshares/optional/singleScodeInfo'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.scode,
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
                /*if(_this.scode=='399001'||_this.scode=='399005'||_this.scode=='399006'||_this.scode=='000001.SS'){
                  _this.singledata=[];
                }else{
                   _this.singledata=res.data;
                }*/
                    _this.singledata=res.data;
                    _this.last_px=res.data[0].last_px;             
                   _this.ztprice=res.data[0].zt;

                            
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
    getbuynum(){  //可买数量
       let url=_const.requestUrl+'/hcfshares/commionwith/canBuyShares'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.scode,
        sharesprice:this.priceb,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.canbuynum=res.data;

            }else if(res.code==400){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    },
    changenum(){  //根据价格改数量
      this.getbuynum();
    },
    buyin(){  //买入
      let cprice=''
     if(this.checkedbuy==true){
      cprice=1;
     }else{
      cprice=0;
     } 
      let url=_const.requestUrl+'/hcfshares/commionwith/buyEntShares'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.scode,
        sname:this.singledata[0].prod_name,
        snum:this.buynum,
        cprice:cprice,
        sprice:this.priceb,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.$message.success(res.msg);
            _this.buynum='0';
            _this.getdatazc();
            }else if(res.code==400){
               _this.$message.error(res.msg);
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
    buyshijia(){   //可买市价
      let _this=this;
       $.ajax({
            url:_const.requestUrl + '/hcfshares/commionwith/canBuyShares',
            dataType: 'JSON',
            type: 'POST',
            data: {
                token:_const.token,
                uid:_const.uid,
                sharescode:this.scode,
                sharesprice:this.ztprice
            },
            success: (res) => {
                if (res.code == 0) {
                  _this.canbuynum=res.data;          
                } else {
                    pop(res.msg, 1000)
                }
            },
            error: function () {
                pop('服务器故障！',1000)
            }
        })
    },
     getsellnum(){  //可卖数量
       let url=_const.requestUrl+'/hcfshares/commionwith/canSellSharesNum'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.scode,

      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
              _this.cansellnum=res.data;
            }else if(res.code==400){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
             _this.$message.error(res.msg);
          }
      });
    },
    changesnum(){   //根据价格可卖数量
      this.getsellnum();
    },
    sellout(){   //卖出
       let cprice=''
     if(this.checkedbuy==true){
      cprice=1;
     }else{
      cprice=0;
     } 
      let url=_const.requestUrl+'/hcfshares/commionwith/sellEntShares'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.scode,
        sname:this.singledata[0].prod_name,
        snum:this.sellnum,
        cprice:cprice,
        sprice:this.prices,
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.getdatazc();
            _this.$message.success(res.msg);
            _this.sellnum='0';
             _this.getdatazc();
            }else if(res.code==400){
               _this.$message.error(res.msg);
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
   getconcat(){  //获取链接
      let url=_const.requestUrl+'/hcfshares/codeinfo/transService';
       let data={
          token:_const.token,
          uid:_const.uid
        }
       let _this=this;
       $.ajax({
          url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){                            
              if(res.data=='a1'){
                _this.jyfw='已连接';
                _this.hqfw='已连接';
              }else if(res.data=='a0'){
                _this.jyfw='已断开';
                _this.hqfw='已断开';
              }else if(res.data=='t0'){
                 _this.jyfw='已断开';
                 _this.hqfw='已连接';
              }
            }
          },          
          error:function(){
             _this.$message.error('网络错误');
          }
      });
    },
    change(){
      if(this.prod_code.length==6){
          this.scode=this.prod_code;
          this.getdatabuy();
          this.getprice();
          this.$router.push({path:'/klines',query:{scode:this.prod_code}})
        }
    },
   handleClick(tab, event) {
      /*  $(this).css('background','#000')*/
      },
    handleChange(value) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.num_bottom{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999;
  height:40vh;
  background: #000;
}
.bootm{
  background: #13151A;
 /*  overflow: hidden; */
}
.bottom_left{
/*   width: 20vw; */
  float: left;
  color: #95A2B7;
  background:#13151A;
  text-align: left;
}
.bottom_left>div:nth-child(1){
  float: left;
width: 56%;
box-sizing: border-box;
    padding-left: 10px;
}
.bottom_left>div:nth-child(2){
width: 44%;
}
.bottom_left input{
  background: #292F39;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding:8px 4px;
  width: 44%;
}
input[type='radio']{
   width: 8%;
}
.bottom_left p{
  padding:2px 0;
}
.bottom_mid{
  float: left;
box-sizing:border-box;
padding: 0 10px;
}
.bottom_mid p{
  display: flex;
 /*  justify-content: space-between; */
  margin: 2px 0;

}
.bottom_mid p>span{
  display: inline-block;
  width: 40%;
}
.footer{
  text-align: right;
  box-sizing:border-box;
  height: 2vh;
  position: absolute;
  right: 60px;
  bottom:0;
  width: 100%;
}
.footer>span:nth-child(odd){
  color: #fff;
}
.footer>span:nth-child(even){
  color: #00FF00;
}
.bottom_left button{
  border: 1px solid #fff;
  position: relative;
  top: -10px;
}
.bottom_left button:nth-child(1){
  background:#000;
  color: #fff;
  padding: 4px 6px;
  border-radius: 4px;
  position: relative;
top: -34px;
}
.buy>p>span{
  display: inline-block;
  width: 40%;
}

.bottom_left button:nth-child(2){
  background:red;
  color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  width: 36%;
  border: none;
  margin-top: 20px;
  position: relative;
  top: -60px;
 }
.right_mid2 span{
  color:#19d006; 
}
.right_mid3 span{
  color:#de0b1c; 
}
.bottom_mid p>span:nth-child(1){
  width: 30%;
}
.bottom_mid p>span:nth-child(2){
  width: 40%;
}
.bottom_mid p>span:nth-child(3){
  width: 65%;
}
</style>

