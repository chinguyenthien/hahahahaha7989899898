document.addEventListener('DOMContentLoaded', () => {
    const vietnameseMeaning = document.getElementById('vietnamese-meaning');
    const englishWordInput = document.getElementById('english-word');
    const submitBtn = document.getElementById('submit-btn');
    const hintBtn = document.getElementById('hint-btn');
    const result = document.getElementById('result');
    let vocabulary = [];
    let currentWord = null;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            vocabulary = data;
            newWord();
        });

    function newWord() {
        if(vocabulary.length === 0){
            vietnameseMeaning.textContent = "Bạn đã hoàn thành bộ từ vựng";
            englishWordInput.style.display = 'none';
            submitBtn.style.display = 'none';
            hintBtn.style.display = 'none';
            return;
        }
        const randomIndex = Math.floor(Math.random() * vocabulary.length);
        currentWord = vocabulary[randomIndex];
        vietnameseMeaning.textContent = currentWord.vietnamese;
    }

    submitBtn.addEventListener('click', () => {
        const userAnswer = englishWordInput.value.trim().toLowerCase();
        const correctAnswer = currentWord.english.toLowerCase();

        if (userAnswer === correctAnswer) {
            result.textContent = "Chính xác!";
            vocabulary = vocabulary.filter(word => word !== currentWord);
            newWord();
            englishWordInput.value = '';
        } else {
            result.textContent = "Sai rồi. Hãy thử lại!";
        }
    });

    hintBtn.addEventListener('click', () => {
        englishWordInput.value = currentWord.english;
    });
});