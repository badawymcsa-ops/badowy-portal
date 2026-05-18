import type { Product } from "@prisma/client";
import Link from "next/link";
import { SoftwareIcon } from "@/components/brand-icons";
import { EmptyState } from "@/components/feedback/empty-state";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
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
        icon={<SoftwareIcon className="h-10 w-10" />}
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
    <StaggerContainer className="grid gap-4 lg:grid-cols-2">
      {products.map((product) => (
        <MotionCard key={product.id}>
          <ProductCard product={product} locale={locale} />
        </MotionCard>
      ))}
    </StaggerContainer>
  );
}
