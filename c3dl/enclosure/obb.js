/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.OBB is an Object Bounding Box for use with various objects
 */
c3dl.OBB = function ()
{
  this.originalBoxVerts = [];//The original corner vertices of this box
  this.boxVerts = [];//The current corner vertices of this box
  this.lineList =[];//The lines connecting the corners of this box
  for (var i = 0; i <12; i++)
  {
    this.lineList[i] = new c3dl.Line();
    this.lineList[i].setWidth(2);
  }

  /**
   Set the initial values of this box based on an array of vertices passed in.
   Called automatically.
   
   @param {Array} maxMins - The maximum and minimum values on the x,y and z axes.
  */
  this.init = function (maxMins)
  {
    //F top left 
    this.originalBoxVerts[0] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[5]);
    this.boxVerts[0] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[5]);
    //B top left 
    this.originalBoxVerts[1] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[4]);    
    this.boxVerts[1] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[4]);         
    //F top right                       
    this.originalBoxVerts[2] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[5]); 
    this.boxVerts[2] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[5]);
    //B top right    
    this.originalBoxVerts[3] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[4]);
    this.boxVerts[3] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[4]);
    //F bottom left 
    this.originalBoxVerts[4] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[5]);
    this.boxVerts[4] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[5]);
    //B bottom left
    this.originalBoxVerts[5] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[4]);
    this.boxVerts[5] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[4]);
    //F bottom right
    this.originalBoxVerts[6] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[5]); 
    this.boxVerts[6] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[5]);
    //B bottom right  
    this.originalBoxVerts[7] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[4]);
    this.boxVerts[7] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[4]);
  }
  
  /**
   Replace the current properties of this bounding box with new ones.
   Called automatically.
   
   @param {Array} transform - The new transformatinon matrix for this box to use.
   */
  this.set = function (transform)
  {
    for (var i = 0; i < 8; i++)
    {
      c3dl.multiplyMatrixByVector(transform, this.originalBoxVerts[i],this.boxVerts[i]);
    } 
  }

  /**
   Draw a box in the scene using the lines between the corners of this box.
   Called automatically.
   
   @param {Scene} scene - The scene in which to draw the box.
  */
  this.render = function(scene)
  {
    //front of box
    //top left to top right
    this.lineList[0].setCoordinates(this.boxVerts[0],this.boxVerts[2]);
    //top left to bottom left                            
    this.lineList[1].setCoordinates(this.boxVerts[0],this.boxVerts[4]); 
    //bottom left to bottom right 
    this.lineList[2].setCoordinates(this.boxVerts[4],this.boxVerts[6]);
    //bottom right to top right
    this.lineList[3].setCoordinates(this.boxVerts[6],this.boxVerts[2]);

    //back of box
    //top left to top right
    this.lineList[4].setCoordinates(this.boxVerts[1],this.boxVerts[3]);
    //top left to bottom left                            
    this.lineList[5].setCoordinates(this.boxVerts[1],this.boxVerts[5]); 
    //bottom left to bottom right 
    this.lineList[6].setCoordinates(this.boxVerts[5],this.boxVerts[7]);
    //bottom right to top right
    this.lineList[7].setCoordinates(this.boxVerts[7],this.boxVerts[3]);
    
    //connectors
    //F top left to B top left
    this.lineList[8].setCoordinates(this.boxVerts[0],this.boxVerts[1]);
    //F top right to B top right                           
    this.lineList[9].setCoordinates(this.boxVerts[2],this.boxVerts[3]); 
    //F bottom left to B bottom left 
    this.lineList[10].setCoordinates(this.boxVerts[4],this.boxVerts[5]);
    //F bottom right to B bottom right  
    this.lineList[11].setCoordinates(this.boxVerts[6],this.boxVerts[7]); 
    scene.getRenderer().renderLines(this.lineList, scene);
  }
  
  /**
   @private
   Retrieve a duplicate of this box.

   @returns {OBB} A duplicate copy of this object.
  */
  this.getCopy = function ()
  {
    var copy = new c3dl.OBB();
    for (var i = 0; i <8; i++)
    {
      copy.originalBoxVerts[i] = c3dl.copyVector(this.originalBoxVerts[i]);
      copy.boxVerts[i] = c3dl.copyVector(this.boxVerts[i]);
    }
    return copy;
  }

  /**
   Center this box around a specified position.
   Called automatically.
   
   @param {Array} centerPosition - The point in 3D space to center on.
  */
  this.center = function (centerPosition)
  {
    //F top left 
    this.originalBoxVerts[0] = c3dl.makeVector(this.originalBoxVerts[0][0] - centerPosition[0] , this.originalBoxVerts[0][1] - centerPosition[1] , this.originalBoxVerts[0][2] - centerPosition[2]);
    //B top left 
    this.originalBoxVerts[1] = c3dl.makeVector(this.originalBoxVerts[1][0] - centerPosition[0] , this.originalBoxVerts[1][1] - centerPosition[1],  this.originalBoxVerts[1][2] - centerPosition[2]);                         
    //F top right                       
    this.originalBoxVerts[2] = c3dl.makeVector(this.originalBoxVerts[2][0] - centerPosition[0] , this.originalBoxVerts[2][1] - centerPosition[1],  this.originalBoxVerts[2][2] - centerPosition[2]); 
    //B top right    
    this.originalBoxVerts[3] = c3dl.makeVector(this.originalBoxVerts[3][0]  - centerPosition[0], this.originalBoxVerts[3][1] - centerPosition[1],  this.originalBoxVerts[3][2] - centerPosition[2]);
    //F bottom left 
    this.originalBoxVerts[4] = c3dl.makeVector(this.originalBoxVerts[4][0]  - centerPosition[0], this.originalBoxVerts[4][1] - centerPosition[1],  this.originalBoxVerts[4][2] - centerPosition[2]);
    //B bottom left
    this.originalBoxVerts[5] = c3dl.makeVector(this.originalBoxVerts[5][0]  - centerPosition[0], this.originalBoxVerts[5][1] - centerPosition[1],  this.originalBoxVerts[5][2] - centerPosition[2]);
    //F bottom right
    this.originalBoxVerts[6] = c3dl.makeVector(this.originalBoxVerts[6][0]  - centerPosition[0], this.originalBoxVerts[6][1] - centerPosition[1],  this.originalBoxVerts[6][2] - centerPosition[2]); 
    //B bottom right  
    this.originalBoxVerts[7] = c3dl.makeVector(this.originalBoxVerts[7][0]  - centerPosition[0], this.originalBoxVerts[7][1] - centerPosition[1] , this.originalBoxVerts[7][2] - centerPosition[2]);
  }
  
  /**
   Retrieve the corner vertices of this box.
   
   @returns {Array} An eight element array containing the corner vertices of this box.
  */
  this.getCorners = function ()
  {
    return [
            [this.boxVerts[0][0].toFixed(2), this.boxVerts[0][2].toFixed(2)], 
            [this.boxVerts[2][0].toFixed(2), this.boxVerts[2][2].toFixed(2)],
            [this.boxVerts[3][0].toFixed(2), this.boxVerts[3][2].toFixed(2)],
            [this.boxVerts[1][0].toFixed(2), this.boxVerts[1][2].toFixed(2)]
           ];
  }
}
