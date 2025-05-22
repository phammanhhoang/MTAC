// js/recruitment.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Account dropdown
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu     = document.getElementById('accountMenu');
  accountDropdown.addEventListener('click', e => {
    e.stopPropagation();
    accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', () => {
    accountMenu.style.display = 'none';
  });

  // 2. Sidebar collapse/expand
  const sidebar   = document.querySelector('.sidebar');
  const toggleBtn = sidebar.querySelector('.toggle-btn');
  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    sidebar.classList.toggle('collapsed');
    const icon = toggleBtn.querySelector('i');
    const txt  = toggleBtn.querySelector('span');
    if (sidebar.classList.contains('collapsed')) {
      icon.classList.replace('fa-angle-left','fa-angle-right');
      txt.textContent = '';
    } else {
      icon.classList.replace('fa-angle-right','fa-angle-left');
      txt.textContent = 'Thu gọn';
    }
  });

  // 3. Submenu toggle (nếu có)
  document.querySelectorAll('.sidebar .menu li').forEach(item => {
    const sub = item.querySelector('.submenu');
    if (sub) {
      item.addEventListener('click', e => {
        e.stopPropagation();
        item.classList.toggle('active');
      });
    }
  });

  // 4. Sidebar menu navigation
  document.querySelectorAll('.sidebar .menu li').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sidebar .menu li').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const name = item.dataset.section;
      document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
      const target = document.querySelector(`.content-section[data-section="${name}"]`);
      if (target) target.classList.add('active');
    });
  });

  // 5. Language switcher
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
        switcher.querySelector('.lang-btn .flag').src         = flagSrc;
        switcher.querySelector('.lang-btn .label').textContent = label;
        switcher.classList.remove('open');
      });
    });
  }

  // 6. Hide placeholder “Không có dữ liệu” trước khi vẽ chart
  document.querySelectorAll('.no-data').forEach(el => el.style.display = 'none');

  // 7. Chart.js initializations
  new Chart(document.getElementById('deptStructureChart'), {
    type: 'pie',
    data: {
      labels: ['HCNS','CT','TV'],
      datasets: [{ data: [12,8,5], backgroundColor: ['#086db5','#0aa18b','#f43f5e'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }}
  });

  new Chart(document.getElementById('contractTypeChart'), {
    type: 'doughnut',
    data: {
      labels: ['Chính thức','Thử việc','Cộng tác viên'],
      datasets: [{ data: [7,3,4], backgroundColor: ['#086db5','#0aa18b','#f43f5e'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }}
  });

  new Chart(document.getElementById('staffMovementChart'), {
    type: 'line',
    data: {
      labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
      datasets: [
        { label: 'Tiếp nhận', data: [5,7,4,6,8,5,9,7,6,8,7,10], borderColor: '#0aa18b', tension: .4, fill: false },
        { label: 'Nghỉ việc',   data: [2,3,5,2,4,3,5,4,3,6,4,5],  borderColor: '#f43f5e', tension: .4, fill: false }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } }}
  });

  new Chart(document.getElementById('staffCountChart'), {
    type: 'bar',
    data: {
      labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
      datasets: [{ label: 'Tổng số', data: [10,12,15,14,16,18,17,19,20,22,21,23], backgroundColor: '#086db5' }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } }
    }
  });

});
// fake dữ liệu tuần (T1…T7) cho sparkline
const labelsWeek = ['T1','T2','T3','T4','T5','T6','T7'];

// Nhân viên mới
new Chart(document.getElementById('sparkNV'), {
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
    scales: { x:{ display:false }, y:{ display:false } },
    plugins: { legend:{ display:false }, tooltip:{ 
      callbacks: {
        title: ctx => `Tuần ${ctx[0].label}`,
        label: ctx => `NV mới: ${ctx[0].raw}`
      }
    }},
    elements: { point:{ hoverRadius:5 } }
  }
});

// Thử việc thành công
new Chart(document.getElementById('sparkTV'), {
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
  options: { /* giống sparkNV nhưng tooltip label đổi */ 
    responsive: true, maintainAspectRatio: false,
    scales:{ x:{display:false}, y:{display:false} },
    plugins:{ legend:{display:false}, tooltip:{
      callbacks:{
        title: ctx=>`Tuần ${ctx[0].label}`,
        label: ctx=>`TV thành công: ${ctx[0].raw}`
      }
    }},
    elements:{ point:{ hoverRadius:5 } }
  }
});

// Nghỉ việc
new Chart(document.getElementById('sparkNVL'), {
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
    responsive: true, maintainAspectRatio: false,
    scales:{ x:{display:false}, y:{display:false} },
    plugins:{ legend:{display:false}, tooltip:{
      callbacks:{
        title: ctx=>`Tuần ${ctx[0].label}`,
        label: ctx=>`NV nghỉ: ${ctx[0].raw}`
      }
    }},
    elements:{ point:{ hoverRadius:5 } }
  }
});
