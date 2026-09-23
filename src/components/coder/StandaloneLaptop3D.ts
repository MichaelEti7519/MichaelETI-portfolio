import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CodeScreenTexture } from './CodeScreenTexture';

export class StandaloneLaptop3D {
  public group: THREE.Group;
  public laptopModel: THREE.Group | null = null;
  public codeScreen: CodeScreenTexture;

  private screenLight: THREE.PointLight | null = null;
  private pedestalGroup: THREE.Group | null = null;
  private particles: THREE.Points | null = null;
  private particlePositions: Float32Array | null = null;
  private particleCount: number = 32;

  // Materials for theme updates
  private casingMaterials: THREE.MeshStandardMaterial[] = [];
  private pedestalMaterial: THREE.MeshStandardMaterial | null = null;
  private ringMaterial: THREE.MeshBasicMaterial | null = null;
  private shadowMaterial: THREE.MeshBasicMaterial | null = null;

  // Idle floating animation
  private idleTime: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'standalone-laptop-root';
    this.codeScreen = new CodeScreenTexture();
  }

  public async load(isDark: boolean = true): Promise<void> {
    const loader = new GLTFLoader();

    // 1. Build Stage & Pedestal
    this.buildPedestalAndParticles(isDark);

    // 2. Load MacBook GLB
    return new Promise((resolve) => {
      loader.load(
        '/models/macbook.glb',
        (gltf: GLTF) => {
          this.setupLaptopModel(gltf.scene, isDark);
          resolve();
        },
        undefined,
        (err) => {
          console.warn('Could not load macbook.glb, falling back to procedural laptop:', err);
          this.createProceduralLaptop(isDark);
          resolve();
        }
      );
    });
  }

  private setupLaptopModel(model: THREE.Group, isDark: boolean): void {
    this.laptopModel = model;

    // Scale to fill stage nicely as the main hero showcase
    this.laptopModel.scale.set(0.38, 0.38, 0.38);

    // The model's base is at y = -0.13, so lifting by 0.13 * 0.38 puts it right on the pedestal surface (y = 0.05)
    this.laptopModel.position.set(0, 0.06, 0);

    // By default in macbook.glb, the screen is at negative Z facing towards positive Z (the camera)
    this.laptopModel.rotation.set(0, 0, 0);

    // Apply materials and dynamic screen texture
    this.laptopModel.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = (mesh.name || '').toLowerCase();

        if (name.includes('screen') && !name.includes('back')) {
          // Live interactive Retina display with code
          const screenMat = new THREE.MeshStandardMaterial({
            map: this.codeScreen.texture,
            emissive: 0xffffff,
            emissiveMap: this.codeScreen.texture,
            emissiveIntensity: isDark ? 0.98 : 0.88,
            roughness: 0.15,
            metalness: 0.05,
          });
          mesh.material = screenMat;
        } else if (name.includes('touchpad')) {
          const tpMat = new THREE.MeshStandardMaterial({
            color: isDark ? 0x1f242e : 0x94a3b8,
            metalness: 0.9,
            roughness: 0.25,
          });
          this.casingMaterials.push(tpMat);
          mesh.material = tpMat;
        } else {
          // Space Gray / Silver anodized unibody aluminum
          const casingMat = new THREE.MeshStandardMaterial({
            color: isDark ? 0x1e2430 : 0x64748b,
            metalness: 0.88,
            roughness: 0.32,
          });
          this.casingMaterials.push(casingMat);
          mesh.material = casingMat;
        }
      }
    });

    this.group.add(this.laptopModel);

    // Dynamic screen glow casting light on keyboard and trackpad
    const screenGlow = new THREE.PointLight(0x38bdf8, isDark ? 1.6 : 1.2, 1.8);
    screenGlow.position.set(0, 0.48, 0.1);
    this.screenLight = screenGlow;
    this.group.add(screenGlow);
  }

  private createProceduralLaptop(isDark: boolean): void {
    const laptop = new THREE.Group();

    // Base body (keyboard + trackpad)
    const baseGeo = new THREE.BoxGeometry(1.36, 0.03, 0.92);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e2430 : 0x64748b,
      metalness: 0.88,
      roughness: 0.3,
    });
    this.casingMaterials.push(bodyMat);
    const base = new THREE.Mesh(baseGeo, bodyMat);
    base.position.set(0, 0.03, 0.12);
    base.castShadow = true;
    base.receiveShadow = true;
    laptop.add(base);

    // Trackpad
    const tpGeo = new THREE.PlaneGeometry(0.42, 0.28);
    const tpMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x181d28 : 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const tp = new THREE.Mesh(tpGeo, tpMat);
    tp.rotation.x = -Math.PI / 2;
    tp.position.set(0, 0.046, 0.34);
    laptop.add(tp);

    // Keyboard well
    const kbGeo = new THREE.PlaneGeometry(1.12, 0.44);
    const kbMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x111520 : 0x334155,
      metalness: 0.6,
      roughness: 0.7,
    });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.rotation.x = -Math.PI / 2;
    kb.position.set(0, 0.046, -0.06);
    laptop.add(kb);

    // Screen Lid angled back 105 degrees
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.045, -0.34);
    lidGroup.rotation.x = -0.22;

    const lidBackGeo = new THREE.BoxGeometry(1.36, 0.88, 0.02);
    const lidBack = new THREE.Mesh(lidBackGeo, bodyMat);
    lidBack.position.set(0, 0.44, 0);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

    // Screen Display Plane
    const displayGeo = new THREE.PlaneGeometry(1.30, 0.82);
    const displayMat = new THREE.MeshStandardMaterial({
      map: this.codeScreen.texture,
      emissive: 0xffffff,
      emissiveMap: this.codeScreen.texture,
      emissiveIntensity: isDark ? 0.98 : 0.88,
      roughness: 0.15,
    });
    const display = new THREE.Mesh(displayGeo, displayMat);
    display.position.set(0, 0.44, 0.012);
    lidGroup.add(display);

    laptop.add(lidGroup);
    this.laptopModel = laptop;
    this.group.add(laptop);

    // Point light glow
    const screenGlow = new THREE.PointLight(0x38bdf8, isDark ? 1.6 : 1.2, 1.8);
    screenGlow.position.set(0, 0.48, 0.1);
    this.screenLight = screenGlow;
    this.group.add(screenGlow);
  }

  private buildPedestalAndParticles(isDark: boolean): void {
    const pedestal = new THREE.Group();

    // 1. Sleek circular glass / titanium stage
    const cylinderGeo = new THREE.CylinderGeometry(1.15, 1.22, 0.06, 64);
    const cylinderMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f1524 : 0xf1f5f9,
      roughness: 0.4,
      metalness: 0.3,
    });
    this.pedestalMaterial = cylinderMat;
    const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinder.position.y = -0.03;
    cylinder.receiveShadow = true;
    pedestal.add(cylinder);

    // 2. Cyan Tech Accent Ring
    const ringGeo = new THREE.RingGeometry(1.08, 1.14, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
    });
    this.ringMaterial = ringMat;
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.002;
    pedestal.add(ring);

    // Inner subtle ring
    const innerRingGeo = new THREE.RingGeometry(0.68, 0.695, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0284c7 : 0x94a3b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.4 : 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.002;
    pedestal.add(innerRing);

    // 3. Contact Shadow Texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(1.4, 1.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: isDark ? 0.85 : 0.6,
    });
    this.shadowMaterial = shadowMat;
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.004;
    pedestal.add(shadow);

    this.pedestalGroup = pedestal;
    this.group.add(pedestal);

    // 4. Floating Ambient Code Sparkles / Light Dust
    const pGeo = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.9;
      this.particlePositions[i * 3] = Math.cos(angle) * radius;
      this.particlePositions[i * 3 + 1] = 0.05 + Math.random() * 0.95;
      this.particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    pGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.65)');
    pGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.038,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isDark ? 0.75 : 0.5,
    });

    this.particles = new THREE.Points(pGeo, pMat);
    this.group.add(this.particles);
  }

  public setFileById(id: string): void {
    this.codeScreen.setFileById(id);
  }

  public triggerCompile(): void {
    this.codeScreen.triggerCompile();

    // Pulse screen glow light
    if (this.screenLight) {
      this.screenLight.intensity = 2.4;
      setTimeout(() => {
        if (this.screenLight) {
          this.screenLight.intensity = 1.6;
        }
      }, 400);
    }
  }

  public checkIntersection(raycaster: THREE.Raycaster): boolean {
    if (!this.laptopModel) return false;
    const intersects = raycaster.intersectObjects([this.laptopModel], true);
    return intersects.length > 0;
  }

  public update(delta: number): void {
    this.idleTime += delta;

    // 1. Update dynamic live code screen
    this.codeScreen.update(delta);

    // 2. Subtle organic breathing float for the laptop
    if (this.laptopModel) {
      this.laptopModel.position.y = 0.06 + Math.sin(this.idleTime * 1.5) * 0.008;
    }

    // 3. Ambient dust floating
    if (this.particles && this.particlePositions) {
      const posAttr = this.particles.geometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < this.particleCount; i++) {
        const yIdx = i * 3 + 1;
        positions[yIdx] += delta * 0.08;
        if (positions[yIdx] > 1.1) {
          positions[yIdx] = 0.05;
        }
      }
      posAttr.needsUpdate = true;
    }
  }

  public setTheme(isDark: boolean): void {
    if (this.pedestalMaterial) {
      this.pedestalMaterial.color.setHex(isDark ? 0x0f1524 : 0xf1f5f9);
    }
    if (this.ringMaterial) {
      this.ringMaterial.color.setHex(isDark ? 0x38bdf8 : 0x2563eb);
      this.ringMaterial.opacity = isDark ? 0.8 : 0.6;
    }
    if (this.shadowMaterial) {
      this.shadowMaterial.opacity = isDark ? 0.85 : 0.6;
    }
    if (this.screenLight) {
      this.screenLight.intensity = isDark ? 1.6 : 1.2;
    }

    this.casingMaterials.forEach((m) => {
      m.color.setHex(isDark ? 0x1e2430 : 0x64748b);
    });
  }

  public dispose(): void {
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

    this.casingMaterials = [];
  }
}
