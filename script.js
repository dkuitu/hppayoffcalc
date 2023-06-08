// Mock data for Daikin units. Replace with your actual data.
const daikinUnits = [
  { id: 'unit1', name: 'Unit 1', seer: 16, hspf: 9, btu: 12000, lineSetSize: '1/4-3/8', cost: 1800 },
  { id: 'unit2', name: 'Unit 2', seer: 18, hspf: 10, btu: 18000, lineSetSize: '1/4-1/2', cost: 2200 },
  // Add more units as necessary.
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
  // Add your calculation logic here.
  // For now, it just returns a random number.
  return Math.floor(Math.random() * 10000);
}
