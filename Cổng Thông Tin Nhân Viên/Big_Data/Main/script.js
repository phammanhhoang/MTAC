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







  const ctx = document.getElementById('staffChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      'HC-NS','TC-KT','KD-PTTT','TVMT-PL','VH',
      'PC','MKT-TT','DA','IT-HTKT'
    ],
    datasets: [{
      label: 'Số lượng nhân sự',
      data: [12, 7, 10, 9, 8, 4, 5, 6, 3],
      backgroundColor: 'rgba(15, 102, 209, 0.7)',
      borderRadius: 6,
      barThickness: 36
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Biến động nhân sự theo phòng ban',
        color: '#000',
        font: { size: 18, weight: 'bold' },
        padding: { bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',  
        titleColor: '#fff',               
        bodyColor: '#fff',                    
        callbacks: {
          label: ctx => `${ctx.parsed.y} nhân sự`
        }
      },
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: 'Phòng ban',
          font: { size: 14, weight: 'bold' },
          color: '#000'
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: { size: 13 },
          color: '#000'
        }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#eee', borderDash: [4,4] },
        title: {
          display: true,
          text: 'Số nhân sự',
          font: { size: 14, weight: 'bold' },
          color: '#000'
        },
        ticks: {
          stepSize: 2,
          color: '#000'
        }
      }
    }
  }
});
