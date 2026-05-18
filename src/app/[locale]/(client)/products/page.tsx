import Link from "next/link";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { ProductList } from "@/features/products/components/product-list";
import { getProductNewPath } from "@/lib/routes";
import { getCurrentClientProducts } from "@/server/queries/products/get-current-client-products";

type ProductsPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const products = await getCurrentClientProducts(locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="المنتجات"
        title="المنتجات"
        description="أضف المنتجات التي يمكن استخدامها لاحقًا في طلبات الحملات والتصاميم."
        actions={
          <Link
            href={getProductNewPath(locale)}
            className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
          >
            إضافة منتج
          </Link>
        }
      />
      <AuthMessage message={error} />
      <ProductList products={products} locale={locale} />
    </div>
  );
}
