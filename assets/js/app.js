let scene, camera, renderer, mesh;
let meshFloor, ambientLight, light, controls;
 
let keyboard = {};
let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;
 
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
 
    // BACKGROUND
    const bg = new THREE.TextureLoader();
    bg.load('assets/textures/sky3.jpg' , function(texture) {
        scene.background = texture;  
    });

    // TEXTURES 
    let texture = new THREE.TextureLoader().load( 'assets/textures/grass.png' );
    let textureStairs = new THREE.TextureLoader().load( 'assets/textures/stairs.jpg' );
    let textureDoor = new THREE.TextureLoader().load( 'assets/textures/door.png' );
    let textureRoad = new THREE.TextureLoader().load( 'assets/textures/road.jpg' );
    let textureProp = new THREE.TextureLoader().load( 'assets/textures/prop.jpg' );
    let textureHead = new THREE.TextureLoader().load( 'assets/textures/head.jpg' );
    let textureGround = new THREE.TextureLoader().load( 'assets/textures/ground.jpg' );
    let textureMill = new THREE.TextureLoader().load( 'assets/textures/mill.jpg' );
    let textureGlass = new THREE.TextureLoader().load( 'assets/textures/glass.png' );
    let textureRedWool = new THREE.TextureLoader().load( 'assets/textures/redWool.png' );
    let textureWhiteWool = new THREE.TextureLoader().load( 'assets/textures/whiteWool.png' );
    let textureCabinet = new THREE.TextureLoader().load( 'assets/textures/cabinet.jfif' );

    // Materials
    let material = new THREE.MeshLambertMaterial( { map: texture } );
    let materialCabinet = new THREE.MeshStandardMaterial( { map: textureCabinet } );
    let materialStairs = new THREE.MeshLambertMaterial( { map: textureStairs } );
    let materialRedWool = new THREE.MeshStandardMaterial( { map: textureRedWool } );
    let materialWhiteWool = new THREE.MeshStandardMaterial( { map: textureWhiteWool } );
    let materialDoor = new THREE.MeshStandardMaterial( { map: textureDoor } );
    let materialRoad = new THREE.MeshLambertMaterial( { map: textureRoad } );
    let materialProp = new THREE.MeshLambertMaterial( { map: textureProp } );
    let materialHead = new THREE.MeshLambertMaterial( { map: textureHead } );
    let materialGround = new THREE.MeshLambertMaterial( { map: textureGround } );
    let materialMill = new THREE.MeshLambertMaterial( { map: textureMill } );
    let materialGlass = new THREE.MeshPhongMaterial( { map: textureGlass, transparent: true, opacity: 0.5 } );
    let materialColor = new THREE.MeshLambertMaterial( { color: 0xffffff } );

    // ==========================  OBJECTS ==========================
    // Ground
    const widthGround = 20;
    const heightGround = 25;
    const widthSegmentsGround = 2;
    const heightSegmentsGround = 2;
    const geometryGround = new THREE.PlaneBufferGeometry(widthGround, heightGround, widthSegmentsGround, heightSegmentsGround);
    let ground = new THREE.Mesh( geometryGround, materialGround );
    ground.receiveShadow = true;
    ground.castShadow = true;
    scene.add( ground );
    ground.position.y = -1; 
    ground.rotation.x = -1.575;

    // Rotating Cube
    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
    );
    mesh.position.y = 2.5;
    mesh.position.x = 0;
    mesh.position.z = 4.5;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);
 
    // Room Foundation
    const width = 11.2;
    const height = 1;
    const depth = 15;
    const geometry = new THREE.BoxBufferGeometry(width, height, depth);
    let cubeFoundation = new THREE.Mesh( geometry, materialRoad );
    cubeFoundation.receiveShadow = true;
    cubeFoundation.castShadow = true;
    scene.add( cubeFoundation );
    cubeFoundation.position.y = -0.5; 

    // Room Roof
    const widthRoof = 10;
    const heightRoof = 1;
    const depthRoof = 15;
    const geometryRoof = new THREE.BoxBufferGeometry(widthRoof, heightRoof, depthRoof);
    let cubeRoof = new THREE.Mesh( geometryRoof, materialRoad );
    cubeRoof.receiveShadow = true;
    cubeRoof.castShadow = true;
    scene.add( cubeRoof );
    cubeRoof.position.y = 4;

    // Room Outside Step
    const widthStep = 3;
    const heightStep = 0.9;
    const depthStep = 3;
    const geometryStep = new THREE.BoxBufferGeometry(widthStep, heightStep, depthStep);
    let cubeFoundationStep = new THREE.Mesh( geometryStep, materialProp );
    cubeFoundationStep.receiveShadow = true;
    cubeFoundationStep.castShadow = true;
    scene.add( cubeFoundationStep );
    cubeFoundationStep.position.y = -0.6; 
    cubeFoundationStep.position.z = -8; 

    // Room Bulb
    const widthBulb = 1;
    const heightBulb = 0.2;
    const depthBulb = 1;
    const geometryBulb = new THREE.BoxBufferGeometry(widthBulb, heightBulb, depthBulb);
    let cubeBulb = new THREE.Mesh( geometryBulb, materialProp );
    cubeBulb.receiveShadow = true;
    cubeBulb.castShadow = true;
    scene.add( cubeBulb );
    cubeBulb.position.y = 3.5; 

    // Room Wall 1
    const widthWall = 8;
    const heightWall = 5;
    const depthWall = 1;
    const geometryWall1 = new THREE.BoxBufferGeometry(widthWall, heightWall, depthWall);
    let cubeWall1 = new THREE.Mesh( geometryWall1, materialStairs );
    cubeWall1.receiveShadow = true;
    cubeWall1.castShadow = true;
    scene.add( cubeWall1 );
    cubeWall1.position.y = 1.5; 
    cubeWall1.position.z = 7.5; 

    // Room Wall 2
    const geometryWall2 = new THREE.BoxBufferGeometry(widthWall, heightWall, depthWall);
    let cubeWall2 = new THREE.Mesh( geometryWall2, materialStairs );
    cubeWall2.receiveShadow = true;
    cubeWall2.castShadow = true;
    scene.add( cubeWall2 );
    cubeWall2.position.y = 1.5; 
    cubeWall2.position.z = -7.5; 

    // Room Wall 3
    const widthWallLong = 1;
    const heightWallLong = 5;
    const depthWallLong = 8;
    const geometryWall3 = new THREE.BoxBufferGeometry(widthWallLong, heightWallLong, depthWallLong);
    let cubeWall3 = new THREE.Mesh( geometryWall3, materialStairs );
    cubeWall3.receiveShadow = true;
    cubeWall3.castShadow = true;
    scene.add( cubeWall3 );
    cubeWall3.position.y = 1.5; 
    cubeWall3.position.x = 5;

    // Room Wall 4
    const geometryWall4 = new THREE.BoxBufferGeometry(widthWallLong, heightWallLong, depthWallLong);
    let cubeWall4 = new THREE.Mesh( geometryWall4, materialStairs );
    cubeWall4.receiveShadow = true;
    cubeWall4.castShadow = true;
    scene.add( cubeWall4 );
    cubeWall4.position.y = 1.5; 
    cubeWall4.position.x = -5;

    // Room Wall Extra 1
    const widthWallExtra = 0.95;
    const heightWallExtra = 1;
    const depthWallExtra = 15;
    const geometryWallExtra1 = new THREE.BoxBufferGeometry(widthWallExtra, heightWallExtra, depthWallExtra);
    let cubeWallExtra1 = new THREE.Mesh( geometryWallExtra1, materialRoad );
    cubeWallExtra1.receiveShadow = true;
    cubeWallExtra1.castShadow = true;
    scene.add( cubeWallExtra1 );
    cubeWallExtra1.position.y = 3.49; 
    cubeWallExtra1.position.x = -5;

    // Room Wall Extra 1
    const geometryWallExtra2 = new THREE.BoxBufferGeometry(widthWallExtra, heightWallExtra, depthWallExtra);
    let cubeWallExtra2 = new THREE.Mesh( geometryWallExtra2, materialRoad );
    cubeWallExtra2.receiveShadow = true;
    cubeWallExtra2.castShadow = true;
    scene.add( cubeWallExtra2 );
    cubeWallExtra2.position.y = 3.49; 
    cubeWallExtra2.position.x = 5;

    // Room Bed
    const widthBed = 3;
    const heightBed = 2;
    const depthBed = 5;
    const geometryBed = new THREE.BoxBufferGeometry(widthBed, heightBed, depthBed);
    let cubeBed = new THREE.Mesh( geometryBed, materialRedWool );
    cubeBed.receiveShadow = true;
    cubeBed.castShadow = true;
    scene.add( cubeBed );
    cubeBed.position.y = 0.5; 
    cubeBed.position.z = 4.5;

    // Room Pillow
    const widthBedPillow = 1.5;
    const heightBedPillow = 1;
    const depthBedPillow = 1;
    const geometryBedPillow = new THREE.BoxBufferGeometry(widthBedPillow, heightBedPillow, depthBedPillow);
    let cubeBedPillow = new THREE.Mesh( geometryBedPillow, materialWhiteWool );
    cubeBedPillow.receiveShadow = true;
    cubeBedPillow.castShadow = true;
    scene.add( cubeBedPillow );
    cubeBedPillow.position.y = 1.3; 
    cubeBedPillow.position.z = 6;

    // Room Cabinet
    const widthCabinet = 1;
    const heightCabinet = 3.5;
    const depthCabinet = 3;
    const geometryCabinet = new THREE.BoxBufferGeometry(widthCabinet, heightCabinet, depthCabinet);
    let cubeCabinet = new THREE.Mesh( geometryCabinet, materialCabinet );
    cubeCabinet.receiveShadow = true;
    cubeCabinet.castShadow = true;
    scene.add( cubeCabinet );
    cubeCabinet.position.y = 1.4; 
    cubeCabinet.position.x = 4.3;

    // Window 1
    const widthWindow = 1;
    const heightWindow = 3.5;
    const depthWindow = 3;
    const geometryWindow1 = new THREE.BoxBufferGeometry(widthWindow, heightWindow, depthWindow);
    let cubeWindow1 = new THREE.Mesh( geometryWindow1, materialGlass );
    cubeWindow1.receiveShadow = true;
    cubeWindow1.castShadow = true;
    scene.add( cubeWindow1 );
    cubeWindow1.position.y = 1.4; 
    cubeWindow1.position.x = -5;
    cubeWindow1.position.z = -5.5;

    // Window 2
    const geometryWindow2 = new THREE.BoxBufferGeometry(widthWindow, heightWindow, depthWindow);
    let cubeWindow2 = new THREE.Mesh( geometryWindow2, materialGlass );
    cubeWindow2.receiveShadow = true;
    cubeWindow2.castShadow = true;
    scene.add( cubeWindow2 );
    cubeWindow2.position.y = 1.4; 
    cubeWindow2.position.x = 5;
    cubeWindow2.position.z = -5.5;

    // Window 3
    const geometryWindow3 = new THREE.BoxBufferGeometry(widthWindow, heightWindow, depthWindow);
    let cubeWindow3 = new THREE.Mesh( geometryWindow3, materialGlass );
    cubeWindow3.receiveShadow = true;
    cubeWindow3.castShadow = true;
    scene.add( cubeWindow3 );
    cubeWindow3.position.y = 1.4; 
    cubeWindow3.position.x = 5;
    cubeWindow3.position.z = 5.5;

    // Window 3
    const geometryWindow4 = new THREE.BoxBufferGeometry(widthWindow, heightWindow, depthWindow);
    let cubeWindow4 = new THREE.Mesh( geometryWindow4, materialGlass );
    cubeWindow4.receiveShadow = true;
    cubeWindow4.castShadow = true;
    scene.add( cubeWindow4 );
    cubeWindow4.position.y = 1.4; 
    cubeWindow4.position.x = -5;
    cubeWindow4.position.z = 5.5;

    // Door
    const widthDoor = 2;
    const heightDoor = 3;
    const depthDoor = 1.5;
    const geometryDoor = new THREE.BoxBufferGeometry(widthDoor, heightDoor, depthDoor);
    let cubeDoor = new THREE.Mesh( geometryDoor, materialDoor );
    cubeDoor.receiveShadow = true;
    cubeDoor.castShadow = true;
    scene.add( cubeDoor );
    cubeDoor.position.y = 1.5; 
    cubeDoor.position.z = -7.5; 

    // Pillar 1
    const radiusTopPillar = 1;
    const radiusBottomPillar = 1;
    const heightPillar = 5;
    const radialSegmentsPillar = 12;
    const geometryPillar = new THREE.CylinderBufferGeometry(radiusTopPillar, radiusBottomPillar, heightPillar, radialSegmentsPillar);
    let cylinderPillar1 = new THREE.Mesh( geometryPillar, materialProp );
    cylinderPillar1.receiveShadow = true;
    cylinderPillar1.castShadow = true;
    scene.add( cylinderPillar1 );
    cylinderPillar1.position.y = 1.5; 
    cylinderPillar1.position.z = 7.5; 
    cylinderPillar1.position.x = -5; 

    // Pillar 2
    let cylinderPillar2 = new THREE.Mesh( geometryPillar, materialProp );
    cylinderPillar2.receiveShadow = true;
    cylinderPillar2.castShadow = true;
    scene.add( cylinderPillar2 );
    cylinderPillar2.position.y = 1.5; 
    cylinderPillar2.position.z = 7.5; 
    cylinderPillar2.position.x = 5; 

    // Pillar 3
    let cylinderPillar3 = new THREE.Mesh( geometryPillar, materialProp );
    cylinderPillar3.receiveShadow = true;
    cylinderPillar3.castShadow = true;
    scene.add( cylinderPillar3 );
    cylinderPillar3.position.y = 1.5; 
    cylinderPillar3.position.z = -7.5; 
    cylinderPillar3.position.x = 5; 

    // Pillar 4
    let cylinderPillar4 = new THREE.Mesh( geometryPillar, materialProp );
    cylinderPillar4.receiveShadow = true;
    cylinderPillar4.castShadow = true;
    scene.add( cylinderPillar4 );
    cylinderPillar4.position.y = 1.5; 
    cylinderPillar4.position.z = -7.5; 
    cylinderPillar4.position.x = -5;
 
 
    // LIGHTS
    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    // Point Light
    sunLight = new THREE.PointLight(0xffffff, 4, 18);
    sunLight.position.set(-10,10,0);
    sunLight.castShadow = true;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 25;
    scene.add(sunLight);

    // Spot Light
    let spotLight = new THREE.SpotLight( 0xFFFFFF, 2);
    spotLight.position.set( 0, 3.5, 0 );
    spotLight.target.position.set( 0, -100, 0 );
    spotLight.castShadow = true;
    scene.add( spotLight.target );
    scene.add( spotLight );
    spotLight.shadow.mapSize.width = 100; 
    spotLight.shadow.mapSize.height = 10; 
    spotLight.shadow.camera.near = 0.5; 
    spotLight.shadow.camera.far = 15000; 
    
    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0,player.height,0));
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    animate();
}
 
function animate(){
  controls.update();
  requestAnimationFrame(animate);
 
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
 
  if(keyboard[87]){ // W key
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ // S key
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ // A key
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ // D key
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ // left arrow key
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){ // right arrow key
     camera.rotation.y += player.turnSpeed;
  }
 
  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;
