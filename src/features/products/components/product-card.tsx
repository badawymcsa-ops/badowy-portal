import type { Product } from "@prisma/client";
import Link from "next/link";
import { SoftwareIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteProductButton } from "@/features/products/components/delete-product-button";
import {
  PRODUCT_AVAILABILITY_LABELS,
  PRODUCT_AVAILABILITY_TONES
} from "@/features/products/product-availability";
import { deleteProductAction } from "@/server/actions/products/delete-product";
import { getProductEditPath } from "@/lib/routes";

type ProductCardProps = {
  product: Product;
  locale: string;
};

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Card className="bd-gradient-border bd-hover-lift">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <SoftwareIcon className="h-10 w-10 shrink-0" />
            <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="mt-2 text-sm text-bd-muted">{product.category || "بدون تصنيف"}</p>
            </div>
          </div>
          <Badge tone={PRODUCT_AVAILABILITY_TONES[product.availability]}>
            {PRODUCT_AVAILABILITY_LABELS[product.availability]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="line-clamp-3 text-sm leading-7 text-bd-muted">{product.description}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">السعر</p>
            <p className="mt-1 text-sm text-bd-text">{product.price || "غير محدد"}</p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الجمهور</p>
            <p className="mt-1 text-sm text-bd-text">{product.targetAudience || "غير محدد"}</p>
          </div>
        </div>
        {product.features.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 4).map((feature) => (
              <span key={feature} className="rounded-full border border-bd-border bg-white/[0.04] px-3 py-1 text-xs text-bd-muted">
                {feature}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Link
            href={getProductEditPath(product.id, locale)}
            className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            تعديل
          </Link>
          <DeleteProductButton action={deleteProductAction.bind(null, locale, product.id)} />
        </div>
      </CardContent>
    </Card>
  );
}
