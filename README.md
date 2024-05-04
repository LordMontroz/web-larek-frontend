# Проектная работа "Веб-ларек"

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

Реализуется на основе интерфейса IWebLarekApi и типа productItem, который представляет структуру данных карточки:

interface IWebLarekApi {
	getCardList():productItem[]
	getCardById(id:string):productItem
}
```
```
type productItem = {
	id: string
  description: string
  image: string
  title: string
  category: string
	price: number
}
```

Предоставляет методы:
- getCardList():productItem[] - Получает массив данных карточек с сервера и возвращает его. Каждый элемент массива представляет объект с данными карточки товара.

- getCardById(id:string):productItem - Получает данные карточки товара по указанному идентификатору id с сервера и возвращает их.

### Класс BasketModel:
BasketModel отвечает за хранение данных корзины и предоставляет методы для работы с ней.

Реализован на основе интерфейса и типа productItem:
```
interface IBasketModel {
	basket: productItem[] = []
	addToBasket(item: productItem): void
	removeFromBasket(item: productItem): void
	clearBasket(): void
    }
```
Методы и поля:

- basket: productItem[] = [] - Поле для хранения элементов корзины. Это массив объектов productItem, каждый из которых представляет товар в корзине.

- addToBasket(item: productItem) - Добавляет указанный товар item в корзину.

- removeFromBasket(item: productItem) - Удаляет указанный товар item из корзины.

- clearBasket() - Очищает корзину от всех товаров.

#### Класс CatalogModel:
CatalogModel отвечает за хранение данных каталога товаров и предоставляет методы для управления этими данными.

Реализован на основе интерфейса и типа productItem:
```
interface ICatalogModel {
	catalog: productItem[]
	addToCatalog(items: productItem[]): void
}
```

- catalog: productItem[] - Поле для хранения элементов каталога. Это массив объектов productItem, представляющих товары в каталоге.

- addToCatalog(items: productItem[]): void - Добавляет указанные товары items в каталог.

## Работа с отображением

### Класс Card
Card представляет собой класс для создания карточек товаров на основе предоставленного шаблона (template) и предоставляет методы для установки значений в карточку.

Наследуется от класса Component:
CardModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейса:
```
interface ICard {
	Title: string
	Description?: string
	Image?: string
	Category: string
	Price: number
	Button?: string
	Index?: number
	SetTitle(value: string): void
	SetImage(value: string): void
	SetPrice(value: number): void
	SetDescription(value: string): void
	SetCategory(value: string): void
	SetButton(value: string): void
	SetIndex(value: number): void
}
```

И предоставляет поля и методы:

Поля:
- Title: string: Заголовок карточки.
- Description?: string: Описание карточки (необязательное).
- Image?: string: URL изображения для карточки (необязательное).
- Category: string: Категория карточки.
- Price: number: Цена карточки.
- Button?: string: Текст кнопки карточки (необязательное).
- Index?: number: Индекс карточки в массиве (необязательное).

Методы:
- SetTitle(value: string): void: Устанавливает заголовок карточки.
- SetImage(value: string): void: Устанавливает URL изображения для карточки.
- SetPrice(value: number): void: Устанавливает цену карточки.
- SetDescription(value: string): void: Устанавливает описание карточки.
- SetCategory(value: string): void: Устанавливает категорию карточки.
- SetButton(value: string): void: Устанавливает текст кнопки карточки.
- SetIndex(value: number): void: Устанавливает индекс карточки в массиве.


### Класс Modal:
Modal представляет собой класс модального окна, который предоставляет методы для его открытия и закрытия.

Реализуется на основе интерфейса:
```
interface IModal {
	closeButton: HTMLElement
	show(): void
	close(): void
}
```

И предоставляет следующие методы и поля:

Поля:
- closeButton: HTMLElement - кнопка для закрытия модального окна.

Методы:
- show(): void - служит для открытия модального окна.

- close(): void - служит для закрытия модального окна.

### Класс ContentModal
ContentModal представляет собой класс модального окна, который принимает заполненный шаблон (template) и отображает его при открытии.

Наследуется от класса Component и Modal:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами, а также от класса Modal, что позволяет использовать методы открытия и закрытия.

Реализуется на основе интерфейса:
```
interface IContentModal {
	template: HTMLElement
}
```
 Предоставляет поля:
- template : HTMLElement - шаблон модального окна.

### Класс Form
Form представляет собой абстрактный класс, который предоставляет методы для работы с модальными окнами содержащими формы.

Наследуется от класса Component:
ContentModal наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

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

### ContactForm
ContactForm представляет собой класс, который принимает шаблон модального окна в качестве аргумента конструктора. Этот шаблон содержит формы для ввода информации для контактирования, такие как телефон и адрес электронной почты.

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

### DeliveryForm
DeliveryForm представляет собой класс, который принимает шаблон (template) модального окна с формой для указания адреса доставки, кнопки для выбора формы оплаты и предоставляет методы для работы с ними.

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
- toggleButton(): void - переключает состояние активности кнопки.
- setAddress(value: string): void - устаналивает значение в поле "адрес"

