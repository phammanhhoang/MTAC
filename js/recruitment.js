// js/recruitment.js

document.addEventListener('DOMContentLoaded', () => {
  // === 1. Account dropdown ===
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu     = document.getElementById('accountMenu');

  accountDropdown.addEventListener('click', e => {
    e.stopPropagation();
    accountMenu.style.display =
      (accountMenu.style.display === 'block' ? 'none' : 'block');
  });

  // === 2. Close account menu on outside click ===
  document.addEventListener('click', () => {
    accountMenu.style.display = 'none';
  });

  // === 3. Sidebar toggle (collapse / expand) ===
  const sidebar   = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.sidebar .toggle-btn');

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    sidebar.classList.toggle('collapsed');

    // đổi icon & text
    const icon = toggleBtn.querySelector('i');
    const txt  = toggleBtn.querySelector('span');
    if (sidebar.classList.contains('collapsed')) {
      icon.classList.replace('fa-angle-left', 'fa-angle-right');
      txt.textContent = '';
    } else {
      icon.classList.replace('fa-angle-right', 'fa-angle-left');
      txt.textContent = 'Thu gọn';
    }
  });

  // === 4. Menu item click: active + show content section ===
  document.querySelectorAll('.sidebar .menu li').forEach(item => {
    item.addEventListener('click', e => {
      // 1) active menu
      document.querySelectorAll('.sidebar .menu li')
        .forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // 2) show corresponding content-section
      const name = item.dataset.section;
      document.querySelectorAll('.content-section')
        .forEach(sec => sec.classList.remove('active'));
      const target = document.querySelector(`.content-section[data-section="${name}"]`);
      if (target) target.classList.add('active');
    });
  });

  // === 5. Language switcher ===
  const switcher = document.querySelector('.language-switcher');
  if (switcher) {
    const btn  = switcher.querySelector('.lang-btn');
    const menu = switcher.querySelector('.lang-menu');

    // bật / tắt dropdown
    btn.addEventListener('click', e => {
      e.stopPropagation();
      switcher.classList.toggle('open');
    });

    // click ngoài đóng menu
    document.addEventListener('click', () => {
      switcher.classList.remove('open');
    });

    // chọn ngôn ngữ
    menu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', e => {
        e.stopPropagation();
        const flagSrc = li.querySelector('.flag').getAttribute('src');
        const label   = li.textContent.trim();

        // cập nhật lại button
        switcher.querySelector('.lang-btn .flag').src              = flagSrc;
        switcher.querySelector('.lang-btn .label').textContent     = label;
        switcher.classList.remove('open');

        // TODO: nếu cần reload hay gọi API chuyển ngôn ngữ
        // window.location.href = '/?lang=' + li.dataset.lang;
      });
    });
  }
});
