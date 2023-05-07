const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	Blackberry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.Blackberry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	}
}

window.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', documentActions);

	function documentActions(e) {
		const targetElement = e.target;

		//\\hover menu\\//
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}

			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
			}
		}
		//\\hover menu//\\		

		//\\search\\//
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active'))
			document.querySelector('.search-form').classList.remove('_active');
		//\\search//\\
	}

	//\\accordion\\//
	if (isMobile.any()) {
		const accordions = document.querySelectorAll('._accordion');

		accordions.forEach(element => {
			element.addEventListener('click', (e) => {
				const target = e.currentTarget;
				let menuArrow = target.querySelector('.menu__arrow');
				let menuSubList = target.querySelector('.menu__sub-list');
				let menuFooter = target.querySelector('.menu-footer__title');
				let menuFooterList = target.querySelector('.menu-footer__list');

				if (target.querySelector('.menu__arrow')) {
					menuArrow.parentElement.classList.toggle('_active');

					if (menuArrow.parentElement.classList.contains('_active')) {
						menuSubList.style.maxHeight = menuSubList.scrollHeight + 'px';
					} else {
						menuSubList.style.maxHeight = null;
					}
				} else if (target.querySelector('.menu-footer__title')) {
					menuFooter.parentElement.classList.toggle('_active');

					if (menuFooter.parentElement.classList.contains('_active')) {
						menuFooterList.style.maxHeight = menuFooterList.scrollHeight + 'px';
					} else {
						menuFooterList.style.maxHeight = null;
					}
				}
			});
		})
	}
	//\\accordion//\\

	//\\burger\\//
	const iconMenu = document.querySelector('.icon-menu');
	const menuBody = document.querySelector('.menu__body');
	if (iconMenu) {
		iconMenu.addEventListener('click', function (e) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		});
	}
	//\\burger//\\

	//\\form\\//
	const form = document.getElementById('form');

	form.addEventListener('submit', function formSend(e) {
		e.preventDefault()

		formValidate(form)
	});

	function formValidate(form) {
		let error = 0
		const input = document.querySelector('._required');

		formRemoveError(input)

		if (input.classList.contains('_email')) {
			if (emailTest(input)) {
				formAddError(input);
				error++;
			}
		} else {
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
		return error
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error')
		input.classList.add('_error')
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error')
		input.classList.remove('_error')
	}

	// test email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
	}
	//\\form//\\

	//\\swiper\\//
	if (document.querySelector('.slider__body')) {
		new Swiper('.slider__body', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 32,
			watchOverflow: true,
			speed: 800,
			loop: true,
			loopAdditionalSlides: 5,
			preloadImages: false,
			parallax: true,
			// Dotts
			pagination: {
				el: '.controls__dotts',
				clickable: true
			},
			// Arrows
			navigation: {
				prevEl: '.slider .slider-arrow_prev',
				nextEl: '.slider .slider-arrow_next'
			},
		})
	};
	//\\swiper//\\

	//\\header\\//
	const headerElement = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);

	headerObserver.observe(headerElement)
	//\\header//\\
});



function removeClasses(element, className) {
	for (let index = 0; index < element.length; index++) {
		element[index].classList.remove(className);
	}
}