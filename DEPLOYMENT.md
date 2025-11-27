# SIBUFA - Panduan Deployment ke Cloudflare Pages

## Prasyarat

1. **Akun Cloudflare** - Daftar di [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI** - Install dengan: `npm install -g wrangler`
3. **Login Wrangler** - Jalankan: `wrangler login`

## Langkah 1: Persiapan Database D1

### 1.1 Buat Database D1
```bash
cd sibufa
wrangler d1 create sibufa-db
```

Simpan **database_id** yang muncul, lalu update `wrangler.toml`:
```toml
database_id = "xxxx-xxxx-xxxx-xxxx" # Ganti dengan ID yang didapat
```

### 1.2 Jalankan Migrasi Database
```bash
wrangler d1 execute sibufa-db --file=./database/migrate.sql
wrangler d1 execute sibufa-db --file=./database/seed.sql
```

## Langkah 2: Setup KV Namespace (untuk Session)

```bash
wrangler kv:namespace create SESSION_KV
```

Update `wrangler.toml` dengan KV ID yang didapat:
```toml
id = "xxxx-xxxx-xxxx-xxxx" # Ganti dengan KV ID
```

## Langkah 3: Setup R2 Bucket (untuk File Upload)

```bash
wrangler r2 bucket create sibufa-bucket
```

## Langkah 4: Update package.json

Tambahkan script untuk Cloudflare Pages build:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npm run pages:build && wrangler pages dev",
    "deploy": "npm run pages:build && wrangler pages deploy"
  }
}
```

## Langkah 5: Build untuk Cloudflare Pages

```bash
npm run pages:build
```

Ini akan membuat folder `.vercel/output/static` yang kompatibel dengan Cloudflare Pages.

## Langkah 6: Deploy ke Cloudflare Pages

### Opsi A: Deploy via Wrangler CLI (Recommended)

```bash
npm run deploy
```

Atau manual:
```bash
wrangler pages deploy .vercel/output/static --project-name=sibufa
```

### Opsi B: Deploy via Cloudflare Dashboard

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih **Workers & Pages** → **Create Application** → **Pages**
3. Connect ke Git repository Anda (GitHub/GitLab)
4. Atur build settings:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `sibufa`

## Langkah 7: Bind D1, KV, dan R2 di Cloudflare Dashboard

Setelah deploy, tambahkan bindings:

1. Buka project di Cloudflare Dashboard
2. **Settings** → **Functions** → **Bindings**
3. Tambahkan:
   - **D1 Database**: Binding name `DB`, pilih database `sibufa-db`
   - **KV Namespace**: Binding name `SESSION_KV`, pilih namespace yang dibuat
   - **R2 Bucket**: Binding name `BUCKET`, pilih bucket `sibufa-bucket`

## Langkah 8: Set Environment Variables (Opsional)

Jika ada environment variables tambahan:

```bash
wrangler pages secret put VARIABLE_NAME
```

## Verifikasi Deployment

1. Buka URL yang diberikan Cloudflare (contoh: `https://sibufa.pages.dev`)
2. Test fitur:
   - Login/Register
   - Dashboard
   - Transaksi
   - Infak Calculator
   - RAB
   - Laporan

## Troubleshooting

### Error: "D1 binding not found"
- Pastikan binding `DB` sudah ditambahkan di Cloudflare Dashboard
- Restart deployment setelah menambahkan binding

### Error: "Module not found"
- Jalankan `npm install` untuk memastikan semua dependencies terinstall
- Rebuild dengan `npm run pages:build`

### Error: "Build failed"
- Periksa log build untuk error spesifik
- Pastikan semua dependencies ada di `package.json`

## Custom Domain (Opsional)

1. Di Cloudflare Dashboard → **Pages** → Project Anda
2. **Custom domains** → **Set up a custom domain**
3. Ikuti instruksi untuk menambahkan domain Anda

## Update Deployment

Untuk update aplikasi setelah ada perubahan:

```bash
# Build ulang
npm run pages:build

# Deploy ulang
wrangler pages deploy .vercel/output/static --project-name=sibufa
```

Atau jika menggunakan Git integration, cukup push ke repository dan Cloudflare akan auto-deploy.

## Catatan Penting

- **Edge Runtime**: Beberapa fitur Next.js mungkin tidak kompatibel dengan Cloudflare Workers. Pastikan menggunakan `export const runtime = "edge"` di API routes.
- **File Size Limit**: Cloudflare Workers memiliki limit 1MB untuk script size. Jika terlalu besar, pertimbangkan code splitting.
- **Database Migrations**: Untuk update schema database, jalankan migration file baru dengan `wrangler d1 execute`.

## Monitoring

Pantau aplikasi di:
- **Analytics**: Cloudflare Dashboard → Analytics
- **Logs**: `wrangler pages deployment tail`
- **Errors**: Cloudflare Dashboard → Workers & Pages → Logs

---

**Selamat! SIBUFA sekarang online di Cloudflare Pages! 🎉**
