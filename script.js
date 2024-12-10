document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('welcome-section').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    updateQuestionsState();
    
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

function updateQuestionsState() {
    const questionBlocks = document.querySelectorAll('.question-block');
    
    questionBlocks.forEach((block, index) => {
        const form = block.querySelector('form');
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        
        if (index === 0) {
            input.disabled = false;
            button.disabled = false;
        } else {
            const previousBlock = questionBlocks[index - 1];
            const isPreviousAnswered = previousBlock.classList.contains('answered');
            
            input.disabled = !isPreviousAnswered;
            button.disabled = !isPreviousAnswered;
            
            if (!isPreviousAnswered) {
                block.classList.add('disabled-question');
            } else {
                block.classList.remove('disabled-question');
            }
        }
    });
}

document.querySelectorAll('.question-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const questionNumber = this.dataset.digit;
        const input = this.querySelector('input');
        let answer = input.value.toLowerCase().trim();
        let correctAnswer = correctAnswers[questionNumber].toLowerCase();
        
        const previousMessages = this.querySelectorAll('.error-reveal, .hint-message');
        previousMessages.forEach(msg => msg.remove());
        
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
            updateQuestionsState();
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-reveal';
            errorMessage.innerHTML = `
                <p>❌ Nah... Está errado! Bebam mais um copo e tentem novamente!</p>
                <p class="error-hint">Vocês conseguem! 💪</p>
            `;
            this.appendChild(errorMessage);
            
            if (questionNumber === "1") {
                const hintMessage = document.createElement('div');
                hintMessage.className = 'hint-message';
                hintMessage.innerHTML = `
                    <p>💡 Dica:</p>
                    <p>Não introduzas o emoji, apenas a palavra! 📝</p>
                `;
                this.appendChild(hintMessage);
            }

            if (questionNumber === "3") {
                const hintMessage = document.createElement('div');
                hintMessage.className = 'hint-message';
                hintMessage.innerHTML = `
                    <p>💡 Dica:</p>
                    <p>Não é só nas épocas festivas que ela toma banho? 🤔🚿😅</p>
                `;
                this.appendChild(hintMessage);
            }

            if (questionNumber === "5") {
                const hintMessage = document.createElement('div');
                hintMessage.className = 'hint-message';
                hintMessage.innerHTML = `
                    <p>💡 Dica:</p>
                    <p>Esta é das perguntas mais difíceis, mas aposto que ao ler o último conjunto da sequência já disseste a resposta! 🤔💭</p>
                `;
                this.appendChild(hintMessage);
            }

            if (questionNumber === "6") {
                const hintMessage = document.createElement('div');
                hintMessage.className = 'hint-message';
                hintMessage.innerHTML = `
                    <p>💡 Dica:</p>
                    <p>Não se esqueçam que o "K" também é uma letra!</p>
                    <p>Cada letra vale o seu número de posição × 2</p>
                `;
                this.appendChild(hintMessage);
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

document.addEventListener('DOMContentLoaded', function() {
    updateQuestionsState();
});

document.getElementById('codeButtonQuiz').addEventListener('click', function() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('code-section').classList.remove('hidden');
});