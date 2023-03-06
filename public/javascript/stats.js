const search_button = document.getElementById('search_button')
search_button.addEventListener('click', player_search)
// const player_name=document.getElementById('player_name').value
async function player_search() {
    try {
        const response = await fetch(`http://localhost:5000/api/stats/?name=${document.getElementById('player_name').value}`);
        const player = await response.json();
        // console.log(player[0].bowling_average[0].test)
        document.getElementById('name').innerText = player[0].orignal_name;

        document.getElementById('test_runs').innerText = player[0].Runs[0].test;
        document.getElementById('test_wickets').innerText = player[0].wickets[0].test;
        document.getElementById('odi_runs').innerText = player[0].Runs[0].odi;
        document.getElementById('odi_wickets').innerText = player[0].wickets[0].odi;
        document.getElementById('t20_runs').innerText = player[0].Runs[0].t20;
        document.getElementById('t20_wickets').innerText = player[0].wickets[0].t20;
        document.getElementById('test_batting_average').innerText = player[0].batting_average[0].test;
        document.getElementById('test_bowling_average').innerText = player[0].bowling_average[0].test;
        document.getElementById('odi_batting_average').innerText = player[0].batting_average[0].odi;
        document.getElementById('odi_bowling_average').innerText = player[0].bowling_average[0].odi;
        document.getElementById('t20_batting_average').innerText = player[0].batting_average[0].t20;
        document.getElementById('t20_bowling_average').innerText = player[0].bowling_average[0].t20;

const ctx = document.getElementById('myChart');
const test_runs=parseInt(document.getElementById('test_runs').innerText);
const odi_runs=parseInt(document.getElementById('odi_runs').innerText);
const t20_runs=parseInt(document.getElementById('t20_runs').innerText);

const runs_chart=new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Test-Matches', 'ODI', 'T20I'],
        datasets: [{
            label: 'Runs scored across formats',
            data: [test_runs, odi_runs, t20_runs],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                beginAtZero: true
            }
        }
    }
});
const ctx2 = document.getElementById('myChart2');
const test_wickets=parseInt(document.getElementById('test_wickets').innerText);
const odi_wickets=parseInt(document.getElementById('odi_wickets').innerText);
const t20_wickets=parseInt(document.getElementById('t20_wickets').innerText);


new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Test-Matches', 'ODI', 'T20I'],
        datasets: [{
            label: 'wickets taken across formats',
            data: [test_wickets, odi_wickets,t20_wickets],
            borderWidth: 1,
            backgroundColor: "red"
        }]
    },
    options: {
        
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                beginAtZero: true
            }
        }
    }

});
    } catch (error) {
        console.error(error);
    }
}