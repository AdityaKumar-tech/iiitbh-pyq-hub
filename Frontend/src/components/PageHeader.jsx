// src/components/PageHeader.jsx
export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      {subtitle && <p className="text-muted mt-2 text-[15px]">{subtitle}</p>}
    </div>
  );
}