'use strict';
// Эх, жаль что не рекомендуется Vue или React использовать ={

export default function() {
    const modal = document.querySelector("#modal");
    const modalOverlay = document.querySelector("#modal-overlay");
    // На копку применить ничего не повесил. 
    // Считаю что только после нормально сформированного AJAX запроса можно закрыть окно кнопкой применить.
    const closeButton = document.querySelector("#close-button");
    const openButtons = document.querySelectorAll(".device"); // Devices div
    let isOpenModal = false;

    // Поля модального окна - отображают данные с дейваса.
    const modalInformationTitle = modal.querySelector('.modal-information__title');
    const modalInformationDetails = modal.querySelector('.modal-information__details');
    const modalInformationIcon = modal.querySelector('.modal-information__icon');
    const modalInformationData = modal.querySelector('.modal-information__icon');
    const modalInformationSlider = modal.querySelector('.modal-information-slider');
    const modalInformationSliderMin = modal.querySelector('.modal-information-slider__min');
    const modalInformationSliderMax = modal.querySelector('.modal-information-slider__max');
    const modalInformationSliderBtn = modal.querySelector('.modal-information-slider__button');
    const modalInformationSwitchers = modal.querySelector('.modal-information__switchers');

    closeButton.addEventListener("click", function() {
        if(isOpenModal) {
            // Почистить за собой - лишним не будет.
            modalInformationTitle.textContent = '';
            modalInformationDetails.textContent = '';
            modalInformationSwitchers.style.display = 'none';
            modalInformationIcon.classList.remove('modal-information__icon_icon-temperature');
            modalInformationIcon.classList.remove('modal-information__icon_icon-temperature-2');
            modalInformationIcon.classList.remove('modal-information__icon_icon-sun');
            modalInformationSlider.classList.remove('modal-information-slider__sun');
            modalInformationSlider.classList.remove('modal-information-slider__temperature');
            modalInformationSlider.classList.add('modal-information-slider__round');
            modalInformationSliderMin.classList.remove('modal-information-slider__min_sun-icon');
            modalInformationSliderMax.classList.remove('modal-information-slider__max_sun-icon');
            modalInformationSliderBtn.style.left = '';
            modalInformationSliderBtn.style.top = '';

            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
            document.body.style.overflow = '';
            isOpenModal = false;
        }
    });

    openButtons.forEach( (elem) => {
        elem.addEventListener("click", function() {
            if(!isOpenModal){
                isOpenModal = true;
                // Костыль плэйсхолдер - лучше через AJAX запрашивать все что надо.
                // Ну или на крайний случай  доставать через data-atr..
                // P.S. Интуиция говорит что это модальное окно - сплошной костыль.
                let deviceInformationTitle = this.querySelector('.device__title');
                let deviceInformationDetails = this.querySelector('.device__details');
                let deviceInformationData = '+23';
                let deviceInformationIcon = this.querySelector('.device__icon');
                // Думал как-то типизировать девайсы и switch'ем прогонять. Остановился на if - icon?
                let devicePosition =  this.getBoundingClientRect();

                if (deviceInformationIcon.classList.contains('device__icon_icon-temperature')) {
                    modalInformationIcon.classList.add('modal-information__icon_icon-temperature');
                    modalInformationSlider.classList.add('modal-information-slider__temperature');
                    modalInformationSlider.classList.remove('modal-information-slider__round');
                    modalInformationSwitchers.style.display = '';
                }
                if (deviceInformationIcon.classList.contains('device__icon_icon-temperature-2')) {
                    modalInformationIcon.classList.add('modal-information__icon_icon-temperature-2');
                    modalInformationSlider.classList.add('modal-information-slider__temperature');
                    modalInformationSlider.classList.remove('modal-information-slider__round');
                    modalInformationSwitchers.style.display = '';
                }
                if (deviceInformationIcon.classList.contains('device__icon_icon-sun')) {
                    modalInformationIcon.classList.add('modal-information__icon_icon-sun');
                    modalInformationSlider.classList.add('modal-information-slider__sun');
                    modalInformationSlider.classList.remove('modal-information-slider__round');
                    modalInformationData.textContent = '';
                    modalInformationSliderMin.textContent = '';
                    modalInformationSliderMax.textContent = '';
                    modalInformationSliderMin.classList.add('modal-information-slider__min_sun-icon');
                    modalInformationSliderMax.classList.add('modal-information-slider__max_sun-icon');
                    modalInformationSwitchers.style.display = '';
                } else {
                    modalInformationData.textContent = deviceInformationData;
                    modalInformationSliderMin.textContent = '-10';
                    modalInformationSliderMax.textContent = '+30';
                }

                modalInformationTitle.textContent = deviceInformationTitle.textContent;
                modalInformationDetails.textContent = deviceInformationDetails.textContent;
                if(detectMob()){
                    modalInformationSliderBtn.style.top = '40%';
                } else {
                    modalInformationSliderBtn.style.left = '70%';
                }

                // Попытка сделать отрывающееся окно как на IOs {Начальные координаты открытия окна}
                modal.style.transformOrigin = devicePosition.x + "px " + devicePosition.y + "px";

                modal.classList.toggle("closed");
                modalOverlay.classList.toggle("closed");
                document.body.style.overflow = 'hidden';
            }
        });
    } );

    // По хорошему это надо было вынести в отдельный файл.
    // Фунционал range slider - src: https://codepen.io/anon/pen/XMVBpB?editors=0110
    // Наверное лучше было бы сделать через обычный input
    
    modalInformationSliderBtn.addEventListener("mousedown", function(evt) {
        let buttonCoords = getCoords(modalInformationSliderBtn);
        let shiftX = evt.pageX - buttonCoords.left;
        let sliderCoords = getCoords(modalInformationSlider);

        document.onmousemove = function(evt) {
            let left = evt.pageX - shiftX - sliderCoords.left;

            if (left < 0) {
                left = 0;
            }
            let right = modalInformationSlider.offsetWidth - modalInformationSliderBtn.offsetWidth;

            if (left > right) {
                left = right;
            }

            modalInformationSliderBtn.style.left = left + 'px';
        };

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    });
    
    // mobile
    modalInformationSliderBtn.addEventListener("touchstart", function(evt) {
        let buttonCoords = getCoords(modalInformationSliderBtn);
        let shiftY = evt.changedTouches[0].pageY - buttonCoords.top;
        let sliderCoords = getCoords(modalInformationSlider);

        document.ontouchmove = function(evt) {
            let top = evt.changedTouches[0].pageY  - shiftY - sliderCoords.top;

            if (top < 0) {
                top = 0;
            }
            let bottom = modalInformationSlider.offsetHeight- modalInformationSliderBtn.offsetHeight;

            if (top > bottom) {
                top = bottom;
            }

            modalInformationSliderBtn.style.top = top + 'px';

        };

        document.ontouchend = function() {
            document.ontouchmove = document.ontouchend = null;
        };

        return false;
    });

    // Disable hthml5 drag and drop
    modalInformationSliderBtn.ondragstart = function() {
        return false;
    };

    //TODO: Круглый слайдер
    // https://codepen.io/XCanG/pen/pwPbmo?editors=0010
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function detectMob() {
    if(window.innerWidth <= 400) {
        return true;
    } else {
        return false;
    }
}
