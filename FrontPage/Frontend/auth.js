const API_URL = "https://ukamock.ukatechnical.com"; // backend URL
// const API_URL = "http://localhost:5001"; // backend URL

// --- REGISTER FUNCTION ---
async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !phone || !password) {
    alert(" Please fill all fields!");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = "login.html";
    }
  } catch (err) {
    alert(" Registration failed. Try again!");
  }
}

// --- LOGIN FUNCTION ---
async function loginUser(event) {
  event.preventDefault();

  const countryCode = document.getElementById("countryCode").value;
  const phoneNumber = document.getElementById("phone").value.trim();
  const fullPhone = countryCode + phoneNumber;
  const password = document.getElementById("password").value.trim();

  if (!phoneNumber || !password) {
    alert(" Please fill all fields!");
    return;
  }

  const phoneRegex = /^\+[1-9]\d{6,14}$/;
  if (!phoneRegex.test(fullPhone)) {
    alert(" Please enter a valid phone number (correct digits).");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: fullPhone, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(" " + data.message);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      window.location.href = "home.html";
    } else {
      alert(" " + data.message);
    }
  } catch (err) {
    console.error(" Login error:", err);
    alert(" Login failed. Try again!");
  }
}

// --- LOGOUT FUNCTION ---
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out!");
  window.location.href = "home.html";
}

// --- CHECK LOGIN BEFORE TEST ---
function checkLoginBeforeTest() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    window.location.href = "test3.html";
  } else {
    alert(" Please register or log in before starting the test!");
    window.location.href = "register.html";
  }
}

// --- NAVBAR VISIBILITY + PROFILE LOADER ---
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const profileBtn = document.getElementById("profileBtn");

  if (loginBtn && registerBtn && profileBtn) {
    if (user) {
      loginBtn.style.display = "none";
      registerBtn.style.display = "none";
      profileBtn.style.display = "inline-block";
    } else {
      loginBtn.style.display = "inline-block";
      registerBtn.style.display = "inline-block";
      profileBtn.style.display = "none";
    }
  }

  // Load profile info
  if (user && document.getElementById("profileForm")) {
    document.getElementById("name").value = user.name || "";
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("email").value = user.email || "";
  } else if (!user && window.location.pathname.includes("profile.html")) {
    alert(" Please log in first!");
    window.location.href = "login.html";
  }
});

// --- UPDATE PROFILE FUNCTION ---
document
  .getElementById("profileForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    try {
      const res = await fetch(`${API_URL}/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, phone }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      }
    } catch (err) {
      alert(" Failed to update profile. Please try again.");
    }
  });

// -----------------------------
// SEND OTP (FORGOT PASSWORD)
// -----------------------------
async function sendOTP(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  try {
    const res = await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    alert("OTP sent to your email!");
    localStorage.setItem("pendingEmail", email);

    window.location.href = "otp.html";
  } catch (err) {
    console.error("OTP SEND ERROR:", err);
  }
}

// -----------------------------
// VERIFY OTP
// -----------------------------
async function verifyOTP(event) {
  event.preventDefault();

  const email = localStorage.getItem("pendingEmail");
  const otp = document.getElementById("otp").value.trim();

  try {
    const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    alert("OTP verified! Set new password.");
    window.location.href = "new-password.html";
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
  }
}

// -----------------------------
// RESET PASSWORD
// -----------------------------
async function resetPassword(event) {
  event.preventDefault();

  const email = localStorage.getItem("pendingEmail");
  const newPassword = document.getElementById("newPassword").value.trim();

  try {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    alert("Password updated successfully!");
    window.location.href = "login.html";
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
  }
}

// -----------------------------
// FETCH USER PROFILE
// -----------------------------
async function loadProfile() {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "login.html");

  try {
    const res = await fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message);

    document.getElementById("name").innerText = data.user.name;
    document.getElementById("email").innerText = data.user.email;
    document.getElementById("phone").innerText = data.user.phone;
  } catch (err) {
    console.error("PROFILE LOAD ERROR:", err);
  }
}
