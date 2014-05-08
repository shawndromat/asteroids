(function (root) {
  var Project = root.Project = (root.Project || {});

  var MovingObject = Project.MovingObject;
  var Bullet = Project.Bullet;

  var Ship = Project.Ship = function (pos, vel) {
    MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.points = 0;
  }
  Ship.inherits(MovingObject);

  Ship.COLOR = '#0000FF';
  Ship.RADIUS = 10;

  Ship.prototype.power = function(accel) { // refactor accel to a number
    this.vel[0] = (this.vel[0] + accel * Math.cos(this.points)) * .98;
    this.vel[1] = (this.vel[1] + accel * Math.sin(this.points)) * .98;
  }

  Ship.prototype.fireBullet = function(){
    var bullet = new Bullet(this);
    return bullet;
  }

  // draw a triangle with vertices on the circle
  // have the nose pointing in the ship's direction TODO: add direction to ship
  // get the triang
  Ship.prototype.draw = function(ctx, points){
    var points = this.points;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius + 1,
      points, points + ((Math.PI * 5)/6));
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius + 1,
      points, points + (-(Math.PI * 5)/6), true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius + 1,
      points + (-(Math.PI * 5)/6), points + ((Math.PI * 5)/6), true);
    ctx.fill();


  }


})(this);