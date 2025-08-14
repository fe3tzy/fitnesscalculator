

            //Search Bar Input
        document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const searchInput = document.getElementById('faq-search');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.parentElement.classList.contains('active');

      faqItems.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        btn.parentElement.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    faqItems.forEach(item => {
      const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
      if (questionText.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});