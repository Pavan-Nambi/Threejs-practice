const scene = new THREE.Scene();

// mesh is a visiible object
//mesh is combination of geometry(shape) and material say color or something
// cyan cube
const geometry = new THREE.BoxGeometry(1, 100, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geometry, material);
// dont forget to add this to fking scene
scene.add(cube);
// const size = {
//   width: 800,
//   height: 600,
// };

//camera for point of view
// position ,orientation and stuff
// normally we can use many cameras but we use one as we can just moove it
// here 75 is degrees u can say field of view and next is aspect ratio
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
//have to move camera if u dont move camera camera is inside cube so u fking cant see camera
camera.position.z = 5;

scene.add(camera);

const canvas = document.querySelector(".webgl");
// console.log(canvas);
// renderer renders scene throught our caera point of view this result is drawn to canvas
const renderer = new THREE.WebGLRenderer({
  alpha: false,
  canvas: canvas,
});
// renderer.setClearColor ( color : 'black') :
// renderer.setClearColor(0x0000ff, 1);
// console.log(renderer);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
