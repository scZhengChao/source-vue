//遍历模板，将里面的插值表达式处理
//另外发现 k- @  做特别处理
class Compile{
    constructor(el,vm){
        this.$vm  = vm
        this.$el = document.querySelector(el)
        if(this.$el){
            // 1.$el中的内容搬家到一个fragment，提高操作效率
            this.$fragment = this.nodeToFragment(this.$el)

            // 2.编译fragment
            this.compile(this.$fragment)

            // 3.将编译结果追加至宿主中
            this.$el.appendChild(this.$fragment)
        }
    }
    nodeToFragment(el){
        const fragment = document.createDocumentFragment()  //不再文档中 ； 而是搬到了内存中 ； 以提高效率
        let child;
        while((child = el.firstChild)){
            // 由于appenChild是移动操作
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el){
        // 遍历el
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(this.isElement(node)){
                //  console.log("编译元素：" + node.nodeName);
                // 如果是元素节点，我们要处理指令k-xx，事件@xx
                this.compileElement(node)
            }else if(this.isInterpolation(node)){

                // console.log("编译文本：" + node.textContent);
                this.compileText(node)
            }
             //   递归子元素
            if(node.childNodes && node.childNodes.length>0){
                this.compile(node)
            }
        })
    }
    isElement(node){
        return node.nodeType === 1
    }
      //   插值表达式判断
    isInterpolation(node){
         //   需要满足{{xx}}
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
     //   把插值表达式替换为实际内容
    compileText(node){
        // {{xxx}}
        // RegExp.$1是匹配分组部分
        // console.log(RegExp.$1);
        const exp = RegExp.$1

        this.update(node,this.$vm,exp,'text')
    }
    update(node,vm,exp,dir){
        const fn = this[dir+'Updator']
        fn && fn(node,vm[exp])
           // 创建Watcher
        // new Vue({
        //     data: {
        //         xxx: 'bla'
        //     }
        // })
        // exp就是xxx
        new Watcher(vm,exp,function(){
            fn && fn(node,vm[exp])
        })
    }
    textUpdator(node,value){
        node.textContent = value
    }
    compileElement(node){
         // 查看node的特性中是否有k-xx，@xx
         const nodeAttrs = node.attributes;
         Array.from(nodeAttrs).forEach(attr=>{
               // 获取属性名称和值 k-text="abc"
            const attrName = attr.name;   // k-text
            const exp = attr.value; // abc
             // 指令：k-xx
            if(attrName.indexOf('k-')===0){
                const dir = attrName.substring(2); // text
                // 执行指令
                this[dir] && this[dir](node,this.$vm,exp)
            }else if(attrName.indexOf('@')===0){
                // 事件 @click="handlClick"
                const eventName = attrName.substring(1); //  click
                this.eventHandler(node,this.$vm,exp,eventName)
            }
         })
    }
    text(node, vm, exp){
        this.update(node,vm,exp,'text')
    }
    html(node,vm,exp){
        this.update(node,vm,exp,'html')
    }
    htmlUpdator(node,value){
        node.innerHTML = value
    }
    model(node,vm,exp){
        // update是数据变了改界面
        this.update(node,vm,exp,'model')
        // 界面变了改数值
        node.addEventListener('input',(e)=>{
            vm[exp] = e.target.value
        })
    }
    modelUpdator(node,value){
        node.value = value
    }
    eventHandler(node,vm,exp,eventName){
        // 获取回调函数
        var fn = vm.$options.methods && vm.$options.methods[exp]
        if(fn && eventName){
            node.addEventListener(eventName,fn.bind(vm))
        }
    }
}