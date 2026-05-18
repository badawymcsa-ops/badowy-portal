import type { Product } from "@prisma/client";
import Link from "next/link";
import { EmptyState } from "@/components/feedback/empty-state";
import { ProductCard } from "@/features/products/components/product-card";
import { getProductNewPath } from "@/lib/routes";

type ProductListProps = {
  products: Product[];
  locale: string;
};

export function ProductList({ products, locale }: ProductListProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="لا توجد منتجات بعد"
        description="ابدأ بإضافة المنتجات الأساسية حتى تصبح جاهزة للاستخدام لاحقًا داخل طلبات الحملات والتصاميم."
        action={
          <Link
            href={getProductNewPath(locale)}
            className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
          >
            إضافة منتج جديد
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}
