// sparkline labels
const labelsWeek = ['T1','T2','T3','T4','T5','T6','T7'];

// Nhân viên mới
new Chart(
  document.getElementById('sparkNV').getContext('2d'),
  {
    type: 'line',
    data: {
      labels: labelsWeek,
      datasets: [{
        data: [1,2,1,3,2,4,3],
        borderColor: '#ecc32c',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#ecc32c',
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x:{display:false}, y:{display:false} },
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            title: ctx=>`Tuần ${ctx[0].label}`,
            label: ctx=>`NV mới: ${ctx[0].raw}`
          }
        }
      },
      elements:{ point:{ hoverRadius:5 } }
    }
  }
);

// Thử việc thành công
new Chart(
  document.getElementById('sparkTV').getContext('2d'),
  {
    type: 'line',
    data: {
      labels: labelsWeek,
      datasets: [{
        data: [0,1,1,2,1,2,1],
        borderColor: '#06d6a0',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#06d6a0',
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x:{display:false}, y:{display:false} },
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            title: ctx=>`Tuần ${ctx[0].label}`,
            label: ctx=>`TV thành công: ${ctx[0].raw}`
          }
        }
      },
      elements:{ point:{ hoverRadius:5 } }
    }
  }
);

// Nghỉ việc
new Chart(
  document.getElementById('sparkNVL').getContext('2d'),
  {
    type: 'line',
    data: {
      labels: labelsWeek,
      datasets: [{
        data: [0,0,1,0,1,0,1],
        borderColor: '#f43f5e',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#f43f5e',
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x:{display:false}, y:{display:false} },
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            title: ctx=>`Tuần ${ctx[0].label}`,
            label: ctx=>`NV nghỉ: ${ctx[0].raw}`
          }
        }
      },
      elements:{ point:{ hoverRadius:5 } }
    }
  }
);

// 0. Hàm thu/gọn sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const btnIcon = sidebar.querySelector('.toggle-btn i');
  const btnText = sidebar.querySelector('.toggle-btn span');

  sidebar.classList.toggle('collapsed');
  if (sidebar.classList.contains('collapsed')) {
    btnIcon.classList.replace('fa-angle-right', 'fa-angle-left');
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
          ticks: { font: { weight: 'bold' } }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Số nhân sự',
            font: { weight: 'bold' }
          },
          ticks: { font: { weight: 'bold' } }
        }
      },
      plugins: {
        legend: {
          labels: { font: { weight: 'bold' } }
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
