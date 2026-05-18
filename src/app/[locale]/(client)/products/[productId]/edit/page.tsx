import { notFound } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { DeleteProductButton } from "@/features/products/components/delete-product-button";
import { ProductForm } from "@/features/products/components/product-form";
import { deleteProductAction } from "@/server/actions/products/delete-product";
import { updateProductAction } from "@/server/actions/products/update-product";
import { getCurrentClientProduct } from "@/server/queries/products/get-current-client-product";

type EditProductPageProps = {
  params: Promise<{
    locale: string;
    productId: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditProductPage({ params, searchParams }: EditProductPageProps) {
  const { locale, productId } = await params;
  const { error } = await searchParams;
  const product = await getCurrentClientProduct(productId, locale);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="المنتجات"
        title="تعديل المنتج"
        description="حدّث بيانات المنتج حتى تبقى جاهزة للاستخدام في الحملات القادمة."
        actions={<DeleteProductButton action={deleteProductAction.bind(null, locale, product.id)} />}
      />
      <AuthMessage message={error} />
      <ProductForm
        action={updateProductAction.bind(null, locale, product.id)}
        product={product}
        submitLabel="حفظ التعديلات"
      />
    </div>
  );
}
