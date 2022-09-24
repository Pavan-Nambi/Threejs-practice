import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three";

// const img = new Image();
// const texture = new THREE.Texture(img);
// img.onload = () => {
//   texture.needsUpdate = true;
// };
// img.src = "./static/Wood.jpg";

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
//   // console.log(texture);
// };
// // image.src = "./textures/door/color.jpg";
// image.src = "./static/textures/cat.webp";
const loadingManager = new THREE.LoadingManager();

const textureloader = new TextureLoader(loadingManager);
const catTexture = textureloader.load("./public/cat.jpg");

catTexture.repeat.set(2, 2);
catTexture.wrapS = THREE.RepeatWrapping;
catTexture.wrapT = THREE.RepeatWrapping;

catTexture.offset.set(0.5, 0.5);

catTexture.rotation = Math.PI / 4;
catTexture.center.set(0.5, 0.5);

catTexture.minFilter = THREE.NearestFilter;
// use magFilter to remove the blur effect
// nearest filters are better for performance and frame rate
// catTexture.magFilter = THREE.NearestFilter;

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

/**
 * Object
 */
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ map: catTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
