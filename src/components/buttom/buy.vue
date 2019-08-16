<template>
 
 <div class="bootm">
      <div class="bottom_left">
        <div>
          <p style="font-size:20px;color:red; font-weight: bold;">买入股票：平安银行</p>
          <p><span>股票代码：</span><input type="text" v-model='ids'></p>
          <p><span>委托市价：</span><el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number><el-checkbox v-model="checked">市价</el-checkbox></p>
          <p><span>可用资金：</span><input type="text" v-model='ids'></p>
          <p><span>可买数量：</span><input type="text" v-model='ids'></p>
          <p style="display:flex;justify:space-around" >
            <input type="radio" name="colors">全部
            <input type="radio" name="colors" checked>1/2
            <input type="radio" name="colors">1/3
            <input type="radio" name="colors">1/4
          </p>
        <p><span>买入数量：</span><el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number><el-checkbox v-model="checked">股</el-checkbox></p>
        </div>
        <div class="bottom_mid">
          <div>
            <p><span>卖五</span><span>11.14</span><span>1000</span></p>
            <p><span>卖四</span><span>11.14</span><span>1000</span></p>
            <p><span>卖三</span><span>11.14</span><span>1000</span></p>
            <p><span>卖二</span><span>11.14</span><span>1000</span></p>
            <p><span>卖一</span><span>11.14</span><span>1000</span></p>
          </div>
           <div style="margin-top:10px">
            <p><span>卖一</span><span>11.14</span><span>1000</span></p>
            <p><span>卖二</span><span>11.14</span><span>1000</span></p>
            <p><span>卖三</span><span>11.14</span><span>1000</span></p>
            <p><span>卖四</span><span>11.14</span><span>1000</span></p>
            <p><span>卖五</span><span>11.14</span><span>1000</span></p>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

  export default {
    components:{

  },
    data() {
      return {
      
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        $(this).css('background','#000')
      },
    handleChange(value) {
      console.log(value);
    }
    }
  };
</script>
<style scoped>
 .bootm{
  background: #13151A;
  overflow: hidden;
}
.bottom_left{
  width: 24%;
  float: left;
  color: #95A2B7;
  background:#13151A;
}
.bottom_left>div:nth-child(1){
  float: left;
width: 66%;
}
.bottom_left>div:nth-child(2){
width: 34%;
}
.bottom_left input{
  background: #292F39;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding:8px 4px;
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
  justify-content: space-between;
  margin: 2px 0;

}
</style>