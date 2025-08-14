document.addEventListener('DOMContentLoaded', () => {
  const genderInput = document.getElementById('gender');
  const hipSection1 = document.getElementById('hip-section1');
  const hipSection2 = document.getElementById('hip-section2');
  const form = document.getElementById('bf-form');
  const result = document.getElementById('result');

  genderInput.addEventListener('change', () => {
    hipSection1.style.display = genderInput.value === 'female' ? 'block' : 'none';
    hipSection2.style.display = genderInput.value === 'female' ? 'block' : 'none';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const gender = genderInput.value;
    const height = parseFloat(document.getElementById('height').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip')?.value);

    if (!gender || isNaN(height) || isNaN(neck) || isNaN(waist) || (gender === 'female' && isNaN(hip))) {
      result.textContent = "Please fill in all required fields.";
      return;
    }

    let bodyFat = 0;

    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck)
                             + 0.15456 * Math.log10(height)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck)
                             + 0.22100 * Math.log10(height)) - 450;
    }

    bodyFat = bodyFat.toFixed(2);

    result.innerHTML = `
      <p>Estimated Body Fat: <strong>${bodyFat}%</strong></p>
      ${getCategory(gender, bodyFat)}
    `;
    document.getElementById('result').scrollIntoView({ behavior: "smooth", block: "start" });

    // Trigger animation
  result.classList.remove('show'); // reset
  void result.offsetWidth; // trigger reflow
  result.classList.add('show');
  });

  function getCategory(gender, bf) {
    bf = parseFloat(bf);
    if (gender === 'male') {
      if (bf < 6) document.getElementById('result').style.backgroundColor = "#d1f7c4";
      if (bf < 6) return "<p>Category: Essential Fat</p>";

      if (bf <= 13) document.getElementById('result').style.backgroundColor = "#b3e5fc";
      if (bf <= 13) return "<p>Category: Athletic</p>";

      if (bf <= 17) document.getElementById('result').style.backgroundColor = "#fff9c4";
      if (bf <= 17) return "<p>Category: Fitness</p>";

      if (bf <= 24) document.getElementById('result').style.backgroundColor = "#ffe0b2";
      if (bf <= 24) return "<p>Category: Average</p>";

      if (bf > 24) document.getElementById('result').style.backgroundColor = "#ffcdd2";
      if (bf > 24) return "<p>Category: Obese</p>";
      
    } else {
      if (bf < 14) document.getElementById('result').style.backgroundColor = "#d1f7c4";
      if (bf < 14) return "<p>Category: Essential Fat</p>";

      if (bf <= 20) document.getElementById('result').style.backgroundColor = "#b3e5fc";
      if (bf <= 20) return "<p>Category: Athletic</p>";

      if (bf <= 24) document.getElementById('result').style.backgroundColor = "#fff9c4";
      if (bf <= 24) return "<p>Category: Fitness</p>";

      if (bf <= 31) document.getElementById('result').style.backgroundColor = "#ffe0b2";
      if (bf <= 31) return "<p>Category: Average</p>";

      if (bf > 31) document.getElementById('result').style.backgroundColor = "#ffcdd2";
      if (bf > 31) return "<p>Category: Obese</p>";
    }
  }
});

const resetBtn = document.getElementById('reset-btn');
const hipSection1 = document.getElementById('hip-section1');
  const hipSection2 = document.getElementById('hip-section2');

resetBtn.addEventListener('click', () => {
  result.innerHTML = "";
  result.classList.remove('show');
  hipSection1.style.display = 'none';
  hipSection2.style.display = 'none';
});

 


