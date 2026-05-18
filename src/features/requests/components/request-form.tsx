import type { Product, Service } from "@prisma/client";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RequestStepper, requestSteps } from "@/features/requests/components/request-stepper";
import { RequestSummary } from "@/features/requests/components/request-summary";
import {
  campaignGoalOptions,
  creativeStyleOptions,
  platformOptions,
  requestTypeOptions
} from "@/features/requests/request-options";
import { getProductNewPath, getServiceNewPath } from "@/lib/routes";

type RequestFormProps = {
  action: (formData: FormData) => Promise<void>;
  products: Product[];
  services: Service[];
  locale: string;
};

type Option = {
  label: string;
  value: string;
};

function StepSection({ stepIndex, children }: { stepIndex: number; children: ReactNode }) {
  const step = requestSteps[stepIndex];

  return (
    <section className="grid gap-4 rounded-bd border border-bd-border bg-white/[0.025] p-4">
      <div>
        <p className="text-xs font-semibold text-bd-violet">الخطوة {stepIndex + 1}</p>
        <h2 className="mt-1 text-lg font-bold text-bd-text">{step.label}</h2>
        <p className="mt-1 text-sm leading-6 text-bd-muted">{step.description}</p>
      </div>
      {children}
    </section>
  );
}

function OptionGrid({ name, options }: { name: string; options: Option[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 rounded-bd border border-bd-border bg-white/[0.035] p-3 text-sm text-bd-text transition hover:border-bd-violet/50 hover:bg-bd-violet/10"
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            className="h-4 w-4 accent-bd-violet"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export function RequestForm({ action, products, services, locale }: RequestFormProps) {
  return (
    <form action={action} className="grid gap-6">
      <RequestStepper />

      <Card>
        <CardContent className="grid gap-5 pt-6">
          <StepSection stepIndex={0}>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-bd-text">المنتجات</p>
                  <Link href={getProductNewPath(locale)} className="text-xs font-medium text-bd-violet">
                    إضافة منتج
                  </Link>
                </div>
                {products.length > 0 ? (
                  <OptionGrid
                    name="selectedProducts"
                    options={products.map((product) => ({
                      value: product.id,
                      label: product.name
                    }))}
                  />
                ) : (
                  <p className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm leading-7 text-bd-muted">
                    لا توجد منتجات بعد. يمكنك إرسال الطلب بدون منتجات أو إضافة منتج أولًا.
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-bd-text">الخدمات</p>
                  <Link href={getServiceNewPath(locale)} className="text-xs font-medium text-bd-violet">
                    إضافة خدمة
                  </Link>
                </div>
                {services.length > 0 ? (
                  <OptionGrid
                    name="selectedServices"
                    options={services.map((service) => ({
                      value: service.id,
                      label: service.name
                    }))}
                  />
                ) : (
                  <p className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm leading-7 text-bd-muted">
                    لا توجد خدمات بعد. يمكنك إرسال الطلب بدون خدمات أو إضافة خدمة أولًا.
                  </p>
                )}
              </div>
            </div>
          </StepSection>

          <StepSection stepIndex={1}>
            <OptionGrid name="requestTypes" options={requestTypeOptions} />
          </StepSection>

          <StepSection stepIndex={2}>
            <OptionGrid name="goals" options={campaignGoalOptions} />
          </StepSection>

          <StepSection stepIndex={3}>
            <OptionGrid name="platforms" options={platformOptions} />
          </StepSection>

          <StepSection stepIndex={4}>
            <OptionGrid name="creativeStyles" options={creativeStyleOptions} />
          </StepSection>

          <StepSection stepIndex={5}>
            <div className="grid gap-4">
              <Input
                label="عنوان الطلب"
                name="title"
                placeholder="مثال: حملة إطلاق منتج الصيف"
                required
              />
              <Textarea
                label="الرسالة الرئيسية"
                name="mainMessage"
                placeholder="ما الفكرة أو الرسالة التي يجب أن تصل للجمهور؟"
                minLength={10}
                required
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="العرض / السعر" name="offer" placeholder="مثال: خصم 20% حتى نهاية الشهر" />
                <Input label="اللغة" name="language" placeholder="العربية" defaultValue="العربية" required />
                <Input label="اللهجة" name="dialect" placeholder="سعودية، خليجية، فصحى..." />
                <Input label="المنافسون" name="competitors" placeholder="أسماء أو روابط المنافسين" />
              </div>
              <Textarea label="النصوص المطلوبة" name="requiredTexts" placeholder="أي نصوص أو عبارات يجب استخدامها." />
              <Textarea label="العناصر الممنوعة" name="forbiddenElements" placeholder="أي عناصر، كلمات، أو توجهات لا تريد ظهورها." />
              <Textarea label="المراجع" name="references" placeholder="روابط أو وصف لأمثلة مشابهة أعجبتك." />
            </div>
          </StepSection>

          <StepSection stepIndex={6}>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="تاريخ البداية" name="startDate" type="date" />
              <Input label="الموعد النهائي" name="deadline" type="date" />
              <Input label="مدة الحملة" name="campaignDuration" placeholder="مثال: 7 أيام، شهر، ربع سنة" />
              <label className="flex items-center gap-3 rounded-bd border border-bd-border bg-white/[0.035] p-3 text-sm text-bd-text">
                <input type="checkbox" name="isUrgent" className="h-4 w-4 accent-bd-violet" />
                <span>الطلب مستعجل</span>
              </label>
              <div className="md:col-span-2">
                <Textarea
                  label="سبب الاستعجال"
                  name="urgentReason"
                  placeholder="اكتب سبب الاستعجال إذا كان الطلب مستعجلًا."
                />
              </div>
            </div>
          </StepSection>

          <StepSection stepIndex={7}>
            <RequestSummary />
          </StepSection>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">إرسال الطلب</Button>
      </div>
    </form>
  );
}
