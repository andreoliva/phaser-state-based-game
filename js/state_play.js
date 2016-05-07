'use strict';
/*global Phaser, generateLocation, generatePointWithLocation, generatePointInArea, getRandomInt*/
//---------------------------------------------------------------------------------------------------- base PlayState class
function BasePlayState(level, fullTime, maxEnemies){
    this.lvl = level;
    this.fullTime = fullTime;
    this.maxEnemies = maxEnemies;
}
BasePlayState.prototype = Object.create(Phaser.State.prototype);
BasePlayState.prototype.constructor = BasePlayState;
BasePlayState.prototype.init = function(){
    this.score = 0;
    this.currentTime = this.fullTime;
    this.numEnemies = 0;
    this.enemies = [];
};
BasePlayState.prototype.preload = function(){
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);
    this.game.load.image('enemy'+this.lvl, './assets/enemy_'+this.lvl+'.png');
    this.game.load.image('bg'+this.lvl, './assets/tile_'+this.lvl+'.jpg');
};
BasePlayState.prototype.create = function(){
    this.game.world.removeChild(this.preloadBar);
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg'+this.lvl);
    this.timeBar = this.game.add.sprite(20, 20, 'timebar');
    this.game.add.sprite(14, 14, 'timebarFrame');
    this.game.time.events.loop(10, this.updateTime, this, -10);
    this.game.time.events.loop(3000, this.addEnemy, this);
    this.startedAt = this.game.time.now;
    this.addEnemy();
};
BasePlayState.prototype.updateTime = function(amount){
    this.currentTime += amount;
    this.currentTime = (this.currentTime < this.fullTime) ? this.currentTime : this.fullTime;
    this.timeBar.scale.x = this.currentTime / this.fullTime;
    if (this.currentTime <= 0){
        this.game.state.start('win', true, false, this.score, (this.game.time.now - this.startedAt));
    }
};
BasePlayState.prototype.addEnemy = function(minV, maxV){
    if (this.numEnemies < this.maxEnemies){
        var evil = (Math.random() < 0.1);
        var newEnemy = this.game.add.sprite(-this.game.world.centerX, -this.game.world.centerY, (evil ? 'evil' : 'enemy'+this.lvl));
        newEnemy.isEvil = evil;
        newEnemy.anchor.setTo(0.5);
        newEnemy.inputEnabled = true;
        newEnemy.events.onInputDown.add(this.enemyClick, this);
        this.game.world.addChildAt(newEnemy, 1);
        this.enemies.push(newEnemy);
        this.move(newEnemy, getRandomInt(minV, maxV));
        this.numEnemies++;
    }
};
BasePlayState.prototype.enemyClick = function(tgt){
    tgt.cTween.pause();
    tgt.events.onInputDown.removeAll();
    this.game.tweens.remove(tgt.cTween);
    this.game.world.removeChild(tgt);
    if (tgt.isEvil){
        this.updateTime(-1000);
        this.numEnemies -= 2;
    } else {
        this.updateTime(300);
        this.score += 100;
        this.numEnemies--;
    }
    this.addEnemy();
};

//---------------------------------------------------------------------------------------------------- Level 1
function StateLevel1(level, time, maxEnemies){ BasePlayState.call(this, level, time, maxEnemies); }
StateLevel1.prototype = Object.create(BasePlayState.prototype);
StateLevel1.prototype.constructor = StateLevel1;
StateLevel1.prototype.move = function(tgt, vel){
    var point = { x: getRandomInt(50, this.game.width-50), y: getRandomInt(50, this.game.height-50) };
    tgt.scale.setTo(0);
    tgt.x = point.x;
    tgt.y = point.y;
    
    tgt.cTween = this.game.add.tween(tgt.scale).to({x: 1.1, y: 1.1}, vel, Phaser.Easing.Back.Out, true);
    tgt.cTween.onComplete.add(function(){
        this.game.tweens.remove(tgt.cTween);
        this.game.world.removeChild(tgt);
        this.numEnemies--;
        this.addEnemy();
    }, this);
};
StateLevel1.prototype.addEnemy = function(){
    BasePlayState.prototype.addEnemy.call(this, 900, 2500);
};

//---------------------------------------------------------------------------------------------------- Level 2
function StateLevel2(level, time, maxEnemies){ BasePlayState.call(this, level, time, maxEnemies); }
StateLevel2.prototype = Object.create(BasePlayState.prototype);
StateLevel2.prototype.constructor = StateLevel2;
StateLevel2.prototype.move = function(tgt, vel){
    tgt.x = getRandomInt(50, this.game.width-50);
    tgt.y = -150;
    tgt.cTween = this.game.add.tween(tgt).to({y: this.game.height+100}, vel, Phaser.Easing.Quadratic.InOut, true);
    tgt.cTween.onComplete.add(function(){
        this.game.tweens.remove(tgt.cTween);
        this.game.world.removeChild(tgt);
        this.numEnemies--;
        this.addEnemy();
    }, this);
};
StateLevel2.prototype.addEnemy = function(){
    BasePlayState.prototype.addEnemy.call(this, 1500, 3500);
};

//---------------------------------------------------------------------------------------------------- Level 3
function StateLevel3(level, time, maxEnemies){ BasePlayState.call(this, level, time, maxEnemies); }
StateLevel3.prototype = Object.create(BasePlayState.prototype);
StateLevel3.prototype.constructor = StateLevel3;
StateLevel3.prototype.move = function(tgt, vel){
    var orig = { x: getRandomInt(50, this.game.width-50), y: this.game.height + 150 };
    var dest = { x: getRandomInt(-50, this.game.width+50), y: this.game.height + 150 };
    var anchorOrig = generatePointInArea(this.game);
	var anchorDest = generatePointInArea(this.game);
	var pointsTo = {
		x: [orig.x, anchorOrig.x, anchorDest.x, dest.x],
		y: [orig.y, anchorOrig.y, anchorDest.y-200, dest.y]
	};
	
	tgt.x = orig.x;
	tgt.y = orig.y;
	tgt.cTween = this.game.add.tween(tgt)
					.to(pointsTo, vel, Phaser.Easing.Quadratic.Out, true)
					.interpolation(function(v, k){return Phaser.Math.bezierInterpolation(v, k)});
	tgt.cTween.onComplete.add(function(){ this.move(tgt) }, this);
};
StateLevel3.prototype.addEnemy = function(){
    BasePlayState.prototype.addEnemy.call(this, 1500, 3500);
};

//---------------------------------------------------------------------------------------------------- Level 4
function StateLevel4(level, time, maxEnemies){ BasePlayState.call(this, level, time, maxEnemies); }
StateLevel4.prototype = Object.create(BasePlayState.prototype);
StateLevel4.prototype.constructor = StateLevel4;
StateLevel4.prototype.move = function(tgt, vel){
    var orig = generateLocation(tgt, this.game);
	var dest = generateLocation(tgt, this.game);
	var anchorOrig = generatePointInArea(this.game);
	var anchorDest = generatePointInArea(this.game);
	var pointsTo = {
		x: [orig.x, anchorOrig.x, anchorDest.x, dest.x],
		y: [orig.y, anchorOrig.y, anchorDest.y, dest.y]
	};

	tgt.x = orig.x;
	tgt.y = orig.y;
	tgt.cTween = this.game.add.tween(tgt)
					.to(pointsTo, vel, Phaser.Easing.Quadratic.InOut, true)
					.interpolation(function(v, k){return Phaser.Math.bezierInterpolation(v, k)});
	tgt.cTween.onComplete.add(function(){ this.move(tgt) }, this);
};
StateLevel4.prototype.addEnemy = function(){
    BasePlayState.prototype.addEnemy.call(this, 1500, 3500);
};

//---------------------------------------------------------------------------------------------------- Initializing levels
var level1 = new StateLevel1(0, 10000, 6);
var level2 = new StateLevel2(1, 10000, 4);
var level3 = new StateLevel3(2, 10000, 4);
var level4 = new StateLevel4(3, 10000, 4);