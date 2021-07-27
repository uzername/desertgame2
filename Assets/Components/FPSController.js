import * as RE from 'rogue-engine';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';
import { TerrainClass } from "./TerrainClass.js";

const fwdDirection = new Vector3(0, 0, -1);
const bwdDirection = new Vector3(0, 0, 1);
const leftDirection = new Vector3(-1, 0, 0);
const rightDirection = new Vector3(1, 0, 0);

export default class FPSControllerJS extends RE.Component {

  constructor() {
    super(...arguments);
    this.rotSpeed = 0.2;
    this.minCameraRotY = -1;
    this.maxCameraRotY = 1;
    this.walkSpeed = 3;
    this.fwdSpeedMultiplier = 1.3;
    this.runSpeedMultiplier = 1.8;
    this.jumpHeight = 0.5;
    this.jumpSpeed = 50;
    this.camera;
    this.cameraPos;
    // set in initTerrain , MainHandlerComponent
    this.TerrainInfo = null;

  }

  awake() {
    RE.Input.mouse.lock();

    this.cameraPos = this.object3d.getObjectByName("CameraPosition");

    if (!this.cameraPos) {
      throw "Couldn't find child CemeraPosition";
    }

    this.camera = new PerspectiveCamera();
    RE.App.currentScene.add(this.camera);

    RE.App.activeCamera = this.camera.uuid;

    this.camera.position.copy(this.cameraPos.position);

    const appContainer = document.getElementById("rogue-app");

    if (!appContainer) return;

    appContainer.onmousedown = (e) => {
      RE.Input.mouse.lock();
    }

    RE.Runtime.onStop(() => {
      if (!appContainer) return;
  
      appContainer.onmousedown = null;
    });

    this.camera.rotation.order = 'YXZ';
    this.object3d.rotation.order = 'YXZ';
    console.log('FPSController.Awake done');
  }

  update() {
    const deltaTime = RE.Runtime.deltaTime;

    if (RE.Input.mouse.isMoving && document.pointerLockElement) {
      const mouseDeltaX = RE.Input.mouse.movementX * this.rotSpeed * deltaTime;
      const mouseDeltaY = RE.Input.mouse.movementY * this.rotSpeed * deltaTime;

      this.camera.rotation.set(
        this.camera.rotation.x - mouseDeltaY,
        this.camera.rotation.y - mouseDeltaX,
        this.camera.rotation.z
      );

      this.object3d.rotation.set(
        this.object3d.rotation.x,
        this.object3d.rotation.y - mouseDeltaX,
        this.object3d.rotation.z
      );

      this.camera.rotation.x = Math.max(this.minCameraRotY, Math.min(this.maxCameraRotY, this.camera.rotation.x));

      this.cameraPos.rotation.x = this.camera.rotation.x;
    }

    RE.Input.keyboard.getKeyPressed("Escape") && RE.Input.mouse.unlock();

    let actualSpeed = this.walkSpeed;
    let onlyFwd = true;

    const movementVector = new Vector3();

    if (RE.Input.keyboard.getKeyDown("Space")) {
      // Jump
    }

    if (RE.Input.keyboard.getKeyPressed("KeyW")) {
      movementVector.add(fwdDirection);
    }
    
    else if (RE.Input.keyboard.getKeyPressed("KeyS")) {
      movementVector.add(bwdDirection);
      onlyFwd = false;
    }

    if (RE.Input.keyboard.getKeyPressed("KeyA")) {
      movementVector.add(leftDirection);
      onlyFwd = false;
    }

    else if (RE.Input.keyboard.getKeyPressed("KeyD")) {
      movementVector.add(rightDirection);
      onlyFwd = false;
    }

    if (onlyFwd) {
      if (RE.Input.keyboard.getKeyPressed("ShiftLeft"))
        actualSpeed *= this.runSpeedMultiplier;
    }

    movementVector.normalize();

    if (movementVector.length() > 0) {
      movementVector.copy(movementVector.transformDirection(this.object3d.matrix).multiplyScalar(actualSpeed * deltaTime));
    }

    this.object3d.position.add(movementVector);

    this.camera.position.set(
      this.object3d.position.x,
      this.object3d.position.y + 1,
      this.object3d.position.z
    );
  }
}

FPSControllerJS.interface = {
  rotSpeed:'Number',
  minCameraRotY: 'Number',
  maxCameraRotY: 'Number',
  walkSpeed: 'Number',
  fwdSpeedMultiplier: 'Number',
  runSpeedMultiplier: 'Number',
  jumpHeight: 'Number',
  jumpSpeed: 'Number',
};

RE.registerComponent(FPSControllerJS);