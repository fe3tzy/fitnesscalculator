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

// TDEE calculation and animated result display
const calorieForm = document.getElementById('calorie-form');
calorieForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get values
  const age = parseInt(document.getElementById('age').value);
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const activity = document.getElementById('activity-level').value;
  const bfInput = document.getElementById('bf').value;
  const bodyFat = bfInput ? parseFloat(bfInput) : null;

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

  // Activity factors
  const activityFactors = {
    'sedentary': 1.2,
    'lightly-active': 1.375,
    'moderately-active': 1.55,
    'very-active': 1.725,
    'athlete': 1.9
  };

  // Calculate BMR
  let bmr;
  if (bodyFat !== null && !isNaN(bodyFat)) {
    // Katch-McArdle formula
    const leanMass = weight * (1 - bodyFat / 100);
    bmr = 370 + (21.6 * leanMass);
  } else {
    // Mifflin-St Jeor formula
    bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate TDEE
  const tdee = bmr * activityFactors[activity];
  const bmrText = `Your Basal Metabolic Rate (BMR) is: <span style="color:#1a3c77; font-size:1.2em;">${Math.round(bmr)} kcal</span>`;
  const tdeeText = `Your estimated daily calorie expenditure (TDEE) is: <span style="color:#1a3c77; font-size:1.2em;">${Math.round(tdee)} kcal</span>`;
  const resultHTML = `<div style="margin-bottom:12px;">${bmrText}</div><div>${tdeeText}</div>`;

  if (!gender || isNaN(age) || isNaN(weight) || isNaN(height)) {
  alert('Please fill in all required fields correctly.');
  return;
}

  // Animated result display
  let resultElem = document.getElementById('tdee-result');
  if (!resultElem) {
    resultElem = document.createElement('div');
    resultElem.id = 'tdee-result';
    resultElem.style.marginTop = '24px';
    resultElem.style.textAlign = 'center';
    resultElem.style.fontSize = '20px';
    resultElem.style.fontWeight = 'bold';
    resultElem.style.opacity = '0';
    resultElem.innerHTML = resultHTML;
    calorieForm.parentElement.appendChild(resultElem);
    // Animate fade-in and slight grow
    resultElem.animate([
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1.03)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 700,
      easing: 'cubic-bezier(.4,0,.2,1)',
      fill: 'forwards'
    });
    setTimeout(() => { resultElem.style.opacity = '1'; }, 400);
  } else {
    // Animate out, then in
    resultElem.animate([
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.95)' }
    ], {
      duration: 300,
      fill: 'forwards'
    });
    setTimeout(() => {
      resultElem.innerHTML = resultHTML;
      resultElem.animate([
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1.03)' },
        { opacity: 1, transform: 'scale(1)' }
      ], {
        duration: 700,
        easing: 'cubic-bezier(.4,0,.2,1)',
        fill: 'forwards'
      });
      resultElem.style.opacity = '1';
    }, 300);
  }
});

// TDEE animation reset logic
document.getElementById('reset-btn').addEventListener('click', function () {
  const resultElem = document.getElementById('tdee-result');
  if (resultElem) {
    resultElem.innerHTML = '';
    resultElem.style.opacity = '0';
  }
});



 


