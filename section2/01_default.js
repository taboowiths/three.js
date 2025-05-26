import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.module.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0e2255);
document.body.appendChild(renderer.domElement);

{
  const axes = new THREE.AxesHelper(50);
  scene.add(axes);

  const gridHelper = new THREE.GridHelper(70, 20);
  scene.add(gridHelper);
}

const animate = () => {
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const stageResize = () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
};

animate();
window.addEventListener("resize", stageResize);
