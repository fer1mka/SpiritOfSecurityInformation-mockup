// Функции для страницы отзывов
document.addEventListener('DOMContentLoaded', function () {
	initReviewForm();
});

function initReviewForm() {
	const reviewForm = document.querySelector('.add-review');
	if (reviewForm) {
		reviewForm.addEventListener('submit', function (e) {
			e.preventDefault();

			const rating = document.querySelector('.rating-input i.active')?.getAttribute('data-rating');
			const service = document.getElementById('review-service').value;
			const text = document.getElementById('review-text').value;

			if (!rating || !service || !text) {
				alert('Пожалуйста, заполните все поля формы');
				return;
			}

			// Здесь будет отправка отзыва на сервер
			alert('Спасибо за ваш отзыв! Он будет опубликован после модерации.');

			// Очищаем форму
			document.querySelectorAll('.rating-input i').forEach(star => {
				star.classList.remove('fas', 'active');
				star.classList.add('far');
			});
			document.getElementById('review-service').value = '';
			document.getElementById('review-text').value = '';
		});
	}
}