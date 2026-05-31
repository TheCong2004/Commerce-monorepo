"use client";
import React, { useRef, useEffect, ReactNode } from "react";

interface StarBackgroundProps {
  children?: ReactNode;
}


const StarBackground = ({ children }: StarBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId: number;
    // Twinkling stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.5,
      d: Math.random() * 0.5 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
    }));

    // Floating numbers only on left and right sides
    const numbers = Array.from({ length: 12 }, (_, i) => {
      // 0-5: left, 6-11: right
      const side = i < 6 ? 'left' : 'right';
      const width = window.innerWidth;
      let x;
      if (side === 'left') {
        x = Math.random() * (width * 0.18); // 0% - 18%
      } else {
        x = width * 0.82 + Math.random() * (width * 0.18); // 82% - 100%
      }
      return {
        value: Math.floor(Math.random() * 9) + 1,
        x,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 32 + 18,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.3 + 0.1,
        drift: (Math.random() - 0.5) * 0.5,
        floatPhase: Math.random() * Math.PI * 2,
        side,
      };
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      stars.forEach((star) => {
        // Twinkle effect
        star.twinkle += star.twinkleSpeed;
        const twinkleAlpha = 0.7 + 0.3 * Math.sin(star.twinkle);
        ctx.save();
        ctx.globalAlpha = twinkleAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        // Move star
        star.y += star.d;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw floating numbers
      numbers.forEach((num) => {
        num.floatPhase += 0.01 + num.speed * 0.02;
        num.y -= num.speed;
        // Only allow drift within their side's band
        if (num.side === 'left') {
          num.x += Math.sin(num.floatPhase) * num.drift;
          // Clamp to left band
          if (num.x < 0) num.x = 0;
          if (num.x > canvas.width * 0.18) num.x = canvas.width * 0.18;
        } else {
          num.x += Math.sin(num.floatPhase) * num.drift;
          if (num.x < canvas.width * 0.82) num.x = canvas.width * 0.82;
          if (num.x > canvas.width) num.x = canvas.width;
        }
        if (num.y + num.size < 0) {
          num.y = canvas.height + num.size;
          // Reset x only within the side's band
          if (num.side === 'left') {
            num.x = Math.random() * (canvas.width * 0.18);
          } else {
            num.x = canvas.width * 0.82 + Math.random() * (canvas.width * 0.18);
          }
          num.value = Math.floor(Math.random() * 9) + 1;
          num.size = Math.random() * 32 + 18;
          num.opacity = Math.random() * 0.5 + 0.3;
        }
        ctx.save();
        ctx.globalAlpha = num.opacity;
        ctx.font = `bold ${num.size}px 'Montserrat', Arial, sans-serif`;
        ctx.fillStyle = "#fcf7fbff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 12;
        ctx.fillText(num.value.toString(), num.x, num.y);
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: "black",
        }}
      />
      {children}
    </>
  );
};

export default StarBackground;