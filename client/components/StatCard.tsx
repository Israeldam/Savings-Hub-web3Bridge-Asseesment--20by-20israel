import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export default function StatCard({ title, value, icon, highlight }: StatCardProps) {
  return (
    <div
      className={`
        rounded-xl p-6 transition-all duration-200
        ${
          highlight
            ? "bg-gradient-primary text-white shadow-lg"
            : "bg-card border border-border hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-sm font-medium mb-2 ${highlight ? "text-white/80" : "text-muted-foreground"}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${highlight ? "text-white" : "text-foreground"}`}>
            {value}
          </p>
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
}
