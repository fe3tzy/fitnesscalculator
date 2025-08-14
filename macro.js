// Get the tdee input in macro section and set it according to the goal
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('macro-form');
  const resultDiv = document.getElementById('result');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // ✅ Prevent form reload

      const tdee = parseFloat(document.getElementById('macro-tdee').value);
      const goal = document.getElementById('goal').value;
      const split = document.getElementById('macro-split').value;

      if (!tdee || !goal || !split) {
        resultDiv.innerHTML = `<p style="color:red;">Please fill in all fields.</p>`;
        return;
      }

      let adjustedTDEE = tdee;
      if (goal === 'cut') adjustedTDEE -= 500;
      else if (goal === 'bulk') adjustedTDEE += 500;

      let proteinPercent = 0, carbPercent = 0, fatPercent = 0;

      switch (split) {
        case 'high-protein':
          proteinPercent = 40; carbPercent = 30; fatPercent = 30;
          break;
        case 'balanced':
          proteinPercent = 30; carbPercent = 40; fatPercent = 30;
          break;
        case 'low-carb':
          proteinPercent = 35; carbPercent = 20; fatPercent = 45;
          break;
      }

      const proteinGrams = (adjustedTDEE * proteinPercent / 100) / 4;
      const carbsGrams = (adjustedTDEE * carbPercent / 100) / 4;
      const fatsGrams = (adjustedTDEE * fatPercent / 100) / 9;

      resultDiv.innerHTML = `
      <div class="fade-scale">
        <h3 class="macro-title">Macro Breakdown</h3>
        <p class="macro-result"><strong>Calories:</strong> ${Math.round(adjustedTDEE)} kcal/day</p>
        <ul>
          <li class="macro-result"><strong>Protein:</strong> ${Math.round(proteinGrams)}g (${proteinPercent}%)</li>
          <li class="macro-result"><strong>Carbs:</strong> ${Math.round(carbsGrams)}g (${carbPercent}%)</li>
          <li class="macro-result"><strong>Fats:</strong> ${Math.round(fatsGrams)}g (${fatPercent}%)</li>
        </ul>
        </div>
      `;
      document.getElementById('result').scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});


  //When pressing reset, clear the result
document.getElementById('reset-btn').addEventListener('click', function () {
  const resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.classList.add('fade-out');
    setTimeout(() => {
      resultDiv.textContent = '';
      resultDiv.classList.remove('fade-out');
    }, 400); // matches animation duration
  }
});

// Custom Macro Form
document.getElementById('custom-macro-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const tdee = parseFloat(document.getElementById('custom-tdee').value);
  const proteinPercent = parseFloat(document.getElementById('custom-macro-protein').value);
  const carbPercent = parseFloat(document.getElementById('custom-macro-carbs').value);
  const fatPercent = parseFloat(document.getElementById('custom-macro-fats').value);

  if (!tdee || !proteinPercent || !carbPercent || !fatPercent) {
    
    document.getElementById('custom-result').innerHTML = `<p class="custom-error" style="color:red;">Please fill in all fields.</p>`;
    return;
  }

  const totalPercent = proteinPercent + carbPercent + fatPercent;
  if (totalPercent !== 100) {
    
    document.getElementById('custom-result').innerHTML = `<p class="custom-error fade-scale" style="color:red;">Please ensure the macro percentages add up to 100%.</p>`;
    return;
  }

  const proteinGrams = (tdee * proteinPercent / 100) / 4;
  const carbsGrams = (tdee * carbPercent / 100) / 4;
  const fatsGrams = (tdee * fatPercent / 100) / 9;

  document.getElementById('custom-result').innerHTML = `
  <div class="fade-scale">
    <p class="custom-calories"><strong>Calories:</strong> ${Math.round(tdee)} kcal/day</p>
    <p class="custom-calories"><strong>Macros:</strong></p>
    <ul class="custom-ul" style="list-style-type: none;">
      <li id="result-protein"class="macro-result2"><strong>Protein:</strong> ${Math.round(proteinGrams)}g (${proteinPercent}%)</li>
      <li class="macro-result2"><strong>Carbs:</strong> ${Math.round(carbsGrams)}g (${carbPercent}%)</li>
      <li class="macro-result2"><strong>Fats:</strong> ${Math.round(fatsGrams)}g (${fatPercent}%)</li>
    </ul>
    </div>
  `;
  document.getElementById('custom-result').scrollIntoView({ behavior: "smooth", block: "start" });
});

//When pressing reset, clear the custom result
document.getElementById('custom-reset').addEventListener('click', function () {
  const customResultDiv = document.getElementById('custom-result');
  if (customResultDiv) {
    customResultDiv.classList.add('fade-out');
    setTimeout(() => {
      customResultDiv.textContent = '';
      customResultDiv.classList.remove('fade-out');
    }, 400);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const goalSelect = document.getElementById('macro-split');
  const customInputsDiv = document.getElementById('custom-macro');
  

  goalSelect.addEventListener('change', () => {
    customInputsDiv.style.display = goalSelect.value === 'custom' ? 'block' : 'none';

    if(goalSelect.value === 'custom'){
      document.getElementById('custom-macro').scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else {
      document.getElementById('macro-tdee').scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
