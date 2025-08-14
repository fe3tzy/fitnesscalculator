document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orm-form');
  const resultDiv = document.getElementById('result');
  const resetBtn = document.getElementById('reset-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const unit = document.getElementById('units').value;

    if (isNaN(weight) || isNaN(reps) || reps < 1 || reps > 20 || !unit) {
      showResult('Please enter valid values and select a unit.', true);
      return;
    }

    const oneRepMax = weight * (1 + reps / 30); // Epley formula
    let resultText = '';

    if (unit === 'kg') {
      const lbs = oneRepMax * 2.20462;
      resultText = `Estimated 1RM: <strong>${oneRepMax.toFixed(1)} kg</strong> (${lbs.toFixed(1)} lbs)`;
    } else {
      const kg = oneRepMax / 2.20462;
      resultText = `Estimated 1RM: <strong>${oneRepMax.toFixed(1)} lbs</strong> (${kg.toFixed(1)} kg)`;
    }

    showResult(resultText);
    updateChart(oneRepMax);
  });

  resetBtn.addEventListener('click', () => {
    fadeOut(resultDiv, () => {
      resultDiv.innerHTML = '';
    });

    // Clear the 1RM percentage chart
  const chartBody = document.getElementById('orm-chart-body');
  if (chartBody) {
    chartBody.innerHTML = '';
  }
  });

  function showResult(text, isError = false) {
    resultDiv.innerHTML = text;
    resultDiv.style.color = isError ? 'red' : '#333';
    resultDiv.style.opacity = 0;
    resultDiv.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      resultDiv.style.opacity = 1;
    }, 50);
  }

  function fadeOut(element, callback) {
    element.style.transition = 'opacity 0.5s ease';
    element.style.opacity = 0;
    setTimeout(() => {
      if (callback) callback();
    }, 500);
  }
});



function updateChart(oneRepMax) {
  const chartBody = document.getElementById('orm-chart-body');
  chartBody.innerHTML = ''; // Clear previous entries

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
  const reps = {
    100: '1',
    95: '2',
    90: '3',
    85: '4-5',
    80: '6-7',
    75: '8-9',
    70: '10-11',
    65: '12-13',
    60: '14-15',
    55: '16-17',
    50: '18-20'
  };

  percentages.forEach(pct => {
    const weight = (oneRepMax * pct / 100).toFixed(1);
    const row = `<tr>
      <td>${pct}%</td>
      <td>${weight}</td>
      <td>${reps[pct]}</td>
    </tr>`;
    chartBody.innerHTML += row;
  });
}



  