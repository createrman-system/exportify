# Exportify (العربية)

[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

قم بتصدير قوائم تشغيل Spotify الخاصة بك إلى ملف [CSV](https://ar.wikipedia.org/wiki/قيم_مفصول_بفاصلة) بالنقر فوق هذا الرابط: [https://exportify.app/](https://exportify.app/).

---

### القراءة بلغات أخرى:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## المميزات

- ⚙️ تضمين اختياري لبيانات الألبوم والفنان وخصائص الصوت
- 🎵 **تحميل الموسيقى** (عبر يوتيوب) مباشرة من قوائم التشغيل المصدرة
- 🔍 البحث في قوائم التشغيل باستخدام [صيغة البحث المتقدمة](#صيغة-البحث-المتقدمة)
- 🌓 الوضع الليلي
- 🗺 متوفر بـ 12 لغة
- 📱 متوافق مع الهواتف المحمولة
- 🚀 معالجة متقدمة لقيود المعدل

## تحميل الموسيقى

يدعم Exportify الآن تحميل المسارات الموسيقية مباشرة من قوائم التشغيل الخاصة بك. تستخدم هذه الميزة `yt-dlp` للعثور على أفضل جودة صوت على YouTube، وتحويلها إلى تنسيق FLAC، ودمج البيانات الوصفية وصور الألبوم.

1. تأكد من تشغيل خادم الخلفية (انظر [التطوير](#التطوير))
2. انقر فوق الزر 'Download Music' بجانب أي قائمة تشغيل
3. راقب التقدم في الزاوية اليمنى السفلية
4. بمجرد الانتهاء، سيتم تحميل ملف zip يحتوي على جميع المسارات تلقائيًا

**ملاحظة:** تتطلب هذه الميزة تثبيت Python 3 و `yt-dlp` و `FFmpeg`.

## البدء السريع (Windows)

إذا كنت تستخدم Windows، يمكنك استخدام ملفات الـ batch المتوفرة:

1. **`installers.bat`**: قم بتثبيت **Python 3** و **Node.js**.
2. **`libinstall.bat`**: قم بتثبيت المكتبات اللازمة.
3. **`oneclickrun.bat`**: قم بتشغيل التطبيق والخادم معًا.

## التطوير

**`yarn dev`**: يقوم بتشغيل الواجهة الأمامية والخلفية في وقت واحد.
**`yarn start`**: يقوم بتشغيل تطبيق الواجهة الأمامية فقط.
**`yarn server`**: يقوم بتشغيل خادم الخلفية فقط.
