// 0. Hàm thu/gọn sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const btnIcon = sidebar.querySelector('.toggle-btn i');
  const btnText = sidebar.querySelector('.toggle-btn span');

  sidebar.classList.toggle('collapsed');
  if (sidebar.classList.contains('collapsed')) {
    btnIcon.classList.replace('fa-angle-left', 'fa-angle-right');
    btnText.textContent = '';
  } else {
    btnIcon.classList.replace('fa-angle-right', 'fa-angle-left');
    btnText.textContent = 'Thu gọn';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // === 1. Account dropdown ===
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu     = document.getElementById('accountMenu');
  accountDropdown.addEventListener('click', e => {
    e.stopPropagation();
    accountMenu.style.display =
      (accountMenu.style.display === 'block' ? 'none' : 'block');
  });
  document.addEventListener('click', () => {
    accountMenu.style.display = 'none';
  });

  // === 2. Sidebar toggle ===
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.toggle-btn');
  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleSidebar();
  });

  // === 3. Submenu toggle ===
  document.querySelectorAll('.sidebar .menu-item').forEach(item => {
    const sub = item.querySelector('.submenu');
    if (!sub) return;
    item.addEventListener('click', e => {
      e.stopPropagation();
      item.classList.toggle('active');
    });
  });

  // === 4. Headcount chart (Chart.js) ===
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
      x: {
        title: {
          display: true,
          text: 'Phòng ban',
          font: { weight: 'bold' }
        },
        ticks: {
          font: { weight: 'bold' }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số nhân sự',
          font: { weight: 'bold' }
        },
        ticks: {
          font: { weight: 'bold' }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          font: { weight: 'bold' }
        }
      }
    }
  }
});


  // === 5. Language switcher ===
  const switcher = document.querySelector('.language-switcher');
  if (switcher) {
    const btn  = switcher.querySelector('.lang-btn');
    const menu = switcher.querySelector('.lang-menu');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      switcher.classList.toggle('open');
    });
    document.addEventListener('click', () => switcher.classList.remove('open'));
    menu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', e => {
        e.stopPropagation();
        const flagSrc = li.querySelector('.flag').src;
        const label   = li.textContent.trim();
        switcher.querySelector('.lang-btn .flag').src   = flagSrc;
        switcher.querySelector('.lang-btn .label').textContent = label;
        switcher.classList.remove('open');
      });
    });
  }
});
