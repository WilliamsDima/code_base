<h1><a href="https://code-base-702c2.web.app/">CODE BASE</a></h1>

<p>Платформа, которая позволит вам сохранить ваши полезные функции, фичи, описание ошибок и их решение, хуки, стили и любые другие полезные формулировки, которые были собраны вами в течении вашего опыта разработки. Большне не нужно гулять по своим старым проектам, в поисах той заветной фичи которую вы когда-то написали. Просто сохраните её тут и благодаря поиску вы быстро будите получать доступ к вашим фичам.</p>

<a href="https://t.me/DyWilliams">Telegram автора - Dmitry Williams</a>

---

## Основные паттерны, архитектура и структура проекта

---

## Techstack

[![typescript](https://img.shields.io/static/v1?label=typescript&message=4.8.4&color=3178C6&style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![node](https://img.shields.io/static/v1?label=node&message=16.4.0&color=026E00&style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![react](https://img.shields.io/static/v1?label=react&message=18.2.0&color=61DBFB&style=for-the-badge&logo=react&logoColor=white)](https://ru.reactjs.org/)
[![redux](https://img.shields.io/static/v1?label=redux&message=4.2.0&color=764ABD&style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![reduxtoolkit](https://img.shields.io/static/v1?label=redux%20toolkit&message=1.9.0&color=764ABD&style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![sass](https://img.shields.io/static/v1?label=sass&message=7.0.3&color=BF4080&style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![firebase](https://img.shields.io/static/v1?label=firebase&message=9.13.0&color=FECB30&style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![jest](https://img.shields.io/static/v1?label=jest&message=29.5.0&color=15C213&style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/ru/)

---

<p>На проекте настроен CI/CD pipeline - сборка, тесты, деплой на хостинг</p>

## Работа со структурой

паттерны:

- `hooks` - дирректория, которая хранит в себе кастомные хуки и хэлперы.
- `api` - иницилизация firebase, создание пользователя, загруга и удаление файлов.
- `services` - дирректория, которая хранит в себе костанты, моковые данные, API сервисы.
- `store` - глобальное хранилище со state и actions.
- `stories` - структура для использования storybook.
- `assets` - глобальные стили, изображения.
- `appTypes` - типы и интерфейсы.

Также, в шаблоне структурированы компоненты по Atomic Design. Компоненты деляться на:

- `/atoms/*` – тут расположены примитивные компоненты: кнопки, заголовки, поля ввода и пр.
- `/molecules/*` – тут расположены связки/группы примитивов: группы кнопок, карточки и пр.
- `/organisms/*` – тут расположены связки/группы молекул. То есть компоненты, которая состоит из молекул, которые состоят из примитивов: шапка, списки карточек, модальные окна и пр.
- `/templates/*` – тут расположены шаблоны страницы
- `/screens/*` – тут расположены страницы
- `/navigations/*` – навигация и роутинг

Подробнее можно почитать:

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- [Atomic Design in practice](https://blog.ippon.tech/atomic-design-in-practice/)

<p>Для создание 'алис' путей используется - Craco</p>
<p>Далее будут описы основыне команды для взаимодействия с проектом</p>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
