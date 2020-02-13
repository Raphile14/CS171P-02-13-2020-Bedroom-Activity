function init() {
   // SCENE and CAMERA
   let scene = new THREE.Scene();
   let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000 );
   // BACKGROUND
   const bg = new THREE.TextureLoader();
   bg.load('assets/textures/sky3.jpg' , function(texture)
               {
               scene.background = texture;  
               });
   
   // TEXTURES
   let texture = new THREE.TextureLoader().load( '../textures/grass.png' );
   let textureStairs = new THREE.TextureLoader().load( '../textures/stairs.jpg' );
   let textureDoor = new THREE.TextureLoader().load( '../textures/door.png' );
   let textureRoad = new THREE.TextureLoader().load( '../textures/road.jpg' );
   let textureProp = new THREE.TextureLoader().load( '../textures/prop.jpg' );
   let textureHead = new THREE.TextureLoader().load( '../textures/head.jpg' );
   let textureGround = new THREE.TextureLoader().load( '../textures/ground.jpg' );
   let textureMill = new THREE.TextureLoader().load( '../textures/mill.jpg' );
   
   // Materials
   let material = new THREE.MeshBasicMaterial( { map: texture } );
   let materialStairs = new THREE.MeshBasicMaterial( { map: textureStairs } );
   let materialDoor = new THREE.MeshBasicMaterial( { map: textureDoor } );
   let materialRoad = new THREE.MeshBasicMaterial( { map: textureRoad } );
   let materialProp = new THREE.MeshBasicMaterial( { map: textureProp } );
   let materialHead = new THREE.MeshBasicMaterial( { map: textureHead } );
   let materialGround = new THREE.MeshBasicMaterial( { map: textureGround } );
   let materialMill = new THREE.MeshBasicMaterial( { map: textureMill } );
   let materialColor = new THREE.MeshBasicMaterial( { color: 0xffffff } );

   // GROUND
   const widthGround = 150;
   const heightGround = 50;
   const widthSegmentsGround = 2;
   const heightSegmentsGround = 2;
   const geometryGround = new THREE.PlaneBufferGeometry(widthGround, heightGround, widthSegmentsGround, heightSegmentsGround);
   let ground = new THREE.Mesh( geometryGround, materialGround );
   scene.add( ground );
   ground.position.y = 6; 
   ground.rotation.x = 1.5;

   // ROAD 1
   const widthGroundRoad = 5;
   const heightGroundRoad = 20;
   const widthSegmentsGroundRoad = 2;
   const heightSegmentsGroundRoad = 2;
   const geometryGroundRoad = new THREE.PlaneBufferGeometry(widthGroundRoad, heightGroundRoad, widthSegmentsGroundRoad, heightSegmentsGroundRoad);
   let road1 = new THREE.Mesh( geometryGroundRoad, materialRoad );
   scene.add( road1 );
   road1.position.y = 5; 
   road1.rotation.x = 1.5;

   // ROAD 2
   const widthGroundRoad2 = 50;
   const heightGroundRoad2 = 3;
   const widthSegmentsGroundRoad2 = 2;
   const heightSegmentsGroundRoad2 = 2;
   const geometryGroundRoad2 = new THREE.PlaneBufferGeometry(widthGroundRoad2, heightGroundRoad2, widthSegmentsGroundRoad2, heightSegmentsGroundRoad2);
   let road2 = new THREE.Mesh( geometryGroundRoad2, materialRoad );
   scene.add( road2 );
   road2.position.y = 5;
   road2.position.z = -4; 
   road2.rotation.x = 1.5;

   // CASTLE STRUCTURE
   const width = 9;
   const height = 4;
   const depth = 4;
   const geometry = new THREE.BoxBufferGeometry(width, height, depth);
   let cubeStructure = new THREE.Mesh( geometry, materialMill );
   scene.add( cubeStructure );
   cubeStructure.rotation.x = 0;
   cubeStructure.position.y = 0.5; 
   cubeStructure.position.x = 0; 
   cubeStructure.position.z = -7; 

   // ENTRANCE STRUCTURE
   const widthEnt = 2;
   const heightEnt = 6;
   const depthEnt = 3;
   const geometryEnt = new THREE.BoxBufferGeometry(widthEnt, heightEnt, depthEnt);
   let cubeEntrance = new THREE.Mesh( geometryEnt, materialMill );
   scene.add( cubeEntrance );
   cubeEntrance.rotation.x = 0;
   cubeEntrance.position.y = 0; 
   cubeEntrance.position.x = 0; 
   cubeEntrance.position.z = -6.2; 

   // Entrance Roof Cone Geometry 
   const radiusConeEnt = 1.4;
   const heightConeEnt = 2.5;
   const segmentsConeEnt = 16;
   const geometryConeEnt = new THREE.ConeBufferGeometry(radiusConeEnt, heightConeEnt, segmentsConeEnt); 
   let coneRoofEnt = new THREE.Mesh(geometryConeEnt, materialHead);
   scene.add(coneRoofEnt);
   coneRoofEnt.rotation.x = 3;
   coneRoofEnt.position.y = -4; 
   coneRoofEnt.position.x = 0; 
   coneRoofEnt.position.z = -5;

   // ENTRANCE DOOR
   const widthDoor = 0.5;
   const heightDoor = 1;
   const depthDoor = 1;
   const geometryDoor = new THREE.BoxBufferGeometry(widthDoor, heightDoor, depthDoor);
   let cubeDoor = new THREE.Mesh( geometryDoor, materialDoor );
   scene.add( cubeDoor );
   cubeDoor.rotation.z = 3.14;
   cubeDoor.position.y = 1.5; 
   cubeDoor.position.x = 0; 
   cubeDoor.position.z = -4.5; 

   // ENTRANCE STAIRS
   const widthStairs = 1.5;
   const heightStairs = 2;
   const depthStairs = 1;
   const geometryStairs = new THREE.BoxBufferGeometry(widthStairs, heightStairs, depthStairs);
   let cubeStairs = new THREE.Mesh( geometryStairs, materialStairs );
   scene.add( cubeStairs );
   cubeStairs.rotation.x = 7;
   cubeStairs.position.y = 3; 
   cubeStairs.position.x = 0; 
   cubeStairs.position.z = -4.5; 

   // ROOF CYLINDER BODY 1
   const radiusTopCy = 1;
   const radiusBottomCy = 1;
   const heightCy = 5.4;
   const radialSegmentsCy = 12;
   const geometryCy = new THREE.CylinderBufferGeometry(radiusTopCy, radiusBottomCy, heightCy, radialSegmentsCy);
   let cy = new THREE.Mesh( geometryCy, materialMill );
   scene.add( cy );
   cy.rotation.x = 0;
   cy.position.y = 0; 
   cy.position.x = -4; 
   cy.position.z = -5; 

   // Roof Cone Geometry 1
   const radiusCone = 1.2;
   const heightCone = 2.5;
   const segmentsCone = 16;
   const geometryCone = new THREE.ConeBufferGeometry(radiusCone, heightCone, segmentsCone); 
   let coneRoof1 = new THREE.Mesh(geometryCone, materialHead);
   scene.add(coneRoof1);
   coneRoof1.rotation.x = 3;
   coneRoof1.position.y = -4; 
   coneRoof1.position.x = -4; 
   coneRoof1.position.z = -4.9;

   // ROOF CYLINDER BODY 2
   const radiusTopCy2 = 1;
   const radiusBottomCy2 = 1;
   const heightCy2 = 5;
   const radialSegmentsCy2 = 12;
   const geometryCy2 = new THREE.CylinderBufferGeometry(radiusTopCy2, radiusBottomCy2, heightCy2, radialSegmentsCy2);
   let cy2 = new THREE.Mesh( geometryCy2, materialMill );
   scene.add( cy2 );
   cy2.rotation.x = 0;
   cy2.position.y = 0; 
   cy2.position.x = 4; 
   cy2.position.z = -5; 

   // Roof Cone Geometry 2
   const radiusCone2 = 1.2;
   const heightCone2 = 2.5;
   const segmentsCone2 = 16;
   const geometryCone2 = new THREE.ConeBufferGeometry(radiusCone2, heightCone2, segmentsCone2); 
   let coneRoof2 = new THREE.Mesh(geometryCone2, materialHead);
   scene.add(coneRoof2);
   coneRoof2.rotation.x = 3;
   coneRoof2.position.y = -3.6; 
   coneRoof2.position.x = 4; 
   coneRoof2.position.z = -4.9;

   // Camera Initial Location
   camera.position.z = 5; // 5
   camera.position.x = 0; // 0
   camera.position.y = 0;
   camera.rotation.z = 3.14;
   // camera.rotation.y = 1.7;

   let zCameraMovementForward = true;
   let xCameraMovementForward = true;
   let yCameraMovementForward = true;
   let zCameraSpeed = 0.05; // 0.01
   let xCameraSpeed = 0.05; // 0.01
   let yCameraSpeed = 0.00785;  // 0.5

   // Renders and Projects the Scene
   let renderer = new THREE.WebGLRenderer();
   renderer.setSize( window.innerWidth, window.innerHeight );
   document.body.appendChild( renderer.domElement );
   let controls = new THREE.OrbitControls (camera, renderer.domElement);

   animate();
}

let startTime, endTime;
let timeGathered = false;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  let timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  let seconds = Math.round(timeDiff);
  console.log(seconds + " seconds");
}

function animate() {

   // Logic for Z Camera Rotation
   if (camera.position.z > 5) {
      zCameraMovementForward = true;
   }
   if (camera.position.z < -15) {
      zCameraMovementForward = false;
   }   
   if (zCameraMovementForward) {
      camera.position.z -= zCameraSpeed;
   }
   if (!zCameraMovementForward) {
      camera.position.z += zCameraSpeed;
   }

   // Logic for X Camera Rotation
   if (camera.position.z < -5) {
      xCameraMovementForward = true;
   }
   if (camera.position.z > -5) {
      xCameraMovementForward = false;
   }   
   if (xCameraMovementForward) {
      camera.position.x -= xCameraSpeed;
   }
   if (!xCameraMovementForward) {
      camera.position.x += xCameraSpeed;
   }

   camera.rotation.y += yCameraSpeed;

   if (!zCameraMovementForward && camera.position.z > 5) {
      camera.position.z += 5;
      zCameraSpeed = 0.0; // 0.01
      xCameraSpeed = 0.0; // 0.01
      yCameraSpeed = 0.0;  // 0.5
      end();
   }
   // console.log("x: " + camera.position.x);
   // console.log("y: " + camera.rotation.y);
   // console.log("z: " + camera.position.z);
   requestAnimationFrame( animate );  
   controls.update();    
   renderer.render( scene, camera );
}
// alert("success");
start();
window.onload = init();


