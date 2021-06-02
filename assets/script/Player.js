cc.Class({
    extends: cc.Component,

    properties: {
        lv : 1,
        deadLv : 1.2,
        effect: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {

    },
    noteBox:function(){
        return this.node.getBoundingBox();
    },

    addLv(lv) {
        this.lv += lv/10;
        this.node.scale = this.lv;
        var effect = cc.instantiate(this.effect);
        effect.parent = cc.find('Canvas');
        let lvstr = lv > 0 ? '+'+lv : lv;
        effect.getChildByName('Label').getComponent(cc.Label).string = '体重'+lvstr;
        if(this.lv >= this.deadLv){
            cc.director.loadScene('OverScene');
        }
    },

    // called every frame, uncomment this function to activate update callback
});
