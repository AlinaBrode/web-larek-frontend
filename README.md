# Проектная работа "Веб-ларек"
* https://github.com/AlinaBrode/web-larek-frontend-fork

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура

## API
* ISellItemAPI - интерфейс получения товаров с сервера
  * getSellItems - получить полный список товаров
  * getOneSellItem - получить один товар
  * performPurchase - совершить покупку
* SellItemAPI - реализация интерфейса получения товаров с сервера

## Данные

* SellItem - описание товара (sellitems.ts)
  * id - идентификатор товара
  * category - тип/группа товара
  * description - название товара
  * image - картинка
  * title - заголовок
  * price - цена (синапсов)
* IRepo - интерфейс хранилища товаров (repo.ts)
  * getSellItem - получить товар по его id
  * setItems - установить набор карточек
  * delItem - удалить карточку
  * getCatalogItems - получить карточки для показа в каталоге
  * getBasketItems - получить карточки из корзины
  * getTotalSum - получить полную сумму выбранных товаров
  * busketItemsNumber - полное количество карточек в корзине
  * toBasket - положить товар в корзину
  * fromBasket - забрать товар из корзины
* SellItemsFromAPI - как информация о товарах приходит с сервера (sellitems.ts) 
  * number - количество карточек
  * SellItem[] - набор карточек
* SellItemRepo - внутренний тип для репозитария товаров, в описание включён флаг принадлежности корзине; расширяет SellItem
  * inBasket - в корзине ли товар

## Представление
* ShowItems - все доступные элементы
* ItemBox - показ одного элемента в репозитарии
* ItemRow - показ одного элемента в корзине
* PopupItem - показ одного элемента для помещения в корзину/доставания из корзины
* IGallery - определяет структуру для компонента галереи 
* Gallery  - реализация интерфейса IGallery и представляет собой 
* IGalleryCard - интерфейса к отображению карточки в галерее
* GalleryCard - реализация отображения карточки в галерее
* IOrderSuccess - интерфейс к отображению карточки в галерее
* OrderSuccess - отображение синапсов,закрытие,открытие карточки
* IModelCardFull - интерфейс к отображению полной карточки в попапе
   * тип карточки (категория)
   * картинка
   * заголовок
   * описание
   * кнопка (в корзину / из корзины)
   * цена
* ModelCardFull - попап с полной карточкой
   * кнопка закрытия
   * кнопка в корзину
   * сообщение "onclick: to_basket(item_id)"
* IBasketPopup - интерфейс к попапу корзины
   * список товаров
   * полная стоимость
* BasketPopup - попап корзины
   * кнопка "оформить"
   * сообщение "onclick: next"
   * закрыть
* IBasketCard - интерфейс отображения карточки в корзине
  * заголовок
  * цена
* BasketCard - элемент отображения карточки в корзинке
  * кнопка "удалить из корзины"
  * сообщение "onclick: from_basket(item_id)"
* IPurchaiseDetails - интерфейс попапа данных об оплате
  * онлайн/при получении
  * адрес доставки
* PurchaseDetailsPopup - попап ввода деталей об оплате
  * кнопка "онлайн"
  * кнопка "при получении"
  * поле ввода "Адрес доставки"
  * кнопка "Далее"
  * сообщение "onlick: next_personal_info"
* IPersonInfo - интерфейс попапа данных об оплате
  * почта
  * телефон
* PersonInfoPopup - попап ввода деталей об оплате
  * поле ввода "почта"
  * поле ввода "телефон"
  * кнопка "оплатить"
  * сообщение "onlick: next_successful_purchaise"
* ISuccessfullPurchase
  * стоимость
* SuccessfullPurchase
  * кнопка "закрыть"
  * кнопка "за новыми покупками"
* IBasketButton
  * количество товаров в корзине
* BasketButton
  * кнопка перехода в форму корзины
  * сообщение "onclick: next_basket_popup"


## События
### диспетчер событий

#### Это библиотечный класс, не стали расписывать
* EventEmitter - брокер событий
* IEvents - интерфейс брокера событий



#### События
* "click: on_gallery_card" - кликнули на карточку в галерее, параметр - id карточки, {card_id: id}
* "click: next_basket" - событие перехода в попап корзины, возбуждается при клике на корзину
* "items: changed" - любое изменение в карточках
* "click: toggle_basket" - клик на кнопке "поместить в корзину/удалить из корзины" в форме покупки
* "click: online_purchaise_form" - клик на кнопке "онлайн" в форме типа оплаты
* "click: on_delivery" - клик на кнопке "при доставке" в форме типа оплаты
* "click: new_purchases" - клик на кнопке "за новыми покупками" в форме типа оплаты
* "click: close_popup" - закрытие попапа (может и не нужно в брокер, можно на месте разобраться) 
