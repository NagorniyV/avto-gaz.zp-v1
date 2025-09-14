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
  // Получаем все элементы с классом .details-hero-btn
  const openBtns = document.querySelectorAll('.details-hero-btn');
  const modal = document.getElementById('callbackModal');
  const closeBtn = document.querySelector('.modal-close');
  const form = document.getElementById('modalForm');
  
  // Функция для открытия модального окна
  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  // Функция для закрытия модального окна
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  // Добавляем обработчик для КАЖДОЙ кнопки
  openBtns.forEach(function(btn) {
    btn.addEventListener('click', openModal);
  });
  
  // Закрытие модального окна по клику на крестик
  closeBtn.addEventListener('click', closeModal);
  
  // Закрытие модального окна по клику вне его области
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Закрытие по клавише Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
  
  // Обработка отправки формы
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Здесь код для отправки данных формы
    alert('Форма отправлена!');
    closeModal();
  });
});