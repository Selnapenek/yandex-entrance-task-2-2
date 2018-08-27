'use strict';
// Эх, жаль что не рекомендуется Vue или React использовать ={

export default function(idArrwos, idScrollContainer) {
    const arrowsContainer = document.querySelector(idArrwos);
    const scrollContainer = document.querySelector(idScrollContainer);

    //По типу стрелочек определяем соответсвенно тип прокрутки.
    if(arrowsContainer.classList.contains('arrows')) {
        const letArrow = arrowsContainer.querySelector('.arrow__left');
        const rightArrow = arrowsContainer.querySelector('.arrow__right');
        const offsetLeft = parseInt(getComputedStyle(scrollContainer).paddingLeft, 10);

        hideArrow(letArrow, scrollContainer, 'left');
        hideArrow(rightArrow, scrollContainer, 'right');

        letArrow.addEventListener("click", function () {
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                scrollContainer.scrollLeft += -(scrollContainer.clientWidth - offsetLeft);
            } else {
                scrollContainer.scrollBy({
                    top: 0,
                    left: -(scrollContainer.clientWidth - offsetLeft),
                    behavior: 'smooth'
                });
            }
        });

        rightArrow.addEventListener("click", function () {
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                scrollContainer.scrollLeft += (scrollContainer.clientWidth - offsetLeft);
            } else {
                scrollContainer.scrollBy({
                    top: 0,
                    left: (scrollContainer.clientWidth - offsetLeft),
                    behavior: 'smooth'
                });
            }
        });

        scrollContainer.addEventListener("scroll", function () {
            hideArrow(letArrow, scrollContainer, 'left');
            hideArrow(rightArrow, scrollContainer, 'right');
        });

    } else if(arrowsContainer.classList.contains('arrows-vert')) {
        let topArrow = arrowsContainer.querySelector('.arrow__down');
        let bottomArrow = arrowsContainer.querySelector('.arrow__up');

        hideArrow(topArrow, scrollContainer, 'top');
        hideArrow(bottomArrow, scrollContainer, 'bottom');

        topArrow.addEventListener("click", function () {
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                scrollContainer.scrollTop += -scrollContainer.clientHeight;
            } else {
                scrollContainer.scrollBy({
                    top: -scrollContainer.clientHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        });

        bottomArrow.addEventListener("click", function () {
            if (document.documentMode || /Edge/.test(navigator.userAgent)) {
                scrollContainer.scrollTop += scrollContainer.clientHeight;
            } else {
                scrollContainer.scrollBy({
                    top: scrollContainer.clientHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        });

        scrollContainer.addEventListener("scroll", function () {
            hideArrow(topArrow, scrollContainer, 'top');
            hideArrow(bottomArrow, scrollContainer, 'bottom');
        });

    }
}

export {hideArrow};

function hideArrow(arrow, scrollContainer, scrollPosition) {
    switch (scrollPosition)
    {
        case 'top':
            if(scrollContainer.scrollTop < 25){
                // Лучше при помощи css класса скрывать элемент
                arrow.style.display = 'none';
            } else {
                arrow.style.display = 'block';
            }
            break;

        case 'bottom':
            if(scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 25){
                arrow.style.display = 'none';
            } else {
                arrow.style.display = 'block';
            }
            break;

        case 'left':
            if(scrollContainer.scrollLeft < 25){
                arrow.style.visibility = 'hidden';
            } else {
                arrow.style.visibility = '';
            }
            break;

        case 'right':
            if(scrollContainer.scrollWidth - scrollContainer.scrollLeft <= scrollContainer.clientWidth + 25){
                arrow.style.visibility = 'hidden';
            } else {
                arrow.style.visibility = '';
            }
            break;
    }
}

