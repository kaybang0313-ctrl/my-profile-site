// ========================================
// 다크모드 토글
// ========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// 로컬스토리지에서 다크모드 설정 로드, 없으면 OS 설정 따름
function initDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedMode === 'true' || (savedMode === null && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateDarkModeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateDarkModeIcon(false);
  }
}

function updateDarkModeIcon(isDark) {
  if (isDark) {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

darkModeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDark);
  updateDarkModeIcon(isDark);
});

// 페이지 로드 시 다크모드 초기화
initDarkMode();

// ========================================
// 모바일 메뉴
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// 메뉴 링크 클릭 시 메뉴 닫기
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ========================================
// 스크롤 시 섹션 페이드인 & 네비 하이라이트
// ========================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// IntersectionObserver를 이용한 섹션 감지
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50% 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 해당 섹션에 맞춰 네비 링크 활성화
      const sectionId = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href').slice(1);
        if (href === sectionId) {
          link.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
        } else {
          link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
        }
      });

      // 섹션에 페이드인 애니메이션 추가
      if (!entry.target.classList.contains('fade-in')) {
        entry.target.classList.add('fade-in');
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

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

function renderProjects() {
  const container = document.getElementById('projectsContainer');

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card group p-8 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer';

    const techBadges = project.technologies
      .map(tech => `<span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">${tech}</span>`)
      .join('');

    projectCard.innerHTML = `
      <div class="mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-lg mb-4">
          💼
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          ${project.title}
        </h3>
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          ${project.description}
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        ${techBadges}
      </div>
    `;

    container.appendChild(projectCard);
  });
}

renderProjects();

// ========================================
// 부드러운 스크롤
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
