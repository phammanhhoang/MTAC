// script.js

document.addEventListener('DOMContentLoaded', () => {
  // === 1. Account dropdown ===
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu     = document.getElementById('accountMenu');

  accountDropdown.addEventListener('click', e => {
    e.stopPropagation();
    accountMenu.style.display =
      (accountMenu.style.display === 'block' ? 'none' : 'block');
  });



  // === 3. Hide account + language menus on outside click ===
  document.addEventListener('click', () => {
    accountMenu.style.display  = 'none';
  });

  // === 4. Sidebar toggle (collapse / expand) ===
  const sidebar   = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle');

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    sidebar.classList.toggle('collapsed');
  });

  // === 5. Submenu toggle ===
  document.querySelectorAll('.sidebar .menu-item').forEach(item => {
    const sub = item.querySelector('.submenu');
    if (!sub) return;
    item.addEventListener('click', e => {
      e.stopPropagation();
      item.classList.toggle('active');
    });
  });

  // === 6. Headcount chart (Chart.js) ===
  const ctx   = document.getElementById('headcountChart').getContext('2d');
  const depts = ['HC-NS','TC-KT','KD-PTTT','TVMT-PL','VH','PC','MKT-TT','DA','IT-HTKT'];
  const data  = [12,7,10,9,8,4,5,6,3];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: depts,
      datasets: [{
        label: 'Nhân sự',
        data,
        backgroundColor: '#4e8ef5'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Số nhân sự' }
        },
        x: {
          title: { display: true, text: 'Phòng ban' }
        }
      }
    }
  });

  // === 7. Language switcher mới (pill + cờ) ===
  const switcher = document.querySelector('.language-switcher');
  if (switcher) {
    const btn  = switcher.querySelector('.lang-btn');
    const menu = switcher.querySelector('.lang-menu');

    // bật / tắt dropdown
    btn.addEventListener('click', e => {
      e.stopPropagation();
      switcher.classList.toggle('open');
    });

    // click ra ngoài đóng menu
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
        switcher.querySelector('.lang-btn .flag').src   = flagSrc;
        switcher.querySelector('.lang-btn .label').textContent = label;

        switcher.classList.remove('open');

        // TODO: ở đây bạn có thể gọi API hoặc reload trang với ngôn ngữ mới
        // ví dụ: window.location.href = '/?lang=' + li.dataset.lang;
      });
    });
  }
});
