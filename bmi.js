 document.getElementById('bmi-btn').addEventListener('click', function () {
  const resultEl = document.getElementById('result');

  // Try metric inputs
  const weightKg = parseFloat(document.getElementById('weight-kg')?.value);
  const heightCm = parseFloat(document.getElementById('height-cm')?.value);

  // Try US inputs
  const weightLbs = parseFloat(document.getElementById('weight-lbs')?.value);
  const heightFt = parseFloat(document.getElementById('height-ft')?.value) || 0;
  const heightIn = parseFloat(document.getElementById('height-in')?.value) || 0;

  let bmi = null;

  // Priority: if metric fields are filled, use those
  if (!isNaN(weightKg) && weightKg > 0 && !isNaN(heightCm) && heightCm > 0) {
    bmi = calculateBMI(weightKg, heightCm);
  } 
  // Otherwise use US inputs
  else if (!isNaN(weightLbs) && weightLbs > 0 && (heightFt > 0 || heightIn > 0)) {
    bmi = calculateUSUnitsBMI(weightLbs, heightFt, heightIn);
  }

  //BMI calculation logic
function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    return null;
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return bmi.toFixed(2);
}

function calculateUSUnitsBMI(weightLbs, heightFt, heightIn) {
  const weightKg = weightLbs * 0.453592;
  const heightCm = (heightFt * 12 + heightIn) * 2.54;
  return calculateBMI(weightKg, heightCm);
}

  // Display result
  if (bmi) {
    resultEl.textContent = `Your BMI is: ${bmi}`;
    showBMIChart(bmi);
  } else {
    resultEl.textContent = 'Please enter valid positive numbers for weight and height.';
  }

  // Animate result
  if (resultEl) {
    resultEl.animate(
      [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1.03)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      {
        duration: 700,
        easing: 'cubic-bezier(.4,0,.2,1)',
        fill: 'forwards',
      }
    );
    setTimeout(() => {
      resultEl.style.opacity = '1';
    }, 400);
  }
});

//When pressing reset, clear the result
document.getElementById('reset-btn').addEventListener('click', function () {
  const resultEl = document.getElementById('result');
  if (resultEl) {
    resultEl.textContent = '';
    resultEl.style.opacity = '0';
  }
});

//  BMI chart
function showBMIChart(bmi) {
  const chart = document.getElementById('bmi-chart');
  const marker = document.getElementById('bmi-marker');

  const bmiValue = parseFloat(bmi);
  if (isNaN(bmiValue)) return;

  // Show the chart
  chart.style.display = 'block';

  // Map BMI range: min 10, max 40 (clamped)
  const min = 10, max = 40;
  const clamped = Math.max(min, Math.min(bmiValue, max));
  const percent = ((clamped - min) / (max - min)) * 100;

  // Move marker
  marker.style.display = 'block';
  marker.style.left = `${percent}%`;
}

 // Reset Marker on reset
document.getElementById('reset-btn').addEventListener('click', function () {
  const marker = document.getElementById('bmi-marker');
  marker.style.left = '0%'; // Reset position
  marker.style.display = 'none'; // Hide marker
  const chart = document.getElementById('bmi-chart');
  chart.style.display = 'none'; // Hide chart
});

// BMI chart animation after clicked on calculate
document.getElementById('bmi-btn').addEventListener('click', function () {
  const chart = document.getElementById('bmi-chart');
  const marker = document.getElementById('bmi-marker');

  // Animate chart appearance
  chart.animate(
    [
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1.03)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    {
      duration: 700,
      easing: 'cubic-bezier(.4,0,.2,1)',
      fill: 'forwards',
    }
  );

  // Animate marker appearance
  marker.animate(
    [
      { opacity: 0, transform: 'translateX(-50%) scale(0.8)' },
      { opacity: 1, transform: 'translateX(-50%) scale(1)' },
    ],
    {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );
});

//Input auto-complete of for all inputs
document.querySelectorAll('input').forEach(input => {
  input.setAttribute('autocomplete', 'off');
});



// Unit switching logic
const usBtn = document.getElementById('us-unit');
const metricBtn = document.getElementById('metric-unit');
const rowWeightMetric = document.getElementById('row-weight-metric');
const rowHeightMetric = document.getElementById('row-height-metric');
const rowWeightUS = document.getElementById('row-weight-us');
const rowHeightUS = document.getElementById('row-height-us');

usBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // Show US fields, hide Metric fields
  rowWeightMetric.style.display = 'none';
  rowHeightMetric.style.display = 'none';
  rowWeightUS.style.display = '';
  rowHeightUS.style.display = '';
  // Toggle active class
  usBtn.classList.add('active-unit');
  metricBtn.classList.remove('active-unit');
});

metricBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // Show Metric fields, hide US fields
  rowWeightMetric.style.display = '';
  rowHeightMetric.style.display = '';
  rowWeightUS.style.display = 'none';
  rowHeightUS.style.display = 'none';
  // Toggle active class
  metricBtn.classList.add('active-unit');
  usBtn.classList.remove('active-unit');
});


const calorieForm = document.getElementById('calorie-form');
calorieForm.addEventListener('submit', function(e) {
  e.preventDefault();



  let weight, height;
  // Determine which unit is active
  const isMetric = metricBtn.classList.contains('active-unit');
  if (isMetric) {
    weight = parseFloat(document.getElementById('weight-kg').value); // kg
    height = parseFloat(document.getElementById('height-cm').value); // cm
  } else {
    weight = parseFloat(document.getElementById('weight-lbs').value) * 0.4536; // lbs to kg
    const feet = parseFloat(document.getElementById('height-ft').value) || 0;
    const inches = parseFloat(document.getElementById('height-in').value) || 0;
    height = (feet * 12 + inches) * 2.54; // inches to cm
  }
  });


 


