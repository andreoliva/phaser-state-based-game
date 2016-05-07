'use strict';
var MenuState = {
    create: function(){
        var title;
        var charSelects = [];
        var titleStyle = {
            font:"45px Arial",
            fill:"#ffffff",
            fontWeight:"bold",
            boundsAlignH:"center",
            boundsAlignV:"middle"
        };
        
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tile');
        title = this.game.add.text(this.game.world.centerX,40, "Selecione um personagem!", titleStyle);
        title.anchor.setTo(0.5);
        
        for (var i = 0; i < 4; i++){
            charSelects[i] = this.game.add.sprite((100 + (150 * i)), 300, 'player'+i);
            charSelects[i].anchor.setTo(0.5);
            charSelects[i].charIndex = i;
            charSelects[i].inputEnabled = true;
            charSelects[i].events.onInputOver.add(function(tgt){ tgt.scale.setTo(1.5);}, this);
            charSelects[i].events.onInputOut.add(function(tgt){ tgt.scale.setTo(1);}, this);
		    charSelects[i].events.onInputDown.add(function(tgt){
		        this.game.state.start('play'+tgt.charIndex);
		    }, this);
        }
    }
};