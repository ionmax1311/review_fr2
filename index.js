// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const ageWarningBlock = document.getElementById('age-warning-block');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Функция для обновления класса хедера при открытом меню
    function updateHeaderHeight() {
        if (header && mobileMenu) {
            const isMenuOpen = !mobileMenu.classList.contains('hidden');
            const isScrolled = window.scrollY > 50;
            
            if (isMenuOpen && isScrolled) {
                header.classList.add('mobile-menu-open');
            } else {
                header.classList.remove('mobile-menu-open');
            }
        }
    }
    
    if (header) {
        // Убеждаемся, что изначально хедер прозрачный
        header.classList.remove('bg-primary-dark/95', 'backdrop-blur-lg', 'shadow-lg');
        header.classList.add('bg-transparent');
        header.style.backgroundColor = 'transparent';
        
        if (ageWarningBlock) {
            ageWarningBlock.classList.remove('bg-primary-dark/95');
            ageWarningBlock.classList.add('border-white/10');
            ageWarningBlock.style.backgroundColor = 'transparent';
            // Убеждаемся, что бордер есть изначально
            if (!ageWarningBlock.classList.contains('border-white/10')) {
                ageWarningBlock.classList.add('border-white/10');
            }
        }
        
        function handleScroll() {
            if (window.scrollY > 50) {
                // Remove transparent background
                header.classList.remove('bg-transparent');
                header.style.backgroundColor = '';
                // Add new classes
                header.classList.add('bg-primary-dark/95', 'backdrop-blur-lg', 'shadow-lg');
                // Ensure transform is none
                header.style.transform = 'none';
                
                // Update age warning block
                if (ageWarningBlock) {
                    ageWarningBlock.classList.remove('bg-transparent');
                    ageWarningBlock.classList.add('bg-primary-dark/95', 'border-white/10');
                    ageWarningBlock.style.backgroundColor = '';
                }
            } else {
                // Remove scrolled classes
                header.classList.remove('bg-primary-dark/95', 'backdrop-blur-lg', 'shadow-lg');
                header.style.backgroundColor = 'transparent';
                // Add transparent background back
                header.classList.add('bg-transparent');
                
                // Reset age warning block
                if (ageWarningBlock) {
                    ageWarningBlock.classList.remove('bg-primary-dark/95');
                    ageWarningBlock.classList.add('border-white/10');
                    ageWarningBlock.style.backgroundColor = 'transparent';
                }
            }
            
            // Обновляем высоту хедера при открытом меню
            updateHeaderHeight();
        }
        
        // Initial check
        handleScroll();
        
        // Listen to scroll events with throttling for better performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Age Verification Popup (18+)
    const ageOverlay = document.getElementById('age-verification-overlay');
    const ageAcceptBtn = document.getElementById('age-accept');
    const ageDeclineBtn = document.getElementById('age-decline');
    
    // Cookie Policy Popup (объявляем заранее для использования в обработчике попапа 18+)
    const cookiePopup = document.getElementById('cookie-popup');
    
    if (ageOverlay) {
        // Проверяем sessionStorage для возрастной верификации
        const ageVerified = sessionStorage.getItem('ageVerified');
        
        if (!ageVerified) {
            // Показываем попап 18+
            ageOverlay.classList.remove('hidden');
        }
        
        // Обработчик для кнопки "J'ai 18 ans ou plus"
        if (ageAcceptBtn) {
            ageAcceptBtn.addEventListener('click', function() {
                sessionStorage.setItem('ageVerified', 'true');
                ageOverlay.classList.add('hidden');
                
                // Проверяем и показываем попап куки после закрытия попапа 18+
                if (cookiePopup) {
                    const cookieAccepted = sessionStorage.getItem('cookieAccepted');
                    if (!cookieAccepted) {
                        cookiePopup.classList.remove('hidden');
                    }
                }
            });
        }
        
        // Обработчик для кнопки "J'ai moins de 18 ans"
        if (ageDeclineBtn) {
            ageDeclineBtn.addEventListener('click', function() {
                // Редирект на google.com БЕЗ записи в sessionStorage
                window.location.href = 'https://google.com';
            });
        }
    }

    // Cookie Policy Popup
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    if (cookiePopup) {
        // Проверяем sessionStorage
        const cookieAccepted = sessionStorage.getItem('cookieAccepted');
        const ageVerified = sessionStorage.getItem('ageVerified');
        
        if (!cookieAccepted && ageVerified) {
            // Показываем попап только если возраст подтвержден
            cookiePopup.classList.remove('hidden');
        }
        
        // Обработчик для кнопки "Accepter"
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                sessionStorage.setItem('cookieAccepted', 'true');
                cookiePopup.classList.add('hidden');
            });
        }
        
        // Обработчик для кнопки "Refuser"
        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                sessionStorage.setItem('cookieAccepted', 'true');
                cookiePopup.classList.add('hidden');
            });
        }
    }

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                // Закрываем меню
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('ri-close-line');
                menuIcon.classList.add('ri-menu-line');
                mobileMenuButton.style.top = '';
                document.body.style.overflow = '';
                updateHeaderHeight();
            } else {
                // Открываем меню
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('ri-menu-line');
                menuIcon.classList.add('ri-close-line');
                mobileMenuButton.style.top = '-55px';
                document.body.style.overflow = 'hidden';
                updateHeaderHeight();
            }
        });
        
        // Закрываем меню при клике на ссылку
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('ri-close-line');
                menuIcon.classList.add('ri-menu-line');
                mobileMenuButton.style.top = '';
                document.body.style.overflow = '';
                updateHeaderHeight();
            });
        });
        
        // Закрываем меню при клике вне его
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('ri-close-line');
                menuIcon.classList.add('ri-menu-line');
                mobileMenuButton.style.top = '';
                document.body.style.overflow = '';
                updateHeaderHeight();
            }
        });
    }
});

