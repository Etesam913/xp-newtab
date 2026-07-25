import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Start window / menu
      start: "Start",
      administrator: "Administrator",
      settings: "Settings",
      createNewWindow: "Create A New Window",
      addIcon: "Add Icon",
      editMode: "Edit Mode",

      // Window title bar / actions
      minimize: "Minimize",
      maximize: "Maximize",
      restore: "Restore",
      close: "Close",

      // Settings Window Tabs
      tabAppearance: "Appearance",
      tabLanguage: "Language",
      tabMiscellaneous: "Miscellaneous",
      tabInformation: "Information",

      // Appearance Tab
      changeBackgroundImage: "Change Background Image",
      enterImageUrl: "Enter Image Url",
      setImage: "Set Image",
      resetToDefault: "Reset to Default",
      removeImage: "Remove Image",
      changeBackgroundColor: "Change Background Color",
      enterHexColor: "Enter Hex Color Code",
      changeStyles: "Change Styles",

      // Language Tab / Settings
      languageSettings: "Language Settings",
      selectLanguage: "Select Interface Language:",
      english: "English",
      russian: "Русский (Russian)",

      // Time format Settings
      timeFormatSettings: "Time Format Settings",
      timeFormat: "Time Format:",
      twelveHour: "12-hour (AM/PM)",
      twentyFourHour: "24-hour",

      // Misc Tab
      changeDraggingGrid: "Change Dragging Grid",

      // Information Tab
      infoTitle: "Windows XP New Tab",
      infoDescription: "This extension was created by Etesam Ansari using React.js, Styled Components, and the XP.css GitHub repo.",
      githubLink: "GitHub Link:",
      firefoxAddonLink: "Firefox Addon Link:",
      chromeAddonLink: "Chrome Addon Link:",

      // Components & Editing
      selectOneComponent: "Select one component to add:",
      addComponent: "Add Component",
      delete: "Delete",
      deleteBoard: "Delete Board",
      deleteIcon: "Delete Icon",

      // Component Types
      componentText: "Text",
      componentImage: "Image",
      componentKanban: "Kanban Board",
      componentYoutube: "YouTube Video",
      componentSearch: "Search Bar",

      // Component Alignment & Options
      textAlign: "Text Align:",
      align: "Align:",
      left: "left",
      center: "center",
      right: "right",
      searchEngine: "Search Engine:",
      searchPlaceholder: "Search {{engine}}",

      // Icon Editing
      imgUrl: "Img Url",
      iconTitle: "Icon Title",
      redirectUrl: "Redirect Url",

      // Default Window Title
      insertTitleHere: "Insert Title Here",

      // Kanban Default Headers & Items
      kanbanToDo: "To Do",
      kanbanDoing: "Doing",
      kanbanDone: "Done",
      kanbanWalkDog: "🐶 Walk the dog",
      kanbanGiveReview: "🖊 Give this app a review",
      kanbanHomework: "📝 Finish my homework",
      addItem: "+ Add item",

      // Banner Messages
      bannerMarkdown: "📝 Did you know that the text component supports markdown syntax?",
      bannerReview: "😉 It would be greatly appreciated if you could write a review for the extension: ",
      bannerTheme: "✨ Did you know that you can switch the theme from Windows XP to Windows 98 or Windows 7 in the settings menu?",
      bannerHere: "here"
    }
  },
  ru: {
    translation: {
      // Пуск / меню
      start: "Пуск",
      administrator: "Администратор",
      settings: "Настройки",
      createNewWindow: "Создать новое окно",
      addIcon: "Добавить значок",
      editMode: "Режим редактирования",

      // Заголовок окна / действия
      minimize: "Свернуть",
      maximize: "Развернуть",
      restore: "Восстановить",
      close: "Закрыть",

      // Вкладки окна настроек
      tabAppearance: "Внешний вид",
      tabLanguage: "Язык",
      tabMiscellaneous: "Разное",
      tabInformation: "О программе",

      // Вкладка «Внешний вид»
      changeBackgroundImage: "Изменить фоновое изображение",
      enterImageUrl: "Введите URL изображения",
      setImage: "Установить",
      resetToDefault: "По умолчанию",
      removeImage: "Удалить фоновое изображение",
      changeBackgroundColor: "Изменить цвет фона",
      enterHexColor: "Введите HEX-код цвета",
      changeStyles: "Изменить стиль оформления",

      // Настройки языка
      languageSettings: "Настройки языка",
      selectLanguage: "Выберите язык интерфейса:",
      english: "English (Английский)",
      russian: "Русский",

      // Настройки формата времени
      timeFormatSettings: "Формат времени",
      timeFormat: "Формат отображения времени:",
      twelveHour: "12-часовой (с AM/PM)",
      twentyFourHour: "24-часовой",

      // Вкладка «Разное»
      changeDraggingGrid: "Шаг сетки перетаскивания",

      // Вкладка «О программе»
      infoTitle: "Windows XP Новая вкладка",
      infoDescription: "Это расширение создано Этесамом Ансари (Etesam Ansari) с использованием React.js, Styled Components и репозитория XP.css на GitHub.",
      githubLink: "Ссылка на GitHub:",
      firefoxAddonLink: "Дополнение Firefox:",
      chromeAddonLink: "Расширение Chrome:",

      // Компоненты и редактирование
      selectOneComponent: "Выберите компонент для добавления:",
      addComponent: "Добавить компонент",
      delete: "Удалить",
      deleteBoard: "Удалить доску",
      deleteIcon: "Удалить значок",

      // Типы компонентов
      componentText: "Текст",
      componentImage: "Изображение",
      componentKanban: "Канбан-доска",
      componentYoutube: "Видео YouTube",
      componentSearch: "Строка поиска",

      // Выравнивание и параметры
      textAlign: "Выравнивание текста:",
      align: "Выравнивание:",
      left: "слева",
      center: "по центру",
      right: "справа",
      searchEngine: "Поисковая система:",
      searchPlaceholder: "Поиск в {{engine}}",

      // Редактирование значков
      imgUrl: "URL изображения",
      iconTitle: "Название значка",
      redirectUrl: "Ссылка для перехода",

      // Название окна по умолчанию
      insertTitleHere: "Введите заголовок",

      // Канбан по умолчанию
      kanbanToDo: "К исполнению",
      kanbanDoing: "В процессе",
      kanbanDone: "Готово",
      kanbanWalkDog: "🐶 Погулять с собакой",
      kanbanGiveReview: "🖊 Оставить отзыв о расширении",
      kanbanHomework: "📝 Сделать домашнее задание",
      addItem: "+ Добавить элемент",

      // Сообщения баннера
      bannerMarkdown: "📝 Знаете ли вы, что текстовый компонент поддерживает синтаксис Markdown?",
      bannerReview: "😉 Мы будем очень благодарны, если вы оставите отзыв о расширении: ",
      bannerTheme: "✨ Знаете ли вы, что в настройках можно переключить тему с Windows XP на Windows 98 или Windows 7?",
      bannerHere: "здесь"
    }
  }
};

const savedLanguage = (() => {
  try {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    return settings && settings.language ? settings.language : null;
  } catch (e) {
    return null;
  }
})();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: savedLanguage || undefined,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
