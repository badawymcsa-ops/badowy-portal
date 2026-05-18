import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { ProductForm } from "@/features/products/components/product-form";
import { createProductAction } from "@/server/actions/products/create-product";

type NewProductPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewProductPage({ params, searchParams }: NewProductPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="المنتجات"
        title="إضافة منتج جديد"
        description="أضف بيانات المنتج الأساسية حتى يمكن لفريق بدوي استخدامه لاحقًا في الحملات والتصاميم."
      />
      <AuthMessage message={error} />
      <ProductForm action={createProductAction.bind(null, locale)} submitLabel="حفظ المنتج" />
    </div>
  );
}
