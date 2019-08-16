<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="num" >
      <el-table
        v-loadmore='loadMore'
      :data="tableData3"  
      height='100%'
      :header-cell-style="{'background-color':'#1F232B','color':'#848fa3','width':'100%',}"
      style="width: 100%;background:#000">
      <el-table-column
      v-for="(item,index) in title"
       :label="item.tile" 
       :key="item.index" 
       :property="item.key"    
        :width="item.width" >
         <template slot-scope="scope">
              {{scope.row[scope.column.property]}}  <!-- 渲染对应表格里面的内容 -->
          </template>
      </el-table-column> 
    </el-table>
    </div>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
     activeName: 'first',
         title:[
    {
      tile:'杠杆倍数',
      key:'ggbs',
      width:'80'
    },{
      tile:'预警线',
      key:'yjx',
      width:'80'
    },{
      tile:'平仓线',
       key:'pcx',
        width:'80'
    },{
      tile:'佣金比例',
       key:'yjbl',
       width:'80'
    },{
      tile:'印花税比例',
       key:'yhsbl',
       width:'100'
    },{
      tile:'保证金',
       key:'bzj',
        width:'100'
    },{
      tile:'自有资金',
       key:'zyzj',
       width:'100'
    },{
      tile:'配资资金',
       key:'pzzj',
       width:'100'
    },{
      tile:'总亏',
       key:'zk',
       width:'100'
    },{
      tile:'平仓盈亏',
       key:'pcyk',
       width:'100'
    },{
      tile:'累计盈亏',
       key:'ljyk',
       width:'100'
    },{
      tile:'保证金金额',
       key:'bzjje',
       width:'100'
    },{
      tile:'配资余额',
       key:'pzye',
       width:'100'
    },{
      tile:'手续费',
       key:'sxf',
       width:'100'
    },{
      tile:'出入金合计',
       key:'crjhj',
       width:''
    }],  
   tableData3: []
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
        return 'background-color:#1F232B;color:#848fa3;font-size:14px;font-weight:100;padding:6px 0;width:100%'
     },
     tablepading({row, column, rowIndex, columnIndex}){
      return 'padding:2px 0;'
     },
    }
  };
</script>
<style scoped>
  
</style>