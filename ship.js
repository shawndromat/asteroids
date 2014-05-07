(function (root) {
  var Project = root.Project = (root.Project || {});

  var MovingObject = Project.MovingObject;
  var Bullet = Project.Bullet;

  var Ship = Project.Ship = function (pos, vel) {
    MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }
  Ship.inherits(MovingObject);

  Ship.COLOR = '#0000FF';
  Ship.RADIUS = 10;

  Ship.prototype.power = function(accel) {
    this.vel[0] += accel[0];
    this.vel[1] += accel[1]
  }

  Ship.prototype.fireBullet = function(){
    var bullet = new Bullet(this);
    return bullet;
  }


})(this);