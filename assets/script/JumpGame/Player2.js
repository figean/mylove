var STATE = cc.Enum({
        JUMP: 0,//原位置
        DROP: 1,
        DEAD: 2,
        SUPERJUMP: 3,
});
cc.Class({
    extends: cc.Component,

    properties: {
        xSpeedMax: 0,
        jumpSpeed: 0,
        gravity: 0,
        groundY: 0,
        
        jumpAudio:cc.AudioClip,
        superAudio:cc.AudioClip,
    },

    init: function (game) {
        this.game = game;
        this.speedX = 0;
        this.speedY = this.jumpSpeed;
        this.botPos = this.groundY;
        this.moveFlag = true;
        this.state = STATE.JUMP;
        let self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                if (touchLoc.x >= cc.winSize.width/2) {
                    self.speedX = self.xSpeedMax;
                    self.node.scaleX = 1;
                } else {
                    self.speedX = -self.xSpeedMax;
                    self.node.scaleX = -1;
                }
                return true;
            },
            onTouchEnded: function(touch, event) {
                //self.speedX = 0;
            }
        }, self.node);
        //键盘测试按钮
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                        self.node.scaleX = -1;
                        self.speedX = -self.xSpeedMax;
                        break;
                    case cc.KEY.right:
                        self.node.scaleX = 1;
                        self.speedX = self.xSpeedMax;
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                //self.speedX = 0;
            }
        }, self.node);
        this.superJump();

    },
    
    onCollisionEnter: function (other,self) {
        //CameraManager屏幕外下方的回收线
        if(other.tag === 444){
            this.state = STATE.DEAD;
            this.node.color = cc.Color.BLACK;
            this.game.stopGame();
        }
        if(other.tag === 666){
                this.game.prefabManager.desPrefab(other.node,other.tag);
                this.game.gainEnergy();
        }else{
            if(this.state === STATE.DROP){
                this.jump();
                if(other.tag === 2){
                    this.game.prefabManager.desPrefab(other.node,other.tag);
                    this.game.prefabManager.addPrefab();
                }
                
            }
        }
        
    },
    
    jump: function(){
        this.state = STATE.JUMP;
        this.speedY = this.jumpSpeed; 
        cc.audioEngine.playEffect(this.jumpAudio);
    },
    
    superJump: function(){
        this.state = STATE.SUPERJUMP;
        this.node.color = cc.Color.RED;
        this.speedY = this.jumpSpeed*2;  
        cc.audioEngine.playEffect(this.superAudio);
    },
    
    update: function (dt) {
        if(this.state === STATE.DEAD){
            return;
        }
        //更新水平位置
        this.node.x += this.speedX * dt;
        if(this.node.x < -cc.winSize.width/2){
            this.node.x = cc.winSize.width/2;
        }
        if(this.node.x > cc.winSize.width/2){
            this.node.x = -cc.winSize.width/2;
        }
        //更新Y轴位置
        this.speedY -= this.gravity * dt;
        this.node.y += this.speedY * dt;
        //更新状态
        if(this.speedY < 0){
            //超级状态上升时没有吃到star就变为普通状态
            if(this.state == STATE.SUPERJUMP){
                this.game.energyBar.progress = 0;
                this.node.color = cc.Color.WHITE;
            }
            this.state = STATE.DROP;
        }
        //更新镜头位置
        this.game.cameraManager.moveBg(this.speedY * dt);
    },
});
