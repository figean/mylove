cc.Class({
    extends: cc.Component,

    properties: {
        startBtn : cc.Node
    },

    // use this for initialization
    onLoad: function () {
    },

    btnstart () {
        cc.director.loadScene('gameScene1');
    }
});
