# Exportify (Українська)

[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Експортуйте свої плейлісти Spotify у [CSV](https://uk.wikipedia.org/wiki/CSV), натиснувши на це посилання: [https://exportify.app/](https://exportify.app/).

---

### Читати іншими мовами:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md) | [Русский](README.ru.md) | [Українська](README.uk.md)

---

Як помітили багато користувачів, у клієнті Spotify немає можливості експортувати/архівувати плейлісти для безпечного зберігання. Ця програма надає простий інтерфейс для цього за допомогою [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

**Дані не зберігаються — вся програма працює у браузері.**

## Функції

- ⚙️ Додаткове включення даних про альбоми, виконавців та аудіохарактеристики
- 🎵 **Завантаження музики** (через YouTube) безпосередньо з експортованих плейлістів
- 🔍 Пошук по плейлістах з [розширеним синтаксисом пошуку](#розширений-синтаксис-пошуку) та експорт результатів
- 🌓 Темна тема
- 🗺 Доступно 14 мовами
- 📱 Адаптація для мобільних пристроїв
- ℹ Коротка довідка
- 🚀 [Покращена обробка обмежень (Rate Limiting)](https://github.com/watsonbox/exportify/pull/75) для швидкого експорту
- 👩‍💻 Сучасний [React-стек](#стек) + тести

## Використання

1. Запустіть [програму](https://exportify.app/)
2. Натисніть 'Get Started'
3. Надайте Exportify доступ на читання ваших плейлістів
4. Натисніть кнопку 'Export', щоб експортувати плейліст

### Завантаження музики

Exportify тепер підтримує завантаження музичних треків безпосередньо з ваших плейлістів. Ця функція використовує `yt-dlp` для пошуку найкращої якості звуку на YouTube, конвертує його у FLAC та вбудовує метадані та обкладинку альбому.

1. Переконайтеся, що сервер запущено (див. [Розробка](#розробка))
2. Натисніть кнопку 'Download Music' поруч із плейлістом
3. Слідкуйте за прогресом у правому нижньому куті
4. По завершенні автоматично завантажиться zip-архів з усіма треками

**Примітка:** Для цієї функції потрібні Python 3, `yt-dlp` та `FFmpeg`.

## Швидкий старт (Windows)

Якщо ви використовуєте Windows, ви можете скористатися готовими пакетними файлами:

1. **`installers.bat`**: Запустіть першим, щоб встановити **Python 3** та **Node.js**.
2. **`libinstall.bat`**: Запустіть для встановлення необхідних бібліотек.
3. **`oneclickrun.bat`**: Запустіть для одночасного запуску інтерфейсу та сервера.

## Розробка

У директорії проєкту спочатку виконайте `yarn install`.

Для функції завантаження музики вам також знадобляться:
- [Python 3](https://www.python.org/downloads/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg](https://ffmpeg.org/download.html) (Входить до складу `lib/ffmpegWin64` для Windows)
- [Mutagen](https://mutagen.readthedocs.io/en/latest/)

Потім ви можете запустити:

**`yarn dev`**: Запускає фронтенд та бекенд одночасно.
**`yarn start`**: Запускає тільки фронтенд.
**`yarn server`**: Запускає тільки сервер (необхідний для завантаження).
