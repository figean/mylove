var imgArray=[];
var blockMap=[];
var blockArray=[];//仅仅用于初始化
var emptyBlock;
var stepNum=0;
cc.Class({
    extends: cc.Component,

    properties: {
        offsetX:0,
        offsetY:0,
        blockPrefab:cc.Prefab,
        gameMap:cc.Node,
        url:"",
        stepLabel:cc.Label,
        testSp:cc.Sprite
    },

    // use this for initialization
    onLoad: function () {
        //加载 SpriteFrame
        var self = this;
        for(var i=0;i<3;i++) 
        { 
            blockMap[i]=new Array(); 
            
        } 

        //使用网络图片
        // cc.textureCache.addImage(this.url, function(texture) {
        //     if(texture) {
        //         var offX=0;
        //         var offY=0
        //         if(texture.width>512){
        //             offX=(texture.width-512)/2;
        //         }
        //         if(texture.height>512){
        //             offY=(texture.height-512)/2;
        //         }
        //         for(var i=0;i<16;++i){
        //             var mapX=~~(i%4);
        //             var mapY=~~(i/4);

        //             imgArray[i]=new cc.SpriteFrame(texture,cc.rect(offX+128*mapX,offY+128*mapY,128,128)); 
        //             var node=cc.instantiate(self.blockPrefab);
        //             node.position=cc.p(128*mapX,384-128*mapY);
        //             //cc.log(node.position);
        //             blockMap[mapX][mapY]=node;
        //             blockArray[i]=node;
        //             var block=node.getComponent('Block');
        //             block.imgSp.spriteFrame=imgArray[i];
        //             block.initBlock(imgArray[i],i,cc.v2(mapX,mapY));
        //             self.gameMap.addChild(node);
        //         }
        //         self.randomBlocks();
        //     }
        // },self);

        //使用本地图片
        cc.loader.loadRes("img1", cc.SpriteFrame, function (err, spriteFrame) {
            var texture=spriteFrame.getTexture();    
            for(var i=0;i<9;++i){
                var mapX=~~(i%3);
                var mapY=~~(i/3);
                imgArray[i]=new cc.SpriteFrame(texture,cc.rect(80*mapX,110*mapY,80,110)); 
                var node=cc.instantiate(self.blockPrefab);
                node.position=cc.p(80*mapX,0);//220-110*mapY
                //cc.log(node.position);
                blockMap[mapX][mapY]=node;
                blockArray[i]=node;
                var block=node.getComponent('Block');
                block.imgSp.spriteFrame=imgArray[i];
                block.initBlock(imgArray[i],i,cc.v2(mapX,mapY));
                self.gameMap.addChild(node);
            }
            self.randomBlocks();

        });
        //cc.log(blockMap);
        this.gameMap.position=cc.p(self.offsetX,self.offsetY);
        //开始触摸
        this.gameMap.on(cc.Node.EventType.TOUCH_START, function (event) {
          var mapPoint=this.gameMap.convertToNodeSpace(event.getLocation());
          var mapX=~~(mapPoint.x/80);
          var mapY=~~((330-mapPoint.y)/110);
          var block=this.getBlock(mapX,mapY).getComponent('Block');
          if(block.isEmpty){
              return;
          }
          this.checkMove(blockMap[mapX][mapY]);
        }, this);

    },
    getBlock:function(x,y){
        return blockMap[x][y];
    },
    toLocal:function(mapX,mapY){
        return cc.v2(80*mapX,220-110*mapY);
    },
    toIndex:function(mapX,mapY){
        return mapX+mapY*3;
    },
    randomBlocks:function(){
        //设置当前的右下角的Block为空
        blockMap[2][2].getComponent('Block').setEmpty(true);
        emptyBlock=blockMap[2][2];
        //随机排列方块
        var rand=this.randArray(blockArray);
        //var rand=blockArray;
        cc.log("rand--->"+rand.length);
        for(var i=0;i<rand.length;++i){
            var mapX=~~(i%3);
            var mapY=~~(i/3);
            blockMap[mapX][mapY]=rand[i];
            blockMap[mapX][mapY].getComponent('Block').setCurPoint(cc.v2(mapX,mapY));
            blockMap[mapX][mapY].position=cc.p(80*mapX,220-110*mapY);
        }

    },
    randArray:function(data){
        //随机数组的方法
        //获取数组长度
        var arrlen = data.length;
        //创建数组 存放下标数
        var try1 = new Array();
        for(var i = 0;i < arrlen; i++){
            try1[i] = i;
        }
        //创建数组 生成随机下标数
        var try2 = new Array();
        for(var i = 0;i < arrlen; i++){
            try2[i] = try1.splice(Math.floor(Math.random() * try1.length),1);
        }
        //创建数组，生成对应随机下标数的数组
        var try3 = new Array();
        for(var i = 0; i < arrlen; i++){
            try3[i] = data[try2[i]];
        }
        return try3;
    },
    checkMove:function(block){
        //检测移动
        var curPoint=block.getComponent('Block').curPoint;
        cc.log("curPoint--->"+curPoint.y);
        //检测上
        if(curPoint.y-1>=0){
            if(blockMap[curPoint.x][curPoint.y-1].getComponent('Block').isEmpty){
                //向下移动
                var point=this.toLocal(curPoint.x,curPoint.y-1);
                block.runAction(cc.moveTo(.05,point));
                this.changeEmptyBlock(block);
            }
        }
        //检测下
        if(curPoint.y+1<3){
            if(blockMap[curPoint.x][curPoint.y+1].getComponent('Block').isEmpty){
                //向下移动
                var point=this.toLocal(curPoint.x,curPoint.y+1);
                block.runAction(cc.moveTo(.05,point));
                this.changeEmptyBlock(block);
            }
        }
        //检测左
        if(curPoint.x-1>=0){
            if(blockMap[curPoint.x-1][curPoint.y].getComponent('Block').isEmpty){
                //向左移动
                var point=this.toLocal(curPoint.x-1,curPoint.y);
                block.runAction(cc.moveTo(.05,point));
                this.changeEmptyBlock(block);
            }
        }
        //检测右边
        if(curPoint.x+1<3){
            if(blockMap[curPoint.x+1][curPoint.y].getComponent('Block').isEmpty){
                //向右边移动
                var point=this.toLocal(curPoint.x+1,curPoint.y);
                block.runAction(cc.moveTo(.05,point));
                this.changeEmptyBlock(block);
            }
        }

    },
    changeEmptyBlock(blockNode){
        var eBlock=emptyBlock.getComponent('Block');
        var ePoint=eBlock.curPoint;
        blockMap[ePoint.x][ePoint.y]=blockNode;

        var block=blockNode.getComponent('Block');
        var blockPoint=block.curPoint;
        blockMap[blockPoint.x][blockPoint.y]=emptyBlock;

        block.curPoint=ePoint;
        eBlock.curPoint=blockPoint;
        if(this.checkSuccess()){
            cc.log("issucc");
        }
        else{
            cc.log("isFail");
        }
        //只有在交换的时候才计算步数1
        stepNum++;
        this.stepLabel.string=""+stepNum;
    },
    checkSuccess:function(){
        var isSucc=true;
        for(var i=0;i<3;++i){
            for(var j=0;j<3;++j){
                if(!blockMap[i][j].isEmpty){
                    if(blockMap[i][j].getComponent('Block').succindex!==this.toIndex(i,j)){
                        cc.log("fail~~~~~");
                        isSucc=false;
                        return isSucc;
                    }
                }
            }
        }
        return isSucc;

    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
