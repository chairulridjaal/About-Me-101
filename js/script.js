document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const activeIndicator = document.querySelector('.nav-active-indicator');

    function setActiveLink(link) {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        moveIndicator(link);
    }

    function moveIndicator(link) {
        const rect = link.getBoundingClientRect();
        const containerRect = link.parentElement.getBoundingClientRect();

        activeIndicator.style.width = `${rect.width}px`;
        activeIndicator.style.left = `${rect.left - containerRect.left}px`;
    }

    setActiveLink(document.querySelector('.nav-link'));

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            setActiveLink(this);
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.addEventListener('scroll', function() {
        let scrollPos = window.scrollY + 100;
        navLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                setActiveLink(link);
            }
        });
    });

    window.addEventListener('resize', function() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            moveIndicator(activeLink);
        }
    });
});
