# 🔧 نظام إدارة APIs المطور

تم إنشاء نظام متكامل لإدارة جميع مفاتيح API في مشروعك بحيث يمكن نقله بسهولة لأي حساب آخر.

## 📁 الملفات التي تم إنشاؤها:

### 1. `config/api-keys.ts` - مركز إدارة APIs
```typescript
export const API_KEYS = {
  TMDB_API_KEY: process.env.TMDB_API_KEY || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  EXTERNAL_API_KEY: process.env.EXTERNAL_API_KEY || '',
  // يمكن إضافة أي API جديد هنا
};
```

### 2. `.env.example` - نموذج متغيرات البيئة
```bash
# قاعدة البيانات
DATABASE_URL=postgresql://username:password@host:port/database

# TMDB API للأفلام
TMDB_API_KEY=your_tmdb_api_key_here

# API جديد (حسب ما ترسله)
EXTERNAL_API_KEY=your_external_api_key_here
EXTERNAL_API_URL=https://api.example.com
```

### 3. `scripts/setup-env.js` - إعداد تلقائي
يتحقق من وجود جميع متغيرات البيئة المطلوبة

## ✅ تم تحديث الملفات التالية:

- ✅ `server/storage-db.ts` - يستخدم نظام API_KEYS
- ✅ `server/storage.ts` - يستخدم نظام API_KEYS  
- ✅ `server/db.ts` - يستخدم نظام API_KEYS
- ✅ `server/services/tmdb.ts` - يستخدم نظام API_KEYS

## 🚀 كيفية إضافة API جديد:

1. **أرسل لي تفاصيل الـ API:**
   - رابط الـ API
   - مفتاح الـ API
   - أي headers مطلوبة
   - نوع التشفير (Bearer token، API key، إلخ)

2. **سأقوم بإضافته في:**
   - `config/api-keys.ts`
   - `.env.example`
   - إنشاء service جديد إذا لزم الأمر

## 📋 جاهز الآن:

**أرسل لي الـ API الذي تريد إضافته وسأقوم بدمجه في النظام فوراً!**

مثال ما أحتاجه:
```
- API URL: https://api.example.com
- API Key: abc123xyz
- نوع التشفير: Bearer Token
- الغرض: جلب بيانات المنتجات
```