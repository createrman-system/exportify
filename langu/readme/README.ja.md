# Exportify (日本語)

[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

このリンクをクリックして、Spotifyプレイリストを[CSV](https://ja.wikipedia.org/wiki/Comma-Separated_Values)にエクスポートします: [https://exportify.app/](https://exportify.app/)。

---

### 他の言語で読む:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## 特徴

- ⚙️ アルバム、アーティスト、オーディオ機能データのオプション追加
- 🎵 エクスポートしたプレイリストから直接**音楽をダウンロード** (YouTube経由)
- 🔍 [高度な検索構文](#高度な検索構文)を使用したプレイリスト検索
- 🌓 ダークモード
- 🗺 12言語に対応
- 📱 モバイル対応
- 🚀 高度なレート制限処理

## 音楽のダウンロード

Exportifyは、プレイリストから直接音楽トラックをダウンロードできるようになりました。この機能は `yt-dlp` を使用してYouTubeで最高の音質を見つけ、FLACに変換し、メタデータとアルバムアートを埋め込みます。

1. バックエンドサーバーが起動していることを確認してください（[開発](#開発)を参照）
2. プレイリストの横にある 'Download Music' ボタンをクリックします
3. 右下の進捗状況を監視します
4. 完了すると、すべてのトラックを含むzipファイルが自動的にダウンロードされます

**注意:** この機能には Python 3、`yt-dlp`、および `FFmpeg` のインストールが必要です。

## クイックスタート (Windows)

Windowsを使用している場合は、提供されているバッチファイルを使用できます。

1. **`installers.bat`**: **Python 3** と **Node.js** をインストールします。
2. **`libinstall.bat`**: 必要なライブラリをインストールします。
3. **`oneclickrun.bat`**: アプリとサーバーを同時に起動します。

## 開発

**`yarn dev`**: フロントエンドとバックエンドを同時に起動します。
**`yarn start`**: フロントエンドアプリのみを起動します。
**`yarn server`**: バックエンドサーバーのみを起動します。
