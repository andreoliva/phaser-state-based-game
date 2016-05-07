'use strict';
var BootState = {
    preload: function(){
        this.game.load.image('preloadBar', './assets/loading_bar.png');
    },
    create: function(){
        // this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('load');
    }
};