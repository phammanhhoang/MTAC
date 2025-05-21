document.addEventListener('DOMContentLoaded', function () {
  // Tài khoản dropdown
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu = document.getElementById('accountMenu');

  accountDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
    accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Ngôn ngữ dropdown
  const languageToggle = document.querySelector('.language-toggle');
  const languageMenu = document.querySelector('.language-menu');

  languageToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    languageMenu.style.display = languageMenu.style.display === 'block' ? 'none' : 'block';
    this.parentElement.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    accountMenu.style.display = 'none';
    languageMenu.style.display = 'none';
    document.querySelector('.language-dropdown').classList.remove('open');
  });

  accountMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  languageMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});

// Sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

// Hiển thị section tương ứng
document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu li');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      const sectionName = this.getAttribute('data-section');
      showSection(sectionName);
    });
  });
});

function showSection(sectionName) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
    if (section.dataset.section === sectionName) {
      section.classList.add('active');
    }
  });
}

