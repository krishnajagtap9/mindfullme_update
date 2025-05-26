import React, { useRef, useEffect } from 'react';

// --- Particle Background (from Home.jsx) ---
const GradientAnimationStyle = () => (
  <style>
    {`
      .pure-gradient-bg {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
      }
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .particles-bg-canvas {
        position: fixed;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        top: 0;
        pointer-events: none;
      }
      .particles-bg-wrapper {
        position: absolute;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        top: 0;
        pointer-events: none;
      }
    `}
  </style>
);

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Variables
    const particles = [];
    const numParticles = 100;
    const maxDistance = 120;

    // Mouse position
    const mouse = { x: null, y: null };

    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      connectParticles();
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function updateParticles() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x && mouse.y) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            p.vx += dx / 1000;
            p.vy += dy / 1000;
          }
        }
      });
    }

    let animationId;
    function animate() {
      drawParticles();
      updateParticles();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function mouseMoveHandler(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function mouseLeaveHandler() {
      mouse.x = null;
      mouse.y = null;
    }
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('mouseleave', mouseLeaveHandler);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="particles-bg-wrapper" style={{top: 0}}>
      <canvas ref={canvasRef} className="particles-bg-canvas" />
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <GradientAnimationStyle />
      <div style={{ position: "relative", width: "100%", minHeight: "100vh", zIndex: 0 }}>
        <ParticlesBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <section className="w-full px-4 py-12 md:py-20 bg-transparent">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#121C52]">Get in touch</h2>
              <p className="text-sm mt-2 text-gray-600">
                Feel free to reach out via phone, WhatsApp, email, or by submitting a contact form. We'll get back to you ASAP.
              </p>
            </div>

            <div className="mt-10 max-w-5xl mx-auto bg-[#F9FAFB] rounded-md shadow-md overflow-hidden md:flex">
              {/* Left Image */}
              <div className="md:w-1/2 w-full">
                <img
                  src="https://www.discover.com/content/dam/discover/en_us/credit-cards/card-acquisitions/grey-redesign/global/images/background/bg-contact-us-stocksy-675-456.png"
                  alt="Contact Illustration"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Form */}
              <div className="md:w-1/2 w-full p-6 md:p-10">
                <h3 className="text-xl md:text-2xl font-bold text-[#121C52] mb-4 text-left">
                  Connect With Your Next Great Hire Today!
                </h3>

                <form className="space-y-3">
                  <input type="text" placeholder="Company" className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input type="text" placeholder="Phone Number" className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded px-4 py-2" />
                  <textarea placeholder="Project Detail" rows="3" className="w-full border border-gray-300 rounded px-4 py-2" />

                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-1" />
                    <p>By sending this form I confirm that I have read and accept the <span className="text-blue-500">Privacy Policy</span></p>
                  </div>

                  <button type="submit" className="bg-black text-white w-full py-2 rounded hover:opacity-90 transition">
                    GET CONSULTATION
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Contact