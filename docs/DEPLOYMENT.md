# دليل نشر Badowy Portal على Vercel + Railway

هذا الدليل يشرح تجهيز ونشر مشروع Badowy Portal للإنتاج بدون إضافة ميزات جديدة. التطبيق يعمل على Vercel، وقاعدة البيانات PostgreSQL تعمل على Railway فقط.

## A. البنية المعمارية

- يستضيف Vercel تطبيق Next.js App Router بالكامل، بما في ذلك الصفحات، Server Actions، Auth.js / NextAuth، لوحة العميل، ولوحة الإدارة.
- يستضيف Railway قاعدة بيانات PostgreSQL فقط.
- يتصل Prisma من بيئة Vercel بقاعدة Railway باستخدام متغير `DATABASE_URL`.
- تعمل المصادقة، الصلاحيات، والتحويلات بين `/ar/login` و`/ar/dashboard` و`/ar/onboarding` و`/ar/admin` داخل تطبيق Vercel.
- الواجهة عربية RTL أولًا، ولا تحتاج إعداد استضافة منفصل للملفات في هذه المرحلة لأن روابط ملفات التسليمات ما زالت يدوية.

## B. إعداد Railway

1. أنشئ مشروعًا جديدًا في Railway.
2. أضف خدمة PostgreSQL داخل المشروع.
3. افتح متغيرات PostgreSQL وانسخ قيمة `DATABASE_URL`.
4. عند استخدام Vercel، استخدم رابط الاتصال المناسب من خارج Railway، وليس رابطًا داخليًا لا يعمل إلا داخل شبكة Railway.
5. لا تنشر بيانات الاتصال بقاعدة البيانات في GitHub أو أي مكان عام.
6. احتفظ بنسخة من رابط الاتصال في Vercel Environment Variables فقط.

## C. إعداد Vercel

1. ارفع المشروع إلى GitHub.
2. افتح Vercel واختر Import Project من مستودع GitHub.
3. أضف متغيرات البيئة المطلوبة من قسم المتغيرات في هذا الملف.
4. اضبط Build Command على:

```bash
npm run vercel-build
```

5. هذا الأمر يشغّل:

```bash
prisma migrate deploy && next build
```

6. انشر المشروع، ثم افتح الرابط النهائي وتأكد من عمل `/ar`.

## D. متغيرات البيئة المطلوبة

المشروع الحالي يستخدم Auth.js v5 ويعتمد فعليًا على `AUTH_SECRET`. تم دعم `NEXTAUTH_SECRET` كقيمة احتياطية للتوافق.

```bash
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

- `DATABASE_URL`: رابط PostgreSQL من Railway. يجب أن يكون صالحًا للاتصال من Vercel.
- `AUTH_SECRET`: السر الأساسي المطلوب للمصادقة في Auth.js v5.
- `NEXTAUTH_SECRET`: احتياطي للتوافق، ويُفضّل أن تكون قيمته نفس `AUTH_SECRET`.
- `AUTH_URL`: رابط تطبيق Vercel النهائي، مثل `https://your-project.vercel.app`.
- `NEXTAUTH_URL`: احتياطي للتوافق، ويُفضّل أن تكون قيمته نفس `AUTH_URL`.

## E. توليد السر

استخدم الأمر التالي لتوليد سر قوي:

```bash
openssl rand -base64 32
```

ضع القيمة الناتجة في `AUTH_SECRET` و`NEXTAUTH_SECRET`.

## F. أوامر Prisma

أثناء التطوير المحلي:

```bash
npx prisma migrate dev
```

في الإنتاج على Vercel:

```bash
npx prisma migrate deploy
```

لتوليد Prisma Client:

```bash
npx prisma generate
```

يتم تشغيل `prisma generate` تلقائيًا بعد التثبيت عبر `postinstall`.

## G. التهيئة والـ Seed

يمكن تشغيل Seed في التطوير:

```bash
npm run db:seed
```

تشغيل Seed في الإنتاج اختياري ويجب استخدامه بحذر. كلمة مرور حساب الإدارة التجريبية داخل `prisma/seed.ts` مخصصة للتطوير فقط ويجب تغييرها قبل الإنتاج.

## H. قائمة فحص أول نشر

- افتح `/ar` وتأكد أن الصفحة العامة تعمل.
- افتح `/ar/login` وتأكد أن صفحة الدخول تعمل.
- جرّب تسجيل عميل جديد.
- تأكد أن العميل غير المكتمل يتحول إلى `/ar/onboarding`.
- تأكد أن العميل المكتمل يتحول إلى `/ar/dashboard`.
- إذا شغّلت Seed، جرّب دخول الإدارة.
- تأكد أن `/ar/admin` محمية ولا تفتح للزوار أو العملاء.
- أنشئ بيانات اختبار بسيطة وتأكد أن الكتابات تظهر في PostgreSQL على Railway.

## I. مشاكل شائعة وحلولها

### `DATABASE_URL` غير موجود

أضف `DATABASE_URL` في Vercel Environment Variables وتأكد أنه رابط PostgreSQL من Railway.

### `AUTH_URL` أو `NEXTAUTH_URL` غير صحيح

اجعل القيمتين مساويتين لرابط Vercel النهائي بدون مسار إضافي، مثل:

```bash
https://your-project.vercel.app
```

### `AUTH_SECRET` غير موجود

ولّد سرًا باستخدام:

```bash
openssl rand -base64 32
```

ثم أضفه في `AUTH_SECRET` و`NEXTAUTH_SECRET`.

### Prisma Client غير مولّد

تأكد من وجود سكربت:

```bash
"postinstall": "prisma generate"
```

أو شغّل يدويًا:

```bash
npx prisma generate
```

### لم يتم تطبيق Migrations

استخدم في الإنتاج:

```bash
npx prisma migrate deploy
```

ولا تستخدم `prisma migrate dev` في Vercel.

### وجود روابط localhost

لا تضع `localhost` في متغيرات Vercel. يجب أن تكون `AUTH_URL` و`NEXTAUTH_URL` رابط Vercel النهائي.

### مشكلة اتصال Vercel بقاعدة Railway

تأكد أن `DATABASE_URL` هو رابط اتصال خارجي صالح من Vercel. بعض روابط Railway الداخلية لا تعمل إلا من داخل Railway.

### فشل Build بسبب قاعدة البيانات

إذا فشل `prisma migrate deploy` أثناء البناء، تحقق من:

- صحة `DATABASE_URL`.
- أن قاعدة Railway تعمل.
- أن Migrations موجودة داخل مجلد `prisma/migrations`.
- أن Vercel يستخدم Build Command الصحيح.

## J. نتيجة فحص الروابط المحلية

- لا توجد روابط `localhost` أو `127.0.0.1` داخل ملفات التطبيق الإنتاجية.
- القيم المحلية الموجودة في `.env` تخص التطوير فقط والملف مستبعد من Git.
- مجلد `.postgres` يخص قاعدة التطوير المحلية وهو مستبعد من Git.
- روابط `https://example.com` الموجودة داخل النماذج هي placeholders إرشادية فقط وليست روابط تشغيلية.
