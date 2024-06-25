import { SellItemAPI } from './components/sell-item-api';
import './scss/styles.scss';
import { RepoModel } from './components/repo-model';
import { IOrder } from './types/sellitem';
import { PaymentTypeEnum, ICardID, IPutGetEvent, IEventText } from './types/index';
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

const events = new EventEmitter();
const personalInfoModel = new PersonalInfoModel(events);

const apiFetch = new SellItemAPI(API_URL);
const bm = new RepoModel(events);
const gallery = new Gallery(ensureElement('.gallery'));

apiFetch.getSellItems().then((response) => {
	bm.setItems(response.items);
});


function testSellItems() {
	apiFetch.getSellItems().then((response) => {
		console.log('sell items response', response);
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

const modalContainerElement = ensureElement('#modal-container');
const modalContentElement = ensureElement(
	'.modal__content',
	modalContainerElement
);

const basket = new Basket(modalContainerElement, modalContentElement, events);

const basketElement = ensureElement('.header__basket');
basketElement.addEventListener('click', () => {
	basket.show(true);
});

events.on('items: changed', () => {
	basket.basketItems = bm.getBasketItems().map((element) => {
		const htmlElement = new BasketCard(
			cloneTemplate('#card-basket'),
			events,
			element.id
		);
		return htmlElement.render(element);
	});
});

events.on('items: changed', () => {
	basket.basketTotal = bm.getTotalSum();
});
const cardPopup = new CardPopup(
	modalContainerElement,
	modalContentElement,
	events
);

events.on('click: on_gallery_card', (id: ICardID) => {
	cardPopup.id = id.card_id;
	cardPopup.render(bm.getSellItem(id.card_id));
	cardPopup.inBasket = bm.inBasket(cardPopup.id);
	cardPopup.show(true);
});


events.on('put-get-item', (evt: IPutGetEvent) =>
	bm.toggleBasketState(evt.itemId)
);

events.on('items: changed', () => {
	if (cardPopup.id) {
		cardPopup.inBasket = bm.inBasket(cardPopup.id);
	}
});

const basketButton = new BasketButton(basketElement);
events.on('items: changed', () => {
	basketButton.basketCounter = bm.busketItemsNumber();
});

events.on('click: delete__card', (item: ICardID) => {
	bm.toggleBasketState(item.card_id);
});
// events.on('items: changed', () => {basketButton.basketCounter = bm.busketItemsNumber()});

const paymentType = new PersonalInfoFirst(
	modalContainerElement,
	modalContentElement,
	events
);
events.on('click: basket_button', () => {
	paymentType.show(true);
});

const personalInfo = new PersonalInfoSecond(
	modalContainerElement,
	modalContentElement,
	events
);
events.on('click: personal_info_first_next', () => {
	paymentType.show(true);
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

const windowWrapper = ensureElement('.page__wrapper');

events.on('modal:open', () => {
	windowWrapper.classList.add('page__wrapper_locked');
});

events.on('modal:close', () => {
	windowWrapper.classList.remove('page__wrapper_locked');
});


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
	paymentType.show(false);
	personalInfo.show(true);
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

const success = new Success(
	modalContainerElement,
	modalContentElement,
	events
);

events.on('click: personalInfoSecondNext', ()=>{
	personalInfo.show(false);
	success.show(true);
	success.totalPrice = bm.getTotalSum();
});

events.on('click: order success',()=>{

	const orderToSend = {
		phone: personalInfoModel.phone,
		email: personalInfoModel.email,
		payment: personalInfoModel.paymentType == PaymentTypeEnum.ONLINE ? "online": "on_delivery",
		address: personalInfoModel.address,
		total: bm.getTotalSum(),
		items: bm.getBasketItems().map((item)=>item.id)
	}

	console.log("order to send", orderToSend);

	apiFetch.putOrder(orderToSend as IOrder)
	  .then((data)=>console.log("success then", data))
		.catch((data)=>console.log("success catch", data));

	success.show(false);
});
