//weird declaration for decorators. Decorators are exotic mechanism of post-avantgarde Javascript. 
//Camera won't work without that
// copypasted it from Typescript website

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;

import * as RE from 'rogue-engine';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';
const fwdDirection = new Vector3(0, 0, -1);
const bwdDirection = new Vector3(0, 0, 1);
const leftDirection = new Vector3(-1, 0, 0);
const rightDirection = new Vector3(1, 0, 0);
export default class FPSController extends RE.Component {
    constructor() {
        super(...arguments);
		/*
        this.rotSpeed = 1;
        this.minCameraRotY = -1;
        this.maxCameraRotY = 1;
        this.walkSpeed = 3;
        this.fwdSpeedMultiplier = 1.3;
        this.runSpeedMultiplier = 1.8;
        this.jumpHeight = 0.5;
        this.jumpSpeed = 50;		
		*/
		
    }
    awake() {
		console.log("AWAKE");
        RE.Input.mouse.lock();
        this.cameraPos = this.object3d.getObjectByName("CameraPosition");
        if (!this.cameraPos) {
            throw "Couldn't find child CemeraPosition";
        }
        this.camera = new PerspectiveCamera();
        RE.App.currentScene.add(this.camera);
        RE.App.activeCamera = this.camera.uuid;
        this.camera.position.copy(this.cameraPos.position);
		this.camera.rotation.copy(this.cameraPos.rotation);
        const appContainer = document.getElementById("rogue-app");
        if (!appContainer)
            return;
        appContainer.onmousedown = (e) => {
            RE.Input.mouse.lock();
        };
        RE.Runtime.onStop(() => {
            if (!appContainer)
                return;
            appContainer.onmousedown = null;
        });
        this.camera.rotation.order = 'YXZ';
        this.object3d.rotation.order = 'YXZ';
				
    }
    update() {
        if (RE.Input.mouse.isLeftButtonPressed && document.pointerLockElement) {
            
        }
        
        if (RE.Input.keyboard.getKeyDown("KeyR")) {
            
        }
        const deltaTime = RE.Runtime.deltaTime;
        if (RE.Input.mouse.isMoving && document.pointerLockElement) {
            const mouseDeltaX = RE.Input.mouse.movementX * this.rotSpeed * deltaTime;
            const mouseDeltaY = RE.Input.mouse.movementY * this.rotSpeed * deltaTime;
            this.camera.rotation.set(this.camera.rotation.x - mouseDeltaY, this.camera.rotation.y - mouseDeltaX, this.camera.rotation.z);			
            this.object3d.rotation.set(this.object3d.rotation.x, this.object3d.rotation.y - mouseDeltaX, this.object3d.rotation.z);
            this.camera.rotation.x = Math.max(this.minCameraRotY, Math.min(this.maxCameraRotY, this.camera.rotation.x));		
			
            this.cameraPos.rotation.x = this.camera.rotation.x;			
			
			
        }
        RE.Input.keyboard.getKeyPressed("Escape") && RE.Input.mouse.unlock();
        let actualSpeed = this.walkSpeed;
        let onlyFwd = true;
        const movementVector = new Vector3();
        if (RE.Input.keyboard.getKeyDown("Space")) {
			
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
            if (RE.Input.keyboard.getKeyPressed("ShiftLeft") )
                actualSpeed *= this.runSpeedMultiplier;
            else 
                actualSpeed *= this.fwdSpeedMultiplier;
        }
        movementVector.normalize();
        if (movementVector.length() > 0) {

            movementVector.copy(movementVector.transformDirection(this.object3d.matrix).multiplyScalar(actualSpeed * deltaTime));

        }
        else {

        }			
		
		var newVector = this.object3d.position.add(movementVector);
		this.object3d.position.copy(newVector);
		this.camera.position.set(this.object3d.position.x, this.object3d.position.y, this.object3d.position.z)
		
    }
}

__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "rotSpeed", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "minCameraRotY", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "maxCameraRotY", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "walkSpeed", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "fwdSpeedMultiplier", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "runSpeedMultiplier", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "jumpHeight", void 0);
__decorate([
    RE.Prop("Number"),
    __metadata("design:type", Number)
], FPSController.prototype, "jumpSpeed", void 0);

RE.registerComponent(FPSController);
