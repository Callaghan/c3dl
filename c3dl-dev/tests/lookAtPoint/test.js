c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("models/arrow.dae");
var obs = [];
var orbit = [200,0,0];
var arrow;
var tracking = false;

function canvasMain(canvasName) {
  var cam = new c3dl.FreeCamera();
  cam.setPosition([0, 0, 500]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);

  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if (renderer.isReady()) {

    //create an arrow in the middle of the scene
    arrow = new c3dl.Collada();
    arrow.init("models/arrow.dae");
    arrow.setPosition(new Array(0.0, 0.0, 0));
    arrow.scale([0.1, 0.1, 0.1]);
    var answer = arrow.setDirectionVectors([1,0,0],[0,1,0],[0,0,1]);
    alert(answer);
    scn.addObjectToScene(arrow);
    
    //add a sphere to the scene
    var sat = new c3dl.Sphere(30);
    sat.setTexture("images/0.jpg");
    scn.addObjectToScene(sat);
    obs[0] = sat;
    
    var count = 1;
    //3 nested loops to create 8 cubes arrayed around the central arrow
    for(var i = -1; i < 2; i+=2) {
      for(var j = -1; j < 2; j+=2) {
        for(var k = -1; k < 2; k+=2) {
          obs[count] = new c3dl.Cube(20,20,20);
          obs[count].setPosition([i * 100, j * 100, k * 100]);
          obs[count].setTexture("images/" + count + ".jpg");
          scn.addObjectToScene(obs[count]);
          count++;
        }
      }
    }
    scn.setCamera(cam);
    scn.setUpdateCallback(test);
    scn.setKeyboardCallback(up)
    scn.startScene();
  }
}

function test(deltaTime) {
  //move the shere
  var orbitMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat([0.2,1,0.5], deltaTime/4000));
  c3dl.multiplyMatrixByVector(orbitMat, orbit, orbit);
  obs[0].setPosition(orbit);
  
  //if tracking the sphere
  if(tracking) {
    //point the arrow at the new position of the sphere
    arrow.setLookAtPoint(obs[0].getPosition());
  }
}

//when the user releases a key (between 0 and 8), point the arrow at a numbered object.
function up() {
  switch(event.keyCode) {
    case 48: arrow.setLookAtPoint(obs[0].getPosition());
      tracking = true;
      break;
    case 49: arrow.setLookAtPoint(obs[1].getPosition());
      tracking = false;
      break;
    case 50: arrow.setLookAtPoint(obs[2].getPosition());
      tracking = false;
      break;
    case 51: arrow.setLookAtPoint(obs[3].getPosition());
      tracking = false;
      break;
    case 52: arrow.setLookAtPoint(obs[4].getPosition());
      tracking = false;
      break;
    case 53: arrow.setLookAtPoint(obs[5].getPosition());
      tracking = false;
      break;
    case 54: arrow.setLookAtPoint(obs[6].getPosition());
      tracking = false;
      break;
    case 55: arrow.setLookAtPoint(obs[7].getPosition());
      tracking = false;
      break;
    case 56: arrow.setLookAtPoint(obs[8].getPosition());
      tracking = false;
      break;
  }
}