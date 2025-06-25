export function initCustomParticles() {
  const container = document.getElementById("custom-particles");
  if (!container) return;


  
  const particles = [];

  const createParticle = () => {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 20}s`;
    container.appendChild(p);
    particles.push(p);
  };

  // Создаем 50–100 частиц
  for (let i = 0; i < 80; i++) createParticle();

  // Параллакс-эффект
    document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    container.style.transform = `translate(${x}px, ${y}px)`;
  });

}