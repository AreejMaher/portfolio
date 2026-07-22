// ============================================================
// Live clock in status bar
// ============================================================
function updateClock(){
  const el = document.getElementById('clock');
  if(!el) return;
  const now = new Date();
  const pad = n => String(n).padStart(2,'0');
  el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
updateClock();
setInterval(updateClock, 1000);

// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Hero terminal boot sequence (typing animation)
// ============================================================
const bootLines = [
  { prompt: '$ whoami', result: 'areej-maher' },
  { prompt: '$ cat role.txt', result: 'Full-Stack Software Engineer — Laravel & Node.js' },
  { prompt: '$ cat stack.json', result: '["PHP", "Laravel", "Node.js", "MySQL", "Svelte"]' },
  { prompt: '$ status --check', result: 'available for work ●' },
];

const terminalBody = document.getElementById('terminalBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLine(line, container, onDone){
  const promptEl = document.createElement('div');
  const resultEl = document.createElement('div');
  promptEl.className = 'prompt';
  resultEl.className = 'result';
  container.appendChild(promptEl);
  container.appendChild(resultEl);

  if(reduceMotion){
    promptEl.textContent = line.prompt;
    resultEl.textContent = line.result;
    onDone();
    return;
  }

  let i = 0;
  const typeSpeed = 28;
  function typePrompt(){
    if(i <= line.prompt.length){
      promptEl.textContent = line.prompt.slice(0, i);
      i++;
      setTimeout(typePrompt, typeSpeed);
    } else {
      setTimeout(typeResult, 250);
    }
  }
  let j = 0;
  function typeResult(){
    if(j <= line.result.length){
      resultEl.textContent = line.result.slice(0, j);
      j++;
      setTimeout(typeResult, typeSpeed - 8);
    } else {
      setTimeout(onDone, 350);
    }
  }
  typePrompt();
}

function runBootSequence(lines, container){
  let idx = 0;
  function next(){
    if(idx >= lines.length){
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      container.appendChild(cursor);
      return;
    }
    typeLine(lines[idx], container, () => { idx++; next(); });
  }
  next();
}

if(terminalBody){
  runBootSequence(bootLines, terminalBody);
}

// ============================================================
// Sidebar: active-section highlighting on scroll
// ============================================================
const sections = document.querySelectorAll('.section[id]');
const fileLinks = document.querySelectorAll('.file-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      fileLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(sec => observer.observe(sec));

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');

if(navToggle && sidebar){
  navToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  fileLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================
// Contact form (front-end only — wire up to a backend or a
// service like Formspree/EmailJS to actually send messages)
// ============================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = '$ message sent — thanks, I\'ll reply soon.';
    contactForm.reset();
  });
}