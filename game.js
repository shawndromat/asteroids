(function (root) {
  var Project = root.Project = (root.Project || {});
  var Asteroid = Project.Asteroid;
  var Ship = Project.Ship;
  var Bullet = Project.Bullet;

  var Game = Project.Game = function (dimX, dimY, ctx) {
    this.ctx = ctx;
    this.dimX = dimX;
    this.dimY = dimY;
    this.asteroids = this.addAsteroids(5);
    this.ship = new Ship([this.dimX/2, this.dimY/2], [0,0])
    this.bullets = [];
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];

    for (var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroid.randomAsteroid(this.dimX, this.dimY))
    }
    return asteroids;
  }

  Game.prototype.draw = function(){
    this.ctx.clearRect(0,0, this.dimX, this.dimY);
    for( var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    for( var i = 0; i < this.bullets.length; i++){
      this.bullets[i].draw(this.ctx);
    }

    this.ship.draw(this.ctx)
  }

  Game.prototype.move = function(){
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move(this.dimX, this.dimY);
    }
    for (var i = 0; i < this.bullets.length; i++){
      this.bullets[i].move(this.dimX, this.dimY);
    }
    this.ship.power(this.getAccel());
    this.ship.points += this.getPoints();
    this.ship.move(this.dimX, this.dimY);
  }

  Game.prototype.step = function(){
    this.move();
    this.checkBullets();
    this.draw();
    this.checkCollisions();

  }

  Game.prototype.checkCollisions = function(){
    for( var i = 0; i < this.asteroids.length; i++){
      if(this.asteroids[i].isCollidedWith(this.ship)){
        alert("YOU LOSE!");
        console.log(this.asteroids[i].pos);
        console.log(this.ship.pos);
        this.stop();
        return null;
      }
    }
  }

  Game.prototype.checkBullets = function() {
    for(var i = 0; i < this.bullets.length; i++){
      var target = this.bullets[i].hitAsteroids(this.asteroids);
      if (target){
        this.removeAsteroid(target);
        this.removeBullet(this.bullets[i]);
        return true;
      }
    }
  }

  Game.prototype.start = function(){
    var game = this;
    key('space', function () { game.fireBullet();        });
    this.timerID = setInterval(game.step.bind(game), 30);
  }

  Game.prototype.stop = function(){
    clearInterval(this.timerID);
  }

  Game.prototype.getAccel = function () {
    if (key.isPressed('W')) { return .3; }
    if (key.isPressed('S')) { return -0.03; }
    return 0;
  }

  Game.prototype.getPoints = function () {
    if (key.isPressed('A')) { return -0.05; };
    if (key.isPressed('D')) { return 0.05; };
    return 0;
  }

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet();
    this.bullets.push(bullet);
    setTimeout(this.removeBullet.bind(this, bullet), 200)
  }

  Game.prototype.removeBullet = function(bullet) {
    var bulletIdx = this.bullets.indexOf(bullet);
    if (bulletIdx === -1){ return null }
    var front = this.bullets.slice(0,bulletIdx);
    var back = this.bullets.slice(bulletIdx + 1);
    this.bullets = front.concat(back);
  }

  Game.prototype.removeAsteroid = function (asteroid) {
    var asteroidIdx = this.asteroids.indexOf(asteroid);
    if (asteroidIdx === -1){ return null }
    var front = this.asteroids.slice(0,asteroidIdx);
    var back = this.asteroids.slice(asteroidIdx + 1);
    this.asteroids = front.concat(back);
  }


})(this);