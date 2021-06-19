import { Scene, PerspectiveCamera, Texture } from "three";
declare class SkyboxClass {
    private _enabled;
    private _mode;
    private _scene;
    private _camera;
    private _sky;
    private _cubemapSky;
    private _directionalLight;
    private _showSun;
    private _inclination;
    private _azimuth;
    private _sunSphere;
    private _serializedSkybox;
    private _onUpdate;
    private _onStop;
    private _onPlay;
    private _cubemapTop;
    private _cubemapBottom;
    private _cubemapFront;
    private _cubemapBack;
    private _cubemapRight;
    private _cubemapLeft;
    private _cubeTexture;
    sunSpeed: number;
    get scene(): Scene;
    get camera(): PerspectiveCamera;
    get enabled(): boolean;
    set enabled(value: boolean);
    get mode(): 'procedural' | 'cubemap' | '360';
    set mode(value: 'procedural' | 'cubemap' | '360');
    get cubemapTop(): Texture;
    set cubemapTop(value: Texture);
    get cubemapBottom(): Texture;
    set cubemapBottom(value: Texture);
    get cubemapFront(): Texture;
    set cubemapFront(value: Texture);
    get cubemapBack(): Texture;
    set cubemapBack(value: Texture);
    get cubemapRight(): Texture;
    set cubemapRight(value: Texture);
    get cubemapLeft(): Texture;
    set cubemapLeft(value: Texture);
    get fov(): number;
    set fov(value: number);
    get mieDirectionalG(): number;
    set mieDirectionalG(value: number);
    get mieCoefficient(): number;
    set mieCoefficient(value: number);
    get turbidity(): number;
    set turbidity(value: number);
    get rayleigh(): number;
    set rayleigh(value: number);
    get luminance(): number;
    set luminance(value: number);
    get inclination(): number;
    set inclination(value: number);
    get azimuth(): number;
    set azimuth(value: number);
    get showSun(): boolean;
    set showSun(value: boolean);
    init(json?: SkyboxSerialization): void;
    private initProceduralSkybox;
    private initCubemapSkybox;
    toJSON(): SkyboxSerialization;
    fromJSON(json: SkyboxSerialization): void;
    private initWithDefaultValues;
    private getDefaultJSON;
    private setSunPosition;
    private render;
    private createCamera;
}
export declare let Skybox: SkyboxClass;
export declare type SkyboxSerialization = {
    _enabled: boolean;
    _mode: 'procedural' | 'cubemap' | '360';
    _showSun?: boolean;
    inclination?: number;
    azimuth?: number;
    mieDirectionalG?: number;
    mieCoefficient?: number;
    turbidity?: number;
    rayleigh?: number;
    luminance?: number;
    _sunSpeed?: number;
    _cubemapTop?: Texture | undefined;
    _cubemapBottom?: Texture | undefined;
    _cubemapFront?: Texture | undefined;
    _cubemapBack?: Texture | undefined;
    _cubemapRight?: Texture | undefined;
    _cubemapLeft?: Texture | undefined;
};
export {};
