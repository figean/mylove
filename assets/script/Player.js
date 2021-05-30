cc.Class({
    extends: cc.Component,

    properties: {
        lv : 1,
        effect: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {

    },
    noteBox:function(){
        return this.node.getBoundingBox();
    },

    addLv(lv) {
        this.lv += lv;
        this.node.scale = this.lv;
        var effect = cc.instantiate(this.effect);
        effect.parent = cc.find('Canvas');
        effect.getChildByName('Label').getComponent(cc.Label).string = '质量+'+lv;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
