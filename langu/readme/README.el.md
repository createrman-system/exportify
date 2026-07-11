[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Εξάγετε τις λίστες αναπαραγωγής σας από το Spotify σε μορφή [CSV](https://el.wikipedia.org/wiki/CSV) κάνοντας κλικ σε αυτόν τον σύνδεσμο: [https://exportify.app/](https://exportify.app/).

---

### Διαβάστε σε άλλες γλώσσες:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

## Χαρακτηριστικά

- ⚙️ Προαιρετική συμπερίληψη δεδομένων άλμπουμ, καλλιτέχνη και ηχητικών χαρακτηριστικών
- 🎵 **Λήψη μουσικής** (μέσω YouTube) απευθείας από τις εξαγόμενες λίστες
- 🔍 Αναζήτηση λίστας αναπαραγωγής με [προηγμένη σύνταξη αναζήτησης](#προηγμένη-σύνταξη-αναζήτησης)
- 🌓 Σκοτεινή λειτουργία
- 🗺 Διαθέσιμο σε 12 γλώσσες
- 📱 Φιλικό προς κινητά
- ℹ Γρήγορη βοήθεια
- 🚀 Προηγμένη διαχείριση ορίων ρυθμού (Rate limiting)
- 👩‍💻 Σύγχρονη στοίβα ανάπτυξης [React-based](#stack)

## Λήψη Μουσικής

Το Exportify υποστηρίζει πλέον τη λήψη μουσικών κομματιών απευθείας από τις λίστες αναπαραγωγής σας. Αυτή η λειτουργία χρησιμοποιεί το `yt-dlp` για να βρει την καλύτερη ποιότητα ήχου στο YouTube, την μετατρέπει σε FLAC και ενσωματώνει μεταδεδομένα και το εξώφυλλο του άλμπουμ.

1. Βεβαιωθείτε ότι ο διακομιστής backend εκτελείται (δείτε [Ανάπτυξη](#ανάπτυξη))
2. Κάντε κλικ στο κουμπί 'Download Music' δίπλα σε οποιαδήποτε λίστα
3. Παρακολουθήστε την πρόοδο στην κάτω δεξιά γωνία
4. Μόλις ολοκληρωθεί, ένα αρχείο zip που περιέχει όλα τα κομμάτια θα ληφθεί αυτόματα

**Σημείωση:** Αυτή η λειτουργία απαιτεί Python 3, `yt-dlp` και `FFmpeg`.

## Γρήγορη Εκκίνηση (Windows)

Αν είστε σε Windows, μπορείτε να χρησιμοποιήσετε τα παρεχόμενα αρχεία batch:

1. **`installers.bat`**: Εγκατάσταση **Python 3** και **Node.js**.
2. **`libinstall.bat`**: Εγκατάσταση απαραίτητων βιβλιοθηκών.
3. **`oneclickrun.bat`**: Εκκίνηση frontend και backend ταυτόχρονα.

## Ανάπτυξη

**`yarn dev`**: Εκκινεί ταυτόχρονα το frontend και το backend.
**`yarn start`**: Εκκινεί μόνο την εφαρμογή frontend.
**`yarn server`**: Εκκινεί μόνο τον διακομιστή backend.
