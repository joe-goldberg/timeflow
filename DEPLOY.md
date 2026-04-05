# TimeFlow — Deployment Guide 🚀

## Apa Itu TimeFlow?
PWA (Progressive Web App) time tracker yang bisa di-**install kayak native app** di HP dan laptop. Data tersimpan di localStorage masing-masing device — tidak ada server, tidak ada login, privasi penuh.

---

## Arsitektur & Data Storage

```
┌─────────────────────────────────────────────┐
│  Device A (HP Bams)                         │
│  ┌──────────────┐   ┌──────────────────┐    │
│  │  TimeFlow    │──▶│  localStorage    │    │
│  │  PWA         │   │  (data Bams)     │    │
│  └──────────────┘   └──────────────────┘    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Device B (HP Istri)                        │
│  ┌──────────────┐   ┌──────────────────┐    │
│  │  TimeFlow    │──▶│  localStorage    │    │
│  │  PWA         │   │  (data Istri)    │    │
│  └──────────────┘   └──────────────────┘    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Device C (Laptop Kantor)                   │
│  ┌──────────────┐   ┌──────────────────┐    │
│  │  TimeFlow    │──▶│  localStorage    │    │
│  │  PWA         │   │  (data Kantor)   │    │
│  └──────────────┘   └──────────────────┘    │
└─────────────────────────────────────────────┘

Data 100% di device masing-masing.
Tidak pernah ke server. Tidak bercampur.
```

### Kenapa localStorage aman untuk multi-user?
- Setiap browser/device punya localStorage **terpisah**
- Meskipun buka URL yang sama, data **tidak pernah bercampur**
- Seperti buku catatan pribadi di setiap HP — isi berbeda walau bukunya sama

### Limitasi
- Data tidak sync antar device (HP dan laptop data berbeda)
- Kalau clear browser data, tracking hilang
- Storage ~5-10MB per device (cukup untuk bertahun-tahun tracking)

---

## Cara Deploy

### Opsi 1: Netlify (Paling Gampang — 2 Menit) ⭐

1. Buka https://app.netlify.com
2. Login dengan GitHub/email
3. **Drag & drop** folder `timeflow/` ke halaman Netlify
4. Selesai! Dapat URL seperti `https://timeflow-abc123.netlify.app`
5. (Opsional) Setting custom domain di Netlify dashboard

### Opsi 2: GitHub Pages (Gratis, Git-based)

```bash
# 1. Buat repo baru di GitHub
# 2. Push files
cd timeflow
git init
git add .
git commit -m "TimeFlow PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/timeflow.git
git push -u origin main

# 3. Di GitHub → Settings → Pages → Source: main branch
# 4. Tunggu 1-2 menit, akses di https://USERNAME.github.io/timeflow
```

### Opsi 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd timeflow
vercel

# Ikuti prompt, selesai!
```

---

## Cara Install di HP sebagai App

### Android (Chrome)
1. Buka URL TimeFlow di Chrome
2. Ketuk **⋮** (menu) → **"Install app"** atau **"Add to Home Screen"**
3. TimeFlow muncul di home screen seperti app biasa!

### iPhone (Safari)
1. Buka URL di **Safari** (harus Safari, bukan Chrome)
2. Ketuk **Share** (ikon kotak + panah atas)
3. Scroll dan ketuk **"Add to Home Screen"**
4. TimeFlow muncul di home screen!

### Desktop (Chrome/Edge)
1. Buka URL di Chrome
2. Klik ikon **install** di address bar (⊕)
3. Atau: Menu → "Install TimeFlow"

---

## Share ke Keluarga/Teman

Cukup **kirim URL** via WhatsApp/chat:
```
Hei, coba app ini buat tracking waktu kamu:
https://timeflow-xxx.netlify.app

Bisa di-install kayak app biasa di HP!
```

Setiap orang yang buka URL tersebut:
- ✅ Punya data sendiri (localStorage terpisah)
- ✅ Bisa install sebagai app di HP
- ✅ Bisa pilih bahasa ID/EN
- ✅ Bisa pakai offline (setelah pertama kali load)
- ❌ Data TIDAK sync antar device

---

## File Structure

```
timeflow/
├── index.html      ← App utama (semua JS/CSS inline)
├── manifest.json   ← PWA manifest (nama, icon, theme)
├── sw.js           ← Service worker (offline support)
├── icon-192.png    ← App icon 192x192
├── icon-512.png    ← App icon 512x512
└── DEPLOY.md       ← File ini
```

---

## FAQ

**Q: Kalau HP hilang, data ikut hilang?**
A: Ya. Untuk backup, nanti bisa ditambah fitur "Export to JSON".

**Q: Bisa sync antar device?**
A: Saat ini belum. Kalau nanti mau, tinggal tambah Supabase/Firebase.

**Q: Berapa orang yang bisa pakai?**
A: Unlimited — tiap orang buka URL, data di device masing-masing.

**Q: AI Insights butuh internet?**
A: Ya, fitur AI butuh koneksi untuk call Claude API. Tracking biasa tetap offline.

**Q: Aman nggak datanya?**
A: Data hanya di device kamu. Tidak ada server yang menyimpan. Yang paling aman.
