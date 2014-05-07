(function (root) {
  var Project = root.Project = (root.Project || {});

  var MovingObject = Project.MovingObject;
  Function.prototype.inherits = function(Super) {
    function Surrogate() {};
    Surrogate.prototype = Super.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Project.Asteroid = function (pos, vel) {
    MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  }
  Asteroid.inherits(MovingObject);

  Asteroid.COLOR = '#FF0000';
  Asteroid.RADIUS = 32;


  Asteroid.randomAsteroid = function (dimX, dimY) {
    var pos = [dimX * Math.random() , dimY * Math.random()];
    var newAsteroid = new Asteroid(pos, randomVec());
    return newAsteroid;
  }

  function randomVec() {
    return [(10 * Math.random()) - 5, (10 * Math.random()) - 5];
  }

})(this);