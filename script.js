const words = ['a Home...', 'Haven...', 'Refuge...', 'Sanctuary...', 'CHRIST...'];
let currentIndex = 0;
const changingWord = document.getElementById('changing-word');

function clearWord() {
    return new Promise(resolve => {
        let text = changingWord.textContent;
        const interval = setInterval(() => {
            if (text.length > 0) {
                text = text.slice(0, -1);
                changingWord.textContent = text;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

function typeWord(word) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < word.length) {
                changingWord.textContent += word[i];
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

async function changeWord() {
    await clearWord();
    await new Promise(resolve => setTimeout(resolve, 500)); // Pause after clearing
    currentIndex = (currentIndex + 1) % words.length;
    await typeWord(words[currentIndex]);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Pause before next cycle
    changeWord(); // Recursive call for continuous cycle
}

// Start the cycle
changeWord();


let currentIndexs = 0;

function showSlide(index) {
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length; // totalSlides = 2   
if (index >= totalSlides) {
currentIndexs = 0;
} else if (index < 0) {
currentIndexs = totalSlides - 1;
} else {
currentIndexs = index;
}
const offset = -currentIndexs * 100;
document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
showSlide(currentIndexs + 1);
}

function prevSlide() {
showSlide(currentIndexs - 1);
}

// Optional: Auto-slide
setInterval(nextSlide, 5000);
