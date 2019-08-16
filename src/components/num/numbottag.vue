<template>
  <div class="numtag">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="持仓" name="first">
      <Hold></Hold>
    </el-tab-pane>
    <el-tab-pane label="委托" name="second">
      <Entrust></Entrust>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import Hold from './hold'
import Entrust from './entrust'
  export default {
    components:{
     Hold,
     Entrust,
  },
    data() {
      return {
        activeName: 'first',
         title:[
    {
      tile:'股票代码',
      key:'ids'
    },{
      tile:'股票名称',
      key:'name'
    },{
      tile:'总持仓数',
       key:'holdnum'
    },{
      tile:'可卖数量',
       key:'cansale'
    },{
      tile:'冻结数量',
       key:'cannotnum'
    },{
      tile:'参考成本价',
       key:'yesprice'
    },{
      tile:'当前价',
       key:'nowprice'
    },{
      tile:'参考盈亏',
       key:'profloss'
    },{
      tile:'持仓市值',
       key:'markval'
    },{
      tile:'盈亏比例%',
       key:'proflosspcent'
    },

    ],  
   tableData3: [{
          'ids': '1002011',
          'name': '平安银行',
          'holdnum': '1111',
          'cansale':'4',
          'cannotnum': '55',
          'yesprice':'1000',
          'nowprice':'1',
          'profloss':'333',
          'markval':'222',
          'proflosspcent':'7%'

        },
        ]
      };
    },
    methods: {
      handleClick(tab, event) {
        
      },
       tableRowStyle({row,rowIndex}){
         return 'background-color:#13151A;color:#fff;font-size:12px;'
    },
              //设置表头行的样式
      tableHeaderColor({row,column,rowIndex,columnIndex}){
        return 'background-color:#1F232B;color:#848fa3;font-size:14px;font-weight:100;padding:6px 0;'
     },
     tablepading({row, column, rowIndex, columnIndex}){
      return 'padding:2px 0;'
     },
    }
  };
</script>
<style scoped>
.numtag {
  /* position: relative; */
}  
</style>