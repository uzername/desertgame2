import * as RE from 'rogue-engine';
import * as THREE from 'three'

//=================================================================
// terrain generation
function Terrain(detail) {
  this.size = Math.pow(2, detail) + 1;
  this.max = this.size - 1;
  this.map = new Float32Array(this.size * this.size);
}

Terrain.prototype.get = function(x, y) {
  if (x < 0 || x > this.max || y < 0 || y > this.max) return -1;
  return this.map[x + this.size * y];
};

Terrain.prototype.set = function(x, y, val) {
  this.map[x + this.size * y] = val;
};

Terrain.prototype.generate = function(roughness) {
  var self = this;

  function randomNumber(min__, max__) { 
       return Math.random() * (max__ - min__) + min__;
  } 

  this.set(0, 0, randomNumber(0, self.max) ); /*self.max*/
  this.set(this.max, 0, randomNumber(0, self.max)); /* self.max/2 */
  this.set(this.max, this.max, randomNumber(0, self.max)); /* 0 */
  this.set(0, this.max, randomNumber(0, self.max) ); /* self.max/2 */

  divide(this.max);

  function divide(size) {
    var x, y, half = size / 2;
    var scale = roughness * size;
    if (half < 1) return;

    for (y = half; y < self.max; y += size) {
      for (x = half; x < self.max; x += size) {
        square(x, y, half, Math.random() * scale * 2 - scale);
      }
    }
    for (y = 0; y <= self.max; y += half) {
      for (x = (y + half) % size; x <= self.max; x += size) {
        diamond(x, y, half, Math.random() * scale * 2 - scale);
      }
    }
    divide(size / 2);
  }

  function average(values) {
    var valid = values.filter(function(val) { return val !== -1; });
    var total = valid.reduce(function(sum, val) { return sum + val; }, 0);
    return total / valid.length;
  }

  function square(x, y, size, offset) {
    var ave = average([
      self.get(x - size, y - size),   // upper left
      self.get(x + size, y - size),   // upper right
      self.get(x + size, y + size),   // lower right
      self.get(x - size, y + size)    // lower left
    ]);
    self.set(x, y, ave + offset);
  }

  function diamond(x, y, size, offset) {
    var ave = average([
      self.get(x, y - size),      // top
      self.get(x + size, y),      // right
      self.get(x, y + size),      // bottom
      self.get(x - size, y)       // left
    ]);
    self.set(x, y, ave + offset);
  }
};
//==========
  Terrain.prototype.normalizemap  = function(numberSteps) {
      var self = this;  
      var minValueArray = this.get(0,0);
      var maxValueArray = this.get(0,0);
      for (var i=0; i<this.size; i++) {
          for (var j=0; j<this.size; j++) {
              var candidateNumeric = this.get(i,j);
              if (minValueArray > candidateNumeric) {
                  minValueArray = candidateNumeric;
              }
              if (maxValueArray < candidateNumeric) {
                  maxValueArray = candidateNumeric;
              }
          }
      }
      var D = Math.abs(maxValueArray - minValueArray);
      var stepsz = D/numberSteps;
      for (var i=0; i<this.size; i++) {
          for (var j=0; j<this.size; j++) {
              var  VAL = this.get(i,j);
              var n0 = Math.round((VAL-minValueArray)/stepsz);
              this.set(i,j,n0);
          }
      }
  }
//=================================================================

export default class MainHandlerComponent extends RE.Component {
  initTerrain() {
    var nmbr = 6
    var R = 0.5;
    var terrain = new Terrain(nmbr);
    terrain.generate(R);
    terrain.normalizemap(3);
// now generate the mesh

    var geom = new THREE.Geometry(); 
    var v1 = new THREE.Vector3(0,0,0);
    var v2 = new THREE.Vector3(0,0,100);
    var v3 = new THREE.Vector3(100,0,100);

    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.computeFaceNormals();

    var object = new THREE.Mesh( geom, new THREE.MeshBasicMaterial() );


    RE.App.currentScene.add(object);
  }

  awake() {
      console.log("INIT TERRAIN");
      this.initTerrain();
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(MainHandlerComponent);