import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTheme } from '../context/ThemeContext';
import { DesktopPC3D } from './coder/DesktopPC3D';
import { RotateCcw, Monitor } from 'lucide-react';

export default function Character3DStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Three.js References
  const desktopRef = useRef<DesktopPC3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3 | null>(null);
  const targetCamLookAt = useRef<THREE.Vector3 | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    hemi: THREE.HemisphereLight;
    spot: THREE.SpotLight;
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    const width = container.clientWidth || 480;
    const height = 450;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    // Straight-forward camera angle capturing the full 3D model and its stage
    camera.position.set(0, 1.1, 6.0);
    cameraRef.current = camera;

    // 2. WebGL Renderer with ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.48, 0);
    controls.minDistance = 1.6;
    controls.maxDistance = 6.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath floor
    controls.minPolarAngle = Math.PI / 12;
    controls.autoRotate = false;
    controlsRef.current = controls;

    // 4. Lighting Setup (Adrian Hajdin signature lighting + Studio accents)
    const isDark = theme === 'dark';

    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.85 : 1.1);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(
      0xffffff,
      0x050814,
      isDark ? 0.35 : 0.6
    );
    scene.add(hemiLight);

    // Spot light from above-left (matching Adrian Hajdin [-20, 50, 10])
    const spotLight = new THREE.SpotLight(0xfffaed, isDark ? 2.5 : 3.0);
    spotLight.position.set(-2.5, 5.0, 2.0);
    spotLight.angle = 0.55;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.0002;
    scene.add(spotLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, isDark ? 2.2 : 2.5);
    keyLight.position.set(3.0, 3.5, 2.5);
    scene.add(keyLight);

    // Fill light with cyber blue tone for PC tower glass and fan glow
    const fillLight = new THREE.DirectionalLight(0x38bdf8, isDark ? 1.6 : 1.2);
    fillLight.position.set(-2.5, 1.8, -1.5);
    scene.add(fillLight);

    lightsRef.current = {
      ambient: ambientLight,
      hemi: hemiLight,
      spot: spotLight,
      key: keyLight,
      fill: fillLight,
    };

    // 5. Load Desktop PC Model
    const desktopPC = new DesktopPC3D();
    desktopRef.current = desktopPC;
    scene.add(desktopPC.group);

    desktopPC
      .load(isDark)
      .then(() => {
        if (isDisposed) return;
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Desktop PC load error:', err);
        if (!isDisposed) setIsLoading(false);
      });

    // 6. Render Loop
    let prevTime = performance.now();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;

      // Smooth camera transition towards reset position if triggered
      if (targetCamPos.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.08);
        controlsRef.current.target.lerp(targetCamLookAt.current!, 0.08);
        if (cameraRef.current.position.distanceTo(targetCamPos.current) < 0.01) {
          targetCamPos.current = null;
          targetCamLookAt.current = null;
        }
      }

      desktopPC.update(delta);
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      controls.dispose();
      desktopPC.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update theme colors
  useEffect(() => {
    const isDark = theme === 'dark';

    if (lightsRef.current) {
      const { ambient, hemi, spot, key, fill } = lightsRef.current;
      ambient.intensity = isDark ? 0.85 : 1.1;
      hemi.intensity = isDark ? 0.35 : 0.6;
      spot.intensity = isDark ? 2.5 : 3.0;
      key.intensity = isDark ? 2.2 : 2.5;
      fill.intensity = isDark ? 1.6 : 1.2;
    }

    if (desktopRef.current) {
      desktopRef.current.setTheme(isDark);
    }
  }, [theme]);

  // Reset view to original centered straight-forward battlestation angle
  const handleResetView = () => {
    targetCamPos.current = new THREE.Vector3(0, 1.1, 
      6.0);
    targetCamLookAt.current = new THREE.Vector3(0, 0.48, 0);
  };

  return (
    <div
      id="stage-3d-wrapper"
      className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-slate-100/90 dark:from-[#090D1A] dark:to-[#060810] shadow-md transition-colors"
    >
      
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-900/70 backdrop-blur-md">
        
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Desktop 
          </span>
        </div>

       
        <button
          id="btn-3d-reset-view"
          type="button"
          onClick={handleResetView}
          title="Reset camera view"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px]">Reset View</span>
        </button>
      </div>

    
      <div
        ref={containerRef}
        className="relative w-full h-[380px] sm:h-[450px] cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-xs">
            <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Loading Desktop ...
            </span>
          </div>
        )}

        {/* Minimal Interaction Hint Overlay */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/75 text-[10px] font-medium text-white/90 backdrop-blur-xs border border-white/10 shadow-xs">
            <span>Drag to rotate 360° • Scroll to zoom</span>
          </span>
        </div>
      </div>
    </div>
  );
}
