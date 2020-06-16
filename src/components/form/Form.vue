<template>
    <div>
        <slot></slot>
    </div>
</template>
<style>

</style>
<script>
export default {
    name:'Form',
    provide(){
        return {
            form:this
        }
    },
    props:{
        model:{
            type:Object,
            required:true
        },
        rules:{
            tyep:Object
        }
    },
    methods: {
        validate(cb){
            const tasks = this.$children
                .filter(item=>item.prop)
                .map(item=>item.validate())
            Promise.all(tasks).then(()=>cb(true),()=>cb(false))
        }
    },

}
</script>