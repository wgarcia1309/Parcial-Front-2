var options = {
    chart: {
        type: 'line'
    },
    series: [{
        name: 'Puntaje',
        data: [3, 4, 2, 4, 1, 5, 5, 4, 2]
    }],
    xaxis: {
        categories: ['Op1', 'Op2', 'Op3', 'Op4', 'Op5', 'Op6', 'Op7', 'Op8', 'Op9']
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();