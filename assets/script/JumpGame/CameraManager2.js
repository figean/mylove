cc.Class({
    extends: cc.Component,

    properties: {
        bgSky:cc.Node,
        skySca:0,
        bgHill:cc.Node,
        hillSca:0,
        bgHillnear:cc.Node,
        hillnearSca:0,
        bgFloor:cc.Node,
        floorSca:0,
        cloudLayer:cc.Node,
        cloudSca:0,
        camera: cc.Node,
        player: cc.Node,
        
    },
    
    init: function(game){
        this.game = game;
    },

    moveBg: function(distance){
        if(this.player.y > this.camera.y+this.camera.height/2){
            this.bgSky.y -= distance * this.skySca;
            this.bgHill.y -= distance * this.hillSca;
            this.bgHillnear.y -= distance * this.hillnearSca;
            this.bgFloor.y -= distance * this.floorSca;
            this.cloudLayer.y -= distance * this.cloudSca;
            this.player.y -= distance;
            this.game.gainScore(Math.round(distance/20));
        }
    }
});
