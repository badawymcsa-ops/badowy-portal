import type { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_AVAILABILITY_OPTIONS } from "@/features/products/product-availability";

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  product?: Product | null;
  submitLabel: string;
};

export function ProductForm({ action, product, submitLabel }: ProductFormProps) {
  return (
    <form action={action} className="grid gap-6">
      <Card>
        <CardContent className="grid gap-5 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="اسم المنتج"
              name="name"
              defaultValue={product?.name ?? ""}
              placeholder="مثال: باقة تصوير منتجات"
              required
            />
            <Input
              label="السعر"
              name="price"
              defaultValue={product?.price ?? ""}
              placeholder="مثال: 150 ريال أو حسب الطلب"
            />
            <Input
              label="التصنيف"
              name="category"
              defaultValue={product?.category ?? ""}
              placeholder="مثال: منتج رقمي، غذائي، خدمة باقة..."
            />
            <Select
              label="حالة التوفر"
              name="availability"
              defaultValue={product?.availability ?? "AVAILABLE"}
              options={PRODUCT_AVAILABILITY_OPTIONS}
              required
            />
          </div>

          <Textarea
            label="وصف المنتج"
            name="description"
            defaultValue={product?.description ?? ""}
            placeholder="اكتب وصفًا مختصرًا وواضحًا للمنتج، قيمته، وما يميزه."
            minLength={10}
            required
          />

          <Textarea
            label="المميزات"
            hint="اكتب المميزات مفصولة بفواصل أو كل ميزة في سطر."
            name="features"
            defaultValue={product?.features.join(", ") ?? ""}
            placeholder="ميزة 1، ميزة 2، ميزة 3"
          />

          <Textarea
            label="الجمهور المستهدف"
            name="targetAudience"
            defaultValue={product?.targetAudience ?? ""}
            placeholder="من هو العميل الأنسب لهذا المنتج؟"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="رابط الشراء"
              name="purchaseLink"
              defaultValue={product?.purchaseLink ?? ""}
              placeholder="https://example.com/product"
              type="url"
            />
            <Input
              label="رابط صورة المنتج"
              hint="رفع الصور الفعلي سيتم في مرحلة الملفات."
              name="imageUrl"
              defaultValue={product?.imageUrl ?? ""}
              placeholder="https://example.com/product.jpg"
              type="url"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
