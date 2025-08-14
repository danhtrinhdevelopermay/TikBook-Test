# Hướng Dẫn Deploy Trên Render - Fix 404 Sau Đăng Nhập

## Vấn Đề: 404 Sau Khi Đăng Nhập Thành Công

### Nguyên Nhân Chính
Sau khi đăng nhập thành công trên Render, user bị redirect đến `/home` nhưng gặp trang 404 "Trang không tìm thấy". Vấn đề này xảy ra do:

1. **Session/Cookie không được lưu đúng** trên production
2. **CORS configuration** chưa phù hợp với production environment  
3. **SPA routing** không được xử lý đúng trên static server

## Giải Pháp (ĐÃ CẬP NHẬT)

### 1. Cấu Hình Render 
**Build Command:**
```bash
./deploy.sh
```

**Start Command:**
```bash
NODE_ENV=production node dist/index.js
```

### 2. Environment Variables QUAN TRỌNG
**Bắt buộc phải có:**
- `DATABASE_URL` - URL kết nối PostgreSQL
- `SESSION_SECRET` - **QUAN TRỌNG**: Secret key mạnh cho session (ít nhất 32 ký tự)
- `NODE_ENV=production` - **QUAN TRỌNG**: Đảm bảo app chạy ở production mode

**Tùy chọn:**
- `CLOUDINARY_CLOUD_NAME` (nếu sử dụng upload ảnh)
- `CLOUDINARY_API_KEY` (nếu sử dụng upload ảnh)
- `CLOUDINARY_API_SECRET` (nếu sử dụng upload ảnh)

### 3. Kiểm Tra Session Secret
Trong Render dashboard, đảm bảo `SESSION_SECRET` là một chuỗi mạnh:
```bash
# Tạo session secret mạnh (chạy local rồi copy):
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

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

## Debug & Troubleshoot

### 1. Kiểm Tra Logs Render
Trong Render dashboard → Logs, tìm các debug messages:

**✅ Authentication thành công:**
```
=== SIGNIN DEBUG ===
✅ Session created:
Session ID: xxxx
Session userId: xxxx
```

**❌ Authentication thất bại:**
```
=== GET /api/users/me DEBUG ===
❌ No session userId found, sending 401
```

### 2. Kiểm Tra Environment Variables
Đảm bảo tất cả env vars được set đúng:
```bash
# Trong Render Settings → Environment Variables
DATABASE_URL=postgresql://...
SESSION_SECRET=your-strong-secret-64-chars
NODE_ENV=production
```

### 3. Kiểm Tra HTTPS
Render tự động cung cấp HTTPS. Đảm bảo:
- Website chạy trên `https://your-app.onrender.com` 
- Không có mixed content warnings
- Cookies được set với `secure: true`

### 4. Test Session Persistence
1. Đăng nhập thành công 
2. Mở DevTools → Application → Cookies
3. Kiểm tra cookie `sessionId` có tồn tại không
4. Refresh trang → kiểm tra vẫn đăng nhập

### 5. Nếu Vẫn Lỗi
1. Kiểm tra Render logs cho debug messages
2. Đảm bảo build command và start command đúng
3. Verify DATABASE_URL kết nối được
4. Kiểm tra sessions table trong database có data không

## Kết Luận

Các fix đã implement:
- ✅ Session configuration với `sameSite: 'strict'` 
- ✅ CORS setup cho same-domain requests
- ✅ Debug logging cho production troubleshooting
- ✅ Build script copy static files đúng chỗ

Sau khi deploy với các fix này, issue 404 sau login sẽ được giải quyết.