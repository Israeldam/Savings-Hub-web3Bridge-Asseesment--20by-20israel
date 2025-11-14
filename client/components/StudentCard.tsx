import { Student } from "@shared/savings";
import { getTierById } from "@shared/savings";
import { Button } from "@/components/ui/button";
import { useSavings } from "@/context/SavingsContext";
import { toast } from "sonner";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const { withdrawStudentMember } = useSavings();
  const tier = getTierById(student.tierId);

  if (!tier) return null;

  const handleWithdraw = () => {
    if (window.confirm(`Are you sure you want to withdraw? You'll get ₦${student.currentBalance.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`)) {
      withdrawStudentMember(student.id);
      toast.success(`${student.name} has withdrawn ₦${student.currentBalance.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-bold text-lg text-foreground">{student.name}</h3>
          <p className="text-sm text-primary font-semibold">{tier.name}</p>
        </div>
        <div className="bg-gradient-light px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-primary">
            Week {student.weeksParticipated}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Principal Amount:</span>
          <span className="font-semibold text-foreground">
            ₦{tier.amount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Accumulated Interest:</span>
          <span className="font-semibold text-secondary">
            +₦{student.accumulatedInterest.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-foreground">Current Balance:</span>
          <span className="text-lg font-bold text-primary">
            ₦{student.currentBalance.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      <Button
        onClick={handleWithdraw}
        variant="outline"
        className="w-full text-sm font-semibold hover:bg-destructive/10 hover:text-destructive border-destructive text-destructive"
      >
        Withdraw Funds
      </Button>
    </div>
  );
}
