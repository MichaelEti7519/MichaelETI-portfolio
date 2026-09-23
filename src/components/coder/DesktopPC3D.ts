import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { CodeScreenTexture } from './CodeScreenTexture';

export class DesktopPC3D {
  public group: THREE.Group;
  public model: THREE.Group | null = null;
  public codeScreen: CodeScreenTexture;

  private screenMesh: THREE.Mesh | null = null;
  private originalScreenMaterial: THREE.Material | THREE.Material[] | null = null;
  private liveCodeMaterial: THREE.MeshStandardMaterial | null = null;
  private screenLight: THREE.PointLight | null = null;
  private isLiveCodeMode: boolean = true;
  private idleTime: number = 0;
  private baseY: number = 0;

  // Pedestal & floor ring
  private floorRing: THREE.Mesh | null = null;
  private floorDisc: THREE.Mesh | null = null;
  private contactShadow: THREE.Mesh | null = null;

  private dracoLoader: DRACOLoader | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'adrian-hajdin-desktop-pc-root';
    this.codeScreen = new CodeScreenTexture();
  }

  public async load(isDark: boolean = true): Promise<void> {
    const loader = new GLTFLoader();

    // Fast WebAssembly Draco decoder configured locally
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');
    this.dracoLoader.setDecoderConfig({ type: 'wasm' });
    loader.setDRACOLoader(this.dracoLoader);

    this.buildPedestal(isDark);

    return new Promise((resolve, reject) => {
      // Load optimized single-binary GLB with embedded textures
      loader.load(
        '/desktop_pc/scene.glb',
        (gltf: GLTF) => {
          this.setupModel(gltf.scene, isDark);
          resolve();
        },
        undefined,
        (error) => {
          console.warn('Optimized GLB failed, falling back to glTF:', error);
          // Fallback to original gltf if needed
          loader.load(
            '/desktop_pc/scene.gltf',
            (fallbackGltf: GLTF) => {
              this.setupModel(fallbackGltf.scene, isDark);
              resolve();
            },
            undefined,
            (fallbackErr) => {
              console.error('All desktop model loads failed:', fallbackErr);
              reject(fallbackErr);
            }
          );
        }
      );
    });
  }

  private setupModel(scene: THREE.Group, isDark: boolean): void {
    // 1. Rotate the raw glTF by -90 deg (-Math.PI / 2) so the desk, keyboard, and screen face squarely forward towards the viewer
    scene.rotation.y = -Math.PI / 2;

    // Hide the oversized room floor slab and stray underground wire from the raw Sketchfab scene
    scene.traverse((child) => {
      const name = (child.name || '').toLowerCase();
      if (name.includes('cube_material_0') || name.includes('beziercurve003')) {
        child.visible = false;
      }
    });

    const wrapper = new THREE.Group();
    wrapper.name = 'desktop-model-wrapper';
    wrapper.add(scene);
    wrapper.updateMatrixWorld(true);

    // Compute bounding box strictly from visible workstation meshes
    const box = new THREE.Box3();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.visible) {
        const b = new THREE.Box3().setFromObject(child);
        box.union(b);
      }
    });

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Scale so the battlestation desk comfortably spans the pedestal (~2.25 units wide)
    const scale = 2.25 / (size.x || 1);
    wrapper.scale.set(scale, scale, scale);

    // Plant the desk feet firmly on the floor pedestal (y = 0.005) - NO FLOATING
    this.baseY = -box.min.y * scale + 0.005;
    wrapper.position.x = -center.x * scale;
    wrapper.position.y = this.baseY;
    wrapper.position.z = -center.z * scale;

    this.model = wrapper;

    // Find the monitor screen mesh and enhance materials
    this.model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = (mesh.name || '').toLowerCase();
        const matName = (mesh.material && !Array.isArray(mesh.material) && mesh.material.name
          ? mesh.material.name.toLowerCase()
          : '');

        // Locate monitor display: 'MY SCREEN_MY SCREEN_0' or 'material.074_30'
        if (
          name.includes('my screen') ||
          matName.includes('material.074_30') ||
          matName.includes('screen')
        ) {
          this.screenMesh = mesh;
          this.originalScreenMaterial = mesh.material;

          // Prepare Retina live code material
          this.liveCodeMaterial = new THREE.MeshStandardMaterial({
            map: this.codeScreen.texture,
            emissive: 0xffffff,
            emissiveMap: this.codeScreen.texture,
            emissiveIntensity: isDark ? 0.98 : 0.85,
            roughness: 0.2,
            metalness: 0.1,
          });

          if (this.isLiveCodeMode) {
            mesh.material = this.liveCodeMaterial;
          }
        }
      }
    });

    this.group.add(this.model);

    // Dynamic screen illumination casting light onto the keyboard, desk, and PC tower
    const screenGlow = new THREE.PointLight(0x38bdf8, isDark ? 2.2 : 1.5, 3.2);
    screenGlow.position.set(-0.21, 0.8, 0.15);
    this.screenLight = screenGlow;
    this.group.add(screenGlow);
  }

  private buildPedestal(isDark: boolean): void {
    const pedestal = new THREE.Group();

    // 1. Sleek circular ground base
    const discGeo = new THREE.CylinderGeometry(1.65, 1.72, 0.05, 64);
    const discMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x090d18 : 0xf1f5f9,
      roughness: 0.45,
      metalness: 0.25,
    });
    this.floorDisc = new THREE.Mesh(discGeo, discMat);
    this.floorDisc.position.y = -0.025;
    this.floorDisc.receiveShadow = true;
    pedestal.add(this.floorDisc);

    // 2. Cyan Cyber Accent Ring
    const ringGeo = new THREE.RingGeometry(1.56, 1.63, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.85 : 0.6,
    });
    this.floorRing = new THREE.Mesh(ringGeo, ringMat);
    this.floorRing.rotation.x = -Math.PI / 2;
    this.floorRing.position.y = 0.003;
    pedestal.add(this.floorRing);

    // Inner subtle ring
    const innerRingGeo = new THREE.RingGeometry(1.05, 1.075, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0ea5e9 : 0x64748b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.003;
    pedestal.add(innerRing);

    // 3. Radial Soft Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.4)');
    grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.7, 2.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: isDark ? 0.9 : 0.65,
    });
    this.contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.contactShadow.position.y = 0.005;
    pedestal.add(this.contactShadow);

    this.group.add(pedestal);
  }

  public setFileById(id: string): void {
    this.codeScreen.setFileById(id);
  }

  public triggerCompile(): void {
    this.codeScreen.triggerCompile();

    if (this.screenLight) {
      this.screenLight.intensity = 3.2;
      setTimeout(() => {
        if (this.screenLight) {
          this.screenLight.intensity = 2.2;
        }
      }, 400);
    }
  }

  public toggleScreenMode(): boolean {
    this.isLiveCodeMode = !this.isLiveCodeMode;
    if (this.screenMesh) {
      if (this.isLiveCodeMode && this.liveCodeMaterial) {
        this.screenMesh.material = this.liveCodeMaterial;
      } else if (this.originalScreenMaterial) {
        this.screenMesh.material = this.originalScreenMaterial;
      }
    }
    return this.isLiveCodeMode;
  }

  public checkIntersection(raycaster: THREE.Raycaster): boolean {
    if (!this.model) return false;
    const intersects = raycaster.intersectObjects([this.model], true);
    return intersects.length > 0;
  }

  public update(delta: number): void {
    this.idleTime += delta;

    // 1. Update live code screen
    if (this.isLiveCodeMode) {
      this.codeScreen.update(delta);
    }

    // Workstation sits solidly grounded on its pedestal - zero floating
  }

  public setTheme(isDark: boolean): void {
    if (this.floorDisc) {
      (this.floorDisc.material as THREE.MeshStandardMaterial).color.setHex(
        isDark ? 0x090d18 : 0xf1f5f9
      );
    }
    if (this.floorRing) {
      (this.floorRing.material as THREE.MeshBasicMaterial).color.setHex(
        isDark ? 0x38bdf8 : 0x2563eb
      );
      (this.floorRing.material as THREE.MeshBasicMaterial).opacity = isDark ? 0.85 : 0.6;
    }
    if (this.contactShadow) {
      (this.contactShadow.material as THREE.MeshBasicMaterial).opacity = isDark ? 0.9 : 0.65;
    }
    if (this.screenLight) {
      this.screenLight.intensity = isDark ? 2.2 : 1.5;
    }
  }

  public dispose(): void {
    if (this.dracoLoader) {
      this.dracoLoader.dispose();
      this.dracoLoader = null;
    }

    this.codeScreen.dispose();

    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      }
    });

    if (this.liveCodeMaterial) {
      this.liveCodeMaterial.dispose();
    }
  }
}
