# SMP Website - Proje Kuralları ve Geliştirme Standartları

<!-- BEGIN:nextjs-agent-rules -->

> **ÖNEMLİ:** Bu proje Next.js 16.2 kullanmaktadır.
> Next.js 16'da breaking changes ve güncel API/convention farklılıkları bulunabilir.
> Kod yazmadan veya mevcut bir API'yi değiştirmeden önce ilgili Next.js dokümantasyonunu
> `node_modules/next/dist/docs/` içerisinden kontrol et.
> Deprecation uyarılarını dikkate al ve güncel Next.js 16 API'lerini kullan.

<!-- END:nextjs-agent-rules -->

---

## 1. Teknoloji ve Sürüm Kuralları

- **Framework:** Next.js 16.2
- **Mimari:** App Router zorunludur. Pages Router kullanma.
- **React:** React 19
- **Rendering:** Server Components varsayılandır. Gereksiz yere `"use client"` kullanma.
- **UI:** Radix UI
- **Styling:** Tailwind CSS v4
- **State & Data Fetching:** `@tanstack/react-query` v5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Form Management:** `react-hook-form` + `@hookform/resolvers` + Zod
- **Internationalization:** `next-intl`

Mevcut proje mimarisine ve `package.json` içerisinde tanımlı sürümlere uy.
Gereksiz teknoloji veya framework değişikliği yapma.

---

## 2. Otonom Ajan Çalışma Protokolü

### 2.1 Dosya Değişiklik Limiti

İzin verilmedikçe tek bir işlemde **3'ten fazla dosyayı değiştirme**.

Değişiklik yapmadan önce:

1. İlgili dosyaları oku.
2. Mevcut mimariyi ve bağımlılıkları analiz et.
3. Değişiklik gerektiren dosyaları belirle.
4. Gerekirse `/plan` ile değişiklik planı oluştur.
5. Kullanıcı onayı olmadan kapsamlı refactor veya SEO geliştirmesine başlama.

Dosyaları okumak değişiklik sayılmaz.

### 2.2 Kademeli İlerleme

Özellikle aşağıdaki işlemlerden önce `/plan` kullan:

- Büyük refactor
- Mimari değişiklik
- SEO çalışması
- Birden fazla componenti etkileyen değişiklik
- Routing değişiklikleri
- Database model değişiklikleri
- Birden fazla dosyayı etkileyen feature geliştirmeleri

Plan açıkça belirtilmeden geniş kapsamlı değişiklik yapma.

### 2.3 Mevcut Kodu Koru

Bir problemi çözerken gereksiz kod veya dosya değişikliği yapma.

- Çalışan kodu sebepsiz yere yeniden yazma.
- Gereksiz refactor yapma.
- Kullanıcı tarafından belirtilmeyen feature ekleme.
- Mevcut component mimarisini gereksiz yere değiştirme.
- Bir problemi en küçük güvenli değişiklikle çözmeye çalış.

---

## 3. Next.js 16 Kuralları

Next.js ile ilgili kod yazmadan önce mümkün olduğunda:

1. `node_modules/next/dist/docs/` içerisindeki ilgili güncel dokümantasyonu kontrol et.
2. Kullanılan API'nin Next.js 16.2 ile uyumlu olduğundan emin ol.
3. Deprecated API'leri kullanma.
4. Eski Next.js sürümlerinden gelen patternleri varsayılan olarak uygulama.

### Server / Client Components

- Server Components varsayılandır.
- `"use client"` yalnızca gerçekten client-side interactivity gerektiğinde kullan.
- Client Component içerisine gereksiz server logic koyma.
- Server-only kodun client bundle'a girmesine izin verme.
- Browser API'leri, event handler'lar veya client state gerektirmeyen componentleri Client Component yapma.

### Metadata Route Dosyaları (icon, apple-icon, opengraph-image, vb.)

- Kodla üretilen metadata route'ları (`app/apple-icon.tsx` vb.) uzantısız URL'den servis edilir; `proxy.ts` matcher'ındaki dışlama listesinde olmazlarsa next-intl `/tr/apple-icon`'a yönlendirir → 404. Yeni böyle bir route eklersen listeye ekle, mevcutları çıkarma. Statik dosyalar (`app/icon.svg`) uzantılı olduğu için etkilenmez.

---

## 4. TypeScript ve Tip Güvenliği

- **Asla `any` kullanma.**
- `@ts-ignore` ve `@ts-expect-error` yalnızca zorunlu ve gerekçeli durumlarda kullanılabilir.
- API request ve response modelleri açık şekilde tiplenmelidir.
- Component props'ları açık TypeScript tiplerine sahip olmalıdır.
- Prisma modellerinden dönen verileri doğru şekilde tipli kullan.
- Zod ile runtime validation gereken tüm dış girdileri doğrula.
- Type assertion (`as`) kullanımını minimumda tut.
- `unknown` gelen veriler güvenli şekilde narrow edilmeden kullanılmamalıdır.

Amaç:

> Compile-time TypeScript güvenliği + runtime Zod validation.

---

## 5. Form Kuralları

Formlarda:

- `react-hook-form` kullan.
- Validation için Zod kullan.
- `@hookform/resolvers/zod` kullan.
- Client-side validation ile server-side validation birbirinin alternatifi değildir.
- Server'a gelen kullanıcı girdileri mutlaka tekrar doğrulanmalıdır.
- Validation schema mümkün olduğunca merkezi ve tekrar kullanılabilir tasarlanmalıdır.

Formlarda manuel state yönetimini ancak gerçekten gerekli olduğunda kullan.

---

## 6. API ve Veri Yönetimi

API endpointleri:

- Güçlü TypeScript tiplerine sahip olmalıdır.
- Kullanıcıdan gelen verileri Zod ile doğrulamalıdır.
- Hata durumlarını açık ve tutarlı şekilde yönetmelidir.
- Gereksiz veri döndürmemelidir.
- Authentication / authorization gerektiren işlemlerde yetki kontrolü yapılmalıdır.

React Query kullanıldığında:

- Server state için `@tanstack/react-query` v5 kullan.
- Gereksiz global client state oluşturma.
- Cache invalidation stratejisini ilgili mutation ile birlikte düşün.
- Server Components ile React Query arasında gereksiz veri tekrarından kaçın.

---

## 7. Prisma ve Database Kuralları

Prisma schema değişiklikleri kontrollü yapılmalıdır.

### Schema değişikliği

`schema.prisma` değiştirildiğinde:

1. Önce değişikliğin etkilerini analiz et.
2. Kullanıcıya hangi database değişikliğinin yapılacağını bildir.
3. Kullanıcı onayı olmadan migration çalıştırma.
4. Kullanıcı onayından sonra:
   - `npm run prisma:migrate`
   - `npm run prisma:generate`
5. Migration sonrasında etkilenen TypeScript kodlarını güncelle.
6. Build ve type-check durumunu kontrol et.

**Kullanıcı açıkça onaylamadan `prisma migrate` çalıştırma.**

Database üzerinde destructive değişiklikler ayrıca açık şekilde belirtilmelidir.

Örnek:

- Tablo silme
- Kolon silme
- Veri kaybına neden olabilecek migration
- Enum değerlerinin kaldırılması
- Unique constraint değişiklikleri

---

## 8. Metadata ve SEO

Next.js 16 Metadata API standartlarını kullan.

`layout.tsx` ve `page.tsx` dosyalarında sayfanın gerektirdiği metadata'yı eksiksiz tanımla.

SEO çalışması yapılırken:

- `title`
- `description`
- `metadataBase`
- `canonical`
- `openGraph`
- `twitter`
- `robots`
- Gerekliyse `alternates`
- Gerekliyse locale / language bilgileri

dikkate alınmalıdır.

Next.js'in güncel Metadata API'sini kullan.
Deprecated veya eski metadata patternlerini kullanma.

SEO/refactor çalışmasına başlamadan önce `/plan` oluştur ve kullanıcı onayı bekle.

---

## 9. Internationalization

`next-intl` projenin mevcut mimarisine uygun kullanılmalıdır.

- Hard-coded kullanıcıya gösterilen metinlerden kaçın.
- Kullanıcıya görünen metinleri translation dosyalarında tut.
- Translation key'lerini tutarlı isimlendir.
- Eksik translation key'leri oluşturmadan önce mevcut namespace yapısını kontrol et.
- Locale routing yapısını bozma.
- Server ve Client Componentlerde `next-intl` kullanım kurallarına uy.
- Yeni bir dil eklerken mevcut locale yapısını takip et.

---

## 10. Styling ve UI

- Tailwind CSS v4 kullan.
- Projede mevcut tasarım sistemine ve spacing/layout yaklaşımına uy.
- Gereksiz inline style kullanımından kaçın.
- Responsive tasarım mobile-first yaklaşımıyla hazırlanmalıdır.
- Erişilebilirlik gereksinimlerini dikkate al.
- Semantic HTML kullan.
- Keyboard navigation ve focus durumlarını koru.
- Radix UI bileşenlerini projenin mevcut yapısına uygun kullan.

UI değişikliklerinde mevcut tasarımı bozacak gereksiz görsel değişiklikler yapma.

### Renk Sistemi

- Birincil marka rengi (altın) token'ları: `app/globals.css` (`--brand-accent`, `--cta-gold`, `--cta-gold-hover`, `--text-on-cta`). Site genelinde birincil CTA/vurgu rengidir.
- İkincil vurgu token'ları: `app/globals.css` (`--secondary-accent`, `--secondary-accent-hover`, `--secondary-accent-foreground`). Yalnızca seçici noktalarda kullanılır (link hover, harita CTA, galeri vurgusu/focus ring) — birincil rengin yerini almaz, bir öğeyi veya sayfanın tamamını bu renge çevirme.
- Yeni custom property eklerken `@theme inline` bloğuna eklemeden, mevcut token'lar gibi `bg-(--token-adı)` arbitrary-shorthand sözdizimiyle kullan.

### Medya ve Görsel Kaynakları

- Ham/stok görselleri `public/images/`'e eklemeden önce optimize et (uzun kenar ~1600px, düşük dosya boyutu).
- Klinik/ofis galerisine eklenecek görseller gerçekten bu kliniğe ait olmalı; başka bir gerçek hekim/hastaya veya tanımlanabilir başka bir işletmeye ait stok görseller kullanma (yanlış temsil riski).
- Galeri/carousel ihtiyaçlarında mevcut `components/ui/carousel.tsx`'i (embla-carousel-react) reuse et, yeni bir carousel primitive'i yazma.

---

## 11. Yeni NPM Paketi Ekleme Kuralları

Yeni bir npm paketi yüklemeden önce mutlaka:

1. `package.json` dosyasını kontrol et.
2. Projede aynı veya benzer işlevi sağlayan mevcut bir dependency olup olmadığını kontrol et.
3. Yeni paketin gerçekten gerekli olup olmadığını değerlendir.
4. Paket eklemek yerine mevcut dependency veya native Next.js/React çözümü yeterliyse yeni paket ekleme.
5. Yeni paketin mevcut Next.js 16.2, React 19 ve diğer dependency sürümleriyle uyumlu olduğundan emin ol.

Gereksiz dependency ekleme.

---

## 12. Komutlar

Kullanılabilir temel komutlar:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run prisma:generate
npm run prisma:migrate
```

---

## 13. Proje Spesifik Component ve Convention'lar

- **Logo:** `components/site/Logo.tsx` — inline SVG, tema-uyumlu (`currentColor` / `--brand-accent`). Yeni logo kullanım yerlerinde bu component'i reuse et, raster `/images/logo.png`'yi tekrar import etme.
- **Hero:** `components/sections/HeroSection.tsx` (Server) + `components/sections/HeroHeadline.tsx` (Client, metin/CTA/animasyon) + `components/media/HeroVideo.tsx` (Client, video mount-gate). Yeni hero metni eklerken `HeroSection.tsx`'i client yapma, metin/CTA değişikliklerini `HeroHeadline.tsx`'e ekle.
- **Hero video/görsel ambians:** Video üzerindeki perde düz `bg-background/70` değil, iki katmanlı gradient (`bg-gradient-to-r` soldan güçlü/sağdan açık + `bg-gradient-to-t` alttan hafif) — amaç light modda videoyu beyaza boğmadan metin okunabilirliğini korumak. Sağdaki statik görsel kutusu `border-(--border) bg-(--surface)` (foreground/opacity değil, gerçek surface token'ları) + kenarlarda `--background`'a yumuşayan bir gradient katmanı kullanır, böylece hem dark hem light modda ortamla bütünleşir. Yeni video/görsel alanı eklerken bu iki katman pattern'ini reuse et.
- **Hero video CTA:** `siteConfig.heroYoutubeUrl` (`lib/site.ts`, env: `NEXT_PUBLIC_HERO_YOUTUBE_URL`). Boşsa ilgili buton render olmaz; sahte/placeholder link commit etme.
- **Klinik Galeri:** `components/gallery/ClinicGallery.tsx` + `lib/clinic-gallery.ts`. Mevcut `components/ui/carousel.tsx`'i kullan.
- **Harita:** `components/site/ClinicMapCard.tsx` + `siteConfig.address`/`lat`/`lng` (`lib/site.ts`). `address` artık `NEXT_PUBLIC_ADRESS` env değişkeniyle override edilebilir (yoksa koddaki varsayılana düşer). Yeni harita kütüphanesi ekleme, deep-link (Google/Apple Maps) pattern'ini koru.
- **Sayfa geçişi:** `components/site/PageTransition.tsx`, `app/[locale]/layout.tsx` içinde `<main>`'i sarmalar. `useReducedMotion` kontrolüne uy, `layout.tsx`'i client yapma.
- **İletişim / Lead Capture:** Randevu formu (`components/forms/AppointmentRequestForm.tsx` + `/api/appointments`) şu an **kullanımda değil** ama silinmedi — kod kasıtlı olarak duruyor, geri açmak istenirse tek satırlık import/JSX değişikliğiyle geri getirilebilir. Bunun yerine tüm iletişim CTA'ları `components/forms/WhatsAppContactCard.tsx` (Server Component, `lib/whatsapp.ts`'teki `buildWhatsAppHref()` helper'ını kullanır) ile WhatsApp'a yönlendiriyor. Yeni bir iletişim/randevu bölümü eklerken varsayılan olarak `WhatsAppContactCard`'ı kullan, form'u geri getirmek açıkça istenmedikçe `AppointmentRequestForm`'u kullanma.
- **VIP Transfer sayfası:** `app/[locale]/vip-transfer/page.tsx`, i18n namespace `VipTransfer`. Sadece havalimanı değil, İstanbul içinde genel VIP transfer hizmeti olarak çerçevelenir (otel, havalimanı, İstanbul içi herhangi bir nokta) — içerik yazarken bu genel kapsamı koru, sadece havalimanına daraltma.
- **Navigasyon listesi ≠ site'nin tüm sayfaları:** `lib/navigation.ts`'teki `navItems`'tan bir sayfa çıkarmak o sayfayı silmez. Örnek: "Saç Simülasyonu" (`/sac-simulasyonu-istanbul`) navbar'da yok ama sayfa ve ana sayfadaki hızlı-nav kartı SEO için duruyor. Bir sayfayı "kaldıralım" denildiğinde önce bunun navbar'dan mı yoksa sitenin tamamından mı kaldırılmak istendiğini ayırt et.
- **"Ana sayfaya dön" linkleri:** Next.js `<Link>`, zaten bulunduğun URL'e tıklandığında navigasyon yapmaz (no-op) — bu yüzden logo ve "Ana Sayfa" nav item'ı, `pathname` zaten home ise `onClick`'te manuel `window.scrollTo({top:0, behavior:"smooth"})` çağırır (`SiteHeader.tsx`, `MobileNav.tsx`). Aynı "zaten o sayfadayken tıklama" sorunu başka bir linkte çıkarsa aynı pattern'i kullan.

---

## Proje İlerleme Durumu

> Bu bölüm, projede tamamlanan teknik borç temizliği çalışmalarının özetini tutar. Kronolojik olarak güncellenir.

### 2026-09-09 — TypeScript / ESLint / Tailwind v4 Temizliği

**Kapsam:** Tüm proje genelinde `tsc --noEmit` ve `npm run lint` çıktısı sıfır hata/uyarıya indirildi; `MobileNav.tsx`, `AdminDashboard.tsx` ve `TestimonialsSection.tsx` dosyalarında Tailwind v4 kanonik sınıf adlandırmasına geçildi.

**1. `@typescript-eslint/no-explicit-any` (11 hata → 0):**
- `AdminDashboard.tsx`, `PostForm.tsx`, `usePosts.ts`: `any` yerine mevcut `Post` / `Partial<Post>` tipleri kullanıldı.
- `BeforeAfterSlider.tsx`: `motion.div as any` kaldırıldı, `motion.div` doğrudan kullanıldı.
- `button.tsx`: `Comp` değişkeni `React.ElementType` olarak tiplendi.
- `form.tsx`: `form: any` → `form: UseFormReturn<FieldValues>`.
- `ReviewFilters.tsx`: yerel `ReviewFilter` union tipi tanımlandı, `<select>` `onChange`'inde `as ReviewFilter` cast'i eklendi (native `string` → union narrowing için).
- `appointment.service.ts`: yerel `validStatuses as const` yerine mevcut `AppointmentStatus` tipi kullanıldı.

**2. `react-hooks/set-state-in-effect` (2 hata → 0):**
- `MobileNav.tsx`: `pathname` değişince `setOpen(false)` çağıran `useEffect` kaldırıldı; render sırasında `prevPathname` karşılaştırmasıyla state güncelleniyor.
- `ThemeToggle.tsx`: mount tespiti için `useEffect(() => setMounted(true), [])` yerine `React.useSyncExternalStore` (efektsiz SSR-guard pattern) kullanıldı.

**3. `@typescript-eslint/no-unused-vars` (11 uyarı → 0):**
- `AdminDashboard.tsx`: kullanılmayan `isLoading`/`error` destructure alias'ları kaldırıldı.
- `AppointmentCard.tsx`: kullanılmayan `isApproved`/`isRejected` değişkenleri kaldırıldı.
- `TestimonialsSection.tsx`: kullanılmayan `Locale` type import'u kaldırıldı.
- `lib/i18n.ts`: kullanılmayan `currentLocale` değişkeni kaldırıldı.
- `lib/seo.ts`: kullanılmayan `_parent: ResolvingMetadata` parametresi ve import'u kaldırıldı (`defaultGenerateMetadata` tek parametreli hale getirildi).

**4. Tailwind v4 kanonik sınıf adlandırması:**
- `MobileNav.tsx`: `z-[70]` → `z-70`, `h-[100dvh]` → `h-dvh`, `focus-visible:ring-[var(--brand-accent)]` → `focus-visible:ring-(--brand-accent)`.
- `AdminDashboard.tsx`: `max-w-[1440px]` → `max-w-360`, `min-h-[200px]` → `min-h-50`, `min-h-[800px]` → `min-h-200`.
- `TestimonialsSection.tsx`: `[var(--x)]` içerikli 15 sınıf; `@theme inline` içinde token olarak tanımlı olanlar bare isimlere (`bg-background`, `text-foreground`), diğerleri (`--brand-accent`, `--surface`, `--border`, `--foreground-secondary`) Tailwind v4'ün `(--var-adı)` kısayoluna çevrildi.

**Doğrulama:** `npx tsc --noEmit` → 0 hata, `npm run lint` → 0 hata/0 uyarı, `npm run build` → 34/34 statik sayfa başarıyla oluşturuldu.

**Not:** `Next.js 16 uyumluluk taraması` sırasında `middleware.ts → proxy.ts` geçişinin projede zaten uygulanmış olduğu ve `layout.tsx`/`lib/seo.ts` içindeki metadata yapısının (`metadataBase`, `openGraph`, `twitter`, `robots`, `alternates`) güncel Next.js 16 Metadata API'siyle uyumlu olduğu teyit edildi; bu alanlarda değişiklik gerekmedi.

### 2026-10-08 — Lüks SMP Dönüşümü (Renk, Hero, Klinik Galeri, Harita, SEO, Animasyon)

**Kapsam:** Site genelinde lüks/kurumsal SMP kliniği vizyonu uygulandı: ikincil Midnight Blue vurgu rengi eklendi, logo/favicon SVG'ye geçirildi, Hero section full-bleed hale getirilip framer-motion animasyonu ve opsiyonel YouTube CTA'sı eklendi, Klinik Galeri bileşeni landing page'e eklendi, Zorlu Center harita entegrasyonu yapıldı, "Hakkımızda" sayfası SEO için yeniden yazıldı, global sayfa geçiş animasyonu eklendi. Yeni token/component/convention detayları için bkz. "10. Styling ve UI → Renk Sistemi / Medya ve Görsel Kaynakları" ve "13. Proje Spesifik Component ve Convention'lar".

**Doğrulama:** Her değişiklik partisinden sonra `npx tsc --noEmit`, `npm run lint`, `npm run build` çalıştırıldı (hepsi temiz); `/tr`, `/tr/contact`, `/tr/about` sayfaları dev sunucusunda manuel kontrol edildi.

### 2026-10-09 — UX Düzeltmeleri, İletişim Stratejisi Değişikliği, Sayfa/Navigasyon Revizyonu

**Kapsam:** Önceki oturumun (`f3e75bb`) commit + push'undan sonra kullanıcı geri bildirimiyle gelen iki küçük parti:

**1. Navigasyon, adres ve VIP Transfer:**
- Logo/"Ana Sayfa" linkine zaten ana sayfadayken tıklamak artık sayfanın başına yumuşak scroll yapıyor (bkz. "13. Proje Spesifik Component ve Convention'lar → Ana sayfaya dön linkleri").
- Adres "İnönü, Elmadağ Cd. No:48, 34373 Şişli/İstanbul" olarak güncellendi (`lib/site.ts`, artık `NEXT_PUBLIC_ADRESS` env ile override edilebiliyor); içerikteki tüm "Zorlu Center" referansları "Şişli"ye çevrildi.
- "Saç Simülasyonu" navbar'dan kaldırıldı, sayfa ve ana sayfa kartı SEO için korundu (bkz. "Navigasyon listesi ≠ site'nin tüm sayfaları").
- `/airport-transfer` → `/vip-transfer` olarak yeniden adlandırıldı ve İstanbul içi genel VIP transfer hizmetine genişletildi (namespace `VipTransfer`), `sitemap.ts`'e eklendi.

**2. İletişim stratejisi ve Hero/galeri görsel ayarları:**
- Randevu formu (`AppointmentRequestForm`) anasayfa ve İletişim sayfasında kullanımdan kaldırıldı, yerine WhatsApp'a yönlendiren `WhatsAppContactCard` + `lib/whatsapp.ts` geldi (form kodu silinmedi, bkz. "İletişim / Lead Capture").
- Hero section'daki video perdesi ve sağdaki statik görsel kutusu, dark/light modda ortamla uyumsuz duran düz renk/gölge yerine gradient tabanlı, tema-duyarlı bir görünüme kavuşturuldu (bkz. "Hero video/görsel ambians").
- Galeri sayfasındaki birincil ÖNCE/SONRA slider'ının genişliği/oranı ince ayar yapıldı.

**Doğrulama:** Her değişiklik partisinden sonra `npx tsc --noEmit`, `npm run lint`, `npm run build` çalıştırıldı (hepsi temiz); ilgili sayfalar dev sunucusunda manuel kontrol edildi.
