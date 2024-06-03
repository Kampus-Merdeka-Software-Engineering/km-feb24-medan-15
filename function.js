document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(navbarLink => {
        navbarLink.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.style.display = index === n ? 'block' : 'none';
            dots[index].className = dots[index].className.replace(' active', '');
        });
        dots[n].className += ' active';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);

    // Chart initialization
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxPie1 = document.getElementById('pieChart1').getContext('2d');
    const ctxPie2 = document.getElementById('pieChart2').getContext('2d');
    const ctxPie3 = document.getElementById('pieChart3').getContext('2d');
    const ctxLine1 = document.getElementById('lineChart1').getContext('2d');
    const ctxLine2 = document.getElementById('lineChart2').getContext('2d');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Bar chart for city sales
            const cityLabels = data.citySales.map(item => item.City);
            const citySalesData = data.citySales.map(item => item.Sales);

            const barChart = new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: cityLabels,
                    datasets: [{
                        data: citySalesData,
                        backgroundColor: 'rgba(0, 136, 46, 1)',
                        borderColor: 'rgba(0, 136, 46, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 7
                                },
                                color: '#000000'
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 0,
                                minRotation: 0,
                                font: {
                                    size: 7
                                },
                                color: '#000000'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

            // Pie chart for region sales
            const regionLabels = data.regionSales.map(item => item.Region);
            const regionSalesData = data.regionSales.map(item => item.Sales);

            const pieChart1 = new Chart(ctxPie1, {
                type: 'pie',
                data: {
                    labels: regionLabels,
                    datasets: [{
                        data: regionSalesData,
                        backgroundColor: [
                            'rgba(35, 87, 137, 1)',
                            'rgba(194, 41, 46, 1)',
                            'rgba(241, 211, 1, 1)',
                            'rgba(0, 136, 46, 1)'
                        ],
                        borderColor: [
                            'rgba(35, 87, 137, 1)',
                            'rgba(194, 41, 46, 1)',
                            'rgba(241, 211, 1, 1)',
                            'rgba(0, 136, 46, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        datalabels: {
                            formatter: (value, context) => {
                                const dataset = context.chart.data.datasets[0];
                                const total = dataset.data.reduce((sum, currentValue) => sum + currentValue, 0);
                                const percentage = (value / total * 100).toFixed(2) + '%';
                                return percentage;
                            },
                            color: '#000000',
                            font: {
                                weight: 'bold',
                                size: 10
                            },
                            anchor: 'center',
                            align: 'center'
                        }
                    }
                },
                plugins: [ChartDataLabels] // Activate the plugin
            });

            // Pie chart for segment sales
            const segmentLabels = data.segmentSales.map(item => item.Segment);
            const segmentSalesData = data.segmentSales.map(item => item.Sales);

            const pieChart2 = new Chart(ctxPie2, {
                type: 'pie',
                data: {
                    labels: segmentLabels,
                    datasets: [{
                        data: segmentSalesData,
                        backgroundColor: [
                            'rgba(35, 87, 137, 1)',
                            'rgba(194, 41, 46, 1)',
                            'rgba(241, 211, 1, 1)'
                        ],
                        borderColor: [
                            'rgba(35, 87, 137, 1)',
                            'rgba(194, 41, 46, 1)',
                            'rgba(241, 211, 1, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        datalabels: {
                            formatter: (value, context) => {
                                const dataset = context.chart.data.datasets[0];
                                const total = dataset.data.reduce((sum, currentValue) => sum + currentValue, 0);
                                const percentage = (value / total * 100).toFixed(2) + '%';
                                return percentage;
                            },
                            color: '#000000',
                            font: {
                                weight: 'bold',
                                size: 10
                            },
                            anchor: 'center',
                            align: 'center'
                        }
                    }
                },
                plugins: [ChartDataLabels] // Activate the plugin
            });

            // Pie chart for category sales
            const categoryLabels = data.categorySales.map(item => item.Category);
            const categorySalesData = data.categorySales.map(item => item.Sales);

            const pieChart3 = new Chart(ctxPie3, {
                type: 'pie',
                data: {
                    labels: categoryLabels,
                    datasets: [{
                        data: categorySalesData,
                        backgroundColor: [
                            'rgba(35, 87, 137, 1)',
                            'rgba(194, 41, 46, 1)',
                            'rgba(241, 211, 1, 1)'
                        ],
                        borderColor: [
                            'rgba(35, 87, 137, 1)',
                            'rgba(194, 41, 46, 1)',
                            'rgba(241, 211, 1, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        datalabels: {
                            formatter: (value, context) => {
                                const dataset = context.chart.data.datasets[0];
                                const total = dataset.data.reduce((sum, currentValue) => sum + currentValue, 0);
                                const percentage = (value / total * 100).toFixed(2) + '%';
                                return percentage;
                            },
                            color: '#000000',
                            font: {
                                weight: 'bold',
                                size: 10
                            },
                            anchor: 'center',
                            align: 'center'
                        }
                    }
                },
                plugins: [ChartDataLabels] // Activate the plugin
            });

            // Line chart for yearly sales
            const yearlyLabels = data.yearlySales.map(item => item.Year.toString());
            const yearlySalesData = data.yearlySales.map(item => item.Sales);

            const lineChart1 = new Chart(ctxLine1, {
                type: 'line',
                data: {
                    labels: yearlyLabels,
                    datasets: [{
                        data: yearlySalesData,
                        fill: false,
                        borderColor: 'rgba(194, 41, 46, 1)',
                        tension: 0.4
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                font: {
                                    size: 7
                                },
                                color: '#000000'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 7
                                },
                                color: '#000000'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

            // Line Chart Monthly Sales (single line)
            const monthlySaless = data.monthlySaless;

            // Prepare labels and datasets for line chart
            const labels = monthlySaless.map(item => `${item.Month} ${item.Year}`);
            const salesData = monthlySaless.map(item => item.Sales);

            const lineChart2 = new Chart(ctxLine2, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Monthly Sales',
                        data: salesData,
                        fill: false,
                        borderColor: 'rgba(194, 41, 46, 1)',
                        tension: 0.4
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                font: {
                                    size: 7
                                },
                                color: '#000000'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 7
                                },
                                color: '#000000'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top'
                        }
                    }
                }
            });

            const ordersPerPage = 20;
            const recentOrders = data.recentorder;
            let currentPage = 1;

            function renderTable(page) {
                const start = (page - 1) * ordersPerPage;
                const end = start + ordersPerPage;
                const ordersToDisplay = recentOrders.slice(start, end);

                const tbody = document.querySelector('#recent-orders-table tbody');
                tbody.innerHTML = '';

                ordersToDisplay.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order["Order ID"]}</td>
                        <td>${order["Order Date"]}</td>
                        <td>${order["Customer Name"]}</td>
                        <td>${order["Product Name"]}</td>
                        <td>$${order.Sales.toFixed(2)}</td>
                    `;
                    tbody.appendChild(row);
                });

                renderPagination(page);
            }

            function renderPagination(page) {
                const totalPages = Math.ceil(recentOrders.length / ordersPerPage);
                const pagination = document.getElementById('pagination');
                pagination.innerHTML = '';

                for (let i = 1; i <= totalPages; i++) {
                    const pageLink = document.createElement('a');
                    pageLink.href = '#';
                    pageLink.innerText = i;
                    pageLink.className = i === page ? 'active' : '';
                    pageLink.addEventListener('click', function(event) {
                        event.preventDefault();
                        currentPage = i;
                        renderTable(currentPage);
                    });
                    pagination.appendChild(pageLink);
                }
            }
            renderTable(currentPage);
            console.log(data);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
