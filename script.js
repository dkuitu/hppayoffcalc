// Mock data for Daikin units. Replace with your actual data.
const daikinUnits = [
  { id: 'RX09', name: 'Daikin RX09', seer: 16, hspf: 9, btu: 9000, lineSetSize: '1/4-3/8', cost: 1800 },
  { id: 'RX24', name: 'Daikin RX24', seer: 18, hspf: 10, btu: 24000, lineSetSize: '1/4-1/2', cost: 2200 },
  { id: 'RK09', name: 'Daikin RK09', seer: 17, hspf: 8.5, btu: 9000, lineSetSize: '1/4-3/8', cost: 1700 },
  { id: 'RK24', name: 'Daikin RK24', seer: 19, hspf: 9.5, btu: 24000, lineSetSize: '1/4-1/2', cost: 2300 },
  { id: 'FTK09', name: 'Daikin FTK09', seer: 20, hspf: 10, btu: 9000, lineSetSize: '1/4-3/8', cost: 2000 },
  { id: 'FTK24', name: 'Daikin FTK24', seer: 21, hspf: 11, btu: 24000, lineSetSize: '1/4-1/2', cost: 2500 },
  { id: 'FTX09', name: 'Daikin FTX09', seer: 22, hspf: 10.5, btu: 9000, lineSetSize: '1/4-3/8', cost: 2100 },
  { id: 'FTX24', name: 'Daikin FTX24', seer: 23, hspf: 11.5, btu: 24000, lineSetSize: '1/4-1/2', cost: 2600 },
];


// Populate Daikin units dropdown.
const systemSelect = document.getElementById('system');
daikinUnits.forEach((unit) => {
  const option = document.createElement('option');
  option.value = unit.id;
  option.text = unit.name;
  systemSelect.add(option);
});

// Form submit event listener.
document.getElementById('calc-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload on form submit.
  
  const squareFootage = document.getElementById('squareFootage').value;
  const insulationQuality = document.getElementById('insulationQuality').value;
  const selectedSystemId = document.getElementById('system').value;
  const rebateApplied = document.getElementById('rebate').checked;
  
  const selectedSystem = daikinUnits.find(unit => unit.id === selectedSystemId);
  
  const payoff = calculatePayoff(squareFootage, insulationQuality, selectedSystem, rebateApplied);
  
  alert(`Estimated payoff: $${payoff}`);
});

// Payoff calculation function.
function calculatePayoff(squareFootage, insulationQuality, system, rebateApplied) {
  // Constants
  const costPerKwh = 0.12; // Assume electricity cost is $0.12 per kWh
  const baseboardWattage = squareFootage * 10; // Assume each square foot requires 10W of heating power
  const hoursPerYear = 8760; // Hours in a year

  // Calculate yearly power consumption (kWh) for baseboard heater
  const baseboardKwhPerYear = (baseboardWattage / 1000) * hoursPerYear;

  // Calculate yearly power consumption (kWh) for heat pump
  const heatPumpCOP = system.seer / 3.412; // Convert SEER to COP
  const heatPumpWattage = baseboardWattage / heatPumpCOP;
  const heatPumpKwhPerYear = (heatPumpWattage / 1000) * hoursPerYear;

  // Calculate yearly cost for each
  const baseboardCostPerYear = baseboardKwhPerYear * costPerKwh;
  const heatPumpCostPerYear = heatPumpKwhPerYear * costPerKwh;

  // Calculate savings and payoff time
  const yearlySavings = baseboardCostPerYear - heatPumpCostPerYear;
  const payoffTime = system.cost / yearlySavings;

  return Math.ceil(payoffTime); // Round up to nearest whole year
}

