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

		//\\More Products\\//
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();

		}
		//\\More Products//\\

		//\\Add to cart\\//
		if (targetElement.classList.contains('actions__button')) {
			const itemProductId = targetElement.closest('.item-product').dataset.productId;
			addToCart(targetElement, itemProductId);
			e.preventDefault();

		}
		//\\Add to cart//\\
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


// Remove Classes
function removeClasses(element, className) {
	for (let index = 0; index < element.length; index++) {
		element[index].classList.remove(className);
	}
}

// Load More Products
async function getProducts(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = 'json/products.json';
		let response = await fetch(file, {
			method: 'GET'
		});

		if (response.ok) {
			let result = await response.json();
			loadProducts(result);
			button.classList.remove('_hold');
			button.remove();
		} else {
			alert('Error');
		}
	}
}

// JSON load
function loadProducts(data) {
	const productsItems = document.querySelector('.products__items');

	data.products.forEach(item => {
		const productId = item.id;
		const productUrl = item.url;
		const productImage = item.image;
		const productTitle = item.title;
		const productText = item.text;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productShareUrl = item.shareUrl;
		const productLikeUrl = item.likeUrl;
		const productLabels = item.labels;

		let productTemplateStart = `<article data-product-id="${productId}" class="products__item item-product">`;
		let productTemplateEnd = `</article>`;

		let productTemplateLabels = '';
		if (productLabels) {
			let productTemplateLabelsStart = `<div class="item-product__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`
			})

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
		}

		let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="images/products/${productImage}" alt="${productTitle}">
		</a>
		`;

		let productTemplateBodyStart = `<div class="item-product__body">`;
		let productTemplateBodyEnd = `</div>`;

		let productTemplateContent = `
		<div class="item-product__content">
			<h5 class="item-product__title">${productTitle}</h5>
			<div class="item-product__text">${productText}</div>
		</div>
		`;

		let productTemplatePrices = '';
		let productTemplatePricesStart = `<div class="item-product__prices">`;
		let productTemplatePricesCurrent = `<div class="item-product__price">${productPrice}</div>`;
		let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productPriceOld}</div>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices = productTemplatePricesStart;
		productTemplatePrices += productTemplatePricesCurrent;
		if (productPriceOld) {
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateActions = `
		<div class="item-product__actions actions">
			<div class="actions__body">
				<a href="" class="actions__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions__link"><span class="_icon-share"></span>Share</a>
				<a href="${productLikeUrl}" class="actions__link "><span class="_icon-favorite"></span>Like</a>
			</div>
		</div>
		`;

		let productTemplateBody = '';
		productTemplateBody += productTemplateBodyStart;
		productTemplateBody += productTemplateContent;
		productTemplateBody += productTemplatePrices;
		productTemplateBody += productTemplateActions;
		productTemplateBody += productTemplateBodyEnd;

		let productTemplate = '';
		productTemplate += productTemplateStart;
		productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplateEnd;

		productsItems.insertAdjacentHTML('beforeend', productTemplate);
	})
}

// Add to Cart
function addToCart(productButton, itemProductId) {
	if (!productButton.classList.contains('_hold')) {
		productButton.classList.add('_hold');
		productButton.classList.add('_fly');

		const cart = document.querySelector('.cart-header__icon');
		const product = document.querySelector(`[data-product-id="${itemProductId}"]`);
		const productImage = product.querySelector('.item-product__image');

		const productImageFly = productImage.cloneNode(true);

		const productImageFlyWidth = productImage.offsetWidth;
		const productImageFlyHeight = productImage.offsetHeight;
		const productImageFlyTop = productImage.getBoundingClientRect().top;
		const productImageFlyLeft = productImage.getBoundingClientRect().left;

		productImageFly.setAttribute('class', '_flyImage _ibg');
		productImageFly.style.cssText =
			`
		left: ${productImageFlyLeft}px;
		top: ${productImageFlyTop}px;
		width: ${productImageFlyWidth}px;
		height: ${productImageFlyHeight}px;
		`;

		document.body.append(productImageFly);

		const cartFlyLeft = cart.getBoundingClientRect().left;
		const cartFlyTop = cart.getBoundingClientRect().top;

		productImageFly.style.cssText =
			`
		left: ${cartFlyLeft}px;
		top: ${cartFlyTop}px;
		width: 0px;
		height: 0px;
		opacity: 0;
		`;

		productImageFly.addEventListener('transitionend', function () {
			if (productButton.classList.contains('_fly')) {
				productImageFly.remove();
				updateCart(productButton, itemProductId);
				productButton.classList.remove('_fly');
			}
		});
	}
}

// Update cart
function updateCart(productButton, itemProductId, productAdd = true) {
	const cart = document.querySelector('.cart-header');
	const cartIcon = cart.querySelector('.cart-header__icon');
	const cartQuantity = cartIcon.querySelector('span');
	const cartProduct = document.querySelector(`[data-product-id="${itemProductId}"]`);
	const cartList = document.querySelector('.cart-list');

	// Add
	if (productAdd) {
		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML;
		} else {
			cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
		}
	}
}