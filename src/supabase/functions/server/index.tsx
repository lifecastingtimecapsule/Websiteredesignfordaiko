import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// デフォルトのスタッフアカウント情報
const DEFAULT_STAFF = {
  email: 'sys-admin-827@dk-internal.local',
  password: 'Dk#9x2P$r!nt_2024@Sys',
  name: 'システム管理者'
};

// サーバー起動時にデフォルトスタッフアカウントを作成（遅延実行）
async function ensureDefaultStaff() {
  // サーバー起動後少し待ってから実行（データベースの初期化待ち）
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    console.log('Checking for default staff account...');
    
    // 既存のユーザーを確認
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.log('Note: Could not list users. Will create on first signup attempt.');
      console.log('Default credentials:', DEFAULT_STAFF.email, '/', DEFAULT_STAFF.password);
      return;
    }

    // デフォルトアカウントが存在するか確認
    const existingStaff = users.users.find(u => u.email === DEFAULT_STAFF.email);
    
    if (!existingStaff) {
      console.log('Creating default staff account...');
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: DEFAULT_STAFF.email,
        password: DEFAULT_STAFF.password,
        user_metadata: { 
          name: DEFAULT_STAFF.name,
          role: 'staff' 
        },
        email_confirm: true
      });

      if (error) {
        console.log('Note: Default staff account will be created on first access');
        console.log('Default credentials:', DEFAULT_STAFF.email, '/', DEFAULT_STAFF.password);
      } else {
        console.log(`✓ Default staff account created successfully!`);
        console.log(`  Email: ${DEFAULT_STAFF.email}`);
        console.log(`  Password: ${DEFAULT_STAFF.password}`);
      }
    } else {
      console.log(`✓ Default staff account already exists (${DEFAULT_STAFF.email})`);
    }
  } catch (error) {
    console.log('Note: Default staff account setup deferred');
    console.log('Default credentials:', DEFAULT_STAFF.email, '/', DEFAULT_STAFF.password);
  }
}

// デフォルトスタッフアカウントを非同期で作成（サーバー起動をブロックしない）
ensureDefaultStaff();

// ストレージバケ���トの初期化
async function ensureStorageBucket() {
  const bucketName = 'make-249c283c-news-images';
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });
      console.log(`✓ Storage bucket '${bucketName}' created successfully`);
    } else {
      console.log(`✓ Storage bucket '${bucketName}' already exists`);
    }
  } catch (error) {
    console.log('Note: Storage bucket will be created on first upload');
  }
}

ensureStorageBucket();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-249c283c/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== Staff Authentication =====

// Initialize default staff account (can be called manually if auto-creation fails)
app.post("/make-server-249c283c/staff/init-default", async (c) => {
  try {
    // Check if default account already exists
    const { data: users } = await supabase.auth.admin.listUsers();
    const existingStaff = users?.users.find(u => u.email === DEFAULT_STAFF.email);
    
    if (existingStaff) {
      return c.json({ 
        message: 'Default staff account already exists',
        email: DEFAULT_STAFF.email 
      });
    }

    // Create default account
    const { data, error } = await supabase.auth.admin.createUser({
      email: DEFAULT_STAFF.email,
      password: DEFAULT_STAFF.password,
      user_metadata: { 
        name: DEFAULT_STAFF.name,
        role: 'staff' 
      },
      email_confirm: true
    });

    if (error) {
      console.error('Failed to create default staff account:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ 
      message: 'Default staff account created successfully',
      email: DEFAULT_STAFF.email
    });
  } catch (error) {
    console.error('Init default staff error:', error);
    return c.json({ error: 'Failed to initialize default staff account' }, 500);
  }
});

// Staff signup - Create new staff user
app.post("/make-server-249c283c/staff/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'staff' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Staff signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: 'Staff user created successfully',
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name
      }
    });
  } catch (error) {
    console.error('Staff signup error:', error);
    return c.json({ error: 'Failed to create staff user' }, 500);
  }
});

// Verify staff authentication
const verifyStaff = async (authHeader: string | null) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user || user.user_metadata?.role !== 'staff') {
    return null;
  }

  return user;
};

// ===== News Articles Management =====

// Upload news image (staff only)
app.post("/make-server-249c283c/staff/upload-image", async (c) => {
  try {
    const user = await verifyStaff(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // ファイル名を生成
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
    const bucketName = 'make-249c283c-news-images';

    // バケットの存在確認と作成
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });
    }

    // ファイルをアップロード
    const fileBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: 'Failed to upload image' }, 500);
    }

    // 公開URLを取得
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ 
      message: 'Image uploaded successfully',
      url: publicUrl 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

// Get all published articles
app.get("/make-server-249c283c/news", async (c) => {
  try {
    const articles = await kv.getByPrefix('news:');
    const published = articles
      .filter(a => a.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return c.json({ articles: published });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Get single article by ID
app.get("/make-server-249c283c/news/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const article = await kv.get(`news:${id}`);
    
    if (!article || !article.published) {
      return c.json({ error: 'Article not found' }, 404);
    }
    
    return c.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Get all articles (staff only)
app.get("/make-server-249c283c/staff/news", async (c) => {
  try {
    const user = await verifyStaff(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const articles = await kv.getByPrefix('news:');
    const sorted = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return c.json({ articles: sorted });
  } catch (error) {
    console.error('Error fetching staff articles:', error);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Create new article (staff only)
app.post("/make-server-249c283c/staff/news", async (c) => {
  try {
    const user = await verifyStaff(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { title, content, category, imageUrl } = await c.req.json();
    
    if (!title || !content || !category) {
      return c.json({ error: 'Title, content, and category are required' }, 400);
    }

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const article = {
      id,
      title,
      content,
      category,
      imageUrl: imageUrl || null,
      date: new Date().toISOString(),
      author: user.user_metadata?.name || user.email || 'スタッフ',
      published: true,
      createdBy: user.id,
    };

    await kv.set(`news:${id}`, article);
    
    return c.json({ message: 'Article created successfully', article });
  } catch (error) {
    console.error('Error creating article:', error);
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Update article (staff only)
app.put("/make-server-249c283c/staff/news/:id", async (c) => {
  try {
    const user = await verifyStaff(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const { title, content, category, published, imageUrl } = await c.req.json();
    
    const existing = await kv.get(`news:${id}`);
    if (!existing) {
      return c.json({ error: 'Article not found' }, 404);
    }

    const article = {
      ...existing,
      title: title ?? existing.title,
      content: content ?? existing.content,
      category: category ?? existing.category,
      published: published ?? existing.published,
      imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id,
    };

    await kv.set(`news:${id}`, article);
    
    return c.json({ message: 'Article updated successfully', article });
  } catch (error) {
    console.error('Error updating article:', error);
    return c.json({ error: 'Failed to update article' }, 500);
  }
});

// Delete article (staff only)
app.delete("/make-server-249c283c/staff/news/:id", async (c) => {
  try {
    const user = await verifyStaff(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const existing = await kv.get(`news:${id}`);
    
    if (!existing) {
      return c.json({ error: 'Article not found' }, 404);
    }

    await kv.del(`news:${id}`);
    
    return c.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return c.json({ error: 'Failed to delete article' }, 500);
  }
});

// ===== Order Form Submission =====

// Submit order or estimate request
app.post("/make-server-249c283c/order/submit", async (c) => {
  try {
    const orderData = await c.req.json();
    const { submitType, ...formData } = orderData;
    
    // 注文データをKVストアに保存
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const orderRecord = {
      id: orderId,
      submitType,
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending' // pending, processing, completed
    };
    
    await kv.set(`order:${orderId}`, orderRecord);
    console.log(`Order saved: ${orderId}`, orderRecord);
    
    // メール送信処理
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey && resendApiKey.startsWith('re_')) {
      try {
        // 会社のメールアドレス
        const companyEmail = 'info@daikou-print.co.jp';
        
        // 1. 会社宛てメール（詳細情報）
        const companySubject = `【${submitType === 'order' ? '注文' : '見積もり依頼'}】${formData.companyName || ''}${formData.companyName ? ' ' : ''}${formData.name}様`;
        
        const companyEmailBody = `
${submitType === 'order' ? '新規注文' : '見積もり依頼'}が届きました。

【お客様情報】
会社名・団体名: ${formData.companyName || '未入力'}
お名前: ${formData.name}
メールアドレス: ${formData.email}
電話番号: ${formData.phone}
ご返答のご希望: ${formData.responseType === 'phone' ? '電話希望' : 'メール希望'}

【商品情報】
お見積 品名: ${formData.productName || '未入力'}
ご希望納期: ${formData.desiredDelivery || '未入力'}
横サイズ: ${formData.widthSize || '未入力'}
縦サイズ: ${formData.heightSize || '未入力'}
色数: ${formData.colorCount}
用紙: ${formData.paperType || '未入力'}
ラミネート加工: ${formData.laminate === 'none' ? 'なし' : formData.laminate === 'gloss' ? 'グロスラミネート' : 'マットラミネート'}
仕上げ方法: ${formData.finishing === 'sheet' ? '適量枚数シート仕上げ' : formData.finishing === 'single' ? '1シート1枚仕上げ' : 'ロール仕上げ'}
数量: ${formData.quantity || '未入力'}
使用用途: ${formData.usage === 'indoor' ? '屋内' : '屋外'}
データの有無: ${formData.dataStatus === 'new' ? '新規データ作成' : formData.dataStatus === 'office' ? 'office系データ有り' : formData.dataStatus === 'pdf' ? 'PDFデータ有り' : 'イラストレーターデータ有り'}
受け取り方法: ${formData.deliveryMethod === 'shipping' ? '商品発送' : '来社受け取り希望'}

【備考】
${formData.details || '未入力'}

【ファイ��】
添付ファイル数: ${formData.fileCount || 0}件
${formData.fileNames ? '\nファイル名:\n' + formData.fileNames.join('\n') : ''}

---
このメールは株式会社大幸の注文フォームから自動送信されています。
注文ID: ${orderId}
        `.trim();

        // 会社宛てメール送信
        const companyEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: companyEmail,
            subject: companySubject,
            text: companyEmailBody,
          }),
        });

        if (!companyEmailResponse.ok) {
          const errorText = await companyEmailResponse.text();
          console.error('Failed to send email to company:', errorText);
        } else {
          console.log('Email sent successfully to company');
        }

        // 2. お客様宛て確認メール
        const customerSubject = `【大幸】${submitType === 'order' ? 'ご注文' : 'お見積もり依頼'}を受け付けました`;
        
        const customerEmailBody = `
${formData.name} 様

この度は株式会社大幸にお問い合わせいただき、誠にありがとうございます。

${submitType === 'order' ? 'ご注文' : 'お見積もり依頼'}を受け付けました。
担当者より折り返しご連絡させていただきますので、今しばらくお待ちください。

【受付内容】
種別: ${submitType === 'order' ? 'ご注文' : 'お見積もり依頼'}
商品: ${formData.productName || '商品案内'}
ご希望納期: ${formData.desiredDelivery || '未指定'}
数量: ${formData.quantity || '未指定'}

※このメールは送信専用です。ご返信いただいてもお答えできませんのでご了承ください。

---
株式会社大幸
〒462-0034 愛知県名古屋市北区天道町4丁目11番地
TEL: 052-911-5551
Email: info@daikou-print.co.jp
        `.trim();

        // 顧客宛てメール送信
        const customerEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: formData.email,
            subject: customerSubject,
            text: customerEmailBody,
          }),
        });

        if (!customerEmailResponse.ok) {
          const errorText = await customerEmailResponse.text();
          console.error('Failed to send email to customer:', errorText);
        } else {
          console.log('Email sent successfully to customer');
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // メール送信失敗してもフォーム送信は成功とする
      }
    } else {
      console.log('RESEND_API_KEY not configured or invalid, skipping email send');
    }
    
    return c.json({ 
      message: submitType === 'order' 
        ? 'ご注文を受け付けました。担当者よりご連絡いたします。' 
        : 'お見積もり依頼を受け付けました。担当者よりご連絡いたします。',
      success: true,
      orderId 
    });
  } catch (error) {
    console.error('Order submission error:', error);
    return c.json({ error: '送信に失敗しました。もう一度お試しください。' }, 500);
  }
});

// ===== Contact Form Submission =====

// Submit contact inquiry
app.post("/make-server-249c283c/contact/submit", async (c) => {
  try {
    const contactData = await c.req.json();
    const { companyName, name, email, phone, message } = contactData;
    
    // お問い合わせデータをKVストアに保存
    const contactId = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const contactRecord = {
      id: contactId,
      companyName,
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    await kv.set(`contact:${contactId}`, contactRecord);
    console.log(`Contact saved: ${contactId}`, contactRecord);
    
    // メール送信処理
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey && resendApiKey.startsWith('re_')) {
      try {
        // 会社のメールアドレス
        const companyEmail = 'info@daikou-print.co.jp';
        
        // 1. 会社宛てメール（詳細情報）
        const companySubject = `【お問い合わせ】${companyName || ''}${companyName ? ' ' : ''}${name}様`;
        
        const companyEmailBody = `
新規お問い合わせが届きました。

【お客様情報】
会社名: ${companyName || '未入力'}
お名前: ${name}
メールアドレス: ${email}
電話番号: ${phone}

【お問い合わせ内容】
${message}

---
このメールは株式会社大幸のお問い合わせフォームから自動送信されています。
お問い合わせID: ${contactId}
        `.trim();

        // 会社宛てメール送信
        const companyEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: companyEmail,
            subject: companySubject,
            text: companyEmailBody,
          }),
        });

        if (!companyEmailResponse.ok) {
          const errorText = await companyEmailResponse.text();
          console.error('Failed to send email to company:', errorText);
        } else {
          console.log('Email sent successfully to company');
        }

        // 2. お客様宛て確認メール
        const customerSubject = '【大幸】お問い合わせを受け付けました';
        
        const customerEmailBody = `
${name} 様

この度は株式会社大幸にお問い合わせいただき、誠にありがとうございます。

お問い合わせを受け付けました。
担当者より1営業日以内にご連絡させていただきますので、今しばらくお待ちください。

【受付内容】
お名前: ${name}
会社名: ${companyName || '未入力'}

お問い合わせ内容:
${message}

※このメールは送信専用です。ご返信いただいてもお答えできませんのでご了承ください。

---
株式会社大幸
〒462-0034 愛知県名古屋市北区天道町4丁目11番地
TEL: 052-911-5551
Email: info@daikou-print.co.jp
        `.trim();

        // 顧客宛てメール送信
        const customerEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: email,
            subject: customerSubject,
            text: customerEmailBody,
          }),
        });

        if (!customerEmailResponse.ok) {
          const errorText = await customerEmailResponse.text();
          console.error('Failed to send email to customer:', errorText);
        } else {
          console.log('Email sent successfully to customer');
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // メール送信失敗してもフォーム送信は成功とする
      }
    } else {
      console.log('RESEND_API_KEY not configured or invalid, skipping email send');
    }
    
    return c.json({ 
      message: 'お問い合わせを受け付けました。担当者より1営業日以内にご返信いたします。',
      success: true,
      contactId 
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return c.json({ error: '送信に失敗しました。もう一度お試しください。' }, 500);
  }
});

// Get all orders (staff only)
app.get("/make-server-249c283c/staff/orders", async (c) => {
  try {
    const user = await verifyStaff(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const orders = await kv.getByPrefix('order:');
    const sorted = orders.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    
    return c.json({ orders: sorted });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

Deno.serve(app.fetch);