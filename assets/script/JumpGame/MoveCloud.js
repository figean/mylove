cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,
    },

    update: function (dt) {
        this.node.x += this.moveSpeed * dt;
        if(this.node.x < -cc.winSize.width/2+this.node.width/2 || this.node.x > cc.winSize.width/2-this.node.width/2){
            this.moveSpeed = -this.moveSpeed;
            this.node.scaleX = -this.node.scaleX;
        }
    },
});
