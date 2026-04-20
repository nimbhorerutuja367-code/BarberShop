// ================== GLOBAL STATE ==================
let bookingData = {
  service: "",
  price: "",
  duration: "",
  barber: "Any Available",
  date: "",
  time: "",
  name: "",
  phone: "",
  gender: ""
};

let currentStep = 1;

// ================== STEP NAVIGATION ==================
function goStep(step) {
  document.querySelectorAll(".form-step").forEach(s => s.classList.remove("active"));
  document.getElementById(`step${step}`).classList.add("active");
  updateProgress(step);
  currentStep = step;
}

function updateProgress(step) {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`dot${i}`).classList.remove("active", "done");
    if (i < step) document.getElementById(`dot${i}`).classList.add("done");
    if (i === step) document.getElementById(`dot${i}`).classList.add("active");
  }
}

// ================== SERVICE ==================
function selectSvc(el, name, price, duration) {
  document.querySelectorAll(".svc-chip").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");

  bookingData.service = name;
  bookingData.price = price;
  bookingData.duration = duration;
}

// ================== BARBER ==================
function selectBarber(el, name) {
  document.querySelectorAll(".barber-chip").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");

  bookingData.barber = name;
}

// ================== DATE ==================
function selectDate(el, date) {
  document.querySelectorAll(".date-chip").forEach(d => d.classList.remove("selected"));
  el.classList.add("selected");

  bookingData.date = date;
}

// ================== TIME ==================
function selectTime(el, time) {
  document.querySelectorAll(".time-chip").forEach(t => t.classList.remove("selected"));
  el.classList.add("selected");

  bookingData.time = time;
}

// ================== CONFIRM BOOKING ==================
async function confirmBooking() {
  if (!bookingData.service || !bookingData.date || !bookingData.time) {
    alert("Please complete all steps");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/appointments/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: bookingData.name,
        phone: bookingData.phone,
        gender: bookingData.gender,
        service: bookingData.service,
        barber: bookingData.barber,
        date: bookingData.date,
        time: bookingData.time
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    showSuccess();

  } catch (err) {
    alert("Server error. Try again later.");
  }
}

// ================== SUCCESS UI ==================
function showSuccess() {
  document.getElementById("bookingFormWrap").style.display = "none";
  document.getElementById("successScreen").classList.add("show");

  document.getElementById("bookingRef").innerText =
    "B&B-" + Math.floor(10000 + Math.random() * 90000);

  document.getElementById("confirmDetails").innerHTML = `
    <div class="confirm-row"><span>💇</span>${bookingData.service}</div>
    <div class="confirm-row"><span>👤</span>${bookingData.barber}</div>
    <div class="confirm-row"><span>📅</span>${bookingData.date}</div>
    <div class="confirm-row"><span>⏰</span>${bookingData.time}</div>
  `;
}

// ================== RESET ==================
function resetForm() {
  location.reload();
}