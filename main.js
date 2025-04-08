// Урок 1. Dom-дерево
// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

// 7. При разработке используйте Bootstrap для стилизации элементов.




// создаю массив для сохранения в localStorage
// const classArray = [
//     {
//         className: 'Тяжелая атлетика',
//         timeEvent: '09:00-11:00',
//         maxValue: 25,
//         numberParticipants: 18
//     },
//     {
//         className: 'Гимнастика',
//         timeEvent: '10:00-12:00',
//         maxValue: 30,
//         numberParticipants: 25
//     },
//     {
//         className: 'Бокс',
//         timeEvent: '17:00-19:00',
//         maxValue: 20,
//         numberParticipants: 17
//     },
//     {
//         className: 'Карате',
//         timeEvent: '20:00-22:00',
//         maxValue: 22,
//         numberParticipants: 18
//     },
//     {
//         className: 'Йога',
//         timeEvent: '17:00-19:00',
//         maxValue: 30,
//         numberParticipants: 27
//     },
//     {
//         className: 'Пилатес',
//         timeEvent: '18:00-20:00',
//         maxValue: 35,
//         numberParticipants: 30
//     }
// ];
// Сохраняю в localStorage
// localStorage.setItem('classArray', JSON.stringify(classArray));

// После кооментирую, чтобы работать сразу с localStorage;


//цвет текста кнопки записаться, если есть место то зеленая, иначе красная
const idValueClassFull = 'text-danger';
const normalValueClass = 'text-success';


const classContainer = document.querySelector('.class-container');

// функция обновления данных
function updatingData() {
    const data = JSON.parse(localStorage.getItem('classArray'));
    return data;
}



function fillingPage() {
    // обновляю данные - получая массив
    const data = updatingData();
    // пробегаюсь по массиву чтобы визуализировать данные на странице
    data.forEach((item, index) => {
        let classEmptyOrFull = normalValueClass;// нормальный цвет кнопки записаться

        // проверка свободных мест
        if (item.numberParticipants === item.maxValue) {
            //если мест нет цвет текста красный
            classEmptyOrFull = idValueClassFull;
        }// создается карточка с данными для определенного вида спорта и заполняется из массива
        const containerTypeSport = document.createElement('div');
        containerTypeSport.classList.add('col-4', 'myClassSportContainer', 'border', 'border-2', 'border-info');
        containerTypeSport.id = `num${index}`;
        const typeofSport = document.createElement('h3');
        typeofSport.classList.add('text-primary')
        typeofSport.textContent = `${item.className}`;
        const time = document.createElement('p');
        time.textContent = `Время проведения: ${item.timeEvent}`;
        const maxValueParticipant = document.createElement('p');
        maxValueParticipant.innerHTML = `<p>Максимальное количество участников: <span class="maxValue">${item.maxValue}</span></p>`;
        const realQuantity = document.createElement('p');
        realQuantity.innerHTML = `<p>Количество записанных участников: <span class="${classEmptyOrFull}">${item.numberParticipants}</span></p>`;


        // кнопка записаться
        const signUpBtn = document.createElement('button');
        signUpBtn.classList.add(classEmptyOrFull);
        // зависимость текста в кнопке в зависимости от наличия свободных мест
        if (classEmptyOrFull === 'text-danger') {
            signUpBtn.setAttribute('disabled', '');
            signUpBtn.textContent = 'Мест нет';
        } else {
            signUpBtn.textContent = 'Записаться';
        }

        //кнопка отмены записи
        const cancelRecordingBtn = document.createElement('button');
        cancelRecordingBtn.classList.add('text-primary');
        cancelRecordingBtn.textContent = 'Отменить запись';


        //добавление элементов на страницу
        classContainer.appendChild(containerTypeSport);
        containerTypeSport.appendChild(typeofSport);
        containerTypeSport.appendChild(time);
        containerTypeSport.appendChild(maxValueParticipant);
        containerTypeSport.appendChild(realQuantity);
        containerTypeSport.appendChild(signUpBtn);
        containerTypeSport.appendChild(cancelRecordingBtn);

        // навешиваю обработчики событий на кнопки
        signUpBtn.addEventListener('click', (e) => {
            //получаю позицию изменяемого элемента в массиве
            const position = Number(e.target.closest('div').id.slice(3));
            // увеличиваю кол-во запиисавшихся
            if (data[position].numberParticipants < data[position].maxValue) {
                data[position].numberParticipants++;
            }
            //обновляю данные в хранилище и вывожу изменения на страницу
            localStorage.setItem('classArray', JSON.stringify(data));
            classContainer.innerHTML = '';
            fillingPage();
        });

        cancelRecordingBtn.addEventListener('click', (e) => {
            //получаю позицию изменяемого элемента в массиве
            const position = Number(e.target.closest('div').id.slice(3));
            // уменьшаю кол-во запиисавшихся
            if (data[position].numberParticipants > 0) {
                data[position].numberParticipants--;
            }
            //обновляю данные в хранилище и вывожу изменения на страницу
            localStorage.setItem('classArray', JSON.stringify(data));
            classContainer.innerHTML = '';
            fillingPage();
        });
    })

}



fillingPage()



