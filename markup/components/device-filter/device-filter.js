'use strict';

import  {hideArrow} from '../arrows/arrows.js';

export default function(selectItems, itemsContainer, selecetedClass, itemClass, bindedItem = 0){
    const filterSelectItems = document.querySelectorAll(selectItems);
    const filterSelectedClass = selecetedClass;

    const filterItemsContainer = document.querySelector(itemsContainer);
    const filterItems = filterItemsContainer.querySelectorAll('.' + itemClass);

    // Стрелки контейнера
    const arrowsContainer = filterItemsContainer.parentNode.querySelector('.arrows');
    const letArrow = arrowsContainer.querySelector('.arrow__left');
    const rightArrow = arrowsContainer.querySelector('.arrow__right');

    filterSelectItems.forEach( (item) => {
        item.addEventListener("click", function () {
            // По хорошему надо еще добавить проверку на клик уже активного параметра фильтра, что бы делать лишнего

            // Привязываем выбранный тип фильтра к элементу в духе select
            if (bindedItem != 0) {
                bindedItem.textContent = item.textContent;
            }

            // Убираем прошлый выбранный класс с прошлого выбранного параметра фильтра.
            filterSelectItems.forEach( (selectItem) => {
                if(selectItem.classList.contains(filterSelectedClass))
                    selectItem.classList.remove(filterSelectedClass);
            });

            item.classList.add(filterSelectedClass);

            const filterType = item.dataset.filter_type;
            const filterData = item.textContent;
            // Отображаем все элеменнты
            if (filterType == undefined) {
                filterItems.forEach( (item) => {
                    item.style.display = '';
                });

                // Убираем/Возрващаем стрлки контейнера, если таковые имеются
                hideArrow(letArrow, filterItemsContainer, 'left');
                hideArrow(rightArrow, filterItemsContainer, 'right');

                return;
            }

            // Фильтруем
            filterItems.forEach( (item) => {
                if (item.dataset[filterType] == filterData) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            // Убираем/Возрващаем стрлки контейнера, если таковые имеются
            hideArrow(letArrow, filterItemsContainer, 'left');
            hideArrow(rightArrow, filterItemsContainer, 'right');
        });
    });
}