/**
 * سكريبت لإعداد متغيرات البيئة تلقائياً
 * يمكن تشغيله عند نقل المشروع لحساب جديد
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE = path.join(__dirname, '..', '.env');
const ENV_EXAMPLE = path.join(__dirname, '..', '.env.example');

async function setupEnvironment() {
  console.log('🔧 إعداد متغيرات البيئة...');
  
  // التحقق من وجود ملف .env
  if (!fs.existsSync(ENV_FILE)) {
    console.log('📝 إنشاء ملف .env من النموذج...');
    
    if (fs.existsSync(ENV_EXAMPLE)) {
      fs.copyFileSync(ENV_EXAMPLE, ENV_FILE);
      console.log('✅ تم إنشاء ملف .env بنجاح');
      console.log('⚠️  يرجى تحديث القيم في ملف .env بالمفاتيح الحقيقية');
    } else {
      console.log('❌ ملف .env.example غير موجود');
    }
  } else {
    console.log('✅ ملف .env موجود بالفعل');
  }
  
  // التحقق من المتغيرات المطلوبة
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
  } catch (error) {
    console.log('⚠️  dotenv غير مثبت، سيتم التحقق من متغيرات البيئة فقط');
  }
  
  const requiredVars = [
    'DATABASE_URL',
    'TMDB_API_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('⚠️  متغيرات البيئة المفقودة:');
    missingVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
  } else {
    console.log('✅ جميع متغيرات البيئة المطلوبة متوفرة');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  setupEnvironment();
}

export { setupEnvironment };