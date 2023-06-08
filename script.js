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


document.getElementById('calculator').addEventListener('submit', function(e) {
    e.preventDefault();

    var squareFootage = e.target.elements.squareFootage.value;
    var baseboardCostPerSqft = 1.0;  // Adjust based on actual cost
    var heatPumpCostPerSqft = 0.6;   // Adjust based on actual cost

    var baseboardAnnualCost = baseboardCostPerSqft * squareFootage;
    var heatPumpAnnualCost = heatPumpCostPerSqft * squareFootage;
    var savings = baseboardAnnualCost - heatPumpAnnualCost;

    document.getElementById('results').textContent = 'Annual baseboard cost: $' + baseboardAnnualCost
        + '. Annual heat pump cost: $' + heatPumpAnnualCost
        + '. Potential annual savings: $' + savings + '.';
});
