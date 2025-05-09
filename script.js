document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileSearch = document.querySelector('.mobile-search');
    const navbar = document.querySelector('.navbar');
    const navbar2 = document.querySelector('.navbar-2');
    const navItems = document.querySelectorAll('.nav-item');
    let isSearchVisible = false;
    let lastScroll = 0;
    let activeDropdown = null;

    // Toggle mobile search
    hamburgerMenu.addEventListener('click', function() {
        isSearchVisible = !isSearchVisible;
        mobileSearch.classList.toggle('active');
        if (isSearchVisible) {
            mobileSearch.querySelector('input').focus();
        }
    });

    // Handle scroll behavior
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Hide search on scroll down
        if (currentScroll > lastScroll && currentScroll > 50) {
            mobileSearch.classList.remove('active');
            isSearchVisible = false;
        }

        // Add shadow to navbar on scroll
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Handle horizontal scroll for categories
    if (window.innerWidth <= 768) {
        let isScrolling;
        navbar2.addEventListener('scroll', function() {
            navbar2.style.paddingRight = '40px';
            clearTimeout(isScrolling);
            
            isScrolling = setTimeout(function() {
                navbar2.style.paddingRight = '16px';
            }, 66);
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileSearch.classList.remove('active');
            isSearchVisible = false;
        }
    });

    // Handle dropdown menus
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            if (window.innerWidth <= 768) {
                // Mobile behavior - click to toggle
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (activeDropdown && activeDropdown !== dropdown) {
                        activeDropdown.style.display = 'none';
                    }
                    if (dropdown.style.display === 'block') {
                        dropdown.style.display = 'none';
                        activeDropdown = null;
                    } else {
                        dropdown.style.display = 'block';
                        activeDropdown = dropdown;
                    }
                });
            } else {
                // Desktop behavior - hover
                item.addEventListener('mouseenter', () => {
                    dropdown.style.display = 'block';
                });
                item.addEventListener('mouseleave', () => {
                    dropdown.style.display = 'none';
                });
            }
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (activeDropdown) {
            activeDropdown.style.display = 'none';
            activeDropdown = null;
        }
    });

    // Update dropdown behavior on window resize
    window.addEventListener('resize', () => {
        if (activeDropdown) {
            activeDropdown.style.display = 'none';
            activeDropdown = null;
        }
    });
});
