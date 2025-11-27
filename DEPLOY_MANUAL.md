# SIBUFA - Deployment Manual via Cloudflare Dashboard

Karena ada beberapa kendala dengan build otomatis, berikut cara deploy manual yang lebih mudah:

## Langkah 1: Push ke GitHub

1. Buat repository baru di GitHub
2. Push project ini:
```bash
cd sibufa
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/sibufa.git
git push -u origin main
```

## Langkah 2: Deploy via Cloudflare Dashboard

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Klik **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**
3. Pilih repository `sibufa`
4. Konfigurasi build:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: (kosongkan atau `sibufa` jika ada subfolder)

5. Klik **Save and Deploy**

## Langkah 3: Buat D1 Database via Dashboard

1. Di Cloudflare Dashboard → **Workers & Pages** → **D1**
2. **Create database** → Nama: `sibufa-db`
3. Setelah dibuat, klik database → **Console**
4. Copy-paste isi file `database/migrate.sql` → Execute
5. Copy-paste isi file `database/seed.sql` → Execute

## Langkah 4: Buat KV Namespace

1. **Workers & Pages** → **KV**
2. **Create namespace** → Nama: `sibufa-session`

## Langkah 5: Buat R2 Bucket

1. **R2** → **Create bucket** → Nama: `sibufa-bucket`

## Langkah 6: Bind Resources ke Pages Project

1. Kembali ke **Workers & Pages** → Pilih project `sibufa`
2. **Settings** → **Functions** → **Bindings**
3. **Add binding**:
   - **D1 Database**: Variable name `DB`, pilih `sibufa-db`
   - **KV Namespace**: Variable name `SESSION_KV`, pilih `sibufa-session`
   - **R2 Bucket**: Variable name `BUCKET`, pilih `sibufa-bucket`
4. **Save**

## Langkah 7: Redeploy

Setelah menambahkan bindings, redeploy project:
- **Deployments** → **View build** → **Retry deployment**

## Akses Aplikasi

URL akan tersedia di: `https://sibufa.pages.dev`

## Troubleshooting

### Build Error: "Module not found"
- Pastikan semua dependencies ada di `package.json`
- Coba deploy ulang

### Runtime Error: "Binding not found"
- Periksa binding names harus sama persis: `DB`, `SESSION_KV`, `BUCKET`
- Redeploy setelah menambahkan bindings

### Database Empty
- Jalankan migration dan seed SQL di D1 Console
- Refresh aplikasi

---

**Alternatif: Deploy Lokal untuk Testing**

Jika ingin test lokal dulu:
```bash
npm run dev
```

Akses di `http://localhost:3000`

**Note**: Fitur D1, KV, R2 tidak akan berfungsi di local dev. Hanya bisa test UI.
