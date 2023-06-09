const heatPumpData = [
  {id: 'rx09', name: 'Daikin RX09', seer: 14.5, hspf: 8.5, unitCost: 2000, tonnage: 0.75},
  {id: 'rx12', name: 'Daikin RX12', seer: 14.5, hspf: 8.5, unitCost: 2200, tonnage: 1.0},
  {id: 'rx18', name: 'Daikin RX18', seer: 15.5, hspf: 9.0, unitCost: 2500, tonnage: 1.5},
  {id: 'rx24', name: 'Daikin RX24', seer: 15.5, hspf: 9.0, unitCost: 2800, tonnage: 2.0},
];

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
  const coolingHours = document.getElementById('coolingHours').value;
  const heatingHours = document.getElementById('heatingHours').value;
  const electricityCost = document.getElementById('electricityCost').value;
  const baseboardHeatingCost = document.getElementById('baseboardHeatingCost').value;
  const selectedHeatPumpId = document.getElementById('heatpumpSystem').value;
  const selectedHeatPump = heatPumpData.find((system) => system.id === selectedHeatPumpId);

  // Calculate costs
  const coolingCost = calculateCoolingCost(coolingHours, electricityCost, selectedHeatPump.seer);
  const heatingCost = calculateHeatingCost(heatingHours, electricityCost, selectedHeatPump.hspf);
  const totalAnnualCost = coolingCost + heatingCost;
  
  // Display results
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').textContent = `Total Annual Cost: ${totalAnnualCost.toFixed(2)}`;

  // Draw graph
  drawCostGraph(baseboardHeatingCost, totalAnnualCost);
});
