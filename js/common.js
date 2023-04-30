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
		} else if (!targetElement.closest('search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}

		//\\accordion\\//
		if (window.innerWidth < 768) {
			if (targetElement.className === 'menu__arrow _icon-arrow-down _accordion-title') {
				let accordionTitle = document.getElementsByClassName("_accordion-title");
				let accordionContent = document.getElementsByClassName("_accordion-content");

				for (let i = 0; i < accordionTitle.length; i++) {
					if (accordionTitle[i] === targetElement) {
						if (accordionContent[i].style.visibility === "hidden") {
							hideAcordian();
							accordionContent[i].style.height = "100%";
							accordionContent[i].style.visibility = "visible";
						} else {
							hideAcordian();
						}
					}
				}
			}
		}
		function hideAcordian() {
			let accordionContent = document.getElementsByClassName("_accordion-content");
			for (let i = 0; i < accordionContent.length; i++) {
				accordionContent[i].style.height = "0";
				accordionContent[i].style.visibility = "hidden";
			}
		}
	}
});



function removeClasses(element, className) {
	for (let index = 0; index < element.length; index++) {
		element[index].classList.remove(className);
	}
}

// window.addEventListener("resize", function () {
// 	if (document.documentElement.clientWidth > 768) {
// 		document.querySelector('.go').classList.remove('accordion');
// 	}
// 	else {
// 		document.querySelector('.go').classList.add('accordion');
// 	}
// }, true);
// function hideAcordian() {
// 	let accordionContent = document.getElementsByClassName("_accordion-content");
// 	for (let i = 0; i < accordionContent.length; i++) {
// 		accordionContent[i].style.height = "0";
// 		accordionContent[i].style.visibility = "hidden";
// 	}
// }
// if (window.innerWidth < 768) {
// 	hideAcordian()
// }
