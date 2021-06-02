var PrefabManager = require("PrefabManager2");
var CameraManager = require("CameraManager2");
var Player = require("Player2");
cc.Class({
    extends: cc.Component,

    properties: {
        player:Player,
        prefabManager:PrefabManager,
        cameraManager:CameraManager,
        scoreText: cc.Label,
        energyBar: cc.ProgressBar,
        //结束菜单
        gameOverMenu: cc.Node,
        
        bgAudio:cc.AudioClip,
        energyAudio:cc.AudioClip,
        overAudio:cc.AudioClip,
    },

    onLoad: function () {
        //返回键退出游戏
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if(keyCode == cc.KEY.back){
                    cc.director.loadScene('Menu');
                }
            }
        }, this.node);
        
        this.startGame();
        
    },
    

    
    startGame: function() {
        cc.director.getCollisionManager().enabled = true;
        this.gameOverMenu.active = false;
        this.score = 0;
        this.level = 0;
        this.scoreText.string = "0m"
        this.player.init(this);
        this.cameraManager.init(this);
        this.prefabManager.init(this);
        cc.audioEngine.playMusic(this.bgAudio,true);

    },
    
    stopGame: function(){
        cc.director.getCollisionManager().enabled = false;
        cc.audioEngine.stopMusic(this.bgAudio);
        cc.audioEngine.playMusic(this.overAudio);
        this.gameOverMenu.getChildByName('OverScore').getComponent(cc.Label).string = this.score;
        this.gameOverMenu.active = true;
        //存储数据
        cc.find("Record").getComponent("Record").updateJumpScore(this.score);
    },
    
    gainScore: function(scoreAdd) {
        this.scoreText.string = (this.score += scoreAdd) + "m";
        if(Math.round(this.score/200) > this.level){
            this.level++;
            if(this.level>5){
                this.player.xSpeedMax += 50;
            }
        }
    },
    
    gainEnergy: function(){
        cc.audioEngine.playEffect(this.energyAudio);
        this.energyBar.progress += 0.1;
        if(this.energyBar.progress >= 0.9){
            this.player.superJump();
        }
    },
    
    returnMenu(){
        cc.director.loadScene("Menu");  
    },
    
});

