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

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - Подписывает указанную функцию callback на событие с именем eventName.

- `off(eventName: EventName, callback: Subscriber)` - Отписывает указанную функцию callback от события с именем eventName.

- `emit<T extends object>(eventName: string, data?: T)` - Уведомляет всех подписчиков о наступлении события с именем eventName, передавая им данные eventData, если они предоставлены.

- `onAll(callback: (event: EmitterEvent) => void)` - Подписывает указанную функцию callback на все события.

- `offAll()` - Отписывает все функции от всех событий.

- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - Генерирует событие с именем eventName и передает ему данные eventData.

### Класс Component

Класс Component предоставляет удобный инструментарий для работы с DOM-элементами.

**Предоставляет методы:**

- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - Переключает класс className у указанного DOM-элемента element.

- `protected setText(element: HTMLElement, value: unknown)` - Устанавливает текстовое содержимое text для указанного DOM-элемента element.

- `setDisabled(element: HTMLElement, state: boolean)` - Устанавливает состояние блокировки (disabled) для указанного DOM-элемента element.

- `protected setImage(element: HTMLImageElement, src: string, alt?: string)` - Устанавливает изображение с источником src и альтернативным текстом alt для указанного элемента <img>.

- `render(data?: Partial<T>)` - HTMLElement: Рендерит элемент в указанный контейнер container и возвращает сам элемент.

## Класс Api

Класс Api отвечает за взаимодействие с сервером посредством отправки HTTP-запросов.

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

**Предоставляет методы:**

- `protected handleResponse(response: Response): Promise<object>` - Отвечает за обработку ответа от сервера после выполнения HTTP-запроса. Он принимает объект Response, представляющий ответ сервера, и возвращает Promise, разрешающийся объектом, представляющим обработанные данные ответа.

- `get(url: string)` - Выполняет GET запрос по указанному url и возвращает Promise с результатом запроса.

- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - Выполняет POST запрос по указанному url с переданными данными data и возвращает Promise с результатом запроса.

## Модели данных(Model)

_Архитектурный слой необходимый для хранения и изменения данных._

### Класс WebLarekApi:

Наследуется от Класса Api.
WebLarekApi предназначен для получения данных карточек с сервера и отправки данных на сервер.

Реализуется на основе интерфейсов ILarekApi, IOrder, IOrderResult, ICardItem и типа ApiListResponse<Type>:

```
interface ILarekApi {
	getCardList: () => Promise<ICardItem[]>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}
```

```
interface IOrder {
	total: number;
	items: string[];
}
```

```
interface IOrderResult {
	id: string;
	total: number;
}
```

```
interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
}
```

```
type ApiListResponse<Type> = {
	total: number;
	items: Type[];
}
```

**Предоставляет поля и методы:**

Поля:

- `orderProducts: (order: IOrder) => Promise<IOrderResult>` 

Методы:

- `getCardList(): Promise<ICardItem[]>` - Получает массив данных карточек с сервера и возвращает его. Каждый элемент массива представляет объект с данными карточки товара.

- `orderProducts(order: IOrder): Promise<IOrderResult>` - отправляет put-запрос на сервер с заказом.

### Класс AppState

Класс AppState отвечает за хранение данных корзины, каталога товаров и заказов, ошибок форм.

Реализуется на основе интерфейсов IAppState, ICardItem, IOrder и типа FormErrors:

```
interface IAppState {
	basket: ICardItem[];
	catalog: ICardItem[];
	preview: string | null;
	order: IOrder | null;
}
```

```
interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
}
```

```
interface IOrder {
	total: number;
	items: string[];
}
```

```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

**Предоставляет поля и методы:**

Поля:

- `catalog: ICardItem[]` - Поле для хранения элементов каталога. Это массив объектов ICardItem, представляющих товары в каталоге.

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
Вешает обработчик клика на кнопку, в случае ее наличие, или на сам контейнер.
Имеет сеттеры и геттеры для параметров Id, заголовка, описания, изображения, категории, цены товара, текст кнопки.

Реализуется на основе интерфейсов:

```
interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
}
```

```
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}
```

**Предоставляет поля:**

Поля:

- `title: string` - Заголовок карточки.
- `description?: string` - Описание карточки (необязательное).
- `image?: string` - URL изображения для карточки (необязательное).
- `category?: Category` - Категория карточки.
- `price: number | null` - Цена карточки.
- `buttonName?: string` - Кнопка у карточки (необязательное).

### Класс BasketItem:

BasketItem находит элементы темплейта карточки товара, находящегося в корзине и присваивает соответствующим параметрам. Имеет сеттер для установки порядкового индекса товара в корзине.

Реализуется на основе интерфейсов:

```
interface ICardItem {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: Category;
	price: number | null;
	buttonName?: string;
}
```

### Класс Page

Page cодержит элементы страницы - счетчик корзины, каталог товаров, корзину, обертку для блокировки прокрутки при открытии модального окна.
Имеет сеттеры для установки значения счетчика товаров в корзине, изменения содержания каталога товаров, блокировки прокрутки страницы.

Реализуется на основе интерфейса IPage:

```
interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}
```

**Предоставляет поля**

Поля:

- `counter: number` - элемент для отображения счётчика корзины.
- `catalog: HTMLElement[]` - массив со всеми карточками.

### Класс Form

Form представляет собой класс, который Содерит данные о кнопке сабмита, и поля отображения ошибок валидации полей инпутов.
Конструктор класса находит в передаваемом контейнере HTML элементы кнопки сабмита и поля для отображения ошибок
и вешает на них обработчики клика на кнопки и обработчик инпута на соответствующе поле.
Сдержит сеттеры valid для отключения кнопки сабмита при ошибках и errors для присвоения значения ошибки соответствующему HTML элементу

Наследуется от класса Component:
Form наследует функциональность от класса Component, что позволяет ему использовать методы для работы с DOM-элементами.

Реализуется на основе интерфейса:

```
interface IFormState {
	valid: boolean;
	errors: string[];
}
```

**Предоставляет поля и методы:**

Поля:

- `valid: boolean`
- `errors: string[]`

Методы:

- `protected onInputChange(field: keyof T, value: string)` - метод для создания события при изменении инпута и передачи с ним данные ключа и значения инпута.
- `render(state: Partial<T> & IFormState)` - метод для отрисовки значение ошибок заполнения форм.

### Класс OrderPayments

OrderPayments содержит данные о кнопках выбора способа оплаты, устанавливает на них обработчики клика. Содержит сеттер для установки значения полю адреса доставки заказа.
Расширяет класс Form.

**Предоставляет методы:**

Методы:

- `togglePayment(value: HTMLElement)` - метод для переключения класса нажатой кнопки.
- `cancelPayment()` - метод для сброса состояние всех кнопок.

### Класс OrderContacts

OrderContacts расширяет класс Form. Содержит сеттеры для установки значения телефона и электронной почты соответствующим полям ввода.

### Класс BasketModal

Modal имеет методы открытия и закрытия модального окна, сеттер для установки контента в модальное окно, метод рендер для отрисовки содержимого окна и его открытия.

Реализуется на основе интерфейса:

```
interface IModalData {
    content: HTMLElement;
}
```

### Класс Success

Success расширяет абстрактный класс Component и cодержит данные о HTML элементах - кнопка закрытия и описание.
Конструктор класса присваивает HTML элементы описания и кнопки закрытия соответствующим параметрам, вешает обработчик клика на кнопку закрытия окна.
Имеет сеттер total для установки полю с описанием значения суммы оформленного заказа.

Реализуется на основе интерфейсов:

```
interface ISuccess {
	total: number;
}
```

```
interface ISuccessActions {
	onClick: () => void;
}
```

### Класс Basket 

Success расширяет абстрактный класс Component и содержит данные о блоке в который помещяются заказываемые товары, поля для отображ ения суммы всех товаров в корзине и кнопки для дальнейшего оформления заказа.
Конструктор класса присваивает значения HTML элементов соответствующим параметрам.
Реализуется на основе интерфейсов:

```
interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}
```

## Компоненты представления(Presenter)

_Архитектурный слой необходимый для связывания слоя Model и слоя View._

Презентером выступает основной файл index.ts, который регулирует взаимодействие между отображением и данными путем подписки на события через брокер событий (экземпляр класса EventEmitter).