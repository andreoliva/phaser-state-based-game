'use strict';
/*global Phaser, BootState, LoadState, MenuState, level1, level2, level3, level4, WinState*/

var game = new Phaser.Game(705, 555, Phaser.AUTO, 'game-container');
game.state.add('boot', BootState);
game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('play0', level1);
game.state.add('play1', level2);
game.state.add('play2', level3);
game.state.add('play3', level4);
game.state.add('win', WinState);

game.state.start('boot');