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

## [🔗 기본 도형 응용 (Geometry 종류)](https://github.com/taboowiths/three.js/blob/main/section3/05_default.js)

> 예제에서 사용한 객체만 추려 정리했습니다.
> 더 많은 자료는 https://threejs.org/manual/#en/creating-a-scene 에서 확인할 수 있습니다.

### 1. Geometry

1. **BoxGeometry**

   주어진 ‘폭’, ‘높이’, ‘깊이’를 갖는 직사각형 정육면체 형상에 대한 클래스.

   **코드 예제**

   ```jsx
   const geometry = new THREE.BoxGeometry(1, 1, 1);
   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
   const cube = new THREE.Mesh(geometry, material);
   scene.add(cube);
   ```

2. **ConeGeometry**

   원뿔 형상을 생성하기 위한 클래스.

   **코드 예제**

   ```jsx
   const geometry = new THREE.ConeGeometry(5, 20, 32);
   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
   const cone = new THREE.Mesh(geometry, material);
   scene.add(cone);
   ```

3. **SphereGeometry**

   구 형상을 생성하기 위한 클래스.

   **코드 예제**

   ```jsx
   const geometry = new THREE.SphereGeometry(15, 32, 16);
   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
   const sphere = new THREE.Mesh(geometry, material);
   scene.add(sphere);
   ```

### 2. 조명

```jsx
{
  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(50, 50, 50); // 카메라와 같은 위치
  spotLight.target.position.set(0, 0, 0); // 원점을 비추게 함
  scene.add(spotLight);
  scene.add(spotLight.target);
}
```

1. `HemisphereLight` = 반구 조명

   1. 하늘과 땅의 조명을 표현하는 환경광.
   2. 속성
      1. `color`: 위쪽에서 비치는 빛의 색상
      2. `groundColor`: 아래쪽에서 반사되는 빛의 색상
      3. `intensity`: 빛의 밝기. 값이 크면 빛이 더 밝아짐.
   3. 코드

      ```jsx
      const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      ```

1. `SpotLight` = 한 방향으로 빛을 뿌리는 광원

   1. 속성

      | 속성         | 설명                                           | 기본값 / 예시                            |
      | ------------ | ---------------------------------------------- | ---------------------------------------- |
      | `position`   | 빛의 위치 (출발점)                             | `spotLight.position.set(x, y, z)`        |
      | `target`     | 빛이 향하는 목표 (기본: 씬의 원점 `0,0,0`)     | `spotLight.target.position.set(x, y, z)` |
      | `color`      | 빛의 색상                                      | `0xffffff`                               |
      | `intensity`  | 밝기                                           | `1.0`                                    |
      | `angle`      | 빛의 퍼지는 각도 (라디안, 최대 `Math.PI/2`)    | `Math.PI / 3` (~60도)                    |
      | `penumbra`   | 빛의 경계 부드러움 (0~1, 0=딱딱함, 1=부드러움) | `0`                                      |
      | `decay`      | 거리 감쇠 정도 (빛의 약해짐)                   | `1` (0=감쇠 없음)                        |
      | `distance`   | 빛이 도달할 최대 거리                          | `0` (0=무제한)                           |
      | `castShadow` | 그림자 사용 여부                               | `false` (직접 `true`로 설정해야 함)      |

   2. 예제 코드

      ```jsx
      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(50, 50, 50);
      spotLight.target.position.set(0, 0, 0);
      scene.add(spotLight);
      scene.add(spotLight.target);

      spotLight.angle = Math.PI / 6; // 좁은 각도
      spotLight.penumbra = 0.5; // 경계 부드럽게
      spotLight.distance = 100; // 최대 거리 100
      spotLight.decay = 2; // 감쇠 강하게
      spotLight.castShadow = true; // 그림자 생성
      ```
