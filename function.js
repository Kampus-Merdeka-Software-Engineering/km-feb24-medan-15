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
                        }
                    }
                }
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
                        }
                    }
                }
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
                        }
                    }
                }
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

            // Line chart for monthly sales
            const monthlyLabels = data.monthlySales.map(item => item.Month);
            const monthlySalesData2014 = data.monthlySales.map(item => item.Sales['2014']);
            const monthlySalesData2015 = data.monthlySales.map(item => item.Sales['2015']);
            const monthlySalesData2016 = data.monthlySales.map(item => item.Sales['2016']);
            const monthlySalesData2017 = data.monthlySales.map(item => item.Sales['2017']);

            const lineChart2 = new Chart(ctxLine2, {
                type: 'line',
                data: {
                    labels: monthlyLabels,
                    datasets: [
                        {
                            label: '2014',
                            data: monthlySalesData2014,
                            fill: false,
                            borderColor: 'rgba(35, 87, 137, 1)',
                            tension: 0.5,
                            pointRadius: 0
                        },
                        {
                            label: '2015',
                            data: monthlySalesData2015,
                            fill: false,
                            borderColor: 'rgba(194, 41, 46, 1)',
                            tension: 0.5,
                            pointRadius: 0
                        },
                        {
                            label: '2016',
                            data: monthlySalesData2016,
                            fill: false,
                            borderColor: 'rgba(241, 211, 1, 1)',
                            tension: 0.5,
                            pointRadius: 0
                        },
                        {
                            label: '2017',
                            data: monthlySalesData2017,
                            fill: false,
                            borderColor: 'rgba(0, 136, 46, 1)',
                            tension: 0.5,
                            pointRadius: 0
                        }
                    ]
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
            console.log(data);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});