# Менеджер задач (Vue 3)

Учебный проект SIS 2 по курсу «JS Framework Vue» (KBTU).
Веб-приложение для управления ежедневными задачами.

## Возможности

- добавление, просмотр, редактирование, выполнение и удаление задач;
- смена приоритета прямо в карточке задачи;
- поиск по названию;
- фильтры по приоритету и статусу (все / активные / выполненные);
- статистика: всего задач, активные, выполненные, процент выполнения;
- сохранение задач в `localStorage`.

## Как это соответствует заданию

| Требование | Где реализовано |
| --- | --- |
| Отдельный переиспользуемый компонент задачи | `src/components/TaskItem.vue` |
| Props и пользовательские события | `TaskItem` (`toggle`, `delete`, `update`, `change-priority`), `TaskForm` (`add`), `TaskFilters` (`update:*`, `reset`) |
| Methods | `App.vue`, `TaskItem.vue`, `TaskForm.vue` |
| Computed | `filteredTasks`, `stats`, `hasFilters` в `App.vue`; `percent` в `TaskStats.vue` |
| Watchers | `tasks` (deep, сохранение) и `stats.active` (заголовок вкладки) в `App.vue`; `title` в `TaskForm.vue` |
| Хуки жизненного цикла | `mounted` и `beforeUnmount` в `App.vue` |
| Слоты | `BasePanel` (именованный слот `title`), `BaseButton` и `BaseBadge` (слот по умолчанию) |
| Глобальные компоненты | `BaseButton`, `BaseBadge`, `BasePanel`, регистрация в `src/main.js` |

## Запуск

```bash
npm install
npm run dev
```

Сборка для продакшена: `npm run build`.

## Структура

```
src/
├── main.js                 # точка входа, глобальные компоненты
├── App.vue                 # состояние, фильтрация, статистика
├── constants.js            # приоритеты, статусы, ключ localStorage
├── assets/main.css         # стили
└── components/
    ├── TaskForm.vue        # форма добавления
    ├── TaskFilters.vue     # поиск и фильтры
    ├── TaskStats.vue       # статистика
    ├── TaskItem.vue        # карточка задачи
    └── global/
        ├── BaseButton.vue
        ├── BaseBadge.vue
        └── BasePanel.vue
```
