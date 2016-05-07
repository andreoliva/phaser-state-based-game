'use strict';
var LoadState = {
    preload: function(){
        var preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(preloadBar);
        
        // menu
        this.game.load.image('tile', './assets/tile.png');
	    this.game.load.image('player0', './assets/player_0.png');
	    this.game.load.image('player1', './assets/player_1.png');
	    this.game.load.image('player2', './assets/player_2.png');
	    this.game.load.image('player3', './assets/player_3.png');
	    this.game.load.image('evil', './assets/evil.png');
	    
	    // hud
	    this.game.load.image('timebarFrame', './assets/bar_frame.png');
	    this.game.load.image('timebar', './assets/bar_content.png');
	    this.game.load.image('restart', './assets/btn_restart.png');
    },
    create: function(){
        this.game.state.start('menu');
    }
};