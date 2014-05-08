(function (root) {
  var Project = root.Project = (root.Project || {});

  var MovingObject = Project.MovingObject;

  var Bullet = Project.Bullet = function (ship) {
    var bulletVel = [Math.cos(ship.points) * Bullet.SPEED, Math.sin(ship.points) * Bullet.SPEED];
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