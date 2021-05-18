/**
 * 所有动作类特效综合
 */

/** 动作类型*/
var EFF_TYPE = cc.Enum({
    MOVE_TO  : -1,
    MOVE_BY  : -1,
    ROTATION : -1,
    SCALE_TO : -1,
    SCALE_BY : -1,
    JUMP_TO  : -1,
    JUMP_BY  : -1,
    FADE_T0  : -1,
    REMOVE_SELF : -1,
    DELAY   : -1
})
/**缓冲类型 */
var EASE_TYPE = cc.Enum({
    easeIn : -1,
    easeOut : -1,
    easeBackOut : -1,
    easeBackIn : -1,
    easeElaseicln : -1,
    easeElasticOut : -1,
})

cc.Component.MyEffect = cc.Class({
    name: 'MyEffect',
    properties: {
        effType : {
            default : EFF_TYPE.MOVE_TO,
            type : EFF_TYPE,
            tooltip : "动作类型"
        },
        goalPos : {
            default : cc.p(0,0),
            tooltip : "目标坐标,X,Y"
        },
        costTime : 0
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        loop : {
            default : 1,
            type : cc.Integer,
            tooltip : "-1:无限循环，1-N:循环次数"
        },
        actionType : {
            default : true,
            tooltip : "true:顺序执行，false:同时执行"
        },
        action : {
            default : [],
            type : [cc.Component.MyEffect],
            tooltip : "设置多个动作可顺序执行"
        },

        canClick : {
            default : true,
            tooltip : "出现动画时,屏幕是否可点击，true：可点击"
        },
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        var actionArray = [];
        for(let i=0; i< self.action.length; i++){
            var effect = self.action[i];
            actionArray.push(self.getAction(effect));
        }
        if (actionArray.length <0) return;
        var action;
        if(self.actionType){
            action = cc.sequence(actionArray);
        }else{
             action = cc.spawn(actionArray);
        }
        if(self.loop > 0){
            self.node.runAction(action.repeat(self.loop));
        }
        else{
            self.node.runAction(action.repeatForever());
        }

        if (!self.canClick) {
            self.node.on("touchstart", function (event) {
                event.stopPropagation();
                cc.log("点击了回合start");
            }, self);
        }
    },

    getAction : function(action){
        var self = this;
        var type = action.effType;
        switch(type){
            case EFF_TYPE.MOVE_BY : //action.goalPos.y
                return cc.moveBy(action.costTime ,action.goalPos.x, action.goalPos.y);
            case EFF_TYPE.ROTATION : //action.goalPos.y
                return cc.rotateBy(action.costTime,action.goalPos.x, action.goalPos.y);
            case EFF_TYPE.SCALE_TO :
                var scalex = action.goalPos.x;
                var scaley = action.goalPos.y;
                return cc.scaleTo(action.costTime, scalex , scaley);
            case EFF_TYPE.SCALE_BY :
                var scalex = self.node.scaleX * action.goalPos.x;
                var scaley = self.node.scaleY * action.goalPos.y;
                return cc.scaleTo(action.costTime, scalex , scaley);
            case EFF_TYPE.JUMP_BY :
                return cc.jumpBy(action.costTime, action.goalPos, 25, 1);
            case EFF_TYPE.FADE_T0 :
                return cc.fadeTo(action.costTime, action.goalPos.x);
            case EFF_TYPE.REMOVE_SELF :
                return cc.removeSelf();
            case EFF_TYPE.DELAY :
                return cc.delayTime(action.costTime);
        }
    }
});

