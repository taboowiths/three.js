# Section 3. Three.js 인터랙티브 기초

## module 방식으로 시작

https://cdnjs.com/libraries/three.js 여기서 모듈 import 하기

```jsx
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.module.min.js";
```

js 스크립트

```jsx
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
```

## 카메라 마우스로 제어 해보기

조명 넣기

```jsx
{
  const HemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  HemisphereLight.position.set(-50, 50, -50);
  scene.add(HemisphereLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 60);
  scene.add(spotLight);
}
```

박스 생성하기

```jsx
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(geometry, material);
scene.add(boxMesh);
```

박스 돌아가는 애니메이션

```jsx
const animate = () => {
  boxMesh.rotation.z += 0.01;
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;

	...
}
```

카메라 컨트롤 넣기 전에, npm package로 three 설치

- 컨트롤에 사용하는 메소드가 OrbitControls 인데, 기존 cdn 방식으로 import 할 수 있는 링크를 찾아보니 서치가 잘 안됨. 그래서 공식 문서대로 진행하기로 함.

1. three.js, vite 설치
   1. vite는 build tool

```bash
# three.js
npm install --save three

# vite
npm install --save-dev vite

# 설치 후 실행
npx vite
```

1. 기존 import 방식 변경

```jsx
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

1. 카메라 컨트롤 메소드

```jsx
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 모션
```

## 마우스 위치값으로 3D 제어
