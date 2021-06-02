cc.Class({
    extends: cc.Component,

    properties: {
        loadBar: cc.ProgressBar,
    },

    onLoad: function () {
        var load = function(){
            this.loadBar.progress += 0.1;
            if(this.loadBar.progress > 0.9){
                cc.director.loadScene("Menu");
            }
        }
        this.schedule(load,0.8);
    },

});
