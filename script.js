document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('welcome-section').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    
    document.getElementById('quiz').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});


const correctAnswers = {
    1: "cousins",
    2: "756",
    3: "10", 
    4: "45", 
    5: "312211",
    6: "84"
};

document.querySelectorAll('.question-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const questionNumber = this.dataset.digit;
        const input = this.querySelector('input');
        let answer = input.value.toLowerCase().trim();
        let correctAnswer = correctAnswers[questionNumber].toLowerCase();
        
        if (questionNumber === "5" || questionNumber === "6") {
            answer = input.value;
            correctAnswer = correctAnswers[questionNumber];
        }
        
        if (answer === correctAnswer) {
            this.querySelector('.digit-reveal').classList.remove('hidden');
            input.disabled = true;
            this.querySelector('button').disabled = true;
            this.closest('.question-block').classList.add('answered');
            celebrateSuccess(300);
        } else {
            const errorDiv = this.querySelector('.error-reveal');
            if (!errorDiv) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-reveal';
                
                if (questionNumber === "3") {
                    const hintMessage = document.createElement('div');
                    hintMessage.className = 'hint-message';
                    hintMessage.innerHTML = `
                        <p>💡 Dica:</p>
                        <p>Não é só nas épocas festivas que ela toma banho? 🤔🚿😅</p>
                    `;
                    this.appendChild(hintMessage);
                    
                    setTimeout(() => {
                        hintMessage.remove();
                    }, 6000);
                }

                if (questionNumber === "4") {
                    const hintMessage = document.createElement('div');
                    hintMessage.className = 'hint-message';
                    hintMessage.innerHTML = `
                        <p>💡 Dica:</p>
                        <p>Também têm de contar, não sou só eu a fazer o jogo! 🔢</p>
                    `;
                    this.appendChild(hintMessage);
                    
                    setTimeout(() => {
                        hintMessage.remove();
                    }, 6000);
                }

                errorMessage.innerHTML = `
                    <p>❌ A sério? Bebam mais um copo e tentem novamente!</p>
                    <p class="error-hint">Vocês conseguem! 💪</p>
                `;
                this.appendChild(errorMessage);
                
                if (questionNumber === "6") {
                    const hintMessage = document.createElement('div');
                    hintMessage.className = 'hint-message';
                    hintMessage.innerHTML = `
                        <p>💡 Dica:</p>
                        <p>Não se esqueçam que o "K" também é uma letra!</p>
                        <p>Cada letra vale o seu número de posição × 2</p>
                    `;
                    this.appendChild(hintMessage);
                    
                    setTimeout(() => {
                        hintMessage.remove();
                    }, 6000);
                }

                setTimeout(() => {
                    errorMessage.remove();
                }, 6000);
            }
        }
    });
});

function celebrateSuccess(duration = 3000) {
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 3000);
}

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('welcome-section').classList.remove('hidden');
});

document.getElementById('backFromCodeButton').addEventListener('click', function() {
    document.getElementById('code-section').classList.add('hidden');
    document.getElementById('welcome-section').classList.remove('hidden');
});

document.getElementById('codeButton').addEventListener('click', function() {
    document.getElementById('welcome-section').classList.add('hidden');
    document.getElementById('code-section').classList.remove('hidden');
});

const codeInputs = document.querySelectorAll('.code-digit');
codeInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        if (this.value.length >= 1) {
            this.value = this.value[0];
            if (index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        }
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
            codeInputs[index - 1].focus();
        }
    });
});

document.getElementById('codeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const correctCode = "528493";
    let enteredCode = "";
    
    codeInputs.forEach(input => {
        enteredCode += input.value;
    });

    if (enteredCode === correctCode) {
        document.getElementById('code-section').classList.add('hidden');
        document.getElementById('enigma').classList.remove('hidden');
        celebrateSuccess();
    } else {
        const errorDiv = document.getElementById('codeErrorMessage');
        errorDiv.textContent = "Já beberam demais? 🍷 O código não está correto!";
        errorDiv.classList.remove('hidden');
        
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    }
});

document.getElementById('backFromEnigmaButton').addEventListener('click', function() {
    document.getElementById('enigma').classList.add('hidden');
    document.getElementById('welcome-section').classList.remove('hidden');
});