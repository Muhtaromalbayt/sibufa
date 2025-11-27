# SIBUFA - Quick Start Deployment

## Langkah Cepat Deploy ke Cloudflare

### 1. Install Dependencies
```bash
cd sibufa
npm install
```

### 2. Install Wrangler (jika belum)
```bash
npm install -g wrangler
wrangler login
```

### 3. Buat Database D1
```bash
wrangler d1 create sibufa-db
```
Copy `database_id` yang muncul, update di `wrangler.toml` baris 9.

### 4. Jalankan Migrasi
```bash
wrangler d1 execute sibufa-db --file=./database/migrate.sql
wrangler d1 execute sibufa-db --file=./database/seed.sql
```

### 5. Buat KV Namespace
```bash
wrangler kv:namespace create SESSION_KV
```
Copy `id` yang muncul, update di `wrangler.toml` baris 13.

### 6. Buat R2 Bucket
```bash
wrangler r2 bucket create sibufa-bucket
```

### 7. Build & Deploy
```bash
npm run deploy
```

### 8. Bind Resources di Dashboard
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → pilih project `sibufa`
3. **Settings** → **Functions** → **Bindings**
4. Tambahkan:
   - D1: `DB` → `sibufa-db`
   - KV: `SESSION_KV` → pilih namespace
   - R2: `BUCKET` → `sibufa-bucket`

### 9. Akses Aplikasi
URL akan muncul setelah deployment selesai (contoh: `https://sibufa.pages.dev`)

---

Untuk panduan lengkap, lihat [DEPLOYMENT.md](./DEPLOYMENT.md)
