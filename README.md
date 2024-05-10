# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Паттерн программирования: упрощённая версия архитектурного паттерна MVP

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
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

## Базовый код

### Класс EventEmitter

Реализован на основе интерфейса:

```
interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

И типов:

```
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
  eventName: string,
  data: unknown
};
```

Класс EventEmitter реализует паттерн "Наблюдатель" и обеспечивает механизм подписки на события, отписки от событий и уведомления подписчиков о наступлении событий. 
Он предоставляет следующие методы:

- on<T extends object>(eventName: EventName, callback: (event: T) => void): Подписывает указанную функцию callback на событие с именем eventName.

- off(eventName: EventName, callback: Subscriber): Отписывает указанную функцию callback от события с именем eventName.

- emit<T extends object>(eventName: string, data?: T): Уведомляет всех подписчиков о наступлении события с именем eventName, передавая им данные eventData, если они предоставлены.

- onAll(callback: (event: EmitterEvent) => void): Подписывает указанную функцию callback на все события.

- offAll(): Отписывает все функции от всех событий.

- trigger<T extends object>(eventName: string, context?: Partial<T>): Генерирует событие с именем eventName и передает ему данные eventData.

### Класс Component

Класс Component предоставляет удобный инструментарий для работы с DOM-элементами. Он включает в себя следующие методы:

- toggleClass(element: HTMLElement, className: string, force?: boolean): Переключает класс className у указанного DOM-элемента element.

- protected setText(element: HTMLElement, value: unknown): Устанавливает текстовое содержимое text для указанного DOM-элемента element.

- setDisabled(element: HTMLElement, state: boolean): Устанавливает состояние блокировки (disabled) для указанного DOM-элемента element.

- protected setHidden(element: HTMLElement): Скрывает указанный DOM-элемент element.

- protected setVisible(element: HTMLElement): Показывает указанный DOM-элемент element.

- protected setImage(element: HTMLImageElement, src: string, alt?: string): Устанавливает изображение с источником src и альтернативным текстом alt для указанного элемента <img>.

- render(data?: Partial<T>): HTMLElement: Рендерит элемент в указанный контейнер container и возвращает сам элемент.

## Класс Api

Реализован на основе типов:

```
type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};
```

```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

Класс Api отвечает за взаимодействие с сервером посредством отправки HTTP-запросов. Он предоставляет следующие методы:

- protected handleResponse(response: Response): Promise<object>: Отвечает за обработку ответа от сервера после выполнения HTTP-запроса. Он принимает объект Response, представляющий ответ сервера, и возвращает Promise, разрешающийся объектом, представляющим обработанные данные ответа.

- get(url: string): Promise<any>: Выполняет GET запрос по указанному url и возвращает Promise с результатом запроса.

- post(uri: string, data: object, method: ApiPostMethods = 'POST'): Выполняет POST запрос по указанному url с переданными данными data и возвращает Promise с результатом запроса.

## Работа с данными

### Класс WebLarekApi:

Наследуется от Класса Api.
WebLarekApi предназначен для получения данных карточек с сервера и отправки данных на сервер.

Реализуется на основе интерфейса IWebLarekApi и типа ProductItem, который представляет структуру данных карточки:

```
interface IWebLarekApi {
	cdn: string;
	getCardList(): Promise<ProductItem[]>
	getCardById(id:string): Promise<ProductItem>
	
}
```

```
type ProductItem = {
	id: string
  description: string
  image: string
  title: string
  category: string
	price: number
}
```

Предоставляет поля и методы:

Поля:

- cdn: string - используется для формирования полного пути к изображениям при их отображении в приложении.

Методы:

- getCardList(): ProductItem[] - Получает массив данных карточек с сервера и возвращает его. Каждый элемент массива представляет объект с данными карточки товара.

- getCardById(id: string): ProductItem - Получает данные карточки товара по указанному идентификатору id с сервера и возвращает их.

### Класс BasketModel:

BasketModel отвечает за хранение данных корзины и предоставляет методы для работы с ней.

Реализован на основе интерфейса и типа ProductItem:

```
interface IBasketModel {
	basket: ProductItem[]
	addToBasket(item: ProductItem): void
	removeFromBasket(id: string): void
	clearBasket(): void
    }
```

Методы и поля:

- basket: ProductItem[] - Поле для хранения элементов корзины. Это массив объектов productItem, каждый из которых представляет товар в корзине.

- addToBasket(item: ProductItem) - Добавляет указанный товар item в корзину.

- removeFromBasket(id: string) - Удаляет указанный товар item из корзины.

- clearBasket() - Очищает корзину от всех товаров.

#### Класс CatalogModel:

CatalogModel отвечает за хранение данных каталога товаров и предоставляет методы для управления этими данными.

Реализован на основе интерфейса и типа ProductItem:

```
interface ICatalogModel {
	catalog: ProductItem[]
	addToCatalog(items: ProductItem[]): void
}
```

Методы и поля:

- catalog: ProductItem[] - Поле для хранения элементов каталога. Это массив объектов ProductItem, представляющих товары в каталоге.

- addToCatalog(items: ProductItem[]): void - Добавляет указанные товары items в каталог.

## Работа с отображением

### Класс Card

Card представляет собой класс для создания карточек товаров на основе предоставленного шаблона (template) и предоставляет методы для установки значений в карточку.

Наследуется от класса Component:
CardModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейсов:

```
interface ICard {
	container: HTMLTemplateElement
	title: HTMLHeadingElement
	description?: HTMLParagraphElement
	image?: HTMLImageElement
	category: HTMLSpanElement
	price: HTMLSpanElement
	button?: HTMLButtonElement
	actions: IActions
	render(data: ProductItem): HTMLElement
}
```

interface IActions {
	onClick(evt:MouseEvent): void;
}
```

И предоставляет поля и методы:

Поля:

- container: HTMLElement: Шаблон карточки.
- title: HTMLHeadingElement: Заголовок карточки.
- description?: HTMLParagraphElement: Описание карточки (необязательное).
- image?: HTMLImageElement: URL изображения для карточки (необязательное).
- category: HTMLSpanElement: Категория карточки.
- price: HTMLSpanElement: Цена карточки.
- button?: HTMLButtonElement: Кнопка у карточки (необязательное).
- actions: IActions: Колбэк при клике.

Методы:

- render(data: ProductItem): HTMLElement: вовзращает готовую карточку.

### Класс Modal:

Modal представляет собой класс абстрактного модального окна, который предоставляет методы для его открытия и закрытия.

Реализуется на основе интерфейсов:

```
interface IModal {
	container: HTMLElement;
	closeButton: HTMLElement
	actions: IActions
	show(): void
	close(): void
}
```

```
interface IActions {
	onClick(evt:MouseEvent): void;
}
```

И предоставляет следующие методы и поля:

Поля:

- container: HTMLDivElement - контейнер с модальным окном.
- closeButton: HTMLElement - кнопка для закрытия модального окна.
- actions: IActions - Колбэк при клике.

Методы:

- show(): void - служит для открытия модального окна.

- close(): void - служит для закрытия модального окна.

### Класс ContentModal

ContentModal отображает модальное окно, заполненное предоставленным шаблоном.

Наследуется от класса Component и Modal:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами, а также от класса Modal, что позволяет использовать методы открытия и закрытия.
Наследует функциональность от класса EventEmitter, что позволяет ему использовать методы для работы с событиями.

Реализуется на основе интерфейса:

```
interface IContentModal {
	content: HTMLElement
	modalContent: HTMLElement
	button: HTMLButtonElement;
	setContent(content: HTMLElement): void
	setButton(button: HTMLButtonElement, actions: IActions): void
	clearModalContent(): void
}
```

 Предоставляет поля и методы:

 Поля:

- container: HTMLDivElement - контент для вставки в модальное окно.
- modalContent: HTMLElement - модальное окно.
- button: HTMLButtonElement - кнопка.

Методы: 

- setContent(content: HTMLElement): void - устанавливает контент для вставки в модальное окно.
- clearModalContent(): void - очищает контент в модальном окне.
- setButton(button: HTMLButtonElement, actions: IActions): void - установка кнопки в поле button.

### Класс Basket

Basket представляет собой класс, который принимает шаблон (template) модального окна корзиной и предоставляет методы для работы с ней.

Наследуется от класса Component и EventEmitter:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.
Наследует функциональность от класса EventEmitter, что позволяет ему использовать методы для работы с событиями.

Реализуется на основе интерфейса:

```
interface IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[];
	basketList: HTMLElement;
	basketModel: BasketModel;
	counterTotalCost(basketCard:HTMLElement): void;
	updateBasket(): void;
	setCards(items: HTMLElement[]): void;
}
```

Предоставляет методы и поля:

Поля:

- basket: HTMLElement - корзина.
- basketPrice: HTMLElement - общая стоимость корзины.
- cardBasketTemplate: HTMLTemplateElement - шаблон корзины.
- cardsBasket: HTMLElement[] - массив готовых карточек корзины.
- basketList: HTMLElement - список для карточек.
- basketModel: BasketModel - экземпляр класса BasketModel.

Методы:

- counterTotalCost(cardPrice: number): void - метод для расчета общей стоимости корзины.
- setCards(items: HTMLElement[]): void - устанавливает карточки в корзину.
- updateBasket(): void - обновляет содержимое корзины.

### Класс Form

Form представляет собой абстрактный класс, который предоставляет методы для работы с модальными окнами содержащими формы.

Наследуется от класса Component и EventEmitter:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.
Наследует функциональность от класса EventEmitter, что позволяет ему использовать методы для работы с событиями.

Реализуется на основе интерфейса:

```
interface IForm {
	validate(): void
	sumbit(): void
}
```

Предоставляет методы:

- validate(): void - служит для валидации полей формы.
- submit(): void - служит для подтверждения данных по нажатию на кнопку, скрытия текущего попапа и открытия нового.

### Класс ContactForm

ContactForm представляет собой класс, который принимает шаблон модального окна в качестве аргумента конструктора. Этот шаблон содержит формы для ввода контактной информации, такой как телефон и адрес электронной почты.

Наследуется от класса Form:
ContactForm наследует функциональность от класса Form, что позволяет ему использовать методы для работы с формами.

Реализуется на основе интерфейса:

```
interface IContactForm {
	template: HTMLElement
	setPhone(value: string): void
	setEmail(value: string): void
}
```

Предоставляет методы и поля:

Поля:

- template : HTMLElement - шаблон модального окна с формами для ввода информации для контактирования.

Методы:

- setPhone(value: string): void - устаналивает значение в поле "телефон"
- setEmail(value: string): void - устаналивает значение в поле "почта"

### Класс DeliveryForm

DeliveryForm представляет собой класс, который принимает шаблон (template) модального окна с формой для указания адреса доставки, кнопки для выбора формы оплаты (карта или наличные) и предоставляет методы для работы с ними.

Наследуется от класса Form:
DeliveryForm наследует функциональность от класса Form, что позволяет ему использовать методы для работы с формами.

Реализуется на основе интерфейса:

```
interface IDeliveryForm {
	template: HTMLElement
	buttonCard: HTMLButtonElement
	buttonCash: HTMLButtonElement
	toggleButton(): void
	setAddress(value: string): void
}
```

Предоставляет методы и поля:

Поля:

- template : HTMLElement - шаблон модального окна с формой для ввода адреса и кнопками для указания способа оплаты.
- buttonCard: HTMLButtonElement - кнопка "оплата картой"
- buttonCash: HTMLButtonElement - кнопка "оплата наличными"

Методы:

- toggleButton(): void - переключает доступность кнопок оплаты в зависимости от выбора.
- setAddress(value: string): void - устаналивает значение в поле "адрес"

### Класс Success

Success представляет собой класс, который принимает шаблон (template) модального окна с отображающего информацию об успешном завершении покупки.

Наследуется от класса Component:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейса:

```
interface ISuccess {
	template: HTMLElement
	totalCost: string
	buttonNext: HTMLButtonElement
	close(): void
	counterTotalCost(): string
}
```

Предоставляет методы и поля:

Поля:

- template: HTMLElement - шаблон модального окна с успешным результатом покупки.
- totalCost: string - общая стоимость покупки
- buttonNext: HTMLButtonElement - кнопка "За новыми покупками"

Методы:

- close(): void - закрывает модальное окно по нажатию на кнопку.
- counterTotalCost(): string - высчитывает общую стоимость покупки. Возвращает строку, представляющую общую стоимость покупки.

### Класс Page 

Page представляет собой класс для отображения страницы с карточками и счётчика корзины.

Наследует функциональность от класса EventEmitter, что позволяет ему использовать методы для работы с событиями.

Реализуется на основе интерфейса IPage:

```
interface IPage {
	counter: HTMLElement
	catalog: HTMLElement
	pageWrapper: HTMLElement
	basketButton: HTMLButtonElement
	updateCounter(value: number): void
	setCatalog(items: HTMLElement[]): void
	lockPage(): void
	unlockPage(): void
}
```

Предоставляет методы и поля:

Поля:

- counter: HTMLElement - элемент HTML для отображения счётчика корзины.
- catalog: HTMLElement[] - массив со всеми карточками.
- pageWrapper: HTMLElement - оболочка контента страницы.
- basketButton: HTMLButtonElement - кнопка открытия корзины.

Методы:

- updateCounter(value: number): void - представляет метод для обновления счётчика корзины.
- setCatalog(items: HTMLElement[]): void - устанавливает содержимое поля catalog.
- lockPage(): void - блокировка прокрутки страницы.
- unlockPage(): void - разблокировка прокрутки страницы.