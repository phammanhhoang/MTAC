document.addEventListener('DOMContentLoaded', () => {
  // === 1. Account dropdown ===
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu     = document.getElementById('accountMenu');

  accountDropdown.addEventListener('click', e => {
    e.stopPropagation();
    accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
  });

  // === 2. Language dropdown ===
  const languageToggle = document.querySelector('.language-toggle');
  const languageMenu   = document.querySelector('.language-menu');

  languageToggle.addEventListener('click', e => {
    e.stopPropagation();
    languageMenu.style.display = languageMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Ẩn dropdown khi click ra ngoài
  document.addEventListener('click', () => {
    accountMenu.style.display  = 'none';
    languageMenu.style.display = 'none';
  });

  // === 3. Sidebar toggle ===
  const sidebar = document.querySelector('.sidebar');
  const toggle  = document.querySelector('.sidebar-toggle');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
});


// === 4. Biểu đồ headcountChart ===
const ctx   = document.getElementById('headcountChart').getContext('2d');
const depts = ['HC‑NS','TC‑KT','KD‑PTTT','TVMT‑PL','VH','PC','MKT‑TT','DA','IT‑HTKT'];
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
      y: { beginAtZero:true, title:{ display:true, text:'Số nhân sự' } },
      x: { title:{ display:true, text:'Phòng ban' } }
    }
  }
});
