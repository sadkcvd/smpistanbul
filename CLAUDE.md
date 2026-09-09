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