'use strict';

import  arrows from '../arrows/arrows.js';
import  deviceFilter from '../device-filter/device-filter.js';


export default function(){
    arrows('#favorite-devices-arrows', '.favorite-devices');

    // Открытие/Сворачивание парамаетров фильтра {TODO:Перенести в отдельную ф-ю, а лучше в модуль}
    const filterContainer = document.querySelector('.favorite-devices__switchers');
    const filterSelected = filterContainer.querySelector('.favorite-devices__switcher_select');

    filterSelected.addEventListener("click", function (){
        filterContainer.classList.toggle('favorite-devices__switchers_select-open');
    });

    deviceFilter('.favorite-devices__switcher', '.favorite-devices', 'favorite-devices__switcher_active', 'device', filterSelected);
}