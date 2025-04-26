# Manajemen Bimbel - Frontend

Ini adalah frontend dari aplikasi **Manajemen Bimbel** yang dibuat menggunakan Next.js + Tailwind CSS.

---

## 🎯 Fitur

- ✅ Autentikasi (Sign In, Sign Up)
- ✅ Fitur Lupa Password + OTP + Reset Password
- ✅ Manajemen UI untuk Siswa, Tutor, Admin (dalam pengembangan)
- ✅ Ilustrasi modern & UI interaktif berbasis TailwindCSS
- Coming Soon

---

## 📐 Link Penting

- 🎨 [Desain UI Figma](https://www.figma.com/design/xJptZfx4oK4eYOSoDRPeAE/UI-UX-LMS---Gluon-IT?node-id=0-1&t=0Rk034BKqJzwQqM3-1)
- 🛠️ [Repository Backend (Django)](https://github.com/rahmanfaisal0414/backend_bimbel)

---

# 🚀 Cara Install & Jalankan

Ikuti langkah berikut untuk menjalankan project ini secara lokal:

### 1. Clone Repository

```bash
git clone https://github.com/rahmanfaisal0414/manajemen-bimbel.git
```
### 2. Masuk ke Direktori Project

Setelah cloning selesai, masuk ke folder project:

```bash
cd manajemen-bimbel
```
### 3. Install Dependencies

Install semua library dan package yang dibutuhkan:

```bash
npm install
```

### 4. Setup Environment Variables

Buat file baru .env.local di dalam root project. Isi dengan konfigurasi berikut:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Manajemen Bimbel
```

Catatan:

Pastikan backend (API Django) sudah aktif di localhost:8000.

Jika backend berjalan di port atau URL lain, sesuaikan NEXT_PUBLIC_API_URL di .env.local.

### 5. Jalankan Development Server

Untuk menjalankan server development:

```bash
npm run dev
```

