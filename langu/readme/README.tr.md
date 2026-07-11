# Exportify (Türkçe)

[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Spotify çalma listelerinizi [CSV](https://tr.wikipedia.org/wiki/Virgülle_ayrılmış_değerler) formatında dışa aktarmak için bu bağlantıya tıklayın: [https://exportify.app/](https://exportify.app/).

---

### Diğer dillerde oku:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Özellikler

- ⚙️ İsteğe bağlı albüm, sanatçı ve ses özelliği verilerini dahil etme
- 🎵 Dışa aktarılan çalma listelerinden doğrudan **müzik indirme** (YouTube üzerinden)
- 🔍 [Gelişmiş arama sözdizimi](#gelişmiş-arama-sözdizimi) ile çalma listesi arama
- 🌓 Karanlık mod
- 🗺 12 dilde mevcut
- 📱 Mobil uyumlu
- 🚀 Hızlı dışa aktarma için gelişmiş hız sınırı yönetimi

## Müzik İndirme

Exportify artık çalma listelerinizden doğrudan müzik parçalarını indirmeyi destekliyor. Bu özellik, YouTube'daki en iyi ses kalitesini bulmak için `yt-dlp` kullanır, FLAC formatına dönüştürür ve meta veriler ile albüm resmini ekler.

1. Arka uç sunucusunun çalıştığından emin olun (bkz. [Geliştirme](#geliştirme))
2. Herhangi bir çalma listesinin yanındaki 'Download Music' düğmesine tıklayın
3. Sağ alt köşedeki ilerlemeyi takip edin
4. Tamamlandığında, tüm parçaları içeren bir zip dosyası otomatik olarak indirilecektir

**Not:** Bu özellik için sisteminizde Python 3, `yt-dlp` ve `FFmpeg` kurulu olmalıdır.

## Hızlı Başlangıç (Windows)

Windows kullanıyorsanız, sağlanan toplu iş dosyalarını kullanabilirsiniz:

1. **`installers.bat`**: **Python 3** ve **Node.js** kurulumu için çalıştırın.
2. **`libinstall.bat`**: Gerekli kütüphaneleri kurmak için çalıştırın.
3. **`oneclickrun.bat`**: Uygulamayı ve sunucuyu aynı anda başlatmak için çalıştırın.

## Geliştirme

**`yarn dev`**: Ön uç ve arka ucu aynı anda başlatır.
**`yarn start`**: Sadece ön uç uygulamasını başlatır.
**`yarn server`**: Sadece arka uç sunucusunu başlatır.
