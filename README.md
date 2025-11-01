# UTS Pengembangan Aplikasi Web - News Portal (Studi Kasus 4)

Ini adalah *repository* untuk proyek Ujian Tengah Semester (UTS) mata kuliah IF25-22014 - Pengembangan Aplikasi Web.

## 👤 Identitas Mahasiswa

* **Nama:** Habbi Widagdo
* **NIM:** 123140204
* **Mata Kuliah:** IF25-22014 - Pengembangan Aplikasi Web

---

## 🚀 Link Demo Vercel

Aplikasi ini telah di-deploy ke Vercel dan dapat diakses secara publik melalui link berikut:

➡️ **Link:** [https://uts-pemweb-123140204.vercel.app/](https://uts-pemweb-123140204.vercel.app/)

*(Catatan: Pastikan Anda mengganti link di atas dengan URL Vercel Anda yang sebenarnya setelah proses deployment berhasil).*

---

## 📖 Deskripsi Proyek

Aplikasi ini adalah portal berita sederhana yang dibuat sebagai bagian dari Studi Kasus 4 UTS. Aplikasi ini mengambil data artikel berita secara dinamis dari **NewsAPI.org** dan memungkinkan pengguna untuk memfilter serta mencari berita.

Proyek ini dibangun menggunakan **ReactJS (via Vite)** dan di-styling menggunakan **React Bootstrap**.

## ✨ Fitur-fitur

Aplikasi ini telah mengimplementasikan semua fitur yang disyaratkan dalam soal UTS:

1.  **Navigasi Kategori:** Pengguna dapat memfilter berita berdasarkan kategori populer (General, Technology, Business, Sports, dll.) yang diambil dari endpoint `top-headlines`.
2.  **Form Pencarian (Keyword):** Sebuah *form* untuk mencari artikel berdasarkan *keyword* apa pun (menggunakan endpoint `everything`).
3.  **Filter Tanggal:** Sebuah *date-picker* yang dapat digunakan bersamaan dengan pencarian *keyword* untuk memfilter artikel pada tanggal tertentu.
4.  **Tampilan Kartu Dinamis:** Daftar berita ditampilkan dalam bentuk *Card* (memenuhi syarat "Tabel") yang responsif dan dinamis, menampilkan gambar, judul, sumber, dan tanggal publikasi.
5.  **Pagination:** Implementasi navigasi "Previous" & "Next" serta *dropdown* untuk mengubah jumlah artikel per halaman (*page size*).
6.  **Responsive Design:** Tata letak aplikasi (Navbar, Form, dan Grid Kartu) sepenuhnya responsif berkat *grid system* dari Bootstrap.
7.  **Loading & Error Handling:** Menampilkan *spinner* saat data sedang diambil dan *alert* yang informatif jika terjadi kesalahan (misal: API limit tercapai, API key salah, atau tidak ada hasil).
8.  **Environment Variables:** API Key untuk NewsAPI disimpan dengan aman di file `.env.local` dan tidak di-*hardcode* ke dalam kode.

---

## 🛠️ Teknologi yang Digunakan

* **ReactJS (Vite)**
* **React Hooks** (`useState`, `useEffect`)
* **React Bootstrap & Bootstrap 5** (untuk Komponen UI dan Styling)
* **Fetch API** (untuk HTTP Client)
* **NewsAPI.org** (sebagai sumber data)
* **Vercel** (untuk Deployment)

---

## 💻 Cara Menjalankan di Lokal

Untuk menjalankan proyek ini di *local device* Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/habbiwidagdo/uts-pemweb-123140204.git](https://github.com/habbiwidagdo/uts-pemweb-123140204.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd uts-pemweb-123140204
    ```

3.  **Install semua dependencies:**
    ```bash
    npm install
    ```

4.  **Buat file `.env.local`**
    Buat file baru bernama `.env.local` di *root* folder proyek dan tambahkan API Key Anda dari [newsapi.org](https://newsapi.org/).

    ```
    VITE_NEWS_API_KEY=MASUKKAN_API_KEY_ANDA_DI_SINI
    ```

5.  **Jalankan development server:**
    ```bash
    npm run dev
    ```

6.  Buka [http://localhost:5173](http://localhost:5173) (atau alamat yang tertera di terminal) di browser Anda.