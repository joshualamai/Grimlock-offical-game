  //Created on : 11 Dec 2024, 13:34:19
    //Author     : joshu
// --- Analytics Functions ---
function getDefaultAnalytics(player) {
  return {
    player: player || getCurrentUserId(),
    attempts: [],
    gaveUp: false,
    completed: false,
    totalTime: 0,
    startTime: null,
    endTime: null
  };
}

function getCurrentUserId() {
  return window.currentUserId ? window.currentUserId : (window.guestId || "Guest");
}

function saveAnalytics() {
  try {
    let allAnalytics = JSON.parse(localStorage.getItem('grimlock_analytics_all')) || {};
    const playerId = analytics.player || getCurrentUserId();
    allAnalytics[playerId] = analytics;
    localStorage.setItem('grimlock_analytics_all', JSON.stringify(allAnalytics));
  } catch (e) { /* ignore */ }
}

function loadAnalytics(playerId) {
  try {
    let allAnalytics = JSON.parse(localStorage.getItem('grimlock_analytics_all')) || {};
    if (playerId && allAnalytics[playerId]) {
      analytics = allAnalytics[playerId];
    } else {
      analytics = getDefaultAnalytics(playerId);
    }
    showAnalyticsReport();
  } catch (e) { /* ignore */ }
}

function getAllAnalytics() {
  return JSON.parse(localStorage.getItem('grimlock_analytics_all')) || {};
}

function showAllAnalyticsReport() {
  const allAnalytics = getAllAnalytics();
  let report = document.getElementById('all-analytics-report');
  if (!report) {
    report = document.createElement('pre');
    report.id = 'all-analytics-report';
    const adminDash = document.getElementById('admin-analytics-dashboard');
    if (adminDash) adminDash.appendChild(report);
    else document.body.appendChild(report);
  }
  let display = '';
  for (const player in allAnalytics) {
    display += `Player: ${player}\n`;
    display += JSON.stringify(allAnalytics[player], null, 2) + '\n\n';
  }
  report.textContent = display || 'No analytics data.';
}

function addClearAnalyticsButton() {
  let btn = document.getElementById('clear-analytics-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'clear-analytics-btn';
    btn.textContent = 'Clear All Analytics';
    btn.style.margin = '10px';
    btn.onclick = function() {
      if (confirm('Are you sure you want to clear all analytics?')) {
        localStorage.removeItem('grimlock_analytics_all');
        alert('All analytics cleared.');
        showAllAnalyticsReport();
      }
    };
    const adminDash = document.getElementById('admin-analytics-dashboard');
    if (adminDash) adminDash.appendChild(btn);
    else document.body.appendChild(btn);
  }
}

function addExportAllAnalyticsButton() {
  let btn = document.getElementById('export-all-analytics-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'export-all-analytics-btn';
    btn.textContent = 'Export All Analytics';
    btn.style.margin = '10px';
    btn.onclick = function() {
      exportAllAnalytics('json');
    };
    const adminDash = document.getElementById('admin-analytics-dashboard');
    if (adminDash) adminDash.appendChild(btn);
    else document.body.appendChild(btn);
  }
}

function exportAllAnalytics(format) {
  const allAnalytics = getAllAnalytics();
  let dataStr = '';
  if (format === 'csv') {
    dataStr = 'Player,Level,Tries,HintsUsed,TimeSpent,IncorrectGuesses\n';
    for (const player in allAnalytics) {
      (allAnalytics[player].attempts || []).forEach(a => {
        dataStr += `${player},${a.level},${a.tries},${a.hintsUsed},${a.timeSpent},"${(a.incorrectGuesses||[]).join(';')}"\n`;
      });
    }
  } else {
    dataStr = JSON.stringify(allAnalytics, null, 2);
  }
  const blob = new Blob([dataStr], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `all_analytics_report.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function ensureAnalyticsDashboard() {
  let analyticsDash = document.getElementById('admin-analytics-dashboard');
  if (!analyticsDash) {
    analyticsDash = document.createElement('div');
    analyticsDash.id = 'admin-analytics-dashboard';
    analyticsDash.style.display = 'none';
    analyticsDash.innerHTML = '<h3>Analytics Dashboard</h3><pre id="all-analytics-report"></pre>';
    document.body.appendChild(analyticsDash);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  ensureAnalyticsDashboard();
  loadAnalytics();
  if (window.currentUserId === 'Admin' || window.isAdmin) {
    const analyticsDash = document.getElementById('admin-analytics-dashboard');
    if (analyticsDash) analyticsDash.style.display = 'block';
    addClearAnalyticsButton();
    addExportAllAnalyticsButton();
    showAllAnalyticsReport();
  }
}); 