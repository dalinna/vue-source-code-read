// vue通过设定对象属性的setter/getter方法来监听数据变化。通过getter进行依赖手机，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图

// 将数据变成可观察的

function observe(value,cb){
    Object.keys(value).forEach((key)=>defineReactive(value, key, value[key],cb ))
}

function defineReactive( obj, key, val, cb){
    Object.defineProperty(obj,key,{
        enumerable : true,
        configurable : true,
        get : ()=>{
            // 这之前肯定有个数收集的过程
            return val
        },
        set : newVal =>{
            val = newVal;
            // 订阅者受到消息的回调
            cb(); 
        }
    })
}
class Vue{
    constructor(options){
        this._data = options.data;
        observe(this._data,options.render)
    }
}

let app = new vue({
    el:"#app",
    data : {
        text : 'text',
        text2 : 'text1' 
    },
    render(){
        console.log("render");
    }
})
