cc.Class({
    extends: cc.Component,

    properties: {
        cloudLayer: cc.Node,
        player: cc.Node,
        cloudPre:{
            type:cc.Prefab,
            default:[]
        },
        cloudSpace:0,
        starPre: {
            type:cc.Prefab,
            default:null
        },
    },

    init: function (game) {
        this.game = game;
        this.lastCloudY = -500;
        this.cloudPoolSet = [];
        for(var i = 0; i<this.cloudPre.length; i++){
            this.cloudPoolSet[i] = new cc.NodePool(require("Game2"));
            for(var j=0; j<7; j++){
                this.cloudPoolSet[i].put(cc.instantiate(this.cloudPre[i]));
            }
        }
        this.starPool = new cc.NodePool(require("Game2"));
        for(var m = 0; m < 10; m++){
            var star = cc.instantiate(this.starPre);
            this.starPool.put(star);
        }
        
        for(var n = 0;n < 7;n++){
            this.addPrefab();
        }
    },
    
    onCollisionEnter: function (other,self) {
        
        if(other.tag === 1 || other.tag === 2 || other.tag === 3){
                this.desPrefab(other.node,other.tag);
                this.addPrefab();
        }
        if(other.tag === 666){
            this.desPrefab(other.node,other.tag);
        }
        
    },
    
    addPrefab: function(){
        var cloud;
        var n;
        switch(this.game.level){
            case 0://stable
                cloud = this.cloudPoolSet[0].get();
                break;
            case 1://stable+once
                n = Math.round(Math.random()*1);
                cloud = this.cloudPoolSet[n].get();
                break;
            case 2://stable+once+move
                n = Math.round(Math.random()*2);
                cloud = this.cloudPoolSet[n].get();
                break;
            case 3:
                n = Math.round(Math.random()*2);
                cloud = this.cloudPoolSet[n].get();
                break;
            case 4:
                n = Math.round(Math.random()*2);
                cloud = this.cloudPoolSet[n].get();
                break;
            default:
                n = Math.round(Math.random()*2);
                cloud = this.cloudPoolSet[n].get();
                break;
        }
        if(cloud === null){
            return;
        }
        this.cloudLayer.addChild(cloud);
        cloud.x = -cc.winSize.width/2 + cloud.width/2+Math.random()*(cc.winSize.width- cloud.width);
        this.lastCloudY = cloud.y = this.lastCloudY + this.cloudSpace;
        //add star
        if(Math.random()<0.7){
            var star = this.starPool.get();
            if(star === null){
                return;
            }
            this.cloudLayer.addChild(star);
            star.x = -cc.winSize.width/2 + cloud.width/2+Math.random()*(cc.winSize.width- cloud.width);
            star.y = cloud.y+this.cloudSpace/2;
            
        }
        
    },
    
    desPrefab: function(node,tag){
        switch(tag){
            case 1:
                this.cloudPoolSet[0].put(node);
                break;
            case 2:
                this.cloudPoolSet[1].put(node);
                break;
            case 3:
                this.cloudPoolSet[2].put(node);
                break;
            case 666:
                this.starPool.put(node);
                break;
            default:break;
        }
    }

});
