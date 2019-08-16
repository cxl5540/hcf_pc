<template>
  <div class="kimg">
    <div class="kimghed">     
      <p>
     <!--  <span style="padding-right:40px" @click='back'>返回</span> -->
      <span @click='getmin' >分时图</span>
      <span  @click='getday'>日线</span>
      <span  @click='getweek'>周线</span>
      <span  @click='getmon'>月线</span>
      </p>
      <span><button @click='addown'>加入自选股</button></span> 
    </div>
    <div id='main'>
      <div id="echartContainermin" ref="echartContainermin"  style="width:100%; height:100%"></div>
      <div id="echartContainer" ref="echartContainer"  style="width:100%; height:100%"></div>
      <div id="echartContainerw" ref="echartContainerw"  style="width:100%; height:100%"></div>
      <div id="echartContainerm" ref="echartContainerm"  style="width:100%; height:100%"></div>
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
     mindata:'',
     type:'D',
     s:'' ,
     ftimeArr:'',
     timer:'',
     screenWidth: '',
     myChart1:'',
     myChart2:'',
     myChart3:'',
     myChart4:''
    }
  },
  created(){
       this.time_arr(); 
    this.getdata();
  this.getmindata();
  this.getwdatat();
  this.getmdatat();
 

  },
  mounted(){
      let _this=this;
    if(_const.week !== 0 && _const.week !== 6){
          if(_const.timeNow > _const.timeDayStart1  && _const.timeNow < _const.timeDayEnd1 || _const.timeNow > _const.timeDayStart2 && _const.timeNow < _const.timeDayEnd2){
             this.timer = setInterval(() => {
                this.getdata();
           }, 5000)
          }
     }
      $('.kimghed span').eq(0).addClass("red");
     $('#echartContainermin').show();
    $('#echartContainer,#echartContainerw,#echartContainerm').hide();
    const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.getElementById("main").clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
        this.screenWidth=document.getElementById("main").clientWidth
       /* console.log(this.screenWidth);*/

  },
   watch:{
    '$route'(){
      this.getdata();
      this.getmindata();
      this.getwdatat();
      this.getmdatat();
    },
    screenWidth(val){
      this.screenWidth=val;
    if(this.myChart1){        
       this.myChart1.resize();
      }
      if(this.myChart2){        
       this.myChart2.resize();
      }
      if(this.myChart3){        
       this.myChart3.resize();
      }
      if(this.myChart4){        
       this.myChart4.resize();
      }
    }
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods:{
  addTimeStr(time,num){ 
  var hour=time.split(':')[0];
  var mins=Number(time.split(':')[1]);
  var mins_un=parseInt((mins+num)/60);
  var hour_un=parseInt((Number(hour)+mins_un)/24);
  if(mins_un>0){
    if(hour_un>0){
      var tmpVal=((Number(hour)+mins_un)%24)+"";
      hour=tmpVal.length>1? tmpVal:'0'+tmpVal;//判断是否是一位
    }else{
      var tmpVal=Number(hour)+mins_un+"";
      hour=tmpVal.length>1? tmpVal:'0'+tmpVal;
    }
    var tmpMinsVal=((mins+num)%60)+"";
    mins=tmpMinsVal.length>1? tmpMinsVal:0+tmpMinsVal;//分钟数为 取余60的数
  }else{
    var tmpMinsVal=mins+num+"";
    mins=tmpMinsVal.length>1? tmpMinsVal:'0'+tmpMinsVal;//不大于整除60
  } 
  return hour+":"+mins;
},
  getNextTime(startTime, endTIme, offset, resultArr) {
    var result = this.addTimeStr(startTime, offset);
    resultArr.push(result);
    if (result == endTIme) {
      return resultArr;
    } else {
      return this.getNextTime(result, endTIme, offset, resultArr);
    }
  },
  time_arr(){
    var timeArr = new Array();
      timeArr.push('09:30');
      timeArr.concat(this.getNextTime('09:30', '11:29', 1, timeArr)); 
      timeArr.push('13:00');
      timeArr.concat(this.getNextTime('13:00', '15:00', 1, timeArr)); 
      this.ftimeArr=timeArr;
  },
  getmin(){ 
   this.getdata(); 
      $('.red').removeClass("red");
   $('.kimghed span').eq(0).addClass("red");
   $('#echartContainermin').show();
   $('#echartContainer,#echartContainerw,#echartContainerm').hide()
    },
  getday(){
    this.getmindata()
     $('.red').removeClass("red");
     $('.kimghed span').eq(1).addClass("red");
   $('#echartContainer').show();
   $('#echartContainermin,#echartContainerw,#echartContainerm').hide();
    },
  getweek(){
       this.getwdatat();     
    $('.red').removeClass("red");
    $('.kimghed span').eq(2).addClass("red");
   $('#echartContainerw').show();
   $('#echartContainermin,#echartContainer,#echartContainerm').hide();

  },
  getmon(){
      this.getmdatat();
    $('.red').removeClass("red");
  $('.kimghed span').eq(3).addClass("red");
   $('#echartContainerm').show();
   $('#echartContainermin,#echartContainer,#echartContainerw').hide();
  },  
  getdata(){  //获取分时线
    let url=_const.requestUrl+'/hcfshares/optional/getTimeSharing'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.$route.query.scode,
        limit:'242'
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){       
            if(res.code==0){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let close_px=[];
             let avg_px=[];
             let volume=[];
             for(var i=0;i<res.data.length;i++){
               res.data[i].tick_at=_this.ftimeArr[i];
             }

              for(let p of res.data){
                    categoryData.push(p.tick_at)  //拆分' ' 去掉分时
                     close_px.push(Number(p.close_px).toFixed(2));
                      avg_px.push(Number(p.avg_px).toFixed(2));
                      volume.push(p.turnover_volume);
                   } 
     
    var option = {
       color: ['#fff','yellow','red'],
       backgroundColor: '#000',
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },

      },
        legend: {
        top: 20,
        data: ['均价', '当前价',],
        textStyle: {
          fontSize: 12,
          color: '#fff'
        },
    },
      grid: [
        {
          left: "3%",
          top: "20",
          height: "75%"
        },
        {
          left: "3%",
          right: "10%",
          top: "86%",
          height: "12%"
        }
      ],
      xAxis: [
        {        
          data: _this.ftimeArr,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

          splitNumber: 20
        },
        {       
          gridIndex: 1,
          data:_this.ftimeArr,
          axisLabel: { 
            show: false,

           }
        }
      ],

      yAxis: [    
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },
        
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],

      series: [
  
        {
          name: "当前价",
          type: "line",
          data: close_px,        
          smooth: false,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,

            }
          }
        },
        {
          name: "均价",
          type: "line",
          data: avg_px,        
          smooth: false,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
        },
        {
          name: '成交量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volume,
          itemStyle: {
              normal: {
                color:'red'
              }
          },
        
        },
        ]
    }  
    _this.myChart1 = echarts.init(_this.$refs.echartContainermin);
     _this.myChart1.setOption(option); 
      _this.myChart1.resize();   

            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
          
          }
      });
   }, 
   getmindata(){  //获取日线
    let url=_const.requestUrl+'/hcfshares/optional/getKline'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.$route.query.scode,
        type:this.type,
        limit:'500'
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let svg_px=[];
             let m10data=[];
             let m20data=[];
             let m30data=[];
             let m60data=[];
             let volume=[];
             let volumes=[];
             let px_change=[];
              for(let p of res.data){
                    categoryData.push(p.tick_at.split(' ')[0])  //拆分' ' 去掉分时
                      values.push(
                          [p.open_px,p.close_px,p.low_px,p.high_px,p.turnover_volume,p.turnover_value]
                      );
                     svg_px.push(p.ma5);
                     m10data.push(p.ma10);
                      m20data.push(p.ma20);
                      m30data.push(p.ma30);
                      m60data.push(p.ma60);
                     volume.push({'value':p.turnover_volume,'px_change':p.px_change,});
                     volumes.push(p.turnover_volume)

                   } 

    var option = {
     backgroundColor: '#000',
    legend: {
        top: 20,
        data: ['日K', 'MA5', 'MA10','MA20','MA30','MA60', 'Volume'],
        textStyle: {
          fontSize: 12,
          color: '#fff'
        },
    },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
          confine:true,
            formatter:function(res){           
                  if(res.length==1){
                    return '成交量：'+res[0].value;
                   } else{
                      return res[0].axisValue + '<br/>' +
                    '开盘：' + res[0].data[1] + '<br/>' +
                    '收盘：' + res[0].data[2] + '<br/>' +
                    '最低：' + res[0].data[3] + '<br/>' +
                    '最高：' + res[0].data[4] + '<br/>' +
                    '成交量：' + res[0].data[5] + '<br/>' +
                    '成交额：' + res[0].data[6] + '<br/>' +
                    (res[1] && res[1].data !== '-' ? res[1].seriesName + '：' + res[1].data.toFixed(2) + '<br/>' : '') +
                    (res[2] && res[2].data !== '-' ? res[2].seriesName + '：' + res[2].data.toFixed(2) + '<br/>' : '') +
                    (res[3] && res[3].data !== '-' ? res[3].seriesName + '：' + res[3].data.toFixed(2) + '<br/>' : '')
                   } 
            }
      },
      grid: [
        {
          left: "3%",
          top: "20",
          height: "75%"
        },
        {
          left: "3%",
          right: "10%",
          top: "86%",
          height: "12%"
        }
      ],
      xAxis: [
        {       
          data: categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

          
        },
        {       
          gridIndex: 1,
          data:categoryData,
          axisLabel: { 
            show: false,

           }
        }
      ],
      yAxis: [    
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },
        
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],
      dataZoom: [
        {
          type: "inside",
          start: 100,
          end: 80
        },
        {
          show: false,
          type: "slider",
          y: "90%",
          start: 50,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 20,
          end: 100
        },      
      ],
      series: [
        {
          name: "日K",
          type: "candlestick",
          data:values,
          itemStyle: {
                normal: {
                     color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            },

          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
          name: "MA5",
          type: "line",
          data: svg_px,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            
            }
          }
        },
        {
          name: "MA10",
          type: "line",
          data: m10data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
             
            }
          }
        },
        {
          name: "MA20",
          type: "line",
          data: m20data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
             
            }
          }
        },
        {
          name: "MA30",
          type: "line",
          data: m30data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
             
            }
          }
        },
        {
          name: "MA60",
          type: "line",
          data: m60data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
             
            }
          }
        },
        {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,      
        itemStyle: {
            normal: {
             color: function(params) {
                var colorList;
               if (params.data.px_change >0) {
                  colorList = "#FD1050";
                } else {
                  colorList = "#0CF49B";
                }
                return colorList;
              }
            }
        },
      
     },
      ],
/*     tooltip: {
                    formatter: function (param) {
                      console.log(param.data);
                        return '开盘价' + param.data[1]+ '<br>' ;
                    }
                }*/
    }  
       _this.myChart2 = echarts.init(_this.$refs.echartContainer);   
       _this.myChart2.setOption(option);
       _this.myChart2.resize();
              
            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
          
          }
      });
   },
  getwdatat(){  //获周时间
    let url=_const.requestUrl+'/hcfshares/optional/getKline'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.$route.query.scode,
        type:'W',
        limit:'500'
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let svg_px=[];
             let m10data=[];
              let m20data=[];
              let m30data=[];
              let m60data=[];
             let volume=[];
             let px_change=[];
              for(let p of res.data){
                    categoryData.push(p.tick_at.split(' ')[0])  //拆分' ' 去掉分时
                      values.push(
                          [p.open_px,p.close_px,p.low_px,p.high_px,p.turnover_volume,p.turnover_value]
                      );
                     svg_px.push(p.ma5);
                     m10data.push(p.ma10);
                     m20data.push(p.ma20);
                     m30data.push(p.ma30);
                      m60data.push(p.ma60);
                      volume.push({'value':p.turnover_volume,'px_change':p.px_change,});

                   } 

    var option = {
      backgroundColor:'#000',
      legend: {
        top: 20,
        data: ['周K', 'MA5', 'MA10','MA20','MA30','MA60', 'Volume'],
        textStyle: {
          fontSize: 12,
          color: '#fff'
        },
    },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
         formatter:function(res){           
                  if(res.length==1){
                    return '成交量：'+res[0].value;
                   } else{
                      return res[0].axisValue + '<br/>' +
                    '开盘：' + res[0].data[1] + '<br/>' +
                    '收盘：' + res[0].data[2] + '<br/>' +
                    '最低：' + res[0].data[3] + '<br/>' +
                    '最高：' + res[0].data[4] + '<br/>' +
                    '成交量：' + res[0].data[5] + '<br/>' +
                    '成交额：' + res[0].data[6] + '<br/>' +
                    (res[1] && res[1].data !== '-' ? res[1].seriesName + '：' + res[1].data.toFixed(2) + '<br/>' : '') +
                    (res[2] && res[2].data !== '-' ? res[2].seriesName + '：' + res[2].data.toFixed(2) + '<br/>' : '') +
                    (res[3] && res[3].data !== '-' ? res[3].seriesName + '：' + res[3].data.toFixed(2) + '<br/>' : '')
                   } 
            }
      },
      grid: [
        {
          left: "3%",
          top: "20",
          height: "75%"
        },
        {
          left: "3%",
          right: "10%",
          top: "86%",
          height: "12%"
        }
      ],
     xAxis: [
        {        
          data: categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

          splitNumber: 20
        },
        {       
          gridIndex: 1,
          data:categoryData,
          axisLabel: { 
            show: false,

           }
        }
      ],
      yAxis: [    
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },
        
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],
      dataZoom: [
        {
          type: "inside",
          start: 100,
          end: 80
        },
        {
          show: false,
          type: "slider",
          y: "90%",
          start: 50,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 20,
          end: 100
        },      
      ],
      series: [
        {
          name: "周K",
          type: "candlestick",
          data:values,
          itemStyle: {
                normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            },
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
          name: "MA5",
          type: "line",
          data: svg_px,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
        },
        {
          name: "MA10",
          type: "line",
          data: m10data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
        },
        {
          name: "MA20",
          type: "line",
          data: m20data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
               color:'red'
            }
          }
        },
        {
          name: "MA30",
          type: "line",
          data: m30data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
        },
        {
          name: "MA60",
          type: "line",
          data: m60data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
          },
        {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,
        itemStyle: {
            normal: {
              color: function(params) {
                var colorList;
                if (params.data.px_change >0) {
                  colorList = "#FD1050";
                } else {
                  colorList = "#0CF49B";
                }
                return colorList;
              }
            }
        },
      
     },
      ]
    }  
     _this.myChart3= echarts.init(_this.$refs.echartContainerw);
   _this.myChart3.setOption(option);
      _this.myChart3.resize();   

            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
          
          }
      });
   },
   getmdatat(){  //获月时间
    let url=_const.requestUrl+'/hcfshares/optional/getKline'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.$route.query.scode,
        type:'M',
        limit:'500'
      }
      let _this=this;
       $.ajax({
         url:url, 
          dataType:"json",   
          data:data,    //参数值
          type:"POST",   //请求方式
          success:function(res){
            if(res.code==0){
            _this.mindata=res.data;
             let categoryData = [];
             let values = [];
             let svg_px=[];
             let m10data=[];
             let m20data=[];
             let m30data=[];
             let m60data=[];
             let volume=[];
             let px_change=[];
              for(let p of res.data){
                    categoryData.push(p.tick_at.split(' ')[0])  //拆分' ' 去掉分时
                      values.push(
                          [p.open_px,p.close_px,p.low_px,p.high_px,p.turnover_volume,p.turnover_value]
                      );
                     svg_px.push(p.ma5);
                     m10data.push(p.ma10);
                      m20data.push(p.ma20);
                       m30data.push(p.ma30);
                        m60data.push(p.ma60);
                     volume.push({'value':p.turnover_volume,'px_change':p.px_change,});

                   } 

    var option = {
      backgroundColor:'#000',
     legend: {
        top: 20,
        data: ['月k', 'MA5', 'MA10','MA20','MA30','MA60', 'Volume'],
        textStyle: {
          fontSize: 12,
          color: '#fff'
        },
    },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
         formatter:function(res){           
                  if(res.length==1){
                    return '成交量：'+res[0].value;
                   } else{
                      return res[0].axisValue + '<br/>' +
                    '开盘：' + res[0].data[1] + '<br/>' +
                    '收盘：' + res[0].data[2] + '<br/>' +
                    '最低：' + res[0].data[3] + '<br/>' +
                    '最高：' + res[0].data[4] + '<br/>' +
                    '成交量：' + res[0].data[5] + '<br/>' +
                    '成交额：' + res[0].data[6] + '<br/>' +
                    (res[1] && res[1].data !== '-' ? res[1].seriesName + '：' + res[1].data.toFixed(2) + '<br/>' : '') +
                    (res[2] && res[2].data !== '-' ? res[2].seriesName + '：' + res[2].data.toFixed(2) + '<br/>' : '') +
                    (res[3] && res[3].data !== '-' ? res[3].seriesName + '：' + res[3].data.toFixed(2) + '<br/>' : '')
                   } 
            }
      },
      grid: [
        {
          left: "3%",
          top: "20",
          height: "75%"
        },
        {
          left: "3%",
          right: "10%",
          top: "86%",
          height: "12%"
        }
      ],
      xAxis: [
        {        
          data: categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: {
            show: false
          },

          splitNumber: 20
        },
        {       
          gridIndex: 1,
          data:categoryData,
          axisLabel: { 
            show: false,

           }
        }
      ],
      yAxis: [    
        {
          scale: true,
          splitArea: {
            show: false,
          },
           splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#8392A5"
            },

          },
          position: "right",

        },
        
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#8392A5",
            }
          },
          position: "right"
        }
      ],
      dataZoom: [
        {
          type: "inside",
          start: 100,
          end: 80
        },
        {
          show: false,
          type: "slider",
          y: "90%",
          start: 50,
          end: 100
        },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 20,
          end: 100
        },      
      ],
      series: [
        {
          name: "月k",
          type: "candlestick",
          data:values,


            itemStyle: {
               normal: {
                 color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
            },

            },
      
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
          name: "MA5",
          type: "line",
          data: svg_px,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
        },
        {
          name: "MA10",
          type: "line",
          data: m10data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
          },
        {
          name: "MA20",
          type: "line",
          data: m20data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
        },
        {
          name: "MA30",
          type: "line",
          data: m30data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
          },
        {
          name: "MA60",
          type: "line",
          data: m60data,
          smooth: true,
           showSymbol: false,
          lineStyle: {
            normal: {
               width: 1,
            }
          }
          },
        {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,
        itemStyle: {
            normal: {
              color: function(params) {
                var colorList;
                if (params.data.px_change >0) {
                  colorList = "#FD1050";
                } else {
                  colorList = "#0CF49B";
                }
                return colorList;
              }
            }
        },
      
     },
      ]
    }  
      _this.myChart4 = echarts.init(_this.$refs.echartContainerm);
    _this.myChart4.setOption(option);
      _this.myChart4.resize();    

            }else if(res.code==402){
               _this.$message.error(res.msg);
            }else if(res.code==401){
               _this.$message.error(res.msg);
            }
          },          
          error:function(){
          
          }
      });
   },
  back(){
    $('.klineleft').hide();
    $('.kimg').css('width','80%')
  },
  addown(){
    let url=_const.requestUrl+'/hcfshares/optional/userAddOptional'
      let data={
        token:_const.token,
        uid:_const.uid,
        scode:this.$route.query.scode,
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kimg{
  width: 62%;
  float: left;
}
.kimghed{
  display: flex;
  justify-content: space-between;
  background: #1E232C;
  color: #fff;
  padding: 8px 0;
  cursor: pointer;
}
.kimghed span{
  padding-right: 20px;
}
.red{
  color: rgb(46, 159, 255);
}
button{
   background: #3385ff;
  color: #fff;
  border: none;
  padding: 3px 8px;
  border-radius: 2px;
  margin-right: 20px;
  cursor: pointer; 
 }
 #main{
 width: 100%;
  height:40vh;
 }
</style>
