# Section 3. Three.js 인터랙티브 기초

## module 방식으로 시작

1. [🔗 기본 프레임 만들기](https://github.com/taboowiths/three.js/blob/210c985a57bc32260a5210b5164710ff30513123/section3/01_default.js)

   https://cdnjs.com/libraries/three.js 여기서 모듈 import 하기

   ```jsx
   import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.module.min.js";
   ```

## [🔗 카메라 마우스로 제어 해보기](https://github.com/taboowiths/three.js/blob/210c985a57bc32260a5210b5164710ff30513123/section3/02_default.js)

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

2. 기존 import 방식 변경

```jsx
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

3. [🔗 카메라 컨트롤 메소드](https://github.com/taboowiths/three.js/blob/210c985a57bc32260a5210b5164710ff30513123/section3/03_default.js)

```jsx
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 모션
```

## [🔗 마우스 위치값으로 3D 제어](https://github.com/taboowiths/three.js/blob/main/section3/04_default.js)

마우스가 움직일 때마다 해당 위치에 비례해 마우스의 방향대로 회전하도록 한다.

1. 마우스의 위치를 `targetX`, `targetY`로 변환 (속도 조절용 0.002 배율)

```jsx
targetX = mouseX * 0.002;
targetY = mouseY * 0.002;
```

1. 박스를 마우스 위치에 비례해 회전.

```jsx
if (boxMesh) {
  boxMesh.rotation.y += 0.05 * (targetX - boxMesh.rotation.y);
  boxMesh.rotation.x += 0.05 * (targetY - boxMesh.rotation.x);
}
```
