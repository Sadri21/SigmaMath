
let quizData = { questions: [] };
let currentQ = 0;
let score = 0;
let answered = false;
const splashColors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];

// --- Navigation Functions ---

function switchView(viewId) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('active-view');
    });
    // Show target
    document.getElementById(viewId).classList.add('active-view');
}

async function startQuizFlow() {
    try {
        // Fetch questions from server
        const response = await fetch('/questions?limit=10');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const questions = await response.json();

        quizData.questions = questions;
        currentQ = 0;
        score = 0;
        loadQuestion();
        switchView('quiz-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Maaf, gagal memuat soal. Silakan coba lagi.');
    }
}


function restartQuiz() {
    startQuizFlow();
}

function goToHome() {
    switchView('start-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Quiz Logic ---

function loadQuestion() {
    answered = false;
    const qData = quizData.questions[currentQ];

    document.getElementById('question-counter').innerText = `Soal ${currentQ + 1} / ${quizData.questions.length}`;
    document.getElementById('question-text').innerHTML = qData.question;

    const feedback = document.getElementById('feedback-box');
    feedback.style.display = 'none';

    document.getElementById('next-btn').style.display = 'none';

    // Update Liquid Bar
    const pct = (currentQ / quizData.questions.length) * 100;
    document.getElementById('progress-fill').style.width = pct + "%";

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    qData.answerOptions.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt.text;
        btn.onclick = () => check(opt, btn);
        container.appendChild(btn);
    });

    if (window.MathJax) MathJax.typesetPromise();
}

function check(option, btn) {
    if (answered) return;
    answered = true;

    const feedbackBox = document.getElementById('feedback-box');
    const buttons = document.querySelectorAll('.option-btn');
    const title = document.getElementById('feedback-title');
    const rationale = document.getElementById('rationale-text');

    if (option.isCorrect) {
        btn.classList.add('correct');
        score++;
        document.getElementById('star-display').innerText = `⭐ ${score}`;
        title.innerText = "YEY! BENAR! 🎉";
        title.style.color = "#2D7A65";

        confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
            colors: splashColors,
            shapes: ['circle', 'square'],
            disableForReducedMotion: true
        });
    } else {
        btn.classList.add('wrong');
        title.innerText = "YAH... KURANG TEPAT 😅";
        title.style.color = "#7A2D2D";

        // Highlight right answer
        quizData.questions[currentQ].answerOptions.forEach((o, i) => {
            if (o.isCorrect) buttons[i].classList.add('correct');
        });
    }

    rationale.innerHTML = option.rationale;
    feedbackBox.style.display = 'block';
    document.getElementById('next-btn').style.display = 'inline-block';

    setTimeout(() => {
        feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    if (window.MathJax) MathJax.typesetPromise([rationale]);

    buttons.forEach(b => b.disabled = true);
}

function nextQuestion() {
    currentQ++;
    if (currentQ < quizData.questions.length) {
        loadQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        finishGame();
    }
}

function finishGame() {
    switchView('result-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('progress-fill').style.width = '100%';

    document.getElementById('final-score-text').innerText = `Skor: ${score} / ${quizData.questions.length}`;

    let emoji = "🌱";
    let msg = "Ayo coba lagi!";

    if (score >= 8) {
        emoji = "🧜‍♂️";
        msg = "Kamu Raja Sigma!";
        confetti({ particleCount: 200, spread: 150, origin: { y: 0.6 }, colors: splashColors });
    } else if (score >= 5) {
        emoji = "🏄";
        msg = "Keren! Makin jago nih.";
    }

    document.getElementById('final-emoji').innerText = emoji;
    document.getElementById('result-message').innerText = msg;
}
