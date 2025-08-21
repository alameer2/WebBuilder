/**
 * ملف حفظ جميع مفاتيح API للمشروع
 * يمكن تحديث هذا الملف بسهولة عند نقل المشروع لحساب جديد
 */

export const API_KEYS = {
  // TMDB API (موجود حالياً)
  TMDB_API_KEY: process.env.TMDB_API_KEY || '',
  
  // قاعدة البيانات
  DATABASE_URL: process.env.DATABASE_URL || '',
  PGHOST: process.env.PGHOST || '',
  PGUSER: process.env.PGUSER || '',
  PGPASSWORD: process.env.PGPASSWORD || '',
  PGDATABASE: process.env.PGDATABASE || '',
  PGPORT: process.env.PGPORT || '',
  
  // APIs إضافية (سيتم إضافتها حسب الحاجة)
  // يمكن إضافة أي API جديد هنا
  EXTERNAL_API_KEY: process.env.EXTERNAL_API_KEY || '',
  EXTERNAL_API_URL: process.env.EXTERNAL_API_URL || '',
  
  // إعدادات إضافية
  NODE_ENV: process.env.NODE_ENV || 'development',
};

/**
 * دالة للتحقق من وجود المفاتيح المطلوبة
 */
export function validateApiKeys(): { isValid: boolean; missing: string[] } {
  const requiredKeys = ['TMDB_API_KEY', 'DATABASE_URL'];
  const missing: string[] = [];
  
  requiredKeys.forEach(key => {
    if (!API_KEYS[key as keyof typeof API_KEYS]) {
      missing.push(key);
    }
  });
  
  return {
    isValid: missing.length === 0,
    missing
  };
}

/**
 * دالة للحصول على إعدادات قاعدة البيانات
 */
export function getDatabaseConfig() {
  return {
    host: API_KEYS.PGHOST,
    user: API_KEYS.PGUSER,
    password: API_KEYS.PGPASSWORD,
    database: API_KEYS.PGDATABASE,
    port: API_KEYS.PGPORT ? parseInt(API_KEYS.PGPORT) : 5432,
    url: API_KEYS.DATABASE_URL
  };
}

/**
 * دالة للحصول على رابط API خارجي
 */
export function getExternalApiConfig() {
  return {
    apiKey: API_KEYS.EXTERNAL_API_KEY,
    baseUrl: API_KEYS.EXTERNAL_API_URL,
    headers: {
      'Authorization': `Bearer ${API_KEYS.EXTERNAL_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };
}