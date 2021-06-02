cc.Class({
    extends: cc.Component,

    properties: {
        bestRunScore: 0,
        bestJumpScore: 0,
    },

    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        var bestRunScore = cc.sys.localStorage.getItem("bestRunScore");
        if(bestRunScore){
            this.bestRunScore = bestRunScore;
        }
        var bestJumpScore = cc.sys.localStorage.getItem("bestJumpScore");
        if(bestRunScore){
            this.bestJumpScore = bestJumpScore;
        }
    },

    updateRunScore: function(score){
        if(score > this.bestRunScore){
            this.bestRunScore = score;
        }
    },
    
    updateJumpScore: function(score){
        if(score > this.bestJumpScore){
            this.bestJumpScore = score;
        }
    },

    save(){
        cc.sys.localStorage.setItem('bestRunScore', this.bestRunScore);
        cc.sys.localStorage.setItem('bestJumpScore', this.bestJumpScore);
    },
});
