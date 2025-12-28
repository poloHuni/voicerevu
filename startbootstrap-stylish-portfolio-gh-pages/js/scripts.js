/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// Comparison Card Grid - Expand/Collapse Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleComparisonBtn');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const secondarySections = document.querySelectorAll('.criteria-secondary');
            const btnText = this.querySelector('.btn-text');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Toggle button state
            this.setAttribute('aria-expanded', !isExpanded);

            // Toggle text
            btnText.textContent = isExpanded ? 'View All Features' : 'Show Less';

            // Toggle secondary criteria visibility
            secondarySections.forEach(function(section) {
                if (isExpanded) {
                    section.classList.remove('show');
                    section.style.display = 'none';
                } else {
                    section.style.display = 'flex';
                    // Small delay to trigger animation
                    setTimeout(function() {
                        section.classList.add('show');
                    }, 10);
                }
            });
        });
    }

    // Animate progress bars on load
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.rating-bar-fill');

        progressBars.forEach(function(bar, index) {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';

            setTimeout(function() {
                bar.style.width = targetWidth;
            }, 100 + (index * 100)); // Stagger animation
        });
    }

    // Check if comparison section is in viewport and animate
    const comparisonSection = document.getElementById('comparison');

    if (comparisonSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(comparisonSection);
    }
});
