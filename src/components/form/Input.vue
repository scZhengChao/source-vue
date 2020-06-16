<template>
    <div>
        <input v-bind='$attrs' :value='value' @input='oninput'>
    </div>
</template>
<style>

</style>
<script>
export default {
    name:'Form',
    // model: {  //修改 当前组件v-model 的默认行为  默认是： value input
    //     prop: 'checked',  
    //     event: 'change'
    // },
    inheritAttrs: false,  //阻止attrs 默认继承在div上； 
    props:{
        value:{
            required:true,
            type:String
        }
    },
    methods:{
        oninput(e){
            this.$emit('input',e.target.value)
            this.$parent.$emit('validate')
        }
    }
}
</script>