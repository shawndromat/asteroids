(function (root) {
  var Project = root.Project = (root.Project || {});

  var MovingObject = Project.MovingObject;

  var Bullet = Project.Bullet = function (ship) {
    if(ship.vel[0] === 0 && ship.vel[1] === 0){
      var shipSpeed = 1;
      var shipDir = [0, -1];
    } else {

      var shipSpeed = Math.sqrt(ship.vel[0] * ship.vel[0] + ship.vel[1] * ship.vel[1]);
      var shipDir = [ship.vel[0] / shipSpeed, ship.vel[1] / shipSpeed];
    }
    var bulletVel = [shipDir[0] * Bullet.SPEED, shipDir[1] * Bullet.SPEED];
    var bulletPos = ship.pos.slice();
    MovingObject.call(this, bulletPos, bulletVel, Bullet.RADIUS, Bullet.COLOR);
  }
  Bullet.inherits(MovingObject);

  Bullet.COLOR = '#00FF00';
  Bullet.RADIUS = 4;
  Bullet.SPEED = 40;

  Bullet.prototype.hitAsteroids = function (asteroids) {
    for (var i = 0; i < asteroids.length; i++) {
      if (this.isCollidedWith(asteroids[i])) {
        return asteroids[i];
      }
    }
    return false;
  }


})(this);