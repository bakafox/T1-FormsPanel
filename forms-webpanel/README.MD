# Панель управления пользователями

Фронтенд веб-приложения панели управления пользователями для [FormsServer](https://github.com/Pardeg/forms-server), написан на **React.js**. Поддерживает авторизацию по JWT, создание, редактирование и удаление пользователей.

Для работы с формами применяется **встроенный в Ant Design мощный валидатор форм**, по функциональности аналогичный (а в чём-то и превосходящий) Formik: https://ant.design/components/form

Для работы требует настроенного бэкенда, URL корня которого нужно передать в переменную среды **`VITE_API_ROOT`**! Также обращаю внимание, что в бэкенде есть ошибки при валидации PATCH-запроса, и ошибки с хранением куки!!! Для их частичного исправления нужно **из директории `forms-server`** запустить скрипт `fixBackendValidation.sh`!


### Запуск:

1. Клонировать репозиторий
2. `npm i`
3. `npm run dev` либо `npm run build`
