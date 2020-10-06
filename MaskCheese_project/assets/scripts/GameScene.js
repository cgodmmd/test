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
        chessGridPrefab: {
			default:null,
			type: cc.Prefab
		},
		chessGridsNode: {
			default:null,
			type: cc.Node
		},
		chessmansNode:{
			default :null,
			type : cc.Node
		},
		 chessmanPrefab: {
			default:null,
			type: cc.Prefab
		},
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		var chessmansIds = [1,1,1,1,1,2,2,3,3,4,4,5,5,6,6,7,11,11,11,11,11,12,12,13,13,14,14,15,15,16,16,17];
		for(var i=0;i<32;i++){
			var r=Math.floor(Math.random()*100)%32;
			var temp=chessmansIds[r];
			chessmansIds[r]=chessmansIds[i];
			chessmansIds[i]=temp;
		}
		this.selectedChessGrid=null;
		this.chessGrids=new Array();
		for(var i=0;i<4;i++){
			this.chessGrids[i]=new Array();
			for(var j=0;j<8;j++){
				//建立格子代码
				this.chessGrids[i][j]=cc.instantiate(this.chessGridPrefab);
				var chessGrid=this.chessGrids[i][j].getComponent('ChessGrid');
				chessGrid.setPosition(i,j);
				chessGrid.gameScene=this;
				this.chessGridsNode.addChild(this.chessGrids[i][j]);

				//建立棋子代码
				this.chessmanNode=cc.instantiate(this.chessmanPrefab);
				this.chessmansNode.addChild(this.chessmanNode);
				var chessman=this.chessmanNode.getComponent('Chessman');
				//格子关联棋子
				chessGrid.chessman = chessman;
				chessman.setGrid(chessGrid);
				chessman.setId(chessmansIds[i*8+j]);
			}
		}
	},
	onChessGridClick:function(chessGrid){
		
		if(this.selectedChessGrid!=null)
			this.selectedChessGrid.unselected();

		if(this.selectedChessGrid==chessGrid){
			if(chessGrid.chessman!=null && !chessGrid.chessman.isOpened()){
				chessGrid.chessman.open();
			}
		}

		this.selectedChessGrid=chessGrid;
		this.selectedChessGrid.selected();
	},

    start () {

    },

    // update (dt) {},
});
