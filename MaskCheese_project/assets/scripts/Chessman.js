// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       image:{
		   default :null,
		   type :cc.Node
	   },
    },

    // LIFE-CYCLE CALLBACKS:

	setId:function(id){
		//id:xyz 三位整数 x:代表打开与否 0未打开，1打开
		//y:代表属于哪个玩家 0是黑   1是红
		//z代表哪个起子 1兵 2炮 3车 4马 5相 6士 7将
		this.id=id;
	},
	getRoleId:function(){
		return this.id%10;
	},
	getPlayerId:function(){
		return Math.floor(this.id/10)%10;
	},
	isOpened:function(){
		return Math.floor(this.id/100)==1;
	},
    // onLoad () {},
    playAnimation :function (callback){
		var self=this;
		var count=0;
		this.schedule (function(){
			self.image.x=count*-70;
			count++;
			if(count==16&&callback!=null)
				callback();
		},0.2,15);
	},
	setRole: function(playerId,roleId){
	  var self=this;
	  cc.loader.loadRes("chessman/"+playerId+self.getRoleId(),cc.SpriteFrame, function(err,spriteFrame){
		  self.image.getComponent(cc.Sprite).spriteFrame=spriteFrame;
		  self.image.x=0;
		  self.image.y=0;
		  
	  }  );
	},
	open:function(callback){
		var self=this;
		this.playAnimation(function(){
			cc.loader.loadRes("chessman/"+self.getPlayerId()+self.getRoleId(),cc.SpriteFrame, function(err,spriteFrame){
				self.image.getComponent(cc.Sprite).spriteFrame=spriteFrame;
				self.image.x=0;
				self.image.y=0;
				self.id+=100;
				if(callback!=null)
					callback();
			});
		});
	},
	setGrid:function(chessGrid){
		this.node.x=chessGrid.node.x-this.node.width/2;
		this.node.y=chessGrid.node.y+this.node.height/2;
	},
    start () {

    },

    // update (dt) {},
});
