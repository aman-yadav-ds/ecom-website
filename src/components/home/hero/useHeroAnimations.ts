"use client";

import { useEffect, useRef } from "react";

export interface HeroRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  badgeDotRef: React.RefObject<HTMLSpanElement | null>;
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
  headlineLine1Ref: React.RefObject<HTMLSpanElement | null>;
  headlineLine2Ref: React.RefObject<HTMLSpanElement | null>;
  headlineLine3Ref: React.RefObject<HTMLSpanElement | null>;
  headlineLine4Ref: React.RefObject<HTMLSpanElement | null>;
  paragraphRef: React.RefObject<HTMLParagraphElement | null>;
  ctaContainerRef: React.RefObject<HTMLDivElement | null>;
  primaryBtnRef: React.RefObject<HTMLAnchorElement | null>;
  primaryArrowRef: React.RefObject<SVGSVGElement | null>;
  secondaryBtnRef: React.RefObject<HTMLButtonElement | null>;
  statsContainerRef: React.RefObject<HTMLDivElement | null>;
  stat1NumRef: React.RefObject<HTMLDivElement | null>;
  stat2NumRef: React.RefObject<HTMLDivElement | null>;
  cardContainerRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  vignetteRef: React.RefObject<HTMLDivElement | null>;
  sheenRef: React.RefObject<HTMLDivElement | null>;
  trialBadgeRef: React.RefObject<HTMLDivElement | null>;
  trialDotRef: React.RefObject<HTMLSpanElement | null>;
  trialSheenRef: React.RefObject<HTMLSpanElement | null>;
  panelRef: React.RefObject<HTMLDivElement | null>;
  panelArrowRef: React.RefObject<HTMLSpanElement | null>;
}

export function useHeroAnimations(): HeroRefs {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const badgeDotRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine4Ref = useRef<HTMLSpanElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement | null>(null);
  const primaryArrowRef = useRef<SVGSVGElement | null>(null);
  const secondaryBtnRef = useRef<HTMLButtonElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const stat1NumRef = useRef<HTMLDivElement | null>(null);
  const stat2NumRef = useRef<HTMLDivElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const trialBadgeRef = useRef<HTMLDivElement | null>(null);
  const trialDotRef = useRef<HTMLSpanElement | null>(null);
  const trialSheenRef = useRef<HTMLSpanElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelArrowRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Strictly client-side execution to guarantee 0ms server CPU usage on Cloudflare Worker
    if (typeof window === "undefined") return;

    let isCancelled = false;
    let ctx: { revert: () => void } | null = null;
    let cleanupMouse: (() => void) | null = null;

    // Dynamically load GSAP and ScrollTrigger on client only
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (isCancelled || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // 1. Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
          // Graceful fallback for reduced motion: immediate clean visibility
          gsap.set(
            [
              containerRef.current,
              badgeRef.current,
              headlineRef.current,
              headlineLine1Ref.current,
              headlineLine2Ref.current,
              headlineLine3Ref.current,
              headlineLine4Ref.current,
              paragraphRef.current,
              ctaContainerRef.current,
              statsContainerRef.current,
              cardContainerRef.current,
            ],
            { opacity: 1, y: 0, scale: 1, clearProps: "all" }
          );
          if (stat1NumRef.current) stat1NumRef.current.textContent = "400+";
          if (stat2NumRef.current) stat2NumRef.current.textContent = "100%";
          return;
        }

        // ==========================================
        // 2. ENTRANCE TIMELINE SEQUENCE
        // ==========================================
        const entranceTl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // Phase 1: Background container settles into place
        if (containerRef.current) {
          entranceTl.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.9, ease: "power2.out" },
            0
          );
        }

        // Phase 2: Status Telemetry Badge
        if (badgeRef.current) {
          entranceTl.fromTo(
            badgeRef.current,
            { opacity: 0, y: 15, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65 },
            0.1
          );
        }

        // Phase 3: Staggered Headline Reveal
        const blackLines = [headlineLine1Ref.current, headlineLine2Ref.current].filter(Boolean);
        const redLines = [headlineLine3Ref.current, headlineLine4Ref.current].filter(Boolean);

        if (blackLines.length > 0) {
          entranceTl.fromTo(
            blackLines,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" },
            0.22
          );
        }

        if (redLines.length > 0) {
          entranceTl.fromTo(
            redLines,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power4.out" },
            0.42
          );
        }

        // Phase 4: Paragraph Reveal
        if (paragraphRef.current) {
          entranceTl.fromTo(
            paragraphRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            0.68
          );
        }

        // Phase 5: CTA Buttons Reveal
        if (ctaContainerRef.current) {
          entranceTl.fromTo(
            ctaContainerRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
            0.88
          );
        }

        if (primaryArrowRef.current) {
          entranceTl.fromTo(
            primaryArrowRef.current,
            { x: -6 },
            { x: 0, duration: 0.5, ease: "power2.out" },
            0.98
          );
        }

        // Phase 6: Hero Machinery Card Settle
        if (cardContainerRef.current) {
          entranceTl.fromTo(
            cardContainerRef.current,
            { opacity: 0, scale: 0.96, y: 16 },
            { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
            0.3
          );
        }

        // Phase 7: Facts / Statistics Reveal & Count-Up
        if (statsContainerRef.current) {
          const statItems = statsContainerRef.current.children;
          entranceTl.fromTo(
            statItems,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
            1.05
          );

          // Counter 1: 0 -> 400+
          if (stat1NumRef.current) {
            const countObj1 = { val: 0 };
            entranceTl.to(
              countObj1,
              {
                val: 400,
                duration: 1.1,
                ease: "power2.out",
                onUpdate: () => {
                  if (stat1NumRef.current) {
                    stat1NumRef.current.textContent = `${Math.round(countObj1.val)}+`;
                  }
                },
              },
              1.1
            );
          }

          // Counter 2: 0 -> 100%
          if (stat2NumRef.current) {
            const countObj2 = { val: 0 };
            entranceTl.to(
              countObj2,
              {
                val: 100,
                duration: 1.0,
                ease: "power2.out",
                onUpdate: () => {
                  if (stat2NumRef.current) {
                    stat2NumRef.current.textContent = `${Math.round(countObj2.val)}%`;
                  }
                },
              },
              1.15
            );
          }
        }

        // ==========================================
        // 3. CONTINUOUS AMBIENT MOTION
        // ==========================================

        // A. Subtle camera breathing (very slow, organic 11s loop)
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            scale: 1.025,
            x: 2.5,
            y: -3,
            duration: 11,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        // B. Pulsing Status Red Beacons (restrained, continuous)
        const pulsingDots = [badgeDotRef.current, trialDotRef.current].filter(Boolean);
        if (pulsingDots.length > 0) {
          gsap.to(pulsingDots, {
            scale: 1.25,
            opacity: 0.55,
            duration: 1.8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        // C. Field Trial Reel Badge Periodic Sheen (every ~5s)
        if (trialSheenRef.current) {
          gsap.fromTo(
            trialSheenRef.current,
            { xPercent: -140 },
            {
              xPercent: 200,
              duration: 1.2,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: 4.5,
            }
          );
        }

        // D. Atmospheric Sunlight Sheen across machinery
        if (sheenRef.current) {
          gsap.fromTo(
            sheenRef.current,
            { xPercent: -130, opacity: 0 },
            {
              xPercent: 150,
              opacity: 0.28,
              duration: 9,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 5,
            }
          );
        }

        // ==========================================
        // 4. RESPONSIVE BREAKPOINTS (matchMedia)
        // ==========================================

        mm.add("(min-width: 1024px)", () => {
          // --- DESKTOP: Inertia Mouse Parallax & 3D Card Tilt ---
          if (!containerRef.current || !cardRef.current) return;

          const container = containerRef.current;
          const card = cardRef.current;

          // GPU-accelerated quickTo setters for 60 FPS inertia
          const imageQuickX = imageRef.current ? gsap.quickTo(imageRef.current, "x", { duration: 0.7, ease: "power2.out" }) : null;
          const imageQuickY = imageRef.current ? gsap.quickTo(imageRef.current, "y", { duration: 0.7, ease: "power2.out" }) : null;
          const vignetteQuickX = vignetteRef.current ? gsap.quickTo(vignetteRef.current, "x", { duration: 0.7, ease: "power2.out" }) : null;
          const badgeQuickX = trialBadgeRef.current ? gsap.quickTo(trialBadgeRef.current, "x", { duration: 0.6, ease: "power2.out" }) : null;
          const badgeQuickY = trialBadgeRef.current ? gsap.quickTo(trialBadgeRef.current, "y", { duration: 0.6, ease: "power2.out" }) : null;
          const panelQuickX = panelRef.current ? gsap.quickTo(panelRef.current, "x", { duration: 0.5, ease: "power2.out" }) : null;
          const panelQuickY = panelRef.current ? gsap.quickTo(panelRef.current, "y", { duration: 0.5, ease: "power2.out" }) : null;
          const headlineQuickX = headlineRef.current ? gsap.quickTo(headlineRef.current, "x", { duration: 0.7, ease: "power2.out" }) : null;
          const cardRotateX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power2.out" });
          const cardRotateY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power2.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            if (e.clientY < rect.top || e.clientY > rect.bottom) return;

            const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const ny = (e.clientY - rect.top) / rect.height - 0.5;

            // Parallax displacements
            imageQuickX?.(nx * -12); // ±6px
            imageQuickY?.(ny * -12);
            vignetteQuickX?.(nx * -4); // ±2px
            badgeQuickX?.(nx * 6); // ±3px
            badgeQuickY?.(ny * 4);
            panelQuickX?.(nx * 2); // ±1px
            panelQuickY?.(ny * 2);
            headlineQuickX?.(nx * 4); // ±2px

            // Micro 3D tilt on card (max ±1.2°)
            cardRotateX(-ny * 2.4);
            cardRotateY(nx * 2.4);
          };

          const handleMouseLeave = () => {
            imageQuickX?.(0);
            imageQuickY?.(0);
            vignetteQuickX?.(0);
            badgeQuickX?.(0);
            badgeQuickY?.(0);
            panelQuickX?.(0);
            panelQuickY?.(0);
            headlineQuickX?.(0);
            cardRotateX(0);
            cardRotateY(0);
          };

          window.addEventListener("mousemove", handleMouseMove, { passive: true });
          container.addEventListener("mouseleave", handleMouseLeave);

          cleanupMouse = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
          };

          // --- Desktop Hover Micro-Interactions ---
          // Primary CTA button hover
          if (primaryBtnRef.current && primaryArrowRef.current) {
            const btn = primaryBtnRef.current;
            const arrow = primaryArrowRef.current;

            const onBtnEnter = () => {
              gsap.to(btn, { y: -3, scale: 1.015, duration: 0.28, ease: "power2.out" });
              gsap.to(arrow, { x: 5, duration: 0.28, ease: "power2.out" });
            };
            const onBtnLeave = () => {
              gsap.to(btn, { y: 0, scale: 1, duration: 0.28, ease: "power2.out" });
              gsap.to(arrow, { x: 0, duration: 0.28, ease: "power2.out" });
            };

            btn.addEventListener("mouseenter", onBtnEnter);
            btn.addEventListener("mouseleave", onBtnLeave);
          }

          // K9 Bottom Video Panel hover
          if (panelRef.current && panelArrowRef.current) {
            const panel = panelRef.current;
            const pArrow = panelArrowRef.current;

            const onPanelEnter = () => {
              gsap.to(panel, { y: -2, duration: 0.25, ease: "power2.out" });
              gsap.to(pArrow, { x: 4, duration: 0.25, ease: "power2.out" });
            };
            const onPanelLeave = () => {
              gsap.to(panel, { y: 0, duration: 0.25, ease: "power2.out" });
              gsap.to(pArrow, { x: 0, duration: 0.25, ease: "power2.out" });
            };

            panel.addEventListener("mouseenter", onPanelEnter);
            panel.addEventListener("mouseleave", onPanelLeave);
          }

          // Card hover: gentle scale and shadow lift
          if (cardRef.current) {
            const c = cardRef.current;
            const onCardEnter = () => {
              gsap.to(c, { scale: 1.01, duration: 0.4, ease: "power2.out" });
            };
            const onCardLeave = () => {
              gsap.to(c, { scale: 1, duration: 0.4, ease: "power2.out" });
            };
            c.addEventListener("mouseenter", onCardEnter);
            c.addEventListener("mouseleave", onCardLeave);
          }
        });

        // ==========================================
        // 5. SCROLLTRIGGER TRANSITION
        // ==========================================
        if (containerRef.current) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            animation: gsap.timeline()
              .to(containerRef.current, { scale: 0.98, ease: "none" }, 0)
              .to(headlineRef.current, { y: -20, opacity: 0.85, ease: "none" }, 0)
              .to(imageRef.current, { scale: 1.04, ease: "none" }, 0),
          });
        }
      }, containerRef);
    });

    return () => {
      isCancelled = true;
      cleanupMouse?.();
      ctx?.revert();
    };
  }, []);

  return {
    containerRef,
    badgeRef,
    badgeDotRef,
    headlineRef,
    headlineLine1Ref,
    headlineLine2Ref,
    headlineLine3Ref,
    headlineLine4Ref,
    paragraphRef,
    ctaContainerRef,
    primaryBtnRef,
    primaryArrowRef,
    secondaryBtnRef,
    statsContainerRef,
    stat1NumRef,
    stat2NumRef,
    cardContainerRef,
    cardRef,
    imageRef,
    vignetteRef,
    sheenRef,
    trialBadgeRef,
    trialDotRef,
    trialSheenRef,
    panelRef,
    panelArrowRef,
  };
}
