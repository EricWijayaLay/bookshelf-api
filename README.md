# 📚 Bookshelf API

A simple RESTful API for managing a book collection, built using **Node.js** and **Hapi.js**. This project was created as part of a submission for Dicoding.

---

## 🚀 How to Run This Project

1. **Install Node.js**
   - Kunjungi https://nodejs.org/en/download  
   - Download versi **LTS** (Windows Installer `.msi`)  
   - Jalankan installer dan **centang opsi "Add to PATH"**  
   - Setelah instalasi, buka Command Prompt lalu ketik:
     ```bash
     node -v
     npm -v
     ```
   - Jika versi tampil, berarti instalasi sukses ✅

2. **Clone atau Masuk ke Folder Proyek**
   - Jika belum clone:
     ```bash
     git clone https://github.com/EricWijayaLay/bookshelf-api.git
     cd bookshelf-api
     ```
   - Jika folder sudah ada:
     ```bash
     cd C:\Users\ericw\Downloads\dicoding\Github\bookshelf-api
     ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Jalankan server**
   ```bash
   npm start
   ```
   - jika berhasil akan muncul :
   ```bash
   Server running on http://localhost:9000
   ```
5. **Test endpoint via postman**
    - Base URL: http://localhost:9000
    - Endpoint yang tersedia:
        - POST /books
        - GET /books
        - GET /books/{id}
        - PUT /books/{id}
        - DELETE /books/{id}
6. **Terminated server**
     ```bash
    ctrl+c
    y
    ```
