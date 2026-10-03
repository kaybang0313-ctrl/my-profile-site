// ========================================
// 다크모드 토글
// ========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// 초기 테마는 <head>의 인라인 스크립트에서 적용되므로 아이콘만 맞춰줌
function updateDarkModeIcon(isDark) {
  sunIcon.classList.toggle('hidden', !isDark);
  moonIcon.classList.toggle('hidden', isDark);
}

darkModeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  try {
    localStorage.setItem('darkMode', isDark);
  } catch (e) {}
  updateDarkModeIcon(isDark);
});

updateDarkModeIcon(document.documentElement.classList.contains('dark'));

// ========================================
// 모바일 메뉴
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

function setMobileMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  mobileMenuBtn.setAttribute('aria-expanded', open);
}

mobileMenuBtn.addEventListener('click', () => {
  setMobileMenu(mobileMenu.classList.contains('hidden'));
});

// 메뉴 링크 클릭 시 메뉴 닫기
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => setMobileMenu(false));
});

// ========================================
// 프로젝트 데이터 및 렌더링
// ========================================
const projects = [
  {
    id: 1,
    title: '포트폴리오 웹사이트',
    description: '개인 포트폴리오를 소개하는 모던한 웹사이트입니다. Tailwind CSS와 Vanilla JavaScript로 제작했습니다.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    link: '#',
  },
  {
    id: 2,
    title: 'Claude로 배우는 AI',
    description: 'Claude AI를 활용한 프로젝트 기초를 학습하고 있습니다. 앞으로 더 많은 프로젝트가 추가될 예정입니다.',
    technologies: ['Python', 'Claude API', 'AI'],
    link: '#',
  },
  {
    id: 3,
    title: '데이터 분석 프로젝트',
    description: '데이터테크놀로지 전공을 통해 배운 데이터 분석 기술을 실제 프로젝트에 적용하고 있습니다.',
    technologies: ['Python', 'Pandas', 'Data Analysis'],
    link: '#',
  },
];

const arrowIcon = `
  <svg class="row-arrow mt-1.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8 7h9v9"/>
  </svg>`;

function renderProjects() {
  const container = document.getElementById('projectsContainer');

  projects.forEach((project, index) => {
    // 실제 링크가 있을 때만 <a>로 렌더링
    const hasLink = project.link && project.link !== '#';
    const row = document.createElement(hasLink ? 'a' : 'article');
    row.className = 'project-row';
    if (hasLink) {
      row.href = project.link;
      row.target = '_blank';
      row.rel = 'noopener noreferrer';
    }

    const num = String(index + 1).padStart(2, '0');

    row.innerHTML = `
      <span class="font-mono text-xs text-muted pt-2">${num}</span>
      <div>
        <h3 class="project-title text-xl sm:text-2xl font-semibold tracking-tight mb-2">${project.title}</h3>
        <p class="text-muted leading-relaxed mb-4 max-w-xl">${project.description}</p>
        <p class="font-mono text-[11px] text-muted uppercase tracking-wider">${project.technologies.join(' / ')}</p>
      </div>
      ${hasLink ? arrowIcon : '<span></span>'}
    `;

    container.appendChild(row);
  });
}

renderProjects();

// ========================================
// 스크롤 등장 애니메이션
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ========================================
// 현재 섹션에 맞춰 네비 하이라이트
// ========================================
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const sectionId = entry.target.id;
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href').slice(1) === sectionId);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(section => navObserver.observe(section));

// ========================================
// 푸터 연도
// ========================================
document.getElementById('year').textContent = new Date().getFullYear();
