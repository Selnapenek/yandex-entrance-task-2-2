'use strict';
// Эх, жаль что не рекомендуется Vue или React использовать ={

export default function() {
    let modal = document.querySelector("#modal");
    let modalOverlay = document.querySelector("#modal-overlay");
    // На копку применить ничего не повесил. 
    // Считаю что только после нормально сформированного AJAX запроса можно закрыть окно кнопкой применить.
    let closeButton = document.querySelector("#close-button"); 
    let openButtons = document.querySelectorAll(".device"); // Devices div
    let isOpenModal = false;

    // Поля модального окна - отображают данные с дейваса.
    let modalInformationTitle = modal.querySelector('.modal-information__title');
    let modalInformationDetails = modal.querySelector('.modal-information__details');
    let modalInformationIcon = modal.querySelector('.modal-information__icon');
    let modalInformationData = modal.querySelector('.modal-information__icon');
    let modalInformationSlider = modal.querySelector('.modal-information-slider');
    let modalInformationSliderMin = modal.querySelector('.modal-information-slider__min');
    let modalInformationSliderMax = modal.querySelector('.modal-information-slider__max');
    let modalInformationSliderBtn = modal.querySelector('.modal-information-slider__button');

    closeButton.addEventListener("click", function() {
        if(isOpenModal) {
            // Почистить за собой - лишним не будет.
            modalInformationTitle.textContent = '';
            modalInformationDetails.textContent = '';
            modalInformationIcon.classList.remove('modal-information__icon_icon-temperature');
            modalInformationIcon.classList.remove('modal-information__icon_icon-temperature-2');
            modalInformationIcon.classList.remove('modal-information__icon_icon-sun');
            modalInformationSlider.classList.remove('modal-information-slider__sun');
            modalInformationSlider.classList.remove('modal-information-slider__temperature');
            modalInformationSliderMin.classList.remove('modal-information-slider__min_sun-icon');
            modalInformationSliderMax.classList.remove('modal-information-slider__max_sun-icon');
            modalInformationSliderBtn.style.left = '70%';

            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
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
                let deviceInformationType = this.querySelector('.device__icon');
                let devicePosition =  this.getBoundingClientRect();

                if (deviceInformationIcon.classList.contains('device__icon_icon-temperature')) {
                    modalInformationIcon.classList.add('modal-information__icon_icon-temperature');
                    modalInformationSlider.classList.add('modal-information-slider__temperature');
                }
                if (deviceInformationIcon.classList.contains('device__icon_icon-temperature-2')) {
                    modalInformationIcon.classList.add('modal-information__icon_icon-temperature-2');
                    modalInformationSlider.classList.add('modal-information-slider__temperature');
                }
                if (deviceInformationIcon.classList.contains('device__icon_icon-sun')) {
                    modalInformationIcon.classList.add('modal-information__icon_icon-sun');
                    modalInformationSlider.classList.add('modal-information-slider__sun');
                    modalInformationData.textContent = '';
                    modalInformationSliderMin.textContent = '';
                    modalInformationSliderMax.textContent = '';
                    modalInformationSliderMin.classList.add('modal-information-slider__min_sun-icon');
                    modalInformationSliderMax.classList.add('modal-information-slider__max_sun-icon');

                } else {
                    modalInformationData.textContent = deviceInformationData;
                    modalInformationSliderMin.textContent = '-10';
                    modalInformationSliderMax.textContent = '+30';
                }

                modalInformationTitle.textContent = deviceInformationTitle.textContent;
                modalInformationDetails.textContent = deviceInformationDetails.textContent;
                modalInformationSliderBtn.style.left = '70%';

                // Попытка сделать отрывающееся окно как на IOs {Начальные координаты открытия окна}
                modal.style.transformOrigin = devicePosition.x + "px " + devicePosition.y + "px";

                modal.classList.toggle("closed");
                modalOverlay.classList.toggle("closed");
            }
        });
    } );

    // По хорошему это надо было вынести в отдельный файл.
    // Фунционал range slider - src: https://codepen.io/anon/pen/XMVBpB?editors=0110
    // Наверное лучше было бы сделать через обычный input
    modalInformationSlider.onmousedown = function(evt) {
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
        }

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    };

    // Disable hthml5 drag and drop
    modalInformationSliderBtn.ondragstart = function() {
        return false;
    };

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}

