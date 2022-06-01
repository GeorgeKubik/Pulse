$(document).ready(function(){
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

	/*  function toogleSlide(item) {
		$('item').each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault(); // отменили стандартное поведение браузера скролить наверх после нажатия по ссылке
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});
		 });
	 }

	 toogleSlide('.catalog-item__link');
	 toogleSlide('.catalog-item__back'); */

 });