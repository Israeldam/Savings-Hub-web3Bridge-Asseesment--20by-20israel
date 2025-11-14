import { TIERS } from "@shared/savings";

interface TierSelectorProps {
  selectedTierId: number | null;
  onSelect: (tierId: number) => void;
}

export default function TierSelector({
  selectedTierId,
  onSelect,
}: TierSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-foreground">
        Select Your Savings Tier
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            className={`
              p-5 rounded-lg border-2 transition-all duration-200
              ${
                selectedTierId === tier.id
                  ? "border-primary bg-gradient-light shadow-lg scale-105"
                  : "border-border hover:border-primary/30 bg-card"
              }
            `}
          >
            <div className="text-left">
              <h3 className="font-bold text-lg text-primary mb-2">{tier.name}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">
                  <span className="font-semibold">Amount:</span> ₦
                  {tier.amount.toLocaleString()}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold">Weekly Interest:</span>{" "}
                  {tier.weeklyInterestRate}%
                </p>
                <div className="pt-2 mt-2 border-t border-border">
                  <p className="text-primary font-semibold">
                    After 1 week: ₦
                    {(
                      tier.amount +
                      (tier.amount * tier.weeklyInterestRate) / 100
                    ).toLocaleString("en-NG", { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
