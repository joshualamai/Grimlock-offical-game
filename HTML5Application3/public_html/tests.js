// Test Suite for Password Security Game
const { expect } = chai;

describe('Password Security Game Tests', () => {
    beforeEach(() => {
        // Reset DOM and variables before each test
        document.getElementById('password-input').value = '';
        document.getElementById('password-display').innerText = '';
        document.getElementById('scrambled-input').value = '';
        document.getElementById('leetspeak-input').value = '';
        document.getElementById('message').innerText = '';
        document.getElementById('points').innerText = '100';
        points = 100;
        startTime = Date.now();
        currentLevel = 1;
        currentDifficulty = 'easy';
        hintsUsed = 0;
        levelPasswords[1] = 'apple';
        levelPasswords[2] = 'summer2024';
        levelPasswords[3] = 'qwerty123';
        levelPasswords[4] = 'cat45dog';
        levelPasswords[5] = 'abc123xyz789';
        levelPasswords[6] = 'IFMMP';
        analytics.attempts = [];
        // Ensure scrambled-password element exists
        if (!document.getElementById('scrambled-password')) {
            const scrambledDiv = document.createElement('div');
            scrambledDiv.id = 'scrambled-password';
            document.body.appendChild(scrambledDiv);
        }
    });

    // Unit Tests
    describe('Unit Tests', () => {
        describe('Password Generation', () => {
            it('should generate valid level 1 passwords', async () => {
                await generateLevelOnePassword();
                expect(typeof levelPasswords[1]).to.equal('string');
                expect(levelPasswords[1].length).to.be.greaterThan(0);
                expect(veryWeakPasswords).to.include(levelPasswords[1]);
            });

            it('should generate valid level 2 passwords', async () => {
                await generateLevelPassword(2);
                expect(typeof levelPasswords[2]).to.equal('string');
                expect(levelPasswords[2].length).to.be.greaterThan(0);
                expect(weakPasswords).to.include(levelPasswords[2]);
            });

            it('should generate valid level 3 passwords', async () => {
                await generateLevelPassword(3);
                expect(typeof levelPasswords[3]).to.equal('string');
                expect(levelPasswords[3].length).to.be.greaterThan(0);
                expect(keyboardPatterns).to.include(levelPasswords[3]);
            });
        });

        describe('Password Verification', () => {
            it('should correctly verify level 1 passwords', () => {
                document.getElementById('password-input').value = 'apple';
                document.getElementById('password-display').innerText = 'elppa';
                levelPasswords[1] = 'apple';
                verifyPassword();
                // Check for explanation message instead of 'great job'
                expect(document.getElementById('message').innerText.toLowerCase()).to.include('why was this password weak');
            });

            it('should correctly verify level 2 passwords', async () => {
                document.getElementById('scrambled-input').value = 'summer2024';
                levelPasswords[2] = 'summer2024';
                await generateScrambledPassword();
                checkScrambledPassword();
                expect(document.getElementById('message').innerText).to.include('Unscrambled');
            });

            it('should correctly verify level 3 passwords', async () => {
                document.getElementById('strong-input')?.remove();
                const strongInput = document.createElement('input');
                strongInput.id = 'strong-input';
                document.body.appendChild(strongInput);
                strongInput.value = 'qwerty123';
                levelPasswords[3] = 'qwerty123';
                checkStrongPassword();
                expect(document.getElementById('message').innerText).to.not.include('Incorrect');
            });
        });

        describe('Points System', () => {
            it('should calculate points correctly', () => {
                points = 50;
                startTime = Date.now() - 5000; // 5 seconds ago
                calculatePoints();
                expect(points).to.be.greaterThan(50);
            });

            it('should handle incorrect attempts correctly', () => {
                points = 50;
                handleIncorrectAttempt('wrongpassword');
                expect(points).to.be.at.most(50);
            });
        });

        describe('Hint System', () => {
            it('should generate appropriate hints', () => {
                const userInput = 'short';
                const correctPassword = 'longpassword123';
                const hints = generateDynamicHint(userInput, correctPassword);
                expect(hints).to.be.an('array');
                expect(hints.length).to.be.greaterThan(0);
                expect(hints[0]).to.include('characters long');
            });

            it('should respect difficulty settings for hints', () => {
                currentDifficulty = 'hard';
                const maxHints = getMaxHintsForCurrentDifficulty();
                expect(maxHints).to.equal(0);
            });
        });
    });

    // Integration Tests
    describe('Integration Tests', () => {
        describe('Level Progression', () => {
            it('should progress through levels correctly', async () => {
                currentLevel = 1;
                document.getElementById('current-level')?.remove();
                const currentLevelDiv = document.createElement('div');
                currentLevelDiv.id = 'current-level';
                document.body.appendChild(currentLevelDiv);
                await proceedToNextChallenge();
                expect(document.getElementById('current-level').innerText).to.equal('1');
            });

            it('should handle level completion correctly', () => {
                currentLevel = difficultySettings[currentDifficulty].maxLevel;
                endGame();
                expect(document.getElementById('high-score').style.display).to.equal('block');
            });
        });

        describe('Analytics Integration', () => {
            it('should track level attempts correctly', () => {
                const initialAttempts = analytics.attempts.length;
                startLevelAnalytics(1);
                expect(analytics.attempts.length).to.equal(initialAttempts + 1);
            });

            it('should record hints used correctly', () => {
                hintsUsed = 0;
                revealHint('testpassword');
                expect(hintsUsed).to.equal(1);
            });
        });

        describe('Cipher System Integration', () => {
            it('should verify cipher passwords correctly', () => {
                document.getElementById('cipher-input')?.remove();
                const cipherInput = document.createElement('input');
                cipherInput.id = 'cipher-input';
                document.body.appendChild(cipherInput);
                cipherInput.value = 'IFMMP';
                levelPasswords[6] = 'IFMMP';
                checkCipherPassword();
                expect(document.getElementById('message').innerText).to.not.include('Incorrect');
            });
        });
    });

    // End-User Testing Scenarios
    describe('End-User Testing Scenarios', () => {
        describe('Complete Game Flow', () => {
            it('should complete easy difficulty game flow', async () => {
                currentDifficulty = 'easy';
                currentLevel = 1;
                points = 100;
                document.getElementById('current-level')?.remove();
                const currentLevelDiv = document.createElement('div');
                currentLevelDiv.id = 'current-level';
                document.body.appendChild(currentLevelDiv);
                for (let i = 1; i <= difficultySettings.easy.maxLevel; i++) {
                    await proceedToNextChallenge();
                }
                expect(document.getElementById('high-score').style.display).to.equal('block');
            });

            it('should handle incorrect attempts gracefully', () => {
                points = 100;
                handleIncorrectAttempt('wrongpassword');
                expect(points).to.be.at.most(100);
            });
        });

        describe('Admin Functionality', () => {
            it('should handle admin login correctly', () => {
                document.getElementById('admin-username').value = 'admin';
                document.getElementById('admin-password').value = 'adminpass';
                adminLogin();
                expect(isAdmin).to.be.true;
            });

            it('should allow password revelation for admin', () => {
                isAdmin = true;
                document.getElementById('password-display').innerText = 'elppa';
                revealLevelOnePassword();
                expect(document.getElementById('message').innerHTML).to.include('Level 1 Password');
            });
        });
    });
});

// Helper function to run tests
function runTests() {
    mocha.run();
}

// Run tests when the page loads
window.addEventListener('load', runTests); 