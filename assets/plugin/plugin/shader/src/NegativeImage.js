var _default_vert = require("../data/ccShader_Default_Vert.js");
var _default_vert_no_mvp = require("../data/ccShader_Default_Vert_noMVP.js");
var _negative_image_frag = require("../data/ccShader_Negative_Image_Frag.js");

var EffectNegativeImage=cc.Class({
    extends: cc.Component,

    properties: {
            
    },

    onLoad: function () {
        this._use();
    },

    _use: function()
    {
        this._program = new cc.GLProgram();

        if (cc.sys.isNative) {
            cc.log("use native GLProgram")
            this._program.initWithString(_default_vert_no_mvp, _negative_image_frag);
            this._program.link();
            this._program.updateUniforms();
        }else{
            this._program.initWithVertexShaderByteArray(_default_vert, _negative_image_frag);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }

        this.setProgram( this.node._sgNode, this._program );
    },
    setProgram:function (node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }else{
            node.setShaderProgram(program);    
        }
        
    
        var children = node.children;
        if (!children)
            return;
    
        for (var i = 0; i < children.length; i++)
            this.setProgram(children[i], program);
    }

});
cc.NegativeImage = module.exports = EffectNegativeImage;