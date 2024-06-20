import { SellItemAPI } from './components/sell-item-api';
import './scss/styles.scss';
import { RepoModel } from './components/repo-model';
import { SellItem } from './types/sellitem';
import { PaymentTypeEnum } from './types/index';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/gallery';
import { GalleryCard } from './components/gallery-card';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/basket-popup';
import { CardPopup } from './components/card-popup';
import { BasketButton } from './components/basket-button';
import { BasketCard } from './components/basket-card';
import { PersonalInfoFirst } from './components/personal-info-first';
import { PersonalInfoSecond } from './components/personal-info-second';
import { PersonalInfoModel } from './components/personal-info-model';
import { validate } from 'webpack';
import { Success } from './components/success';

/*
  Описание данных
*/

let events = new EventEmitter();
let personalInfoModel = new PersonalInfoModel(events);

let apiFetch = new SellItemAPI(API_URL);
let bm = new RepoModel(events);
let gallery = new Gallery(ensureElement('.gallery'));

function getSellItems() {
	apiFetch.getSellItems().then((response) => {
		bm.setItems(response.items);

		console.log(bm);
		console.log(
			'selected element',
			bm.getSellItem('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')
		);
		bm.delItem('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
		console.log('Total Sum', bm.getTotalSum());
		console.log('Get basket items', bm.getBasketItems());
		console.log('total number', bm.busketItemsNumber());
		console.log(bm);
	});
}

events.on('items: changed', () => {
	gallery.galleryItems = bm.getCatalogItems().map((item) => {
		const card = new GalleryCard(
			cloneTemplate('#card-catalog'),
			events,
			item.id
		);
		return card.render(item);
	});
});

getSellItems();

let modalContainerElement = ensureElement('#modal-container');
let modalContentElement = ensureElement(
	'.modal__content',
	modalContainerElement
);

let basket = new Basket(modalContainerElement, modalContentElement, events);

let basketElement = ensureElement('.header__basket');
basketElement.addEventListener('click', () => {
	console.log('basket click');
	basket.sv(true);
});

events.on('items: changed', () => {
	basket.basketItems = bm.getBasketItems().map((element) => {
		let htmlElement = new BasketCard(
			cloneTemplate('#card-basket'),
			events,
			element.id
		);
		return htmlElement.render(element);
	});
});

events.on('items: changed', () => {
	basket.bastetItemsNumber = bm.getTotalSum();
});

let cardPopup = new CardPopup(
	modalContainerElement,
	modalContentElement,
	events
);

interface ICardID {
	card_id: string;
}

events.on('click: on_gallery_card', (id: ICardID) => {
	cardPopup.id = id.card_id;
	console.log('set id', id.card_id, cardPopup.id);
	cardPopup.render(bm.getSellItem(id.card_id));
	cardPopup.inBasket = bm.inBasket(cardPopup.id);
	cardPopup.sv(true);
});

interface IPutGetEvent {
	itemId: string;
}

events.on('put-get-item', (evt: IPutGetEvent) =>
	bm.toggleBasketState(evt.itemId)
);
events.on('items: changed', () => {
	console.log('card popup id', cardPopup.id);
	if (cardPopup.id) {
		cardPopup.inBasket = bm.inBasket(cardPopup.id);
	}
});

let basketButton = new BasketButton(basketElement);
events.on('items: changed', () => {
	basketButton.basketCounter = bm.busketItemsNumber();
});

events.on('click: delete__card', (item: ICardID) => {
	bm.toggleBasketState(item.card_id);
});
// events.on('items: changed', () => {basketButton.basketCounter = bm.busketItemsNumber()});

let paymentType = new PersonalInfoFirst(
	modalContainerElement,
	modalContentElement,
	events
);
events.on('click: basket_button', () => {
	paymentType.sv(true);
});

let personalInfo = new PersonalInfoSecond(
	modalContainerElement,
	modalContentElement,
	events
);
events.on('click: personal_info_first_next', () => {
	paymentType.sv(true);
});
console.log('personalInfo', personalInfo);

events.on('click: card payment', () => {
	Object.assign(personalInfoModel, { paymentType: PaymentTypeEnum.ONLINE });
});

events.on('click: cash payment', () => {
	Object.assign(personalInfoModel, {
		paymentType: PaymentTypeEnum.ON_DELIVERY,
	});
});

events.on('items: changed', () => {
	paymentType.render({ paymentType: personalInfoModel.paymentType });
});

let windowWrapper = ensureElement('.page__wrapper');

events.on('modal:open', () => {
	windowWrapper.classList.add('page__wrapper_locked');
});

events.on('modal:close', () => {
	windowWrapper.classList.remove('page__wrapper_locked');
});

interface IEventText {
	text: string;
}

events.on('address_input:change', (data: IEventText) => {
	personalInfoModel.address = data.text;
});

function validatePersonalInfoFirstButtonNext() {
	paymentType.enableButton =
		personalInfoModel.address !== undefined &&
		personalInfoModel.paymentType !== undefined;
}

events.on('items: changed', validatePersonalInfoFirstButtonNext);
events.on('click: personal info first button', () => {
	paymentType.sv(false);
	personalInfo.sv(true);
});
events.on('email_input:change', (data: IEventText) => {
	personalInfoModel.email = data.text;
});
events.on('phone_input:change', (data: IEventText) => {
	personalInfoModel.phone = data.text;
});

function validatePersonalInfoSecondButtonNext() {
	personalInfo.enableButton =
		personalInfoModel.email !== undefined &&
		personalInfoModel.phone !== undefined;
}

events.on('items: changed', validatePersonalInfoSecondButtonNext);

let success = new Success(
	modalContainerElement,
	modalContentElement,
	events
);

events.on('click: personalInfoSecondNext', ()=>{
	personalInfo.sv(false);
	success.sv(true);
	success.totalPrice = bm.getTotalSum();
});
