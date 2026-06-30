interface PageHeaderProps {
  modul: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ modul, title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <div className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-coral-500">
          Modul {modul}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
