cc.Class({
    extends: cc.Component,

    properties: {
        award : cc.Node,
        nextBtn: cc.Node,
        awardBg: cc.Node,
        mask : cc.Node,
        spFrame: cc.SpriteFrame
    },

    // use this for initialization
    onLoad: function () {
        let action =cc.sequence(cc.rotateBy(0.1, 30), cc.rotateBy(0.2, -60),cc.rotateBy(0.1, 30),cc.delayTime(0.5));
        this.node.runAction(action.repeat(100));

        let action1 = cc.rotateBy(1,100);
        this.awardBg.runAction(action1.repeat(100));
    },

    init(lv){

    },

    openBox() {
        this.node.rotation = 0;
        this.node.getComponent(cc.Sprite).spriteFrame = this.spFrame;
        this.node.getComponent(cc.Button).interactable = false;
        this.node.on('touchstart',(event)=>{
            event.stopPropagation();
        })
        this.node.stopAllActions();
        this.award.active = true;
        this.award.scale = 0;
        let action = (cc.spawn(cc.scaleTo(0.8, 1,1), cc.moveBy(0.8, 0, 250))).easing(cc.easeBackOut(3.0));//.
        this.award.runAction(action);
        this.nextBtn.active = true;
        let action1 = cc.moveBy(0.8, 0, -300).easing(cc.easeBackOut(3.0));
        this.nextBtn.runAction(action1);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
