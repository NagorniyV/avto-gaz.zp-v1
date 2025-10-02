// калькулятор

document.addEventListener('DOMContentLoaded', function () {
  function calculateSavings() {
    // Отримуємо значення з полів вводу
    const fuelConsumption = parseFloat(document.getElementById('fuel-consumption').value) || 10;
    const annualMileage = parseFloat(document.getElementById('annual-mileage').value) || 15000;
    const petrolPrice = parseFloat(document.getElementById('petrol-price').value) || 55;
    const gasPrice = parseFloat(document.getElementById('gas-price').value) || 28;
    const gboCost = parseFloat(document.getElementById('gbo-cost').value) || 25000;
    
    // Розрахунки
    const annualPetrolCost = (annualMileage / 100) * fuelConsumption * petrolPrice;
    const annualGasCost = (annualMileage / 100) * fuelConsumption * 1.1 * gasPrice; // +10% витрата газу
    const annualSaving = annualPetrolCost - annualGasCost;
    const paybackMonths = (gboCost / annualSaving) * 12;
    const per100kmSaving = (fuelConsumption * petrolPrice) - (fuelConsumption * 1.1 * gasPrice);
    const total3YearSaving = annualSaving * 3 - gboCost;
    
    // Оновлюємо результати
    document.getElementById('annual-saving').textContent = Math.round(annualSaving) + ' ₴';
    document.getElementById('payback-period').textContent = Math.round(paybackMonths) + ' місяців';
    document.getElementById('per-100km').textContent = Math.round(per100kmSaving) + ' ₴';
    document.getElementById('total-saving').textContent = Math.round(total3YearSaving) + ' ₴';
  }
  
  // Автоматичний розрахунок при зміні значень
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateSavings);
  });
  
  // Автоматичний розрахунок при завантаженні
  calculateSavings();
});

// конец калькулятора

 document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Закриваємо всі інші відкриті питання
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Перемикаємо поточний елемент
                item.classList.toggle('active');
            });
        });
        
        // Відкриваємо перше питання за замовчуванням
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    });


    // МОДАЛЬНОЕ ОКНО

 document.addEventListener('DOMContentLoaded', function() {
        // Элементы DOM
        const callbackModal = document.getElementById('callbackModal');
        const successModal = document.getElementById('successModal');
        const modalForm = document.getElementById('modalForm');
        const modalPhone = document.getElementById('modalPhone');

        // Открытие модального окна для всех кнопок
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('callback-btn')) {
                if (callbackModal) {
                    callbackModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Закрытие модальных окон
        document.addEventListener('click', function(e) {
            // Закрытие по крестику
            if (e.target.classList.contains('modal-close')) {
                closeAllModals();
            }
            // Закрытие по клику вне окна
            if (e.target === callbackModal || e.target === successModal) {
                closeAllModals();
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });

        function closeAllModals() {
            if (callbackModal) callbackModal.style.display = 'none';
            if (successModal) successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Обработка отправки формы
        if (modalForm) {
            modalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const phone = modalPhone.value;
                
                // Проверка телефона
                if (!phone) {
                    alert('Будь ласка, введіть номер телефону');
                    return;
                }

                // Сбор данных формы
                const formData = {
                    name: document.getElementById('modalName').value,
                    phone: phone,
                    carModel: document.getElementById('carModel').value,
                    timestamp: new Date().toLocaleString('uk-UA')
                };

                console.log('Данные формы:', formData);

                // Отправка в Telegram бот (раскомментируйте когда добавите токен)
                // sendToTelegram(formData);

                // Показ окна успеха
                if (callbackModal) callbackModal.style.display = 'none';
                if (successModal) successModal.style.display = 'block';

                // Автоматическое закрытие через 3 секунды
                setTimeout(() => {
                    if (successModal) successModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    modalForm.reset();
                }, 3000);
            });
        }

        // Маска для телефона
        if (modalPhone) {
            modalPhone.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('38')) {
                    value = value.substring(2);
                }
                let formattedValue = '+38 (';
                
                if (value.length > 0) {
                    formattedValue += value.substring(0, 3);
                }
                if (value.length > 3) {
                    formattedValue += ') ' + value.substring(3, 6);
                }
                if (value.length > 6) {
                    formattedValue += '-' + value.substring(6, 10);
                }
                
                e.target.value = formattedValue;
            });
        }

        // Функция отправки в Telegram (раскомментируйте и настройте когда нужно)
        function sendToTelegram(data) {
            const botToken = 'YOUR_BOT_TOKEN';
            const chatId = 'YOUR_CHAT_ID';
            
            const message = `📞 Нова заявка з сайту!\n\n👤 Ім'я: ${data.name || 'Не вказано'}\n📱 Телефон: ${data.phone}\n🚗 Авто: ${data.carModel || 'Не вказано'}\n⏰ Час: ${data.timestamp}`;
            
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log('Message sent to Telegram:', result);
            })
            .catch(error => {
                console.error('Error sending to Telegram:', error);
            });
        }
    });

// БУРГЕР КНОПКА
 document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileHeaderColumn = document.querySelector('.mobile-header-colum');
    
    // Проверяем что элементы существуют (только на мобильных)
    if (!burgerMenu || !mobileHeaderColumn) return;
    
    // Проверяем что мы на мобильном устройстве
    if (window.innerWidth > 768) return;
    
    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        mobileHeaderColumn.classList.toggle('active');
        document.body.style.overflow = mobileHeaderColumn.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку в мобильном меню
    const navLinks = document.querySelectorAll('.mobile-header-colum .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileHeaderColumn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Закрытие меню при клике вне области меню
    document.addEventListener('click', function(event) {
        if (mobileHeaderColumn.classList.contains('active') && 
            !mobileHeaderColumn.contains(event.target) && 
            !burgerMenu.contains(event.target)) {
            burgerMenu.classList.remove('active');
            mobileHeaderColumn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Оптимизированный ресайз
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                burgerMenu.classList.remove('active');
                mobileHeaderColumn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
});