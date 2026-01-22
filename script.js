// ============================================
// PORTFÓLIO PROFISSIONAL C# + GAMES
// Animações suaves e interações elegantes
// ============================================

// Estado inicial - apenas banner visível
let hasScrolled = false;
let sectionsRevealed = false;

// Inicializar estado das seções
document.addEventListener('DOMContentLoaded', () => {
    // Esconder todas as seções exceto o banner
    const sections = document.querySelectorAll('section:not(.banner)');
    sections.forEach(section => {
        section.classList.remove('revealed');
    });
    
    // Esconder footer inicialmente
    const footer = document.querySelector('footer');
    if (footer) {
        footer.classList.remove('revealed');
    }
    
    // Overlay de transição
    const overlay = document.querySelector('.transition-overlay');
    
    // Animação do título
    const title = document.querySelector('.banner h1');
    if (title) {
        const originalText = title.textContent;
        typeWriter(title, originalText, 60);
    }
    
    // Animação da barra de XP
    animateXPBar();
    
    // Configurar scroll listener
    setupScrollReveal();
    
    // Remover overlay após um tempo
    setTimeout(() => {
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }, 1500);
});

// Função de digitação
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animação da barra de XP
function animateXPBar() {
    const xpFill = document.querySelector('.xp-fill');
    if (xpFill) {
        const targetXP = parseInt(xpFill.getAttribute('data-xp')) || 75;
        let currentXP = 0;
        const increment = targetXP / 60;
        
        const xpInterval = setInterval(() => {
            currentXP += increment;
            if (currentXP >= targetXP) {
                currentXP = targetXP;
                clearInterval(xpInterval);
            }
            xpFill.style.width = currentXP + '%';
        }, 30);
    }
}

// Configurar revelação ao rolar
function setupScrollReveal() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Verificar posição inicial
    handleScroll();
}

// Manipular scroll e revelar seções
function handleScroll() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Se rolou mais de 30% da altura da tela, revelar seções
    if (scrollPosition > windowHeight * 0.3 && !sectionsRevealed) {
        revealSections();
        sectionsRevealed = true;
    }
    
    // Revelar seções individuais conforme aparecem na tela
    const sections = document.querySelectorAll('section:not(.banner)');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible && !section.classList.contains('revealed')) {
            setTimeout(() => {
                section.classList.add('revealed');
            }, index * 150); // Delay escalonado
        }
    });
    
    // Revelar footer quando próximo
    const footer = document.querySelector('footer');
    if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < windowHeight * 0.9 && !footer.classList.contains('revealed')) {
            setTimeout(() => {
                footer.classList.add('revealed');
            }, 200);
        }
    }
    
    // Parallax suave no banner
    const banner = document.querySelector('.banner');
    if (banner) {
        const speed = scrollPosition * 0.2;
        banner.style.transform = `translateY(${speed}px)`;
    }
    
    // Atualizar navegação ativa
    updateActiveNav();
}

// Revelar todas as seções com animação
function revealSections() {
    const sections = document.querySelectorAll('section:not(.banner)');
    const overlay = document.querySelector('.transition-overlay');
    
    // Remover overlay
    if (overlay) {
        overlay.classList.add('hidden');
    }
    
    // Revelar seções com delay escalonado
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('revealed');
        }, index * 200);
    });
}

// Scroll suave para links de navegação
document.querySelectorAll('nav a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(sectionId);
        
        if (targetElement) {
            // Revelar seções se ainda não foram reveladas
            if (!sectionsRevealed) {
                revealSections();
                sectionsRevealed = true;
            }
            
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de entrada profissional para elementos
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.closest('section.revealed')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Aplicar animação aos elementos (apenas quando seção estiver revelada)
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-item, .skill-category, .contact-card, .sobre-content'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Adicionar estilo para animações
const style = document.createElement('style');
style.textContent = `
    .animated {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Efeito de hover profissional nos cards de projeto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.borderColor = 'rgba(0, 122, 204, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.borderColor = 'rgba(0, 122, 204, 0.2)';
    });
});

// Atualizar navegação ativa
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Efeito de glitch mais sutil e profissional
let glitchInterval = setInterval(() => {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement && Math.random() > 0.85) {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitch-subtle 4s infinite';
        }, 10);
    }
}, 8000);

// Efeito de hover profissional nas habilidades
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.borderColor = 'var(--csharp-blue)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        if (!this.classList.contains('skill-master')) {
            this.style.borderColor = 'rgba(0, 122, 204, 0.3)';
        }
    });
});

// Efeito de hover nos cards de contato
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease';
        }
    });
});

// Console log profissional
console.log('%c💼 PORTFÓLIO PROFISSIONAL 💼', 'color: #00FF88; font-size: 18px; font-weight: bold;');
console.log('%cDesenvolvido por Vinicius Guilherme', 'color: #007ACC; font-size: 12px;');
console.log('%cStack: C# | .NET | React | TypeScript', 'color: #68217A; font-size: 10px;');

// Efeito de loading suave
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevenir animações durante o scroll para performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 150);
});

// Adicionar classe scrolling ao CSS
const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    body.scrolling * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(scrollStyle);

// ============================================
// MODAL DE EXPANSÃO DE IMAGENS
// ============================================

// Função para abrir o modal com a imagem
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.classList.add('active');
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden'; // Prevenir scroll do body
    }
}

// Função para fechar o modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll do body
    }
}

// Adicionar event listeners para as imagens dos projetos
document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageModal(this.src);
        });
    });
    
    // Fechar modal ao clicar no botão de fechar
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
    
    // Fechar modal ao clicar fora da imagem
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-content')) {
                closeImageModal();
            }
        });
    }
    
    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
});
