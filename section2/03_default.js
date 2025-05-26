import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0e2255);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

{
  const axes = new THREE.AxesHelper(50);
  scene.add(axes);

  const gridHelper = new THREE.GridHelper(70, 20);
  scene.add(gridHelper);
}

{
  const HemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  HemisphereLight.position.set(-50, 50, -50);
  scene.add(HemisphereLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 60);
  scene.add(spotLight);
}

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(geometry, material);
scene.add(boxMesh);

const animate = () => {
  boxMesh.rotation.z += 0.01;
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;

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
