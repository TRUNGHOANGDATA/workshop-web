# Workshop Landing Page - Tài Liệu Dự Án Chi Tiết

Tài liệu hướng dẫn toàn bộ quy trình xây dựng, triển khai và tuỳ biến Website Landing Page cho các Workshop của ERX Vietnam.

## Thông Tin Dự Án

- Tên dự án: Workshop Landing Page
- Công nghệ: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Repository: https://github.com/TRUNGHOANGDATA/workshop-web
- Domain: workshop.erx.vn
- Hosting: Vercel (tự động deploy khi push code lên GitHub)
- Ngày khởi tạo: 24/02/2026

## Cấu Trúc Thư Mục Dự Án

```
workshop-web/
├── public/                  # Tài nguyên tĩnh (logo, ảnh diễn giả)
│   ├── ERX_LOGO.png         # Logo ERX Vietnam
│   └── hoang-trung.jpg      # Ảnh diễn giả (thêm ảnh tại đây)
├── src/
│   ├── app/
│   │   ├── globals.css      # CSS toàn cục, design tokens
│   │   ├── layout.tsx       # Layout chính (metadata, font)
│   │   └── page.tsx         # Trang chủ - ghép các component
│   └── components/
│       ├── Navbar.tsx        # Thanh điều hướng cố định
│       ├── Hero.tsx          # Banner chính, thông tin sự kiện
│       ├── About.tsx         # Tổng quan lợi ích workshop
│       ├── SessionCard.tsx   # Card hiển thị nội dung từng phần
│       ├── Audience.tsx      # Đối tượng tham dự
│       ├── RegistrationForm.tsx  # Form đăng ký + thanh toán QR
│       ├── FloatingActions.tsx   # Nút Zalo, Messenger, scroll top
│       └── Footer.tsx        # Chân trang
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Hướng Dẫn Cài Đặt Từ Đầu (Step-by-Step)

### Bước 1: Clone dự án từ GitHub

```bash
git clone https://github.com/TRUNGHOANGDATA/workshop-web.git
cd workshop-web
```

### Bước 2: Cài đặt các thư viện phụ thuộc

```bash
npm install
```

### Bước 3: Chạy dự án trên máy local

```bash
npm run dev
```

Truy cập http://localhost:3000 để xem kết quả.

### Bước 4: Build bản Production (kiểm tra lỗi)

```bash
npm run build
```

### Bước 5: Deploy lên Vercel

- Push code lên GitHub (git push).
- Truy cập https://vercel.com, đăng nhập, import repository từ GitHub.
- Vercel sẽ tự động detect là Next.js project và deploy.
- Sau mỗi lần git push, Vercel sẽ tự động re-deploy bản mới nhất.

### Bước 6: Cấu hình tên miền tuỳ chỉnh

- Trên Vercel Dashboard, vào Settings > Domains, thêm tên miền (VD: workshop.erx.vn).
- Vercel sẽ yêu cầu thêm 2 bản ghi DNS tại nhà cung cấp tên miền (CNAME + TXT).
- Sau khi thêm bản ghi, đợi 5-30 phút để DNS propagation hoàn tất.
- Vercel sẽ tự động cấp chứng chỉ SSL (HTTPS).

## Cấu Trúc Các Component

### 1. Navbar (Navbar.tsx)

- Thanh điều hướng cố định trên cùng.
- Tự động đổi màu nền khi cuộn trang (trong suốt -> mờ).
- Menu responsive: desktop hiển thị ngang, mobile hiển thị dạng drawer.
- Tuỳ biến: Thay đổi mảng navLinks để thêm/bớt mục menu.

### 2. Hero (Hero.tsx)

- Banner chính hiển thị tiêu đề workshop, ngày giờ, địa điểm.
- Nút CTA tự động thay đổi theo cấu hình ALLOW_REGISTRATION.
- Bên phải có mô phỏng giao diện IDE (hiệu ứng decorative).
- Tuỳ biến: Thay đổi tiêu đề, ngày giờ, địa điểm trực tiếp trong JSX.

### 3. About (About.tsx)

- Hiển thị 3 lợi ích nổi bật của workshop.
- Mỗi lợi ích có icon, tiêu đề và mô tả.
- Tuỳ biến: Thay đổi mảng benefits để thay đổi nội dung 3 card.

### 4. SessionCard (SessionCard.tsx)

- Card chi tiết cho từng phần trình bày (Part 01, Part 02,...).
- Hiển thị: tên diễn giả, vai trò, ảnh đại diện, mô tả, danh sách agenda.
- Hỗ trợ prop speakerImage để hiển thị ảnh thật thay vì placeholder chữ cái.
- Tuỳ biến: Thêm SessionCard mới trong page.tsx để thêm phần trình bày.

### 5. Audience (Audience.tsx)

- Hiển thị 4 đối tượng mục tiêu phù hợp tham dự workshop.
- Tuỳ biến: Thay đổi mảng audiences để điều chỉnh đối tượng.

### 6. RegistrationForm (RegistrationForm.tsx)

- Form đăng ký với 3 trường: Họ tên, Email, Số điện thoại.
- Tích hợp Google Apps Script để lưu dữ liệu vào Google Sheets.
- Hỗ trợ mã giảm giá (DISCOUNT_CODES).
- Hiển thị QR thanh toán ngân hàng (VietQR).
- Giới hạn số lượng đăng ký (MAX_ATTENDEES).
- Chế độ "Chỉ liên hệ" khi ALLOW_REGISTRATION = false.
- Đây là component quan trọng nhất với nhiều tuỳ biến nhất.

### 7. FloatingActions (FloatingActions.tsx)

- 3 nút nổi ở góc phải màn hình: Zalo, Messenger, Scroll to Top.
- Tuỳ biến: Thay đổi link Zalo và Messenger.

### 8. Footer (Footer.tsx)

- Chân trang với logo, địa chỉ, liên kết pháp lý.

## Hướng Dẫn Tuỳ Biến Cho Workshop Mới

### A. Cấu hình nhanh trong RegistrationForm.tsx (Dòng 8-24)

Đây là "bảng điều khiển" chính của website. Mỗi lần tổ chức workshop mới, bạn chỉ cần chỉnh các biến ở đầu file này:

```typescript
// URL Google Apps Script nhận dữ liệu đăng ký
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/xxx/exec";

// Bật/tắt form đăng ký (false = chỉ hiển thị nút Liên Hệ info@erx.vn)
export const ALLOW_REGISTRATION: boolean = false;

// Giá vé (0 = Miễn phí, > 0 = có phí tính bằng VNĐ)
export const PRICE: number = 0;

// Giới hạn người đăng ký
const MAX_ATTENDEES = 20;

// Thông tin ngân hàng cho QR thanh toán (chỉ dùng khi PRICE > 0)
const BANK_ID = "970407";            // Mã ngân hàng
const BANK_ACCOUNT = "896868888888"; // Số tài khoản
const BANK_NAME = "Techcombank";     // Tên ngân hàng
const ACCOUNT_HOLDER = "HOANG TRUNG"; // Tên chủ TK

// Mã giảm giá
const DISCOUNT_CODES = {
    "EARLY50": 50,   // Giảm 50%
    "VIP100": 100,   // Miễn phí hoàn toàn
};
```

### B. Thay đổi thông tin sự kiện trong Hero.tsx

Tìm và sửa trực tiếp các giá trị trong JSX:

- Tiêu đề: "AI Enterprise Workshop 2026" (dòng 28-29)
- Mô tả: Đoạn paragraph bên dưới tiêu đề (dòng 37-41)
- Ngày: "Thứ Bảy, 28/02/2026" (dòng 52)
- Giờ: "14:00 - 17:00" (dòng 62)
- Địa điểm Offline: "ERX VN HQ (46/4 Nguyễn Cửu Vân, HCM)" (dòng 74)
- Địa điểm Online: "Google Meet" (dòng 77)

### C. Thay đổi nội dung chương trình trong page.tsx

Mỗi phần trình bày là một component SessionCard. Để thêm Part 03:

```typescript
<SessionCard
  id="part3"
  partNo="PART 03"
  title="Tên Phần Trình Bày Mới"
  speakerName="Tên Diễn Giả"
  speakerRole="Chức Danh"
  speakerAvatarPlaceholder="T"
  speakerImage="/ten-dien-gia.jpg"
  description="Mô tả ngắn về nội dung phần trình bày."
  agendaItems={[
    "Nội dung 1",
    "Nội dung 2",
    "Nội dung 3"
  ]}
  isReversed={false}
/>
```

- Lưu ảnh diễn giả vào thư mục public/ với tên tương ứng.
- isReversed={true} để đổi layout (ảnh bên trái, nội dung bên phải).

### D. Thay đổi link Zalo / Messenger trong FloatingActions.tsx

```typescript
// Zalo - thay số điện thoại hoặc OA ID
href="https://zalo.me/0902403666"

// Messenger - thay tên page Facebook
href="https://m.me/ERXVietnam"
```

### E. Thay đổi lợi ích (About.tsx) và đối tượng (Audience.tsx)

- About.tsx: Sửa mảng benefits (3 phần tử) gồm icon, title, desc.
- Audience.tsx: Sửa mảng audiences (4 phần tử) gồm icon, title, desc.

### F. Thay logo và hình ảnh

- Thay file public/ERX_LOGO.png bằng logo mới (giữ nguyên tên file).
- Thêm ảnh diễn giả vào public/ và tham chiếu trong page.tsx.

## Quy Trình Cập Nhật Và Deploy

### Cập nhật nội dung

1. Mở project trong IDE (VS Code / Antigravity IDE).
2. Sửa nội dung trong các file component.
3. Kiểm tra trên localhost (npm run dev).
4. Commit và push lên GitHub:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

5. Vercel tự động deploy bản mới trong 1-2 phút.
6. Kiểm tra lại trên workshop.erx.vn.

### Checklist cho workshop mới

- Cập nhật ALLOW_REGISTRATION (true/false)
- Cập nhật PRICE (giá vé)
- Cập nhật MAX_ATTENDEES (giới hạn người)
- Cập nhật GOOGLE_SCRIPT_URL (link Google Sheet mới nếu cần)
- Cập nhật thông tin ngân hàng (nếu có phí)
- Cập nhật mã giảm giá (DISCOUNT_CODES)
- Sửa tiêu đề, ngày giờ, địa điểm trong Hero.tsx
- Sửa nội dung chương trình (SessionCard) trong page.tsx
- Thêm ảnh diễn giả vào public/
- Cập nhật link Zalo/Messenger trong FloatingActions.tsx
- Commit, push, kiểm tra deploy

## Công Nghệ Sử Dụng

- Next.js 14 (App Router): Framework React cho web app hiện đại.
- TypeScript: Kiểu dữ liệu tĩnh, giảm lỗi runtime.
- Tailwind CSS: Utility-first CSS, tùy biến nhanh.
- Framer Motion: Thư viện animation cho React.
- Lucide React: Bộ icon SVG nhẹ và đẹp.
- VietQR API: Tạo mã QR thanh toán ngân hàng tự động.
- Google Apps Script: Backend miễn phí xử lý form đăng ký.
- Vercel: Platform hosting với CI/CD tự động.
- GitHub: Quản lý mã nguồn và version control.

## Hướng Dẫn Upload Tài Liệu Lên Notion (Bất Kỳ Workspace Nào)

Script upload_to_notion.py cho phép đẩy nội dung Markdown lên bất kỳ trang Notion nào. Dưới đây là hướng dẫn chi tiết từ A đến Z.

### Bước 1: Tạo Notion Integration (lấy API Token)

1. Truy cập https://www.notion.so/my-integrations
2. Bấm nút "+ New integration".
3. Đặt tên (VD: "Upload Bot"), chọn đúng Workspace bạn muốn dùng.
4. Bấm "Submit" để tạo xong.
5. Sau khi tạo xong, bạn sẽ thấy mục "Internal Integration Secret" (bắt đầu bằng "ntn_..."). Bấm "Show" rồi "Copy" lại token này. Đây chính là API Token.

> Lưu ý: Mỗi Integration Token chỉ hoạt động trong Workspace mà bạn chọn khi tạo. Nếu muốn upload sang Workspace khác, bạn cần tạo Integration mới cho Workspace đó.

### Bước 2: Chia sẻ trang Notion cho Integration

Đây là bước BẮT BUỘC mà nhiều người hay quên:

1. Mở trang Notion bạn muốn dùng làm trang cha (parent page).
2. Bấm nút "..." (ba chấm) ở góc trên bên phải trang.
3. Chọn "Add connections" (hoặc "Connect to").
4. Tìm tên Integration bạn vừa tạo (VD: "Upload Bot") và bấm chọn.
5. Bấm "Confirm" để xác nhận.

> Nếu bỏ qua bước này, script sẽ báo lỗi 404 "Could not find page" dù Page ID đúng.

### Bước 3: Lấy Page ID của trang cha

Page ID là chuỗi 32 ký tự nằm ở cuối URL trang Notion:

```
https://www.notion.so/Ten-Trang-Cua-Ban-abcdef1234567890abcdef1234567890
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                        Đây chính là Page ID (32 ký tự)
```

Hoặc format gốc có dấu gạch ngang:

```
abcdef12-3456-7890-abcd-ef1234567890
```

Cả hai format (có hoặc không có dấu gạch ngang) đều hoạt động.

Cách lấy nhanh: Mở trang Notion trên trình duyệt > Copy URL > Lấy 32 ký tự cuối cùng (trước dấu ? nếu có).

### Bước 4: Chạy Script Upload

Mở Terminal (PowerShell/CMD) và chạy:

```bash
python "G:\AntiGravity\Tools\upload_to_notion.py" "đường_dẫn_file.md" --title "Tiêu Đề Trang" --token "ntn_xxx" --parent "page_id"
```

Giải thích từng tham số:

- Tham số 1 (bắt buộc): Đường dẫn file Markdown cần upload.
- --title hoặc -t: Tiêu đề trang Notion sẽ tạo. Nếu bỏ trống, script tự lấy tên file.
- --token: API Token lấy ở Bước 1. Nếu bỏ trống, dùng token mặc định trong script.
- --parent: Page ID lấy ở Bước 3. Nếu bỏ trống, dùng parent mặc định trong script.

### Ví Dụ Upload Tài Liệu Workshop

Upload vào page mặc định (Power Query AI):

```bash
python "G:\AntiGravity\Tools\upload_to_notion.py" "G:\AntiGravity\Workshop 2802\workshop-web\docs\workshop_landing_page_guide.md" --title "Workshop Landing Page Guide"
```

Upload vào page Notion khác (VD: Workspace công ty):

```bash
python "G:\AntiGravity\Tools\upload_to_notion.py" "G:\AntiGravity\Workshop 2802\workshop-web\docs\workshop_landing_page_guide.md" --title "Workshop Landing Page Guide" --token "ntn_TOKEN_MOI_CUA_BAN" --parent "PAGE_ID_MOI_CUA_BAN"
```

### Bước 5: Thay đổi giá trị mặc định (Tuỳ chọn)

Nếu bạn thường xuyên upload vào cùng một Workspace, mở file upload_to_notion.py và sửa 2 dòng đầu:

```python
DEFAULT_TOKEN = "ntn_TOKEN_CUA_BAN_O_DAY"
DEFAULT_PARENT_PAGE_ID = "PAGE_ID_CUA_BAN_O_DAY"
```

Sau đó chỉ cần chạy ngắn gọn:

```bash
python "G:\AntiGravity\Tools\upload_to_notion.py" "file.md" --title "Tiêu Đề"
```

### Xử Lý Lỗi Thường Gặp

- Lỗi 401 Unauthorized: Token không hợp lệ hoặc đã hết hạn. Kiểm tra lại token.
- Lỗi 404 Not Found: Page ID sai, hoặc chưa chia sẻ trang cho Integration (xem lại Bước 2).
- Lỗi 400 Bad Request: Nội dung Markdown có ký tự đặc biệt không được Notion hỗ trợ.
- Lỗi kết nối: Kiểm tra kết nối internet.

## Ghi Chú Quan Trọng

- Khi ALLOW_REGISTRATION = false: Toàn bộ form đăng ký sẽ ẩn đi, thay bằng nút "Liên Hệ: info@erx.vn". Nút CTA trên Hero cũng tự động đổi thành mailto link.
- Khi PRICE = 0: Form đăng ký không hiển thị phần mã giảm giá và QR thanh toán.
- Khi PRICE > 0: Form hiển thị đầy đủ mã giảm giá, QR VietQR, thông tin ngân hàng.
- Dữ liệu đăng ký được gửi trực tiếp vào Google Sheets thông qua Google Apps Script (không cần server backend riêng).
- Website hoàn toàn responsive, hoạt động tốt trên mobile, tablet và desktop.
- SSL/HTTPS được Vercel cấp tự động sau khi cấu hình domain.
