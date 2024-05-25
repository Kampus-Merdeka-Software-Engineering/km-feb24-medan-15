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

    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Los Angeles', 'New York City', 'Seattle', 'San Francisco', 'Philadelphia'],
            datasets: [{
                data: [52000, 50000, 28000, 26000, 23000],
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

    const pieChart1 = new Chart(ctxPie1, {
        type: 'pie',
        data: {
            labels: ['South', 'West', 'Central', 'East'],
            datasets: [{
                data: [34, 28.1, 21.1, 16.7],
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

    const pieChart2 = new Chart(ctxPie2, {
        type: 'pie',
        data: {
            labels: ['Home Office', 'Corporate', 'Consumer'],
            datasets: [{
                data: [51.8, 30.1, 18.1],
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

    const pieChart3 = new Chart(ctxPie3, {
        type: 'pie',
        data: {
            labels: ['Technology', 'Office Supplies', 'Furniture'],
            datasets: [{
                data: [59, 21, 19.9],
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

    const lineChart1 = new Chart(ctxLine1, {
        type: 'line',
        data: {
            labels: ['2014', '2015', '2016', '2017'],
            datasets: [{
                data: [108000, 117000, 140000, 180000],
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

    const lineChart2 = new Chart(ctxLine2, {
        type: 'line',
        data: {
            labels: [
                'Jan-14', 'Feb-14', 'Mar-14', 'Apr-14', 'May-14', 'Jun-14', 'Jul-14', 'Aug-14', 'Sep-14', 'Oct-14', 'Nov-14', 'Dec-14',
                'Jan-15', 'Feb-15', 'Mar-15', 'Apr-15', 'May-15', 'Jun-15', 'Jul-15', 'Aug-15', 'Sep-15', 'Oct-15', 'Nov-15', 'Dec-15',
                'Jan-16', 'Feb-16', 'Mar-16', 'Apr-16', 'May-16', 'Jun-16', 'Jul-16', 'Aug-16', 'Sep-16', 'Oct-16', 'Nov-16', 'Dec-16',
                'Jan-17', 'Feb-17', 'Mar-17', 'Apr-17', 'May-17', 'Jun-17', 'Jul-17', 'Aug-17', 'Sep-17', 'Oct-17', 'Nov-17', 'Dec-17'
            ],
            datasets: [{
                data: [
                    1000, 2500, 3400, 2600, 5800, 6000, 8800, 14000, 15000, 16500, 19000, 20800,
                    1200, 3500, 4000, 3300, 4900, 7100, 9000, 13500, 17600, 18200, 19700, 22900,
                    2000, 3930, 5200, 5000, 5100, 8900, 10000, 14400, 18000, 18900, 22300, 24750,
                    3100, 4930, 8900, 7000, 9100, 10000, 13000, 15000, 17600, 19900, 23500, 25100
                ],
                fill: false,
                borderColor: 'rgba(194, 41, 46, 1)',
                tension: 0.5,
                pointRadius: 0
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
});