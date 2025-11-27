// ==================== 네비게이션 메뉴 토글 ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // 햄버거 버튼 애니메이션
    hamburger.style.animation = 'none';
    setTimeout(() => {
        hamburger.style.animation = '';
    }, 10);
});

// 메뉴 항목 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== 스크롤 이벤트 ====================
// 스크롤 시 네비게이션 배경 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== 애니메이션 인터섹션 옵저버 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 프로젝트 카드와 스킬 카테고리 옵저버 적용
const projectCards = document.querySelectorAll('.project-card');
const skillCategories = document.querySelectorAll('.skill-category');

projectCards.forEach(card => observer.observe(card));
skillCategories.forEach(category => observer.observe(category));

// ==================== 기술 프로그래스 바 애니메이션 ====================
const skillProgressBars = document.querySelectorAll('.skill-progress');

const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillProgressBars.forEach(bar => progressObserver.observe(bar));

// ==================== 폼 제출 처리 ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name') || e.target[0].value,
        email: formData.get('email') || e.target[1].value,
        message: formData.get('message') || e.target[2].value
    };

    // 실제 환경에서는 백엔드 서버로 전송
    console.log('메시지 전송:', data);

    // 사용자 피드백
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '메시지가 전송되었습니다!';
    submitButton.style.background = '#48bb78';
    
    // 폼 초기화
    contactForm.reset();
    
    // 3초 후 원래 상태로 복구
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 3000);
});

// ==================== 스무스 스크롤 앵커 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== 활성 네비게이션 링크 하이라이트 ====================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== 페이지 로드 애니메이션 ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// ==================== 동적 통계 카운터 ====================
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// 통계 섹션이 보일 때 카운터 시작
const infoItems = document.querySelectorAll('.info-item p');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text);
            animateCounter(entry.target, number);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

infoItems.forEach(item => counterObserver.observe(item));

// ==================== 마우스 따라다니는 배경 효과 ====================
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        hero.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// ==================== 다크 모드 토글 (옵션) ====================
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    darkModeToggle.addEventListener('mouseover', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
    });

    darkModeToggle.addEventListener('mouseout', () => {
        darkModeToggle.style.transform = 'scale(1)';
    });

    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        
        // 아이콘 변경
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });

    // 저장된 설정 복원
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 다크 모드 초기화
initDarkMode();

// ==================== 페이지 로드 완료 ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('포트폴리오 페이지가 로드되었습니다.');
});
