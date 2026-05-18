type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start"
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-semibold text-bd-violet">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-bd-text md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-bd-muted">{description}</p> : null}
    </div>
  );
}
