interface Props {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-8">
      {eyebrow ? <span className="badge">{eyebrow}</span> : null}
      <h2 className="section-title mt-4">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}
