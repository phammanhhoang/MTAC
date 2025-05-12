
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

  document.addEventListener('DOMContentLoaded', function () {
    const accountDropdown = document.getElementById('accountDropdown');
    const accountMenu = document.getElementById('accountMenu');
  
    accountDropdown.addEventListener('click', function (e) {
      e.stopPropagation();
      accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
    });
  
    const languageToggle = document.querySelector('.language-toggle');
    const languageMenu = document.querySelector('.language-menu');
  
    languageToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      languageMenu.style.display = languageMenu.style.display === 'block' ? 'none' : 'block';
    });
  
    document.addEventListener('click', function () {
      accountMenu.style.display = 'none';
      languageMenu.style.display = 'none';
    });
  
    accountMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  
    languageMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });
  
  
document.querySelector('.language-toggle').addEventListener('click', function(e) {
  e.preventDefault();
  this.parentElement.classList.toggle('open');
});

document.addEventListener('click', function(e) {
  const dd = document.querySelector('.language-dropdown');
  if (!dd.contains(e.target)) {
    dd.classList.remove('open');
  }
});
  