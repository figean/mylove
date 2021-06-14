cc.Class({
    extends: cc.Component,

    properties: {
        curPoint:cc.v2(0,0),        //起始位置
        endPoint:cc.v2(0,0),        //结束位置
        imgSp:cc.Sprite,            //显示图片
        isEmpty:false,              //是否为空
        indexLabel:cc.Label,        //序号显示的label
        succindex:0,                //成功的结束节点
    },
    onLoad: function () {

    },
    //初始化方法
    initBlock:function(spriteFrame,index,curPoint,endPoint){
        this.succindex=index;
        this.imgSp.spriteFrame=spriteFrame;
        this.curPoint=curPoint;
        this.indexLabel.string=index+"";
        if(endPoint){
            this.endPoint=endPoint;
        }   
        else
        {
            this.endPoint=curPoint;
        }
    },
    //设置初始化的点
    setCurPoint:function(curPoint){
        this.curPoint=curPoint;
    },
    //试着是否为空的
    setEmpty:function(flag){
        this.isEmpty=flag;
        if(flag){
            this.node.active=false;
        }
        else
        {
            this.node.active=true;
        }

    }

});
