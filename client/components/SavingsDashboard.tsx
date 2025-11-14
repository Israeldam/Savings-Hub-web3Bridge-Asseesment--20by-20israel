import { useSavings } from "@/context/SavingsContext";
import { calculateGroupTotals } from "@shared/savings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StatCard from "./StatCard";
import StudentCard from "./StudentCard";

export default function SavingsDashboard() {
  const { group, progressToNextWeek, currentWeek } = useSavings();
  const totals = calculateGroupTotals(group);

  const handleProgressWeek = () => {
    if (group.members.length === 0) {
      toast.error("No members in the group yet");
      return;
    }
    progressToNextWeek();
    toast.success(
      `Week ${currentWeek + 1} progress updated! Interest accrued.`,
    );
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Group Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Current Week"
            value={`Week ${currentWeek}`}
            icon="📅"
          />
          <StatCard
            title="Active Members"
            value={group.members.length.toString()}
            icon="👥"
          />
          <StatCard
            title="Total Contributed"
            value={`₦${totals.totalContributed.toLocaleString()}`}
            icon="💰"
          />
          <StatCard
            title="Total Interest Earned"
            value={`₦${totals.totalInterest.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`}
            highlight
            icon="📈"
          />
        </div>
      </div>

      {/* Weekly Progress Control */}
      <div className="bg-gradient-light rounded-xl p-6 border border-primary/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">
              Progress to Next Week
            </h3>
            <p className="text-sm text-muted-foreground">
              Everyone will earn interest based on their tier
            </p>
          </div>
          <Button
            onClick={handleProgressWeek}
            className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-6 whitespace-nowrap"
          >
            Simulate Weekly Progress
          </Button>
        </div>
      </div>

      {/* Total Withdrawable */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Total Group Balance
            </p>
            <p className="text-4xl font-bold text-primary">
              ₦
              {totals.totalWithdrawable.toLocaleString("en-NG", {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {totals.totalContributed} contributed +{" "}
              {totals.totalInterest.toLocaleString("en-NG", {
                maximumFractionDigits: 0,
              })}{" "}
              interest
            </p>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Group Members
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {group.members.length === 0
                ? "No members yet. Register to join!"
                : `${group.members.length} member${group.members.length !== 1 ? "s" : ""} active`}
            </p>
          </div>
        </div>

        {group.members.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground text-lg">
              🚀 Be the first to join the savings group!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.members.map((member) => (
              <StudentCard key={member.id} student={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
