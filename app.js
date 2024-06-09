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

    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const searchIcon = document.querySelector(".search-icon");
    const searchBox = document.querySelector(".example");
  
    hamburger.addEventListener("click", function () {
      menu.classList.toggle("active");
      searchBox.classList.remove("active");
    });
  
    searchIcon.addEventListener("click", function () {
      searchBox.classList.toggle("active");
      menu.classList.remove("active");
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

    let barChart, pieChart1, pieChart2, pieChart3, lineChart1, lineChart2;

    // Fetch data from multiple JSON files
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (error) {
            console.error('Error loading JSON data:', error);
            return [];
        }
    };

    Promise.all([
        fetchData('sales_by_city.json'),
        fetchData('order_by_region.json'),
        fetchData('order_by_segment.json'),
        fetchData('order_by_category.json'),
        fetchData('yearly_sales.json'),
        fetchData('monthly_sales.json'),
        fetchData('recent_order.json')
    ]).then(([citySalesData, regionSalesData, segmentSalesData, categorySalesData, yearlySalesData, monthlySalesData, recentOrderData]) => {
        // Function to get selected filters
        function getSelectedFilters() {
            const categoryCheckboxes = document.querySelectorAll('.filter:nth-child(2) input[type="checkbox"]');
            const segmentCheckboxes = document.querySelectorAll('.filter:nth-child(3) input[type="checkbox"]');
            const shipModeCheckboxes = document.querySelectorAll('.filter:nth-child(4) input[type="checkbox"]');

            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            const selectedSegments = Array.from(segmentCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            const selectedShipModes = Array.from(shipModeCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            return { selectedCategories, selectedSegments, selectedShipModes };
        }

        // Function to filter data
        function filterData(data) {
            const { selectedCategories, selectedSegments, selectedShipModes } = getSelectedFilters();
            return data.filter(item => {
                return selectedCategories.includes(item.Category) &&
                       selectedSegments.includes(item.Segment) &&
                       selectedShipModes.includes(item["Ship Mode"]);
            });
        }

        // Function to update bar chart
        function updateBarChart(filteredData) {
            const citySales = filteredData.reduce((acc, item) => {
                if (!acc[item.City]) {
                    acc[item.City] = 0;
                }
                acc[item.City] += item.Sales;
                return acc;
            }, {});

            const sortedCities = Object.entries(citySales).sort((a, b) => b[1] - a[1]).slice(0, 5);
            const cityLabels = sortedCities.map(item => item[0]);
            const citySalesData = sortedCities.map(item => item[1]);

            if (barChart) {
                barChart.destroy();
            }

            barChart = new Chart(ctxBar, {
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
                                    size: 9,
                                    family: 'Urbanist, sans-serif'
                                },
                                color: '#000000'
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 0,
                                minRotation: 0,
                                font: {
                                    size: 9,
                                    family: 'Urbanist, sans-serif'
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
        }

        // Function to update pie chart
        function updatePieChart(ctx, filteredData, key) {
            const salesData = filteredData.reduce((acc, item) => {
                if (!acc[item[key]]) {
                    acc[item[key]] = 0;
                }
                acc[item[key]] += item.Sales;
                return acc;
            }, {});

            const labels = Object.keys(salesData);
            const dataValues = Object.values(salesData);

            let chart;

            if (ctx === ctxPie1 && pieChart1) {
                pieChart1.destroy();
                chart = pieChart1;
            } else if (ctx === ctxPie2 && pieChart2) {
                pieChart2.destroy();
                chart = pieChart2;
            } else if (ctx === ctxPie3 && pieChart3) {
                pieChart3.destroy();
                chart = pieChart3;
            }

            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
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
                                size: 12,
                                family: 'Urbanist, sans-serif'
                            },
                            anchor: 'center',
                            align: 'center'
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });

            if (ctx === ctxPie1) {
                pieChart1 = chart;
            } else if (ctx === ctxPie2) {
                pieChart2 = chart;
            } else if (ctx === ctxPie3) {
                pieChart3 = chart;
            }
        }

        // Function to update line chart
        function updateLineChart(ctx, filteredData, dateKey, period) {
            const salesData = filteredData.reduce((acc, item) => {
                const date = new Date(item[dateKey]);
                let key;
                if (period === 'year') {
                    key = date.getFullYear();
                } else if (period === 'month') {
                    const month = date.getMonth() + 1;
                    key = `${date.getFullYear()}-${String(month).padStart(2, '0')}`;
                }
        
                if (!isNaN(date.getTime())) {
                    if (!acc[key]) {
                        acc[key] = 0;
                    }
                    acc[key] += item.Sales;
                }
                return acc;
            }, {});
        
            const labels = Object.keys(salesData).sort();
            const dataValues = labels.map(label => salesData[label]);
        
            console.log(`Labels for ${period}:`, labels); 
            console.log(`Data values for ${period}:`, dataValues); 
        
            let chart;
        
            if (ctx === ctxLine1 && lineChart1) {
                lineChart1.destroy();
                chart = lineChart1;
            } else if (ctx === ctxLine2 && lineChart2) {
                lineChart2.destroy();
                chart = lineChart2;
            }
        
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataValues,
                        fill: false,
                        borderColor: 'rgba(194, 41, 46, 1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#000000',
                                font: {
                                    size:9,
                                    family: 'Urbanist, sans-serif'
                                }
                            }
                        },
                        x: {
                            ticks: {
                                color: '#000000',
                                maxRotation: 0, 
                                minRotation: 0,
                                align: 'center',
                                font: {
                                    size:9,
                                    family: 'Urbanist, sans-serif'
                                }
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
        
            if (ctx === ctxLine1) {
                lineChart1 = chart;
            } else if (ctx === ctxLine2) {
                lineChart2 = chart;
            }
        }
        

        // Function to update filtered data and all charts
        function updateFilteredData() {
            const filteredCitySales = filterData(citySalesData);
            const filteredRegionSales = filterData(regionSalesData);
            const filteredSegmentSales = filterData(segmentSalesData);
            const filteredCategorySales = filterData(categorySalesData);
            const filteredYearlySales = filterData(yearlySalesData);
            const filteredMonthlySales = filterData(monthlySalesData);

            updateBarChart(filteredCitySales);
            updatePieChart(ctxPie1, filteredRegionSales, 'Region');
            updatePieChart(ctxPie2, filteredSegmentSales, 'Segment');
            updatePieChart(ctxPie3, filteredCategorySales, 'Category');
            updateLineChart(ctxLine1, filteredYearlySales, 'Order Date', 'year');
            updateLineChart(ctxLine2, filteredMonthlySales, 'Order Date', 'month');
        }

        // Event listeners for checkboxes
        const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateFilteredData);
        });

        // Initial call to display data based on default filter settings
        updateFilteredData();

// Orders table functionality
const ordersPerPage = 20;
let recentOrders = recentOrderData; // Correct variable name
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

// Search functionality
const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.trim().toLowerCase();
                recentOrders = recentOrderData.filter(order =>
                    order["Order ID"].toLowerCase().includes(searchTerm) ||
                    order["Order Date"].toLowerCase().includes(searchTerm) ||
                    order["Customer Name"].toLowerCase().includes(searchTerm) ||
                    order["Product Name"].toLowerCase().includes(searchTerm) ||
                    order.Sales.toFixed(2).includes(searchTerm)
                );

                currentPage = 1; // Reset to first page after search
                renderTable(currentPage);
            });
        } else {
            console.error('Element with id "search-input" not found.');
        }

    }).catch(error => console.error('Error in fetching or processing data:', error));
});