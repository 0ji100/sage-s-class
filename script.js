const wrapLabel = (label) => {
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + word).length > 16) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });
    lines.push(currentLine.trim());
    return lines;
};

const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
      return label.join(' ');
    } else {
      return label;
    }
};

const argumentsCtx = document.getElementById('argumentsChart').getContext('2d');
new Chart(argumentsCtx, {
    type: 'bar',
    data: {
        labels: ['긍정적 측면', '부정적 측면'],
        datasets: [{
            label: '주장 개수',
            data: [4, 4],
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(249, 115, 22, 0.7)'
            ],
            borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(249, 115, 22, 1)'
            ],
            borderWidth: 1,
            barThickness: 60,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { title: tooltipTitleCallback } }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: { stepSize: 1 }
            }
        }
    }
});

const concernsCtx = document.getElementById('concernsChart').getContext('2d');
const concernLabels = [
    '국내 산업 위축 및 일자리 감소',
    '빈부 격차 심화',
    '고유문화 상실 위기',
    '전 지구적 문제 확산'
];
new Chart(concernsCtx, {
    type: 'doughnut',
    data: {
        labels: concernLabels.map(label => wrapLabel(label)),
        datasets: [{
            label: '우려 비율',
            data: [35, 25, 15, 25],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(249, 115, 22, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(161, 98, 7, 0.8)'
            ],
            borderColor: '#ffffff',
            borderWidth: 3,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { size: 12 },
                    boxWidth: 20
                }
            },
            tooltip: { callbacks: { title: tooltipTitleCallback } }
        },
        cutout: '60%'
    }
});