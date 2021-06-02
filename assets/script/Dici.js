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

       lv: 0.2
    },

    
    onLoad: function () {
        let self= this;
        cc.director.on('jump', ()=>{
            let goAction= cc.moveBy(0.2,cc.p(0,160));
            if(self.node){
                 self.node.runAction(goAction);
            }
        })
        this.init();
    },

    init() {
        let rand = cc.random0To1();
        if(rand < 0.5){
            this.lv = 1;
            this.node.getComponent(cc.Sprite).spriteFrame = this.sprFrame[0];
        }else{
            this.lv = 2;
            this.node.getComponent(cc.Sprite).spriteFrame = this.sprFrame[1];
        }
    },
    noteBox:function(){
        return this.node.getBoundingBoxToWorld();
    },
    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        var player = cc.find("Canvas/normal").getComponent(tmpPlayer);

        if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(),this.noteBox())){
            player.addLv(this.lv);
            this.node.destroy();
            cc.audioEngine.playEffect(this.dieAudio,false);
        }

     },
});
