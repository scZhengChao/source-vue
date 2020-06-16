<template>
    <div class="container">
        <el-button type="primary" @click="changeSlide('prev')">prev</el-button>
        <el-carousel height="200px" direction="vertical" :autoplay="false" ref="swiper" :loop='false' indicator-position='none' :initial-index='initIndex'>
            <el-carousel-item v-for="(item,index) in swiperData" :key="index" >
                {{index}}
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item :title="value.title" :name="key"  v-for="(value,key) in item.data1" :key='key'>
                      <div>{{value.description}}</div>
                    </el-collapse-item>
                   
                </el-collapse>
            </el-carousel-item>
        </el-carousel>
        <el-button type="primary" @click="changeSlide('next')">next</el-button>
        <el-input v-model.number="input" placeholder="请输入内容"></el-input><el-button type="primary" @click="changeSlide(input)">change</el-button>
    </div>
</template>
<style scoped>
  .container>>> .el-carousel__item{
    border: 1px solid black;
  }
  .container>>> .el-carousel__container{ 

  }
  .container>>>.el-carousel__item{
    overflow-y: auto;
  }
</style>
<script>
    export default {
        name:'swiper',
        data(){return{
            sw:null,
            input:null,
            slideData:{
                    data1:[
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                        {
                            title:'一致性 Consistency',
                            description:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念.在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                        },
                    ]
                },
            swiperData:[
            

            ],
            activeName:'0',
            initIndex:0,
        }},
        mounted(){
            this.sw = this.$refs.swiper
            setInterval(()=>{
                if(this.swiperData.length >= 30) return 
                this.toSlide()
            },3000)
        },
        methods:{
            changeSlide(data){
                if(data === 'prev'){
                    this.sw.prev()
                }else if(data === 'next'){
                    this.sw.next()
                }else if(typeof data === 'number'){
                    this.sw.setActiveItem(data)
                }
            },
            toSlide(){
                this.swiperData.push(this.slideData)
                this.initIndex = 0
                // this.changeSlide(this.swiperData.length-1)
                // console.log(this.swiperData.length)
            }
            
        }
    }
</script>