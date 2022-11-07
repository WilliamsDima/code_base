Шаблон для разработки мобильных приложений на React

---

## Techstack
[![typescript](https://img.shields.io/static/v1?label=typescript&message=4.8.4&color=3178C6&style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![node](https://img.shields.io/static/v1?label=node&message=14.5.0&color=026E00&style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![react](https://img.shields.io/static/v1?label=react&message=18.2.0&color=61DBFB&style=for-the-badge&logo=react&logoColor=white)](https://ru.reactjs.org/)
[![redux](https://img.shields.io/static/v1?label=redux&message=4.2.0&color=764ABD&style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![reduxtoolkit](https://img.shields.io/static/v1?label=redux%20toolkit&message=1.9.0&color=764ABD&style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![tailwindcss](https://img.shields.io/static/v1?label=tailwindcss&message=3.2.2&color=38BDF8&style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![sass](https://img.shields.io/static/v1?label=sass&message=7.0.3&color=BF4080&style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![axios](https://img.shields.io/static/v1?label=axios&message=1.1.3&color=671DDF&style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/ru/docs/intro/)


---

## Работа с шаблоном
В шаблоне все наследуется от стандартного `create-react-app  --template typescript`. Однако, в шаблоне присуствуют некоторые архитектурные паттерны:
- `models` - дирректория, которая хранит в себе структуры данных или их типы/интерфейсы/абстракции
- `repositories` - дирректория, которая хранит в себе классы, которые делают запросы по API. Для HTTP запросов внутри есть базовый NetAPI класс, который по DI принимает Http клиент и делает запросы по внешним API. Также есть базовый LocalAPI, который записывает или берет данные с локального хранилища. Для работы с последующими репозиториями, надо наследоваться от одного из базовых классов.
- `services` - дирректория, которая хранит в себе классы, которые производят какие либо вычесления, или служат оберткой для сторонних зависимостей.
- `modules` - дирректория, которая создает контекст для хранения инстанции классов репозиториев или сервисов, для реализации DI(Dependency Injection).

Также, в шаблоне структурированы компоненты по Atomic Design. Компоненты деляться на:

- `/atoms/*` – тут расположены примитивные компоненты: кнопки, заголовки, поля ввода и пр.
- `/molecules/*` – тут расположены связки/группы примитивов: группы кнопок, карточки и пр.
- `/organisms/*` – тут расположены связки/группы молекул. То есть компоненты, которая состоит из молекул, которые состоят из примитивов: шапка, списки карточек, модальные окна и пр.
- `/templates/*` – тут расположены шаблоны страницы

Подробнее можно почитать:

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- [Atomic Design in practice](https://blog.ippon.tech/atomic-design-in-practice/)



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
