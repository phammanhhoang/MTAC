// js/recruitment.js

// Mọi thứ chỉ chạy sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {

  // 1. Account dropdown: bật/tắt menu tài khoản
  const accountDropdown = document.getElementById('accountDropdown');
  const accountMenu     = document.getElementById('accountMenu');
  accountDropdown.addEventListener('click', e => {
    e.stopPropagation();
    accountMenu.style.display =
      accountMenu.style.display === 'block' ? 'none' : 'block';
  });
  // click ra ngoài thì đóng menu
  document.addEventListener('click', () => {
    accountMenu.style.display = 'none';
  });


  // 2. Sidebar collapse/expand: thu gọn hoặc bung rộng sidebar
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


  // 4. Sidebar menu navigation: chuyển section chính giữa
  document.querySelectorAll('.sidebar .menu li').forEach(item => {
    item.addEventListener('click', () => {
      // remove mọi active cũ
      document.querySelectorAll('.sidebar .menu li')
              .forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // bật section tương ứng
      const name = item.dataset.section;
      document.querySelectorAll('.content-section')
              .forEach(sec => sec.classList.remove('active'));
      const target = document.querySelector(`.content-section[data-section="${name}"]`);
      if (target) target.classList.add('active');
    });
  });


  // 5. Language switcher: mở dropdown ngôn ngữ và đổi cờ / label
  const switcher = document.querySelector('.language-switcher');
  if (switcher) {
    const btn  = switcher.querySelector('.lang-btn');
    const menu = switcher.querySelector('.lang-menu');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      switcher.classList.toggle('open');
    });
    // click ngoài đóng menu
    document.addEventListener('click', () => switcher.classList.remove('open'));
    // chọn ngôn ngữ
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


  // 7. Chart.js initializations: các chart lớn bên phải
  // 7.1 Pie chart – Cơ cấu phòng ban
  new Chart(
    document.getElementById('deptStructureChart'),
    {
      type: 'pie',
      data: {
        labels: ['HCNS','CT','TV'],
        datasets: [{
          data: [12,8,5],
          backgroundColor: ['#086db5','#0aa18b','#f43f5e']
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    }
  );

  // 7.2 Doughnut – Hợp đồng theo loại
  new Chart(
    document.getElementById('contractTypeChart'),
    {
      type: 'doughnut',
      data: {
        labels: ['Chính thức','Thử việc','Cộng tác viên'],
        datasets: [{
          data: [7,3,4],
          backgroundColor: ['#086db5','#0aa18b','#f43f5e']
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    }
  );

  // 7.3 Line – Biến động nhân sự theo tháng
  new Chart(
    document.getElementById('staffMovementChart'),
    {
      type: 'line',
      data: {
        labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
        datasets: [
          {
            label: 'Tiếp nhận',
            data:   [5,7,4,6,8,5,9,7,6,8,7,10],
            borderColor: '#0aa18b',
            tension: .4,
            fill: false
          },
          {
            label: 'Nghỉ việc',
            data:   [2,3,5,2,4,3,5,4,3,6,4,5],
            borderColor: '#f43f5e',
            tension: .4,
            fill: false
          }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    }
  );

  // 7.4 Bar – Tổng số nhân sự theo tháng
  new Chart(
    document.getElementById('staffCountChart'),
    {
      type: 'bar',
      data: {
        labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
        datasets: [{
          label: 'Tổng số',
          data:  [10,12,15,14,16,18,17,19,20,22,21,23],
          backgroundColor: '#086db5'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    }
  );

  // 8. Sparkline charts – 3 mini-line trong 3 card đầu
  const labelsWeek = ['T1','T2','T3','T4','T5','T6','T7'];

  // 8.1 NV mới
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
        scales: { x:{ display:false }, y:{ display:false } },
        plugins: {
          legend:{ display:false },
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

  // 8.2 TV thành công
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

  // 8.3 NV nghỉ việc
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

});

const ctx = document.getElementById('catChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Nam','Nữ','Không xác định'],
    datasets: [{
      data: [10, 29, 1], 
      backgroundColor: ['#4CAF50','#F44336','#2979FF'],
      hoverOffset: 4
    }]
  },
  options: {
    cutout: '80%',
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  }
});
