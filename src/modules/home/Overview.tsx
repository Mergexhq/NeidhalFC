"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";

const BALL_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    label: "Coastal Training",
    sublabel: "Chennai beach soccer drills"
  },
  {
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=800&q=80",
    label: "Individual Flair",
    sublabel: "Unleashing street-style play"
  },
  {
    image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=800&q=80",
    label: "Structured Coaching",
    sublabel: "Planned technical curriculum"
  }
];

const CARDS = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
    label: "01 / Landscape",
    title: "Coastal Landscape",
    description: "Named after Neidhal (shoreline/ocean), reflecting our coastal roots and beach sand origins in Chennai."
  },
  {
    image: "https://images.unsplash.com/photo-1570473541596-2cf814780191?auto=format&fit=crop&w=300&q=80",
    label: "02 / Iconography",
    title: "Dolphin Crest",
    description: "Inspired by pods of dolphins swimming alongside our beach sessions just 30 feet from the shore."
  },
  {
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=300&q=80",
    label: "03 / Venues",
    title: "Elite Turfs",
    description: "Offering premium training turf environments in Kottivakkam, Injambakkam, and Nandanam."
  }
];

// Interactive 3D Soccer Ball Component using vanilla Three.js
const ThreeSoccerBall: React.FC<{ activeSlide: number }> = ({ activeSlide }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);

  // Smoothly update hexagon textures when activeSlide index changes
  useEffect(() => {
    if (materialRef.current && texturesRef.current[activeSlide]) {
      materialRef.current.map = texturesRef.current[activeSlide];
      materialRef.current.needsUpdate = true;
    }
  }, [activeSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // 2. Mathematically generate Truncated Icosahedron Panels (radius = 2.0)
    const t = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      new THREE.Vector3(-1, t, 0).normalize(),
      new THREE.Vector3(1, t, 0).normalize(),
      new THREE.Vector3(-1, -t, 0).normalize(),
      new THREE.Vector3(1, -t, 0).normalize(),
      new THREE.Vector3(0, -1, t).normalize(),
      new THREE.Vector3(0, 1, t).normalize(),
      new THREE.Vector3(0, -1, -t).normalize(),
      new THREE.Vector3(0, 1, -t).normalize(),
      new THREE.Vector3(t, 0, -1).normalize(),
      new THREE.Vector3(t, 0, 1).normalize(),
      new THREE.Vector3(-t, 0, -1).normalize(),
      new THREE.Vector3(-t, 0, 1).normalize()
    ];

    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    interface PanelData {
      type: "pentagon" | "hexagon";
      vertices: THREE.Vector3[];
      center: THREE.Vector3;
    }

    const panels: PanelData[] = [];
    const radius = 2.0;

    // Generate 20 Hexagons by dividing original triangle faces
    faces.forEach(([idxA, idxB, idxC]) => {
      const A = vertices[idxA];
      const B = vertices[idxB];
      const C = vertices[idxC];

      const p0 = new THREE.Vector3().lerpVectors(A, B, 1/3).normalize().multiplyScalar(radius);
      const p1 = new THREE.Vector3().lerpVectors(A, B, 2/3).normalize().multiplyScalar(radius);
      const p2 = new THREE.Vector3().lerpVectors(B, C, 1/3).normalize().multiplyScalar(radius);
      const p3 = new THREE.Vector3().lerpVectors(B, C, 2/3).normalize().multiplyScalar(radius);
      const p4 = new THREE.Vector3().lerpVectors(C, A, 1/3).normalize().multiplyScalar(radius);
      const p5 = new THREE.Vector3().lerpVectors(C, A, 2/3).normalize().multiplyScalar(radius);

      const center = new THREE.Vector3()
        .add(p0).add(p1).add(p2).add(p3).add(p4).add(p5)
        .divideScalar(6);

      panels.push({
        type: "hexagon",
        vertices: [p0, p1, p2, p3, p4, p5],
        center
      });
    });

    // Generate 12 Pentagons by circular sorting around 12 original vertices
    for (let k = 0; k < 12; k++) {
      const Vk = vertices[k];
      const neighborsSet = new Set<number>();
      faces.forEach(([idxA, idxB, idxC]) => {
        if (idxA === k) { neighborsSet.add(idxB); neighborsSet.add(idxC); }
        if (idxB === k) { neighborsSet.add(idxA); neighborsSet.add(idxC); }
        if (idxC === k) { neighborsSet.add(idxA); neighborsSet.add(idxB); }
      });
      const neighbors = Array.from(neighborsSet).map(idx => vertices[idx]);

      const normal = Vk.clone().normalize();
      const tangentU = new THREE.Vector3();
      if (Math.abs(normal.x) < 0.9) {
        tangentU.crossVectors(new THREE.Vector3(1, 0, 0), normal).normalize();
      } else {
        tangentU.crossVectors(new THREE.Vector3(0, 1, 0), normal).normalize();
      }
      const tangentW = new THREE.Vector3().crossVectors(normal, tangentU).normalize();

      neighbors.sort((a, b) => {
        const da = a.clone().sub(Vk);
        const db = b.clone().sub(Vk);
        const xa = da.dot(tangentU);
        const ya = da.dot(tangentW);
        const xb = db.dot(tangentU);
        const yb = db.dot(tangentW);
        return Math.atan2(ya, xa) - Math.atan2(yb, xb);
      });

      const pList = neighbors.map(neighbor => {
        return new THREE.Vector3().lerpVectors(Vk, neighbor, 1/3).normalize().multiplyScalar(radius);
      });

      const center = new THREE.Vector3()
        .add(pList[0]).add(pList[1]).add(pList[2]).add(pList[3]).add(pList[4])
        .divideScalar(5);

      panels.push({
        type: "pentagon",
        vertices: pList,
        center
      });
    }

    // Identify front pentagon (closest to positive Z-axis) to place Neidhal logo
    let frontIdx = -1;
    let maxZ = -Infinity;
    panels.forEach((p, idx) => {
      if (p.type === "pentagon" && p.center.z > maxZ) {
        maxZ = p.center.z;
        frontIdx = idx;
      }
    });

    // 3. Textures & Materials
    const textureLoader = new THREE.TextureLoader();
    const crestTexture = textureLoader.load("/logo/neidhal_logo.png");
    
    const slideTextures = BALL_SLIDES.map(slide => {
      const tex = textureLoader.load(slide.image);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    });
    texturesRef.current = slideTextures;

    // Unsplash images to display in each of the remaining 11 pentagons
    const pentagonImages = [
      "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=400&q=80", // beach soccer
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80", // soccer
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=400&q=80", // training
      "https://images.unsplash.com/photo-1526232761682-d26e47ac1740?auto=format&fit=crop&w=400&q=80", // kids coach
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=400&q=80", // turf
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80"  // drills
    ];

    const pentagonTextures = pentagonImages.map(url => {
      const tex = textureLoader.load(url);
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    });

    const hexMaterial = new THREE.MeshPhongMaterial({
      map: slideTextures[activeSlide],
      side: THREE.DoubleSide,
      shininess: 40,
      specular: new THREE.Color("#111111")
    });
    materialRef.current = hexMaterial;

    const crestMaterial = new THREE.MeshPhongMaterial({
      map: crestTexture,
      side: THREE.DoubleSide,
      shininess: 60,
      specular: new THREE.Color("#333333")
    });

    // Create unique materials for each pentagon using the loaded textures
    const pentagonMaterials = pentagonTextures.map(tex => {
      return new THREE.MeshPhongMaterial({
        map: tex,
        side: THREE.DoubleSide,
        shininess: 35,
        specular: new THREE.Color("#111111")
      });
    });

    // 4. Construct meshes inside groups for animation & tilt isolation
    const tiltGroup = new THREE.Group();
    const ballGroup = new THREE.Group();
    tiltGroup.add(ballGroup);
    scene.add(tiltGroup);

    const scaleFactor = 0.925; // padding factor

    panels.forEach((panel, idx) => {
      const geometry = new THREE.BufferGeometry();
      
      // Scale vertices towards face center for padding
      const paddedVertices = panel.vertices.map(v => {
        return new THREE.Vector3().lerpVectors(panel.center, v, scaleFactor);
      });

      const positions: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];

      const n = paddedVertices.length;
      for (let i = 0; i < n; i++) {
        const vCurr = paddedVertices[i];
        const vNext = paddedVertices[(i + 1) % n];

        // Central triangulation
        positions.push(panel.center.x, panel.center.y, panel.center.z);
        positions.push(vCurr.x, vCurr.y, vCurr.z);
        positions.push(vNext.x, vNext.y, vNext.z);

        const nC = panel.center.clone().normalize();
        const nCurr = vCurr.clone().normalize();
        const nNext = vNext.clone().normalize();

        normals.push(nC.x, nC.y, nC.z);
        normals.push(nCurr.x, nCurr.y, nCurr.z);
        normals.push(nNext.x, nNext.y, nNext.z);

        // UV orthographic projection from front
        const r = radius;
        uvs.push(0.5 + panel.center.x / (2 * r), 0.5 + panel.center.y / (2 * r));
        uvs.push(0.5 + vCurr.x / (2 * r), 0.5 + vCurr.y / (2 * r));
        uvs.push(0.5 + vNext.x / (2 * r), 0.5 + vNext.y / (2 * r));
      }

      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
      geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

      let material = hexMaterial;
      if (panel.type === "hexagon") {
        material = hexMaterial;
      } else if (idx === frontIdx) {
        material = crestMaterial;
      } else {
        // Map remaining pentagons to pentagonMaterials (offsetting hexagons at indices 0..19)
        const pentagonIdx = idx - 20;
        material = pentagonMaterials[pentagonIdx % pentagonMaterials.length];
      }

      const mesh = new THREE.Mesh(geometry, material);
      ballGroup.add(mesh);
    });

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(6, 6, 8);
    scene.add(dirLight);

    const dirLightBack = new THREE.DirectionalLight(0xd9c3a5, 0.55);
    dirLightBack.position.set(-6, -6, -4);
    scene.add(dirLightBack);

    // 6. Interactive Cursor Hover Move Rotation listeners
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", onMouseMove);

    // 7. Resize Observer for responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // 8. Animation loop
    let animationFrameId: number;
    let targetRotX = 0;
    let targetRotY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotations
      ballGroup.rotation.y += 0.003;
      ballGroup.rotation.x += 0.001;

      // Mouse interactive tilt
      targetRotX = -mouseY * 0.35;
      targetRotY = mouseX * 0.35;

      tiltGroup.rotation.x = THREE.MathUtils.lerp(tiltGroup.rotation.x, targetRotX, 0.05);
      tiltGroup.rotation.y = THREE.MathUtils.lerp(tiltGroup.rotation.y, targetRotY, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose assets
      scene.clear();
      renderer.dispose();
      crestTexture.dispose();
      slideTextures.forEach(tex => tex.dispose());
      pentagonTextures.forEach(tex => tex.dispose());
      crestMaterial.dispose();
      hexMaterial.dispose();
      pentagonMaterials.forEach(m => m.dispose());
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export const Overview: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % BALL_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + BALL_SLIDES.length) % BALL_SLIDES.length);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2] border-b border-black/5">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Stacked Typography & Interactive 3D Football (lg:col-span-8) */}
          <div className="lg:col-span-8 relative flex flex-col md:flex-row items-center md:items-start justify-between gap-12 min-h-[500px]">
            
            {/* 1. Asymmetrical Stacked Display Text */}
            <div className="flex flex-col relative z-10 max-w-lg">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-6 block font-sans">
                The Neidhal Identity
              </span>
              
              <div className="space-y-1 sm:space-y-2">
                <span 
                  className="block text-5xl sm:text-7xl md:text-[5.5rem] font-condensed font-bold tracking-tight text-transparent select-none leading-none"
                  style={{ WebkitTextStroke: "1.5px var(--color-primary)" }}
                >
                  ROOTED—
                </span>
                <span className="block text-5xl sm:text-7xl md:text-[5.5rem] font-condensed font-black tracking-tight text-primary select-none pl-8 sm:pl-16 leading-none">
                  FEARLESS—
                </span>
                <span className="block text-5xl sm:text-7xl md:text-[5.5rem] font-condensed font-black tracking-tight text-accent select-none leading-none">
                  CREATIVE—
                </span>
                <span 
                  className="block text-5xl sm:text-7xl md:text-[5.5rem] font-condensed font-bold tracking-tight text-transparent select-none pl-8 sm:pl-16 flex items-center gap-3 leading-none"
                  style={{ WebkitTextStroke: "1.5px var(--color-primary)" }}
                >
                  PLAYERS
                  <span className="inline-block w-4 h-4 rounded-full bg-accent animate-pulse" />
                </span>
              </div>

              {/* Floating Circular Badge */}
              <div className="absolute -bottom-16 left-4 z-20 w-24 h-24 rounded-full bg-white border border-sand/30 shadow-lg flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-all duration-300">
                <span className="font-condensed font-black text-2xl text-primary leading-none">100%</span>
                <span className="text-[8px] uppercase tracking-widest text-accent font-bold mt-1">Beach Born</span>
                <span className="text-[7px] uppercase tracking-widest text-[#6F6F6F] font-bold">Built for Pitch</span>
              </div>
            </div>

            {/* 2. Interactive 3D Football Container */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[380px] md:h-[380px] shrink-0 self-center md:self-auto mt-12 md:mt-0">
              
              {/* Floating Next Button */}
              <button
                onClick={handleNext}
                className="absolute -top-2 -right-2 z-30 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-[1.08] active:scale-95 transition-all shadow-md cursor-pointer hover:bg-primary-light"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>

              {/* Floating Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute -bottom-2 -left-2 z-30 h-10 w-10 rounded-full bg-white text-primary border border-sand/30 flex items-center justify-center hover:scale-[1.08] active:scale-95 transition-all shadow-md cursor-pointer hover:bg-sand-light"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Pagination Dots */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
                {BALL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === idx ? "bg-accent scale-125" : "bg-[#BCA688]/40 hover:bg-[#BCA688]"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Floating translucent label bubble */}
              <div className="absolute bottom-10 right-10 z-20 bg-white/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/40 shadow-lg text-left max-w-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="font-sans font-bold text-xs text-primary leading-tight">
                      {BALL_SLIDES[activeSlide].label}
                    </h5>
                    <p className="text-[9px] text-[#6F6F6F] leading-tight mt-0.5">
                      {BALL_SLIDES[activeSlide].sublabel}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Real 3D Interactive Football Canvas */}
              <div className="w-full h-full">
                <ThreeSoccerBall activeSlide={activeSlide} />
              </div>

            </div>

          </div>

          {/* Right Column: 3 Round Vertical Identity Cards (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            {CARDS.map((card, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 bg-white border border-sand/15 rounded-2xl hover:shadow-xl hover:border-sand/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Image side */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-sand/10 border border-sand/10 relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content details */}
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-accent mb-0.5">
                    {card.label}
                  </span>
                  <h4 className="font-sans font-bold text-base text-primary mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[#6F6F6F] text-xs leading-normal font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center justify-center text-primary/30 group-hover:text-primary transition-colors duration-300">
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Overview;
