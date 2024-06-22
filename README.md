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
  * getSellItems(): Promise<SellItemsFromAPI> - получить полный список товаров
  * getOneSellItem(sellItemID: string): Promise<SellItem>; - получить один товар
  * performPurchase - совершить покупку
* SellItemAPI - реализация интерфейса получения товаров с сервера
  * getSellItems(): Promise<SellItemsFromAPI> - получить промис товаров с сервера
  * getOneSellItem(sellItemID: string): Promise<SellItem> - получить промис описания одного товара
* Api - класс получения данных с сервера
  * constructor(baseUrl: string, options: RequestInit = {}) конструктор
  * get - получить промис ответа
  * post - отправить данные

## Данные

* SellItem - описание товара (sellitems.ts)
  * id  string - идентификатор товара
  * category string - тип/группа товара
  * description string - название товара
  * image string - картинка
  * title string - заголовок
  * price number - цена (синапсов)
* IRepo - интерфейс хранилища товаров (repo.ts)
  * getSellItem SellItem - получить товар по его id
  * setItems void - установить набор карточек
  * delItem void - удалить карточку
  * getCatalogItems SellItem[] - получить карточки для показа в каталоге
  * getBasketItems SellItem[] - получить карточки из корзины
  * getTotalSum number- получить полную сумму выбранных товаров
  * busketItemsNumber number - полное количество карточек в корзине
  * toggleBasketState void - изменить положение товара относительно корзины
  * inBasket boolean - находится ли товар в корзине
* RepoModel - реализация хранилища товаров; имплементирует IRepo
  * protected repoContent: SellItemRepo[] = []; - массив всех товаров
  * protected events; - диспетчер событий
* SellItemsFromAPI - как информация о товарах приходит с сервера (sellitems.ts) 
  * total number - количество карточек
  * items SellItem[] - набор карточек
* SellItemRepo - внутренний тип для репозитария товаров, в описание включён флаг принадлежности корзине; расширяет SellItem
  * inBasket boolean - в корзине ли товар
* IPersonalInfoModel - интерфейс персональных данных:
  * paymentType: PaymentTypeEnum тип покупки
  * address: string адрес
  * email: string емаил 
  * phone: string телефон
* PersonalInfoModel - персональные данные; имплементирует IPersonalInfoModel
  * constructor(events:IEvents) - создать объект по диспетчеру событий
  * set paymentType(val: PaymentTypeEnum) указать тип оплаты
  * set address(val: string) указать адрес
	* set email(val: string) указать адрес электронной почты
	* set phone(val: string) установить телефон
  * get paymentType() получить тип оплаты
  * get address() получить адрес

  * get email() получить емайл
  * get phone() получить телефон
  

## Вид (view)
* ShowItems - все доступные элементы
* ItemBox - показ одного элемента в репозитарии
* ItemRow - показ одного элемента в корзине
* PopupItem - показ одного элемента для помещения в корзину/доставания из корзины
* IGallery - определяет структуру для компонента галереи 
* Gallery  - реализация интерфейса IGallery; наследуется от Component
* IGalleryCard - интерфейса к отображению карточки в галерее
* GalleryCard - реализация отображения карточки в галерее; наследуется от Component
* ISuccess - интерфейс к отображению карточки в галерее
* Success - отображение синапсов,закрытие,открытие карточки
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
* IBasket - интерфейс к попапу корзины
   * basketItems: HTMLElement[]; список товаров
   * basketTotal: number; полная стоимость
* Basket - попап корзины; наследуется от Component
   * кнопка "оформить"
   * сообщение "onclick: next"
   * закрыть
* IBasketCard - интерфейс отображения карточки в корзине
  * заголовок
  * цена
* BasketCard - элемент отображения карточки в корзинке; наследуется от Component
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
* IPersonalInfoFirst - интерфейс попапа данных об оплате
  * почта
  * телефон
* PersonalInfoFirst - попап с первой частью персональной информации; наследуется от Component
* IPersonalInfoSecond -интерфейс попапа со второй частью
* PersonalInfoSecond - попап ввода деталей об оплате; наследуется от Component
  * поле ввода "почта"
  * поле ввода "телефон"
  * кнопка "оплатить"
  * сообщение "onlick: next_successful_purchaise"
* ISuccess - интерфейс к попапу успешной покупки
  * стоимость
* Success - попап успешной покупки; наследуется от Component
  * кнопка "закрыть"
  * кнопка "за новыми покупками"
* IBasketButton
  * количество товаров в корзине
* BasketButton; наследуется от Component
  * кнопка перехода в форму корзины
  * сообщение "onclick: next_basket_popup"
* ICardPopup - интерфейс к отображению попап карточки;содержит все поля карточки 
* CardPopup - попап карточки;отображает картинку,заголовок,описание и цену товара; наследуется от Component
* Сomponent - базовый класс html element
  *  toggleClass - переключить класс у компонента
  *  setDisabled - переключить недоступность элемента
  *  setHidden - переключить скрытость элемента
  *  setVisible - переключить видимость элемента
  *  setImage - установить изображение
  *  render - отобразить данные

# События
## диспетчер событий

### Это библиотечный класс, не стали расписывать
* EventEmitter - брокер событий
  * constructor
  * on- установить обработчик на событие
  * off - снять обработчик
  * emit - инициировать событие с данными
  * onAll - Слушать все события
  * offAll - Сбросить все обработчики
  * trigge - Сделать коллбек триггер, генерирующий событие при вызове
* IEvents - интерфейс брокера событий


## События
* "click: on_gallery_card" - кликнули на карточку в галерее, параметр - id карточки, {card_id: id}, ICardID
* "click: next_basket" - событие перехода в попап корзины, возбуждается при клике на корзину
* "items: changed" - любое изменение в карточках
* "click: toggle_basket" - клик на кнопке "поместить в корзину/удалить из корзины" в форме покупки
* "click: online_purchaise_form" - клик на кнопке "онлайн" в форме типа оплаты
* "click: on_delivery" - клик на кнопке "при доставке" в форме типа оплаты
* "click: new_purchases" - клик на кнопке "за новыми покупками" в форме типа оплаты
* "click: close_popup" - закрытие попапа (может и не нужно в брокер, можно на месте разобраться) 
* "put-get-item" - добавить/удалить в/из корзины, аргумент IPutGetEvent
* "click: basket_button" - щелчок на кнопке корзины
* "personal_info_first_next" - щелчок на форме оформить и переход на 2 форму персональных данных
* "click: card payment" - клик на кнопке выбора оплаты карточкой
* "click: cash payment" - клик на кнопке выбора оплаты наличными
* "modal:open"/"modal:close" - открыть/закрыть модальное окно
* "address_input:change" - изменение адреса
* "click: personal info first button" - нажатие кнопки "далее"
* "email_input:change" - изменение емайла
* "click: personalInfoSecondNext" - щелчок на форме оформить и переход на  форму успешных покупок
* "click: order success" - кнопка в последней форме



## Интерфейсы событий
* ICardID
  * хранит id карточки для ее удаления

* IPutGetEvent
  * хранит id карточки для перемещения в/из корзину

* IEventText 
  *содержит информацию про персональные данные
