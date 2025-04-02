document.addEventListener('DOMContentLoaded', function() {

      // --- Typewriter Effect ---
      const typewriterElement = document.getElementById('typewriter');
      const words = ["Build Modern Websites.", "Solve Complex Problems.", "Love Clean Code.", "Am a Full-Stack Developer."];
      let wordIndex = 0;
      let letterIndex = 0;
      let currentWord = '';
      let isDeleting = false;
      const typingSpeed = 150;
      const deletingSpeed = 100;
      const delayBetweenWords = 1500;

      function type() {
        const word = words[wordIndex];

        if (isDeleting) {
          // Remove characters
          currentWord = word.substring(0, letterIndex - 1);
          letterIndex--;
        } else {
          // Add characters
          currentWord = word.substring(0, letterIndex + 1);
          letterIndex++;
        }

        typewriterElement.textContent = currentWord;
        typewriterElement.style.borderRight = '2px solid var(--light-text)'; // Keep cursor visible while typing/deleting

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        // If word is fully typed
        if (!isDeleting && letterIndex === word.length) {
          speed = delayBetweenWords; // Pause at end
          isDeleting = true;
          typewriterElement.style.borderRight = '2px solid var(--light-text)'; // Ensure cursor blinks at end
        }
        // If word is fully deleted
        else if (isDeleting && letterIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length; // Move to next word
          speed = typingSpeed / 2; // Start typing next word faster
        }

        setTimeout(type, speed);
      }

      // Start the typewriter effect
      if (typewriterElement) {
        setTimeout(type, typingSpeed); // Initial delay before starting
      }


      // --- Simple Fade-in Animation on Scroll ---
      const sections = document.querySelectorAll('section');

      const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of section visible
      };

      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation to save resources
            // observer.unobserve(entry.target);
          } else {
            // Optional: Remove class if you want animation to repeat on scroll up/down
            // entry.target.classList.remove('visible');
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach(section => {
        observer.observe(section);
      });


      // --- Smooth Scrolling for Navbar Links ---
      document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if(targetElement) {
            // Calculate position considering the fixed navbar height
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });

            // Optional: Close mobile navbar after click
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click(); // Simulate click to close
            }
          }
        });
      });

      // --- Active Nav Link Highlighting on Scroll ---
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const sectionElements = document.querySelectorAll('section[id]');

      function changeNavActiveState() {
          let index = sectionElements.length;
          const navbarHeight = document.querySelector('.navbar').offsetHeight;

          while(--index && window.scrollY + navbarHeight + 50 < sectionElements[index].offsetTop) {} // 50px offset

          navLinks.forEach((link) => link.classList.remove('active'));
          // Check if the corresponding nav link exists before adding 'active' class
          const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionElements[index].id}"]`);
          if (activeLink) {
              activeLink.classList.add('active');
          }
      }

      // Initial call
      changeNavActiveState();
      // Add listener
      window.addEventListener('scroll', changeNavActiveState);


      // --- Contact Form Handling (Basic) ---
      const contactForm = document.getElementById('contact-form');
      const formMessage = document.getElementById('form-message');

      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault(); // Prevent actual submission

          // Basic validation example (can be expanded)
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const message = document.getElementById('message').value.trim();

          if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = 'red';
            return;
          }

          // Simulate sending (replace with actual AJAX call later)
          formMessage.textContent = 'Sending message...';
          formMessage.style.color = 'var(--primary-color)';

          setTimeout(() => {
            // Simulate success
            formMessage.textContent = 'Message sent successfully! (Simulation)';
            formMessage.style.color = 'green';
            contactForm.reset(); // Clear the form

            // Clear message after a few seconds
            setTimeout(() => {
              formMessage.textContent = '';
            }, 5000);

          }, 1500); // Simulate network delay
        });
      }

    });
