'use strict';
var WinState = {
    init: function(score, elapsedTime){
        this.score = score;
        this.time = elapsedTime;
    },
    create: function(){
        var titleStyle = {
            font:"45px Arial",
            fill:"#ffffff",
            fontWeight:"bold",
            boundsAlignH:"center",
            boundsAlignV:"middle"
        };
        console.log(this.time);
        var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Você fez " + this.score + " pontos!", titleStyle);
        title.anchor.setTo(0.5);
        var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 30, "restart", this.restartGame, this);
		playButton.anchor.setTo(0.5);
    },
    restartGame: function(){
        this.game.state.start("menu");
    }
};