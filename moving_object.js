(function (root) {
  var Project = root.Project = (root.Project || {});

  var MovingObject = Project.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function (dimX, dimY) {
    // does not yet loop when going off edge of screen
    // console.log(this.pos[0]);
    this.pos[0] = (this.pos[0] + this.vel[0] + dimX) % dimX;
    this.pos[1] = (this.pos[1] + this.vel[1] + dimY) % dimY;

  }

  MovingObject.prototype.draw = function(ctx){
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
  }

  MovingObject.prototype.isCollidedWith = function(otherObj){
    var sqXDiff = Math.pow(this.pos[0] - otherObj.pos[0], 2);
    var sqYDiff = Math.pow(this.pos[1] - otherObj.pos[1], 2);
    var distance = Math.sqrt( sqXDiff + sqYDiff );
    return (distance <= this.radius + otherObj.radius)
  }

})(this);