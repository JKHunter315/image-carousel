const domStuff = (function() {
    const carouselSlide = document.querySelector('#picture');
    const allImages = document.querySelectorAll('#img-btn-container img');
    const imgOne = document.querySelector('#picture img');

    const prevBtn = document.querySelector('#prev');
    const nextBtn = document.querySelector('#next');

    const size = imgOne.clientWidth;
    allImages[0].style.opacity = '1';

    return { carouselSlide, allImages, prevBtn, nextBtn, size, imgOne }
})();

const styling = (function() {
    const transitionImg = function(counter) {
        domStuff.carouselSlide.style.transform = 'translateX(' + (-domStuff.size * counter) + 'px)';
        domStuff.carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    }

    const highlightImgOnBottom = function(counter) {
        domStuff.allImages[counter].style.opacity = '1';
    }

    const removeHighlight = function(counter) {
        domStuff.allImages[counter].style.opacity = '0.65';
    }

    return { transitionImg, highlightImgOnBottom, removeHighlight }
})();

const counterStuff = (function() {
    let counter = 0;

    const addCount = function() {
        counter++;
        if (counter > 9) {
            counter = 0;
            styling.removeHighlight(9);
        }
        styling.transitionImg(counter);
        styling.highlightImgOnBottom(counter);
        styling.removeHighlight(counter-1);
    }

    const minusCount = function() {
        counter--;
        if (counter < 0) {
            counter = 9;
            styling.removeHighlight(0);
        }
        styling.transitionImg(counter);
        styling.highlightImgOnBottom(counter);
        styling.removeHighlight(counter+1);
    }

    const changeCount = function(newCount) {
        styling.removeHighlight(counter);
        counter = newCount;
        styling.transitionImg(counter);
        styling.highlightImgOnBottom(counter);
    }

    return { addCount, minusCount, changeCount }
})();

const timer = (function() {
    let fiveSecInt;

    const fiveSeconds = function() {
        fiveSecInt = setInterval(counterStuff.addCount, 5000);
    }

    const clearFive = function() {
        clearInterval(fiveSecInt);
    }

    return { fiveSeconds, clearFive }
})();

timer.fiveSeconds();

const imageSwitch = (function() {

    const switchToImage = function(e) {
        let thisImg = e.target.src;
        timer.clearFive();
        for (let i = 0; i < domStuff.allImages.length; i++) {
            if (thisImg == domStuff.allImages[i].src) {
                counterStuff.changeCount(i);
            }
        }
        timer.fiveSeconds();
    }

    return { switchToImage }
})();

domStuff.nextBtn.addEventListener('click', () => {
    timer.clearFive();
    counterStuff.addCount();
    timer.fiveSeconds();
});

domStuff.prevBtn.addEventListener('click', () => {
    timer.clearFive()
    counterStuff.minusCount();
    timer.fiveSeconds();
});

(domStuff.allImages).forEach(function(image) {
    image.addEventListener('click', imageSwitch.switchToImage);
});


