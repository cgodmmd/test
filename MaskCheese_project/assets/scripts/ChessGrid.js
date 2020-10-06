// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        background: {
			default:null,
			type: cc.Node
		},
    },

    setPosition:function(row,column){
		this.row=row;
		this.column=column;
		this.node.y=-row*85+125;
		this.node.x=column*85-300;
	},
    onLoad () {
		this.node.on('click', this.onclick, this);
	},
	onclick: function (button) {
		this.gameScene.onChessGridClick(this);
	},
	selected:function(){
		this.background.opacity=255;
	},
	unselected:function(){
		this.background.opacity=180;
	},
    start () {

    },

    // update (dt) {},
});
