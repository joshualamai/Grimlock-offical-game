// --- Admin Functions ---
function adminLogin() {
  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();
  if (username === "admin" && password === "adminpass") {
    isAdmin = true;
    window.currentUserId = "Admin";
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-difficulty-selection").style.display = "block";
    // Show admin-only reveal buttons when game starts
    document.querySelectorAll('[id^="reveal-"]').forEach(button => {
      button.style.display = "inline-block";
    });
    // Show analytics dashboard
    const analyticsDash = document.getElementById('admin-analytics-dashboard');
    if (analyticsDash) analyticsDash.style.display = 'block';
    addClearAnalyticsButton();
    addExportAllAnalyticsButton();
    showAllAnalyticsReport();
    loadAnalytics();
    showAnalyticsReport();
  } else {
    document.getElementById("admin-status").innerText = "Invalid credentials!";
    document.getElementById("admin-status").className = "text-danger";
  }
}

function adminLogout() {
  isAdmin = false;
  document.getElementById("admin-panel").style.display = "none";
  document.getElementById("admin-login").style.display = "block";
  // Hide admin-only reveal buttons
  document.getElementById("reveal-l1-btn").style.display = "none";
  document.getElementById("reveal-l2-btn").style.display = "none";
  document.getElementById("reveal-l3-btn").style.display = "none";
  document.getElementById("reveal-l1-btn-level").style.display = "none";
}

function revealLevelOnePassword() {
  if (isAdmin) {
    const message = document.getElementById("message");
    const displayedPassword = document.getElementById("password-display").innerText;
    const solution = displayedPassword.split('').reverse().join('');
    message.innerHTML = `Level 1 Password: ${solution}<br><small>(Reverse of: ${displayedPassword})</small>`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
}

function revealLevelTwoPassword() {
  if (isAdmin) {
    const message = document.getElementById("message");
    const solution = toLeetSpeak(levelPasswords[2]);
    message.innerHTML = `Level 2 Password: ${solution}<br><small>(Leetspeak of: ${levelPasswords[2]})</small>`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
}

function revealLevelThreePassword() {
  if (isAdmin) {
    const message = document.getElementById("message");
    message.innerHTML = `Level 3 Password: ${levelPasswords[3]}<br><small>(Look for keyboard pattern)</small>`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
}

function revealLevelFourPassword() {
  if (isAdmin) {
    const message = document.getElementById("message");
    message.innerHTML = `Level 4 Password: ${levelPasswords[4]}<br><small>(Combined words with numbers)</small>`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
}

function revealLevelFivePassword() {
  if (isAdmin) {
    const message = document.getElementById("message");
    message.innerHTML = `Level 5 Password: ${levelPasswords[5]}<br><small>(Look for repeating pattern)</small>`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
}

function revealLevelSixPassword() {
  if (isAdmin) {
    const message = document.getElementById("message");
    const encryptedPassword = document.getElementById("cipher-password").innerText;
    message.innerHTML = `Level 6 Password: ${levelPasswords[6]}<br><small>(Encrypted from: ${encryptedPassword})</small>`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
}

function revealOTP() {
  if (isAdmin) {
    const message = document.getElementById("message");
    message.innerText = `Level 3 OTP: ${otpCode}`;
    message.className = "message success";
  } else {
    const message = document.getElementById("message");
    message.innerText = "You are not authorized to see this password!";
    message.className = "message error";
  }
} 