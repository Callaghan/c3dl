c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("models/cube.dae");
var image=new c3dl.Model();
var canvas=new c3dl.Model();
var video=new c3dl.Model();

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if(renderer.isReady() ) {
    image.init("models/cube.dae");
    image.roll(-Math.PI/2);
    image.setPosition([-2.5, 0.0, 0.0]);
    image.setTexture(document.getElementById('webimage'));
    scn.addObjectToScene(image); 
    video.init("models/cube.dae");
    video.roll(-Math.PI/2);
    video.setPosition([0.0, 0.0, 0.0]);
    video.setTexture(document.getElementById('video'));
    scn.addObjectToScene(video);
    canvas.init("models/cube.dae");
    canvas.roll(-Math.PI/2);
    canvas.setPosition([2.5, 0.0, 0.0]);
    canvas.setTexture(document.getElementById('clock'));
    scn.addObjectToScene(canvas); 
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0.0, 10.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.startScene();
  }
}

