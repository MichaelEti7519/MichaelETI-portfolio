import * as THREE from 'three';

export class PedestalStage {
  public group: THREE.Group;
  private pedestalMesh: THREE.Mesh;
  private accentRingMesh: THREE.Mesh;
  private contactShadowMesh: THREE.Mesh;
  private particles: THREE.Points;
  private particlePositions: Float32Array;
  private particleCount: number = 40;

  constructor(isDark: boolean = false) {
    this.group = new THREE.Group();
    this.group.name = 'stage-pedestal';

    // 1. Pedestal Base Cylinder
    const pedestalGeo = new THREE.CylinderGeometry(1.28, 1.36, 0.08, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x131B2E : 0xF1F5F9,
      roughness: 0.65,
      metalness: 0.15,
    });
    this.pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    this.pedestalMesh.position.y = -0.04;
    this.pedestalMesh.receiveShadow = true;
    this.group.add(this.pedestalMesh);

    // 2. Beveled Top Rim Accent Ring
    const ringGeo = new THREE.RingGeometry(1.2, 1.26, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38BDF8 : 0x2563EB,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
    });
    this.accentRingMesh = new THREE.Mesh(ringGeo, ringMat);
    this.accentRingMesh.rotation.x = -Math.PI / 2;
    this.accentRingMesh.position.y = 0.001;
    this.group.add(this.accentRingMesh);

    // Inner subtle ring
    const innerRingGeo = new THREE.RingGeometry(0.72, 0.735, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0284C7 : 0x94A3B8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.35 : 0.4,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.001;
    this.group.add(innerRing);

    // 3. High-Quality Contact Shadow Texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.32)');
    grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(1.4, 1.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: isDark ? 0.8 : 0.55,
    });
    this.contactShadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    this.contactShadowMesh.rotation.x = -Math.PI / 2;
    this.contactShadowMesh.position.y = 0.003;
    this.group.add(this.contactShadowMesh);

    // 4. Ambient Sparkles / Light Dust Particles
    const particleGeo = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.2 + Math.random() * 1.1;
      this.particlePositions[i * 3] = Math.cos(angle) * radius;
      this.particlePositions[i * 3 + 1] = 0.1 + Math.random() * 1.6;
      this.particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    // Particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    pGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.6)');
    pGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: isDark ? 0.65 : 0.45,
    });

    this.particles = new THREE.Points(particleGeo, pMat);
    this.group.add(this.particles);
  }

  public update(delta: number): void {
    // Gentle particle rise
    const posAttr = this.particles.geometry.attributes.position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;

    for (let i = 0; i < this.particleCount; i++) {
      const yIdx = i * 3 + 1;
      positions[yIdx] += delta * 0.12;

      // Reset when floating too high
      if (positions[yIdx] > 1.8) {
        positions[yIdx] = 0.05;
      }
    }

    posAttr.needsUpdate = true;
  }

  public setTheme(isDark: boolean): void {
    const mat = this.pedestalMesh.material as THREE.MeshStandardMaterial;
    mat.color.setHex(isDark ? 0x131B2E : 0xF1F5F9);

    const ringMat = this.accentRingMesh.material as THREE.MeshBasicMaterial;
    ringMat.color.setHex(isDark ? 0x38BDF8 : 0x2563EB);
    ringMat.opacity = isDark ? 0.75 : 0.6;

    const shadowMat = this.contactShadowMesh.material as THREE.MeshBasicMaterial;
    shadowMat.opacity = isDark ? 0.8 : 0.55;

    const pMat = this.particles.material as THREE.PointsMaterial;
    pMat.opacity = isDark ? 0.65 : 0.45;
  }

  public dispose(): void {
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
  }
}
