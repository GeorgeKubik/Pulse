$(document).ready(function(){
	//slider
	$('.carousel__inner').slick({
		speed: 1200,
		adaptiveHeight: true,
		prevArrow: `<button type="button" class="slick-prev"><img src="img/s4/left.svg"></button>`,
		nextArrow: `<button type="button" class="slick-next"><img src="img/s4/right.svg"></button>`,
		responsive: [
				{
					breakpoint: 992,
					settings: {
					dots: true,
					arrows: false
				}
			}
		]
	 });

	 // кнопка активности catalog__tabs
	 $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	 });


	 // Кнопка подробнее и назад. 1 способ реализовали отдельно кажду. кнопку. 2 способ с помощью функции

	 $('.catalog-item__link').each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault(); // отменили стандартное поведение браузера скролить наверх после нажатия по ссылке
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		});
	 });

	 $('.catalog-item__back').each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault(); // отменили стандартное поведение браузера скролить наверх после нажатия по ссылке
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
		});
	 });

	 /* function toogleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault(); // отменили стандартное поведение браузера скролить наверх после нажатия по ссылке
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		 });
	 }

	 toogleSlide('.catalog-item__link');
	 toogleSlide('.catalog-item__back'); */

	 // modal

	$('[data-modal=consultation]').on('click', function(){
	$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function(){
	$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.catalog-item__btn').each(function(i) {
	$(this).on('click', function(){
		$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
		$('.overlay, #order').fadeIn('slow');
	});
	});

	/* $('.feed-form').validate(); */ // взяли метод из плагина jquery validate, но так работает только у первой формы
	// Валидация форм
	function valideForms(form) {
	$(form).validate({
			rules: {
					name: {
						required: true,
						minlength: 2
					},
					phone: "required",
					email: {
						required: true,
						email: true
					}
            },
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символа!")
				},
				phone: "Пожалуйста, введите свой телефон",
				email: {
					required: "Пожалуйста введите свою почту",
					email: "Нерпавильно введен адрес почты"
				}
			}
		});	 
	}
	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	// maskedInput

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	// ajax подключаем
	$('form').submit(function(e) { // .submit когда все формы отправляются
		e.preventDefault();			 // отключаем перезагрузку страницы при этом
											
		if (!$(this).valid()) {		 // если валидация страница не прошла 
			return;						 //возвращаем в исходную позицию
		}

		$.ajax({							 // ajax - 
			type: "POST",				 // при отправке
			url: "mailer/smart.php", // адрес куда отправляем наш запрос от пользователя
			data: $(this).serialize() // когда надо отправить данные от пользователя, надо их расшифровать
		}).done(function() {			 // здесь обработали ответ от сревера
			$(this).find("input").val(""); // после того как данные получили все инпуты очистяться  


			$('form').trigger('reset'); // все формы очистяться
		});
		return false;
	});

	// smooth scroll

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	//scroll animate

	$("a[href^='#']").on('click', function(event) {
		if (this.hash !== "") {
		  event.preventDefault();
		  const hash = this.hash;
		  $('html, body').animate({
			 scrollTop: $(hash).offset().top
		  }, 800, function(){
			 window.location.hash = hash;
		  });
		}
	 });

	 new WOW().init();

});

