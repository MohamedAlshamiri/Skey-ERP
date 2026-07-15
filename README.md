# SKey ERP

**نظام إدارة موارد المؤسسات المتكامل** — منصة حديثة لإدارة المستخدمين والصلاحيات، بواجهة عربية كاملة واتجاه RTL، ومبنية بمعمارية نظيفة قابلة للتوسّع.

[![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-EF%20Core-CC2927?logo=microsoftsqlserver&logoColor=white)](https://learn.microsoft.com/ef/core/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Proprietary-slate)](#)

---

## نظرة عامة

**SKey ERP** هو monorepo يجمع بين:

| الطبقة | التقنية | الدور |
|--------|---------|--------|
| **Frontend** | Angular 22 + Tailwind CSS + NG-Zorro | واجهة مستخدم عصرية (RTL) |
| **Backend** | ASP.NET Core 10 + Clean Architecture | REST API مع طبقة Domain واضحة |
| **Database** | SQL Server + Entity Framework Core | تخزين المستخدمين والأدوار |

المنتج يدعم حالياً:

- شاشة دخول كأول مسار (`/` → `/auth/login`)
- تسجيل الدخول وإنشاء حساب
- لوحة تحكم (`/dashboard`) تعرض محتوى صفحة الهبوط داخل الـ shell
- إدارة المستخدمين (إنشاء / تعديل / حذف / بحث / ترقيم صفحات)
- تأكيد حذف تفاعلي قبل تنفيذ العملية
- صفحات Placeholder: Inventory / Reports / Settings
- Navbar موحّد مع شعار SKey (نفس أسلوب Landing)
- حماية المسارات (Guest / Auth guards) + تسجيل خروج
- جلسة بسيطة بدون JWT لسهولة البدء والتطوير
- صفحة هبوط مستقلة على `/landing`

---

## هيكل المستودع

```text
SKeyERP/
├── Angular/front/                 # تطبيق Angular
│   └── src/app/
│       ├── core/                  # Auth, guards, interceptors, services
│       ├── features/              # landing, auth, dashboard, users, inventory, reports, settings
│       ├── layouts/               # main-layout, auth-layout
│       └── shared/ui/             # Design system (button, input, select, …)
│
└── src/SKeyAPI/                   # حل ASP.NET Core
    ├── SKeyAPI/                   # Host — Controllers, Program.cs, Swagger
    ├── SKey.Application/          # Use cases, DTOs, validators, services
    ├── SKey.Domain/               # Entities, enums, constants
    ├── SKey.Persistence/          # EF Core, repositories, migrations
    └── SKey.Infrastructure/       # Infrastructure wiring
```

### معمارية الـ Backend (Clean Architecture)

```text
                 ┌─────────────────┐
                 │     SKeyAPI     │  Controllers / Swagger / CORS
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ SKey.Application│  Services · DTOs · FluentValidation
                 └────────┬────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
 ┌────────▼──────┐ ┌──────▼──────┐ ┌──────▼──────────┐
 │  SKey.Domain  │ │ Persistence │ │ Infrastructure  │
 │ Entities/Enums│ │ EF + Repos  │ │ DI composition  │
 └───────────────┘ └─────────────┘ └─────────────────┘
```

---

## المتطلبات

| الأداة | الإصدار المقترح |
|--------|------------------|
| [.NET SDK](https://dotnet.microsoft.com/download) | **10.0+** |
| [Node.js](https://nodejs.org/) | **22.22.3+** (أو 24 / 26 وفق Angular CLI) |
| npm | يأتي مع Node |
| SQL Server | LocalDB / Express / Full |
| IDE (اختياري) | Visual Studio 2022 / VS Code / Rider |

---

## البدء السريع

### 1) قاعدة البيانات (Backend)

عدّل سلسلة الاتصال في:

`src/SKeyAPI/SKeyAPI/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=SKeyDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True;"
  }
}
```

طبّق الـ Migrations:

```bash
cd src/SKeyAPI
dotnet ef database update --project SKey.Persistence --startup-project SKeyAPI
```

ثم شغّل الـ API:

```bash
cd src/SKeyAPI/SKeyAPI
dotnet run
```

| العنوان | الوصف |
|---------|--------|
| `http://localhost:5265` | HTTP |
| `http://localhost:5265/swagger` | Swagger UI |
| `https://localhost:7236` | HTTPS (إن فُعّل) |

### 2) الواجهة (Frontend)

```bash
cd Angular/front
npm install
npm start
```

افتح: [http://localhost:4200](http://localhost:4200)

عنوان الـ API مضبوط في:

`Angular/front/src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5265/api'
};
```

> تأكد أن الـ API يعمل قبل استخدام شاشات الدخول / المستخدمين، وأن CORS يسمح بـ `http://localhost:4200` (مفعّل افتراضياً في `Program.cs`).

---

## واجهات المستخدم

| المسار | الوصول | الوصف |
|--------|--------|--------|
| `/` | عام | يعيد التوجيه إلى `/auth/login` |
| `/auth/login` | زوار فقط | تسجيل الدخول |
| `/auth/register` | زوار فقط | إنشاء حساب |
| `/dashboard` | مسجّلون فقط | لوحة التحكم (محتوى Landing مضمّن) |
| `/users` | مسجّلون فقط | إدارة المستخدمين |
| `/inventory` | مسجّلون فقط | المخزون (placeholder) |
| `/reports` | مسجّلون فقط | التقارير (placeholder) |
| `/settings` | مسجّلون فقط | الإعدادات (placeholder) |
| `/landing` | عام | صفحة الهبوط التسويقية (مستقلة) |

**تدفق النموذجي:**

```text
Login / Register → Dashboard → Users / Inventory / Reports / Settings
        ↑                              │
        └────────── Logout ────────────┘
```

جميع الصفحات المحمية تعمل داخل `MainLayout` (navbar موحّد + شعار SKey).

---

## REST API

Base URL: `http://localhost:5265/api`

### المصادقة (`/auth`) — بدون JWT

جلسة بسيطة تُرجع `sessionId` يُخزَّن في `localStorage` كعلامة دخول.

| Method | Endpoint | الوصف |
|--------|----------|--------|
| `POST` | `/auth/login` | دخول بالإيميل وكلمة المرور |
| `POST` | `/auth/register` | إنشاء حساب + فتح جلسة |

**Login body**

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Register body**

```json
{
  "userName": "أحمد محمد",
  "email": "user@example.com",
  "password": "secret123",
  "phoneNumber": "0500000000"
}
```

**Response (مثال)**

```json
{
  "sessionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "userId": "…",
  "userName": "أحمد محمد",
  "email": "user@example.com",
  "roleName": "Employee"
}
```

> كلمات المرور تُهشَّر عبر `IPasswordHasher<User>` (ASP.NET Identity hasher) — بدون إصدار JWT.

### المستخدمون (`/users`)

| Method | Endpoint | الوصف |
|--------|----------|--------|
| `GET` | `/users` | قائمة المستخدمين |
| `GET` | `/users/{id}` | مستخدم واحد |
| `POST` | `/users` | إنشاء مستخدم |
| `PUT` | `/users/{id}` | تحديث مستخدم |
| `DELETE` | `/users/{id}` | حذف مستخدم |

**Create user body (مختصر)**

```json
{
  "userName": "سارة العتيبي",
  "email": "sara@skeyerp.com",
  "password": "secret123",
  "phoneNumber": "0551112233",
  "age": 28,
  "accountStatus": 0,
  "roleId": "11111111-1111-1111-1111-111111111111"
}
```

### الأدوار الافتراضية (Seed)

| الاسم | RoleId |
|-------|--------|
| Admin | `11111111-1111-1111-1111-111111111111` |
| Employee | `22222222-2222-2222-2222-222222222222` |
| Customer | `33333333-3333-3333-3333-333333333333` |

`AccountStatus`: `0 = Active` · `1 = Inactive` · `2 = Suspended`

---

## أبرز ميزات الواجهة

- تصميم عربي كامل مع خطّي **Cairo / Tajawal** واتجاه RTL
- نظام مكوّنات مشتركة (`skey-button`, `skey-input`, `skey-select`, …)
- Navbar للتطبيق بنفس أسلوب وشعار صفحة الهبوط
- نوافذ منتصف الشاشة لإضافة/تعديل المستخدم
- رسالة تأكيد قبل الحذف
- فلاتر بحث + ترقيم صفحات
- Guards: منع الزائر من الصفحات المحمية ومنع المسجّل من صفحات الدخول مجدداً
- زر تسجيل خروج في الـ navbar

---

## أوامر شائعة

### Backend

```bash
# بناء الحل
dotnet build src/SKeyAPI/SKeyAPI.slnx

# تشغيل الـ API
dotnet run --project src/SKeyAPI/SKeyAPI

# إضافة Migration جديدة
dotnet ef migrations add MigrationName \
  --project src/SKeyAPI/SKey.Persistence \
  --startup-project src/SKeyAPI/SKeyAPI
```

### Frontend

```bash
cd Angular/front

npm start          # تطوير
npm run build      # بناء production
npm test           # اختبارات الوحدة (Vitest)
```

---

## الأمان — ملاحظات مهمة

| الوضع الحالي | ملاحظة |
|--------------|--------|
| جلسة بسيطة (`sessionId`) | مناسبة للتطوير والنماذج الأولية |
| لا توجد حماية JWT على الـ API | نقاط المستخدمين مفتوحة بدون `[Authorize]` حالياً |
| CORS مضبوط لـ localhost | راجع السياسة قبل النشر |

للإنتاج يُفضّل لاحقاً: JWT أو Cookie Auth، `[Authorize]` على الـ endpoints الحساسة، HTTPS إلزامي، وتقييد CORS للنطاق الحقيقي.

---

## خارطة الطريق (مقترح)

- [ ] مصادقة JWT / Refresh tokens
- [ ] صلاحيات دقيقة حسب الدور (RBAC)
- [ ] تنفيذ كامل لوحدات Inventory / Reports / Settings (حالياً placeholders)
- [ ] دعم Multi-tenant حقيقي
- [ ] اختبارات تكامل للـ API و e2e للواجهة
- [ ] حاويات Docker و CI/CD كامل

---

## المساهمة

1. أنشئ فرعاً من `main`
2. طبّق التغييرات مع رسائل commit واضحة
3. افتح Pull Request مع وصف مختصر وخطة اختبار

---

## الترخيص

هذا المشروع **ملكية خاصة (Proprietary)** لـ SKey ERP / Ultimate Solutions ما لم يُنص على خلاف ذلك.

---

<p align="center">
  <strong>SKey ERP</strong> — تحكم أوضح لأعمالك<br/>
  <sub>Built with Angular · ASP.NET Core · SQL Server</sub>
</p>
