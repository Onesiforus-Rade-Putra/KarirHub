# KarirHub Next Starter + Backend

Ini adalah **frontend starter yang sama** seperti project sebelumnya, lalu **ditambahkan backend di project yang sama**. Jadi bukan dibuat ulang dari nol.

## Yang ditambahkan
- Next.js API Routes
- Prisma + SQLite
- Login & register sederhana
- Marketplace dari database
- Checkout membuat order ke database
- Profile update ke database
- ATS CV Builder simpan hasil ke database
- AI Photo CV simpan job ke database

## Demo account
- Email: `demo@karirhub.com`
- Password: `password123`

## Cara menjalankan
```bash
npm install
copy .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Jika pakai Git Bash:
```bash
cp .env.example .env
```

Buka di browser:
```text
http://localhost:3000
```

## API utama
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/services`
- `GET /api/services/[id]`
- `GET,POST /api/orders`
- `GET,PUT /api/profile`
- `GET,POST /api/cv`
- `GET,POST /api/photo-jobs`

## Catatan
Ini masih starter backend, jadi belum production-ready:
- password masih plain text
- session masih cookie sederhana
- upload file foto belum disimpan beneran
- export PDF belum dibuat
- seller dashboard belum ditambahkan
