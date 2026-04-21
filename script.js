/* ═══════════════════════════════════════════════════
   script.js — ContaSeguro
   ═══════════════════════════════════════════════════ */

/* ──────────────────────────────────────────
   1. NAV — sombra ao rolar a página
────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});


/* ──────────────────────────────────────────
   2. REVEAL ON SCROLL — animação de entrada
   Cada elemento com a classe .reveal aparece
   suavemente quando entra na viewport.
────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Delay em cascata para elementos no mesmo grupo
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


/* ──────────────────────────────────────────
   3. COMO FUNCIONA — steps interativos
   Clique em cada etapa para ver o conteúdo
   correspondente no card visual à direita.
────────────────────────────────────────── */
const stepData = [
  {
    icon: '🔍',
    title: 'Diagnóstico Gratuito',
    desc: 'Analisamos sua empresa sem nenhum custo e entregamos um relatório completo de oportunidades de economia.'
  },
  {
    icon: '📋',
    title: 'Proposta Personalizada',
    desc: 'Apresentamos um plano customizado com os serviços exatos que você precisa, no preço justo.'
  },
  {
    icon: '🚀',
    title: 'Onboarding Ágil',
    desc: 'Nossa equipe cuida de toda a migração e configuração. Você não precisa fazer nada, só aguardar.'
  },
  {
    icon: '📊',
    title: 'Gestão Contínua',
    desc: 'Relatórios mensais claros, especialista dedicado e plataforma online para acompanhar tudo em tempo real.'
  }
];

const steps     = document.querySelectorAll('.step');
const stepIcon  = document.getElementById('step-icon');
const stepTitle = document.getElementById('step-title');
const stepDesc  = document.getElementById('step-desc');
const stepCard  = document.getElementById('step-card');

function activateStep(index) {
  // Remove active de todos
  steps.forEach(s => s.classList.remove('active'));
  // Adiciona no clicado
  steps[index].classList.add('active');

  // Animação de troca no card
  if (stepCard) {
    stepCard.style.opacity = '0';
    stepCard.style.transform = 'scale(0.97)';
    setTimeout(() => {
      stepIcon.textContent  = stepData[index].icon;
      stepTitle.textContent = stepData[index].title;
      stepDesc.textContent  = stepData[index].desc;
      stepCard.style.opacity   = '1';
      stepCard.style.transform = 'scale(1)';
    }, 180);
  }
}

// Estilo de transição no card
if (stepCard) {
  stepCard.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
}

steps.forEach((step, i) => {
  step.addEventListener('click', () => activateStep(i));
});

// Auto-avança os steps a cada 4 segundos
let currentStep = 0;
setInterval(() => {
  currentStep = (currentStep + 1) % stepData.length;
  activateStep(currentStep);
}, 4000);


/* ──────────────────────────────────────────
   4. FAQ — accordion
   Abre/fecha as respostas com animação.
────────────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn    = item.querySelector('.faq-btn');
  const answer = item.querySelector('.faq-answer');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Fecha todos
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Abre o clicado (se estava fechado)
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Inicializa o primeiro item aberto
const firstOpen = document.querySelector('.faq-item.open .faq-answer');
if (firstOpen) {
  firstOpen.style.maxHeight = firstOpen.scrollHeight + 'px';
}


/* ──────────────────────────────────────────
   5. SMOOTH SCROLL — links da nav
   Garante scroll suave mesmo em browsers
   que não suportam scroll-behavior: smooth.
────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ──────────────────────────────────────────
   6. MENU MOBILE (hambúrguer)
   Descomente e adicione o botão no HTML
   se precisar de menu mobile.

   HTML para adicionar na <nav>:
   <button class="nav-hamburger" id="nav-hamburger">
     <span></span><span></span><span></span>
   </button>

   CSS para adicionar no style.css:
   .nav-hamburger { display: none; background: none; border: none;
     cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
   .nav-hamburger span { display: block; width: 24px; height: 2px;
     background: var(--texto); border-radius: 2px; transition: all 0.3s; }
   @media (max-width: 900px) { .nav-hamburger { display: flex; } }

const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}
────────────────────────────────────────── */


/* ──────────────────────────────────────────
   7. CONTADOR ANIMADO nos stats
   Os números sobem progressivamente quando
   entram na tela.
────────────────────────────────────────── */
function animateCounter(el, target, duration = 1500, prefix = '', suffix = '') {
  let start = 0;
  const step = target / (duration / 16);

  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = prefix + Math.floor(start).toLocaleString('pt-BR') + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target.toLocaleString('pt-BR') + suffix;
    }
  };
  requestAnimationFrame(update);
}

// Configura quais stats animar:
// data-count="valor" data-prefix="R$" data-suffix="M"
const statNums = document.querySelectorAll('.stat-num span');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    // Anima cada número
    const configs = [
      { el: statNums[0], target: 2500, suffix: '' },
      { el: statNums[1], target: 15,   suffix: '' },
      { el: statNums[2], target: 98,   suffix: '' },
      { el: statNums[3], target: 180,  suffix: '' },
    ];
    configs.forEach(({ el, target, suffix }) => {
      if (el) animateCounter(el, target, 1500, '', suffix);
    });
  }
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObserver.observe(statsSection);