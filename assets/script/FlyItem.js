var tmpPlayer = require("Player");
cc.Class({
    extends: cc.Component,

    properties: {
       dieAudio:{
           default:null,
           url:cc.AudioClip
       },

       sprFrame:{
           default : [],
           type : cc.SpriteFrame
       },

       lv: 2
    },

    
    onLoad: function () {
        let self = this;
          var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                var goAction= cc.moveBy(0.2,cc.p(0,140));
                if(self.node){
                     self.node.runAction(goAction);
                }
                return true; //这里必须要写 return true
            },
            onTouchMoved: function (touches, event) {
              
            },
            onTouchEnded: function (touches, event) {
           
            },
            onTouchCancelled: function (touches, event) {
            }
        }
        cc.eventManager.addListener(listener, this.node);
        this.init();
    },

    init() {
        let rand = cc.random0To1();
        if(rand < 0.5){
            this.lv = 1;
            this.node.getComponent(cc.Sprite).spriteFrame = this.sprFrame[0];
        }else{
            this.lv = -1;
            this.node.getComponent(cc.Sprite).spriteFrame = this.sprFrame[1];
        }
    },

    noteBox:function(){
        return this.node.getBoundingBoxToWorld();
    },

     update: function (dt) {
        var player = cc.find("Canvas/normal").getComponent(tmpPlayer);

        if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(),this.noteBox())){
            player.addLv(this.lv);
            this.node.destroy();
            cc.audioEngine.playEffect(this.dieAudio,false);
            // cc.audioEngine.playEffect(this.dieAudio,false);
            // cc.director.loadScene('OverScene');
        }
        this.node.y += 1;

     },
});
