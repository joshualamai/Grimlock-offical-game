// --- UI Helpers ---
// Defensive event listeners to block submission if gameOver is true
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    const patternBtn = document.getElementById('pattern-submit-btn');
    if (patternBtn) {
      patternBtn.addEventListener('click', function(e) {
        if (window.gameOver) {
          e.preventDefault();
          return false;
        }
      });
    }
    const patternInput = document.getElementById('pattern-input');
    if (patternInput) {
      patternInput.addEventListener('keydown', function(e) {
        if (window.gameOver && (e.key === 'Enter' || e.keyCode === 13)) {
          e.preventDefault();
          return false;
        }
      });
    }
  });
} 