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
		} else if (!targetElement.closest('search-form') && document.querySelector('.search-form._active'))
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

				menuArrow.parentElement.classList.toggle('_active')

				if (menuArrow.parentElement.classList.contains('_active')) {
					menuSubList.style.maxHeight = menuSubList.scrollHeight + 'px';
				} else {
					menuSubList.style.maxHeight = null;
				}
			});
		})
	}
	//\\accordion//\\
});



function removeClasses(element, className) {
	for (let index = 0; index < element.length; index++) {
		element[index].classList.remove(className);
	}
}