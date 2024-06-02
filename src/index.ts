import { SellItemAPI } from './components/sell-item-api';
import './scss/styles.scss';
import { RepoModel } from './components/repo-model';
import { SellItem } from './types/sellitem';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/gallery';
import { GalleryCard } from './components/gallery-card';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/basket-popup';
import { CardPopup } from './components/card-popup';
import { BasketButton } from './components/basket-button';

/*
  Описание данных
*/

enum PaymentTypeEnum {
	ONLINE = 0,
	ON_DELIVERY = 1,
}

export interface IDeliveryDetails {
	paymentType: PaymentTypeEnum;
	address: string;
	email: string;
	phone: string;
}

//Про персональные данные
export interface IPersonalInfo {
	setInfo(info: Partial<IDeliveryDetails>): void;
	getInfo(): IDeliveryDetails;
}

let events = new EventEmitter();

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

let cardPopup = new CardPopup(modalContainerElement, modalContentElement,events);

interface ICardID {
	card_id: string
}

events.on('click: on_gallery_card', (id: ICardID) => {
	cardPopup.id = id.card_id;
	console.log('set id', id.card_id, cardPopup.id);
	cardPopup.render(bm.getSellItem(id.card_id));
	cardPopup.inBasket = bm.inBasket(cardPopup.id);
	cardPopup.sv(true);
});

interface IPutGetEvent {itemId: string};

events.on('click: basket_button', () => {console.log("basket button clicked")});
events.on('put-get-item',(evt: IPutGetEvent)=>bm.toggleBasketState(evt.itemId));
events.on('items: changed',()=>{
	console.log('card popup id', cardPopup.id);
	if (cardPopup.id) {cardPopup.inBasket = bm.inBasket(cardPopup.id)}
});

let basketButton = new BasketButton(basketElement);
events.on('items: changed', () => {basketButton.basketCounter = bm.busketItemsNumber()});