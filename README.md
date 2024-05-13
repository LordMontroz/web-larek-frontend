# WEB-LAREK

## Краткое описание

"WEB-LAREK" представляет собой онлайн платформу для покупки товаров из каталога. Пользователи могут просматривать ассортимент, выбирать понравившиеся товары и добавлять их в корзину. После этого, они могут ввести свои данные для доставки и оформить покупку.

**Стек:** HTML, SCSS, TS, Webpack

**Паттерн программирования:** упрощённая версия архитектурного паттерна MVP

**Структура проекта:**

- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

**Важные файлы:**

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

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

Класс EventEmitter реализует паттерн "Наблюдатель" и обеспечивает механизм подписки на события, отписки от событий и уведомления подписчиков о наступлении событий.

Реализован на основе интерфейса:

```
interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
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

**Предоставляет методы:**

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - подписывает указанную функцию callback на событие с именем eventName.

- `emit<T extends object>(eventName: string, data?: T)` - уведомляет всех подписчиков о наступлении события с именем eventName, передавая им данные eventData, если они предоставлены.

- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - генерирует событие с именем eventName при вызове.

### Класс Component

Класс Component предоставляет удобный инструментарий для работы с DOM-элементами.

Класс Component абстрактный. 

`protected constructor(protected readonly container: HTMLElement)` - принимает в конструктор HTML элемент container.

**Предоставляет методы:**

- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - Переключает класс className у указанного DOM-элемента element.

- `protected setText(element: HTMLElement, value: unknown)` - Устанавливает текстовое содержимое text для указанного DOM-элемента element.

- `setDisabled(element: HTMLElement, state: boolean)` - Устанавливает состояние блокировки (disabled) для указанного DOM-элемента element.

- `protected setImage(element: HTMLImageElement, src: string, alt?: string)` - Устанавливает изображение с источником src и альтернативным текстом alt для указанного элемента <img>.

- `render(data?: Partial<T>)` - HTMLElement: Рендерит элемент в указанный контейнер container и возвращает сам элемент.

### Класс Api

Класс Api отвечает за взаимодействие с сервером посредством отправки HTTP-запросов.

Реализован на основе типов:

```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

**Предоставляет методы:**

- `protected handleResponse(response: Response): Promise<object>` - Отвечает за обработку ответа от сервера после выполнения HTTP-запроса. Он принимает объект Response, представляющий ответ сервера, и возвращает Promise, разрешающийся объектом, представляющим обработанные данные ответа.

- `get(url: string)` - Выполняет GET запрос по указанному url и возвращает Promise с результатом запроса.

- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - Выполняет POST запрос по указанному url с переданными данными data и возвращает Promise с результатом запроса.

### Абстрактный класс Model

Model получает в конструктор два элемента (события и объект данных). 

**Предоставляет метод:**

- `emitChanges(event: string, payload?: object)` - метод для оповещения о произошедшем событии, который принимает два аргумента, событие и объект данных.

## Модели данных(Model)

_Архитектурный слой необходимый для хранения и изменения данных._

### Класс WebLarekApi:

Наследуется от класса Api и расширяет его.
WebLarekApi предназначен для получения данных карточек с сервера и отправки данных на сервер. Принимает в конструктор CDN URL и базовый URL

Реализуется на основе интерфейсов IWebLarekApi, IOrder, IOrderResult, IOrderPayments(форма заполнения данных об оплате и доставке, также содержит способ оплаты товара и адрес доставки),
IOrderContacts(форма заполнения данных о покупателе содержит телефон и почту покупателя) и типа ApiListResponse<Type>:

```
interface IWebLarekApi {
	getCardList: () => Promise<ICardItem[]>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}
```

Интерфейс IOrder содержит все данные по заказу и расширяет интерфейс IOrderContacts и IOrderPayments добавляя к нему данные об общей сумме покупки и массива строк id купленных товаров.

```
interface IOrder {
	total: number;
	items: string[];
	email: string;
	phone: string;
	payment: string;
	address: string;
}
```
Интерфейс IOrderResult(описание ответа в случае успешной отправки заказа). Содержит id заказа и общую сумму заказа.

```
interface IOrderResult {
	id: string;
	total: number;
}
```

```
type ApiListResponse<Type> = {
	total: number;
	items: Type[];
}
```

**Предоставляет методы:**

Методы:

- `getCardList(): Promise<ICardItem[]>` - метод для получения массива объектов товаров, формирует URL для изображения из CDN URL и данных из объекта карточки из ключа "image".

- `orderProducts(order: IOrder): Promise<IOrderResult>` - метод для отправки заказа на сервер.

### Класс AppState

Класс AppState хранит данные о работе приложения (данные по заказу, каталогу товаров, ошибки форм, карточки для превью, корзине).

Реализуется на основе интерфейсов IAppState, ICardItem, IOrder и типа FormErrors:

```
interface IAppState {
	basket: ICardItem[];
	catalog: ICardItem[];
	preview: string | null;
	order: IOrder | null;
}
```
Интерфейс ICardItem описывает элементы карточки товара: id, название, описание, изображение, категорию из типа Category, цену, текст кнопки карточки.

```
export interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
}
```

- `type FormErrors = Partial<Record<keyof IOrder, string>>` - cодержит ошибки заполнения полей заказа, ключами являются данные из интерфейса IOrder, значения - строки.

**Предоставляет методы:**

Методы:

- `setOrderPayment(value: string)` - Устанавливает выбранный способ оплаты заказа.
- `setOrderAddress(value: string)` - Устанавливает значение адреса доставки заказа.
- `setCatalog(items: ICardItem[])` - Добавляет в каталог карточки товаров из полученного аргументом массива карточек.
- `setPreview(item: ICardItem)` - Устаналивает в параметре превью id выбранной карточки.
- `setButtonText(item: ICardItem)` - Меняет текст кнопки добавления карточки в корзину.
- `getCardsInBasket(): ICardItem[]` - Возвращает массив карточек, добавленных в корзину.
- `getBasketItemIndex(item: ICardItem): number` - Возвращает индекс позиции карточки товара в корзине.
- `toggleCardInBasket(item: ICardItem)` - Добавляет товар в корзину или удаляет его в случае если он уже был добавлен.
- `deleteCardFromBasket(item: ICardItem)` - Удаляет товар из корзины.
- `sendCardsInOrder()` - Отправляет карточки в форму заказа.
- `clearBasket()` - Очищает данные по заказу и корзину.
- `getTotal()` - Возвращает общую сумму товаров в корзине.
- `setOrderField(field: keyof Pick<IOrder, 'address' | 'phone' | 'email'>,value: string)` - Устанавливает значения ключам заказа address, phone и email.
- `validateOrder()` - Выводит оповещение о не заполненных полях заказа.

## Компоненты отображения(View)

_Архитектурный слой необходимый для отображения данных на странице._

### Класс Card:

Card представляет собой класс для создания карточек товаров на основе предоставленного шаблона (template) и предоставляет методы для установки значений в карточку.
Наследуется от класса Component. Находит элементы темплейта карточки товара и присваивает соответствующим параметрам.


Реализуется на основе интерфейса:

```
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}
```

- `onClick: (event: MouseEvent) => void` - вешает обработчик клика на кнопку, в случае ее наличие, или на сам контейнер.

Имеет сеттеры и геттеры для параметров Id, заголовка, описания, изображения, категории, цены товара, текст кнопки.

### Класс BasketItem:

BasketItem расширяет класс Card. Находит элементы темплейта карточки товара, находящегося в корзине и присваивает соответствующим параметрам.

Имеет сеттер для установки порядкового индекса товара в корзине.

-`set index(index: number) {this.setText(this._index, index)}` - сеттер для установки порядкового индекса товара в корзине.


### Класс Page

Page cодержит элементы страницы - счетчик корзины, каталог товаров, корзину, обертку для блокировки прокрутки при открытии модального окна.

Расширяет абстрактный класс Component.

Реализуется на основе интерфейса IPage:

```
interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}
```

Имеет сеттеры для установки значения счетчика товаров в корзине, изменения содержания каталога товаров, блокировки прокрутки страницы.


**Предоставляет поля**

Поля:

- `counter: number` - элемент для отображения счётчика корзины.
- `catalog: HTMLElement[]` - массив со всеми карточками.

### Класс Form

Form представляет собой класс, который Содержит данные о кнопке сабмита, и поля отображения ошибок валидации полей инпутов.

Расширяет абстрактный класс Component.

Наследуется от класса Component:
Form наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейса:

```
interface IFormState {
	valid: boolean;
	errors: string[];
}
```

**Предоставляет методы:**

Методы:

- `protected onInputChange(field: keyof T, value: string)` - метод для создания события при изменении инпута и передачи с ним данные ключа и значения инпута.
- `render(state: Partial<T> & IFormState)` - метод для отрисовки значение ошибок заполнения форм.

Конструктор класса находит в передаваемом контейнере HTML элементы кнопки сабмита и поля для отображения ошибок
и вешает на них обработчики клика на кнопки и обработчик инпута на соответствующе поле.
Содержит сеттеры valid для отключения кнопки сабмита при ошибках и errors для присвоения значения ошибки соответствующему HTML элементу.

### Класс OrderPayments

OrderPayments содержит данные о кнопках выбора способа оплаты, устанавливает на них обработчики клика. Содержит сеттер для установки значения полю адреса доставки заказа.
Расширяет класс Form.

**Предоставляет методы:**

Методы:

- `togglePayment(value: HTMLElement)` - метод для переключения класса нажатой кнопки.
- `cancelPayment()` - метод для сброса состояние всех кнопок.

### Класс OrderContacts

OrderContacts расширяет класс Form.

Содержит сеттеры для установки значения телефона и электронной почты соответствующим полям ввода.

- `set phone(value: string) {(this.container.elements.namedItem('phone') as HTMLInputElement).value = value}` - сеттер для установки значения номера телефона для соответствуюшего поля.
- `set email(value: string) {(this.container.elements.namedItem('email') as HTMLInputElement).value = value}` - сеттер для установки значения электронной почты для соответствуюшего поля.

### Класс Modal

Modal отображает модальное окно, заполненное предоставленным шаблоном. Имеет методы открытия и закрытия модального окна, сеттер для установки контента в модальное окно, метод рендер для отрисовки содержимого окна и его открытия.

Расширяет абстрактный класс Component.

Реализуется на основе интерфейса:

```
interface IModalData {
    content: HTMLElement;
}
```

**Предоставляет поля и методы:**

Поля:

- `content: HTMLElement` - контент для вставки в модальное окно.

Методы:

- `open()` - метод открытия модального окна.
- `close()` - метод закрытия модального окна.
- `render(data: IModalData): HTMLElement` - метод для отрисовки содержимого окна и его открытия.

### Класс Success

Success расширяет абстрактный класс Component и cодержит данные о HTML элементах - кнопка закрытия и описание.

Расширяет абстрактный класс Component.

Реализуется на основе интерфейсов:

```
interface ISuccess {
	total: number;
}
```
Конструктор класса присваивает HTML элементы описания и кнопки закрытия соответствующим параметрам, вешает обработчик клика на кнопку закрытия окна.

```
interface ISuccessActions {
	onClick: () => void;
}
```

Имеет сеттер total для установки полю с описанием значения суммы оформленного заказа.

- `set total(value: string)` - сеттер total для установки полю с описанием значения суммы оформленного заказа.

### Класс Basket 

Success расширяет абстрактный класс Component.

Success содержит данные о блоке в который помещяются заказываемые товары, поля для отображения суммы всех товаров в корзине и кнопки для дальнейшего оформления заказа.

- `constructor(container: HTMLElement, protected events: EventEmitter)` - конструктор класса присваивает значения HTML элементов соответствующим параметрам.

Реализуется на основе интерфейса:

```
interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}
```

Имеет сеттеры:

- `set items(items: HTMLElement[])` - управляет состоянием кнопки оформления заказа, а также устанавливает карточки товаров из получаемого массива в list, если их нет в корзине, уведомляет что она пустая.
- `set total(total: number)` - устанавливает значение суммы товаров в корзине соответствующему полю.


## Компоненты представления(Presenter)

_Архитектурный слой необходимый для связывания слоя Model и слоя View._

Презентером выступает основной файл index.ts, который регулирует взаимодействие между отображением и данными путем подписки на события через брокер событий (экземпляр класса EventEmitter).

### Список событий: 
 
- `'cards:changed'` - изменение в массиве карточек. 
- `'preview:changed'` - изменение в параметре превью(устанавливается id выбранной карточки). 
- `'basket:open'` - открытие корзины. 
- `'basket:changed'` - изменение состояния корзины. 
- `'formErrors:change'` - изменение ошибки заполнения полей заказа. 
- `'order:open'` - открытие формы заказа. 
- `'order:change'` - изменение формы заказа *. 
- `'order:change payment'` - изменение способа оплаты заказа. 
- `'modal:open'` - открытие модального окна. 
- `'modal:close'` - закрытие модального окна. 