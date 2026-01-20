// ============================================
// PORTFÓLIO C# + VIDEO GAMES
// Efeitos interativos estilo gaming
// ============================================

// Scroll suave para links de navegação
document.querySelectorAll('nav a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(sectionId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de entrada para elementos (estilo game)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-item, .skill-category, .contact-card, .sobre-content'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efeito parallax no banner (estilo game)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const banner = document.querySelector('.banner');
    if (banner) {
        const speed = scrolled * 0.3;
        banner.style.transform = `translateY(${speed}px)`;
    }
    
    // Efeito de parallax nos cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = (rect.top - window.innerHeight / 2) * 0.1;
            card.style.transform = `translateY(${speed}px)`;
        }
    });
    
    lastScroll = scrolled;
});

// Efeito de digitação para o título (estilo terminal)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Adicionar cursor piscante
            const cursor = document.createElement('span');
            cursor.textContent = '_';
            cursor.style.animation = 'blink 1s infinite';
            element.appendChild(cursor);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.banner h1');
    if (title) {
        const originalText = title.textContent;
        typeWriter(title, originalText, 80);
    }
});

// Adicionar estilo para cursor piscante
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .animated {
        animation: slideIn 0.6s ease-out;
    }
    
    @keyframes slideIn {
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

// Efeito de hover nos cards de projeto (estilo game)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.borderColor = 'var(--dotnet-purple)';
        this.style.boxShadow = '0 0 30px rgba(104, 33, 122, 0.8)';
        
        // Efeito de partículas
        createParticles(this);
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.borderColor = 'var(--csharp-blue)';
        this.style.boxShadow = '0 0 20px rgba(0, 122, 204, 0.6)';
    });
});

// Criar partículas de efeito (estilo game)
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#007ACC', '#68217A', '#00FF41', '#00FFFF'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px ' + particle.style.background;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let opacity = 1;
        
        function animate() {
            x += vx * 0.1;
            y += vy * 0.1;
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Adicionar classe ativa ao link de navegação atual
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
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

// Efeito de glitch aleatório no título
setInterval(() => {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement && Math.random() > 0.7) {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitch 3s infinite';
        }, 10);
    }
}, 5000);

// Animação da barra de XP
document.addEventListener('DOMContentLoaded', () => {
    const xpFill = document.querySelector('.xp-fill');
    if (xpFill) {
        const targetXP = parseInt(xpFill.getAttribute('data-xp'));
        let currentXP = 0;
        const increment = targetXP / 100;
        
        const xpInterval = setInterval(() => {
            currentXP += increment;
            if (currentXP >= targetXP) {
                currentXP = targetXP;
                clearInterval(xpInterval);
            }
            xpFill.style.width = currentXP + '%';
        }, 20);
    }
});

// Efeito de hover nas habilidades (estilo game)
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 0 20px rgba(0, 122, 204, 0.8)';
        
        // Efeito sonoro visual (simulado com animação)
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.border = '2px solid var(--game-cyan)';
        ripple.style.borderRadius = 'inherit';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(0, 122, 204, 0.3)';
    });
});

// Adicionar animação de ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Efeito de digitação nos cards de contato
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.animation = 'bounce 0.5s ease';
        }
    });
});

// Console log estilo game (para debug)
console.log('%c🎮 PORTFÓLIO C# + GAMES 🎮', 'color: #00FF41; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido por Vinicius Guilherme', 'color: #007ACC; font-size: 12px;');
console.log('%cStack: C# | .NET | ASP.NET Core', 'color: #68217A; font-size: 10px;');

// Efeito de loading (se necessário)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
