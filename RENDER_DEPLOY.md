# Hướng Dẫn Deploy Trên Render

## Vấn Đề 404 Sau Khi Đăng Nhập

Vấn đề bạn gặp phải là do cách Single Page Application (SPA) hoạt động khác nhau giữa môi trường development và production:

- **Trên Replit (development)**: Vite dev server tự động xử lý tất cả routes
- **Trên Render (production)**: Server cần được cấu hình đúng để serve `index.html` cho tất cả SPA routes

## Giải Pháp

### 1. Cấu Hình Render
Trong Render dashboard, cài đặt như sau:

**Build Command:**
```bash
./deploy.sh
```

**Start Command:**
```bash
NODE_ENV=production node dist/index.js
```

### 2. Environment Variables
Đảm bảo bạn đã cài đặt tất cả environment variables cần thiết:
- `DATABASE_URL` - URL kết nối PostgreSQL
- `SESSION_SECRET` - Secret key cho session
- `CLOUDINARY_CLOUD_NAME` (nếu sử dụng)
- `CLOUDINARY_API_KEY` (nếu sử dụng)
- `CLOUDINARY_API_SECRET` (nếu sử dụng)

### 3. Cấu Hình Node.js Version
Trong Render, chọn Node.js version 18 hoặc 20.

### 4. Deploy Steps
1. Push code lên GitHub repo
2. Connect repo với Render
3. Cài đặt build và start commands như trên
4. Thêm environment variables
5. Deploy

## Tại Sao Có Vấn Đề 404?

1. **Development (Replit)**: Khi user đăng nhập thành công, app redirect đến `/home` - Vite dev server tự động serve React app cho mọi route
2. **Production (Render)**: Khi user đăng nhập thành công, browser request `/home` từ server - Server phải được cấu hình để trả về `index.html` thay vì 404

## Script Deploy

File `deploy.sh` đã được tạo để:
1. Build client với Vite → `dist/public/`
2. Build server với esbuild → `dist/index.js`  
3. Copy client files đến `server/public/` (nơi production server tìm kiếm)

## Kiểm Tra

Sau khi deploy thành công:
1. Đăng ký/đăng nhập → không còn 404
2. Routes như `/home`, `/profile`, `/friends` hoạt động bình thường
3. Refresh page ở bất kỳ route nào cũng không bị lỗi

## Debug Logs

Nếu vẫn có vấn đề, kiểm tra logs trong Render dashboard để xem:
- Build process có thành công không
- Server có khởi động đúng không  
- Có lỗi gì trong runtime không