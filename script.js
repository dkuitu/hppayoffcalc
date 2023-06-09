let costGraphChart;
let costPieChart;
let coolingHours = 500;
let heatingHours = 1300;
let electricityCost = 12; //cents/kWh

const heatPumpData = [
  {id: 'rx09', name: 'Daikin RX09', seer: 14.5, hspf: 8.5, unitCost: 2000, tonnage: 0.75},
  {id: 'rx12', name: 'Daikin RX12', seer: 14.5, hspf: 8.5, unitCost: 2200, tonnage: 1.0},
  {id: 'rx18', name: 'Daikin RX18', seer: 15.5, hspf: 9.0, unitCost: 2500, tonnage: 1.5},
  {id: 'rx24', name: 'Daikin RX24', seer: 15.5, hspf: 9.0, unitCost: 2800, tonnage: 2.0},
];

function calculateCoolingCost(coolingHours, electricityCost, seer) {
  return (coolingHours / seer) * electricityCost;
}

function calculateHeatingCost(heatingHours, electricityCost, hspf) {
  return (heatingHours / hspf) * electricityCost;
}

// Populate heat pump systems in the dropdown
const heatpumpSystemSelect = document.getElementById('heatpumpSystem');
heatPumpData.forEach((system) => {
  const option = document.createElement('option');
  option.value = system.id;
  option.text = system.name;
  heatpumpSystemSelect.appendChild(option);
});

// Handle form submission
document.getElementById('costCalculator').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const selectedHeatPumpId = document.getElementById('heatpumpSystem').value;
  const selectedHeatPump = heatPumpData.find((system) => system.id === selectedHeatPumpId);

  // Calculate costs
  const coolingCost = calculateCoolingCost(coolingHours, electricityCost, selectedHeatPump.seer);
  const heatingCost = calculateHeatingCost(heatingHours, electricityCost, selectedHeatPump.hspf);
  const totalAnnualCost = coolingCost + heatingCost;
  
  // Display results
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').textContent = `Total Annual Cost: ${totalAnnualCost.toFixed(2)}
                                                    SEER: ${selectedHeatPump.seer} 
                                                    HSPF: ${selectedHeatPump.hspf}`;

  // Draw pie chart for heating vs cooling cost
  drawPieChart(coolingCost, heatingCost);
});

function drawCostGraph(totalAnnualCost) {
  const ctx = document.getElementById('costGraph').getContext('2d');

  // If a chart already exists, destroy it
  if (costGraphChart) {
    costGraphChart.destroy();
  }

  costGraphChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['TODO'],
      datasets: [{
        label: 'Annual Energy Cost',
        data: [baseboardHeatingCost, totalAnnualCost],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function drawPieChart(coolingCost, heatingCost) {
  const ctx = document.getElementById('costPieChart').getContext('2d');

  // If a chart already exists, destroy it
  if (costPieChart) {
    costPieChart.destroy();
  }

  costPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Cooling Cost', 'Heating Cost'],
      datasets: [{
        data: [coolingCost, heatingCost],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(192, 75, 75)']
      }]
    },
  });
}



document.getElementById('addHeatPump').addEventListener('click', () => {
  const selectedHeatPumpId = document.getElementById('heatpumpSystem').value;
  const selectedHeatPump = heatPumpData.find((system) => system.id === selectedHeatPumpId);

  const heatpump = document.createElement('div');
  heatpump.classList.add('heatpump');
  heatpump.innerHTML = `
    <h3>${selectedHeatPump.name}</h3>
    <p>SEER: ${selectedHeatPump.seer}</p>
    <p>HSPF: ${selectedHeatPump.hspf}</p>
    <button class="remove">x</button>
  `;
  document.getElementById('heatpumpComparisons').appendChild(heatpump);

  // Remove heat pump comparison
  heatpump.querySelector('.remove').addEventListener('click', () => {
    document.getElementById('heatpumpComparisons').removeChild(heatpump);
  });
});
