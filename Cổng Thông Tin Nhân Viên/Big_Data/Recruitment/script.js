
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.language-toggle');
    const menu = document.querySelector('.language-menu');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function () {
      menu.style.display = 'none';
    });
  });


