import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSavings } from "@/context/SavingsContext";
import { Button } from "@/components/ui/button";
import { getTierById, calculateGroupTotals } from "@shared/savings";
import { ArrowLeft, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { group, withdrawStudentMember, progressToNextWeek, currentWeek } =
    useSavings();

  // Get current user's student record
  const currentUserStudent = group.members.find((m) => m.userId === user?.id);
  const currentUserTier = currentUserStudent
    ? getTierById(currentUserStudent.tierId)
    : null;

  const totals = calculateGroupTotals(group);

  const handleLogout = () => {
    logout();
  };

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

  const handleWithdraw = (studentId: string, studentName: string) => {
    if (
      window.confirm(
        `Are you sure you want to withdraw your funds? You'll be removed from the group.`,
      )
    ) {
      withdrawStudentMember(studentId);
      toast.success(`${studentName} has withdrawn from the group`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Home
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Savings Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* User Welcome Section */}
          {currentUserStudent && (
            <div className="bg-gradient-primary text-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/80 text-sm mb-2">
                    Welcome, {user?.username}
                  </p>
                  <h2 className="text-3xl font-bold mb-2">
                    ₦
                    {currentUserStudent.currentBalance.toLocaleString("en-NG", {
                      maximumFractionDigits: 0,
                    })}
                  </h2>
                  <p className="text-white/80">Your Current Balance</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Tier</p>
                    <p className="font-bold text-lg">{currentUserTier?.name}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">
                      Weekly Interest
                    </p>
                    <p className="font-bold text-lg">
                      {currentUserTier?.weeklyInterestRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">Weeks Active</p>
                    <p className="font-bold text-lg">
                      {currentUserStudent.weeksParticipated}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">
                      Interest Earned
                    </p>
                    <p className="font-bold text-lg">
                      ₦
                      {currentUserStudent.accumulatedInterest.toLocaleString(
                        "en-NG",
                        { maximumFractionDigits: 0 },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group Overview Stats */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Group Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Current Week
                </p>
                <p className="text-3xl font-bold text-foreground">
                  Week {currentWeek}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Active Members
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {group.members.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Total Contributed
                </p>
                <p className="text-3xl font-bold text-foreground">
                  ₦{totals.totalContributed.toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-primary text-white rounded-xl p-6">
                <p className="text-sm text-white/80 mb-2">
                  Total Interest Earned
                </p>
                <p className="text-3xl font-bold">
                  ₦
                  {totals.totalInterest.toLocaleString("en-NG", {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
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

          {/* Total Group Balance */}
          <div className="bg-white rounded-xl border border-border p-6">
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
                  {totals.totalContributed.toLocaleString()} contributed +{" "}
                  {totals.totalInterest.toLocaleString("en-NG", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  interest
                </p>
              </div>
            </div>
          </div>

          {/* Group Members */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Group Members
            </h2>
            {group.members.length === 0 ? (
              <div className="bg-white rounded-xl border border-border p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  🚀 Be the first to join the savings group!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {group.members.map((member) => {
                  const isCurrentUser = member.userId === user?.id;
                  const tier = getTierById(member.tierId);

                  return (
                    <div
                      key={member.id}
                      className={`rounded-xl border-2 p-6 transition-all ${
                        isCurrentUser
                          ? "bg-gradient-light border-primary shadow-lg"
                          : "bg-white border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-foreground">
                              {member.name}
                            </h3>
                            {isCurrentUser && (
                              <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-primary font-semibold">
                            {tier?.name}
                          </p>
                        </div>
                        <div className="bg-primary/10 px-3 py-1 rounded-full">
                          <span className="text-xs font-semibold text-primary">
                            Week {member.weeksParticipated}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Principal
                          </p>
                          <p className="font-semibold text-foreground">
                            ₦{tier?.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Interest Earned
                          </p>
                          <p className="font-semibold text-secondary">
                            +₦
                            {member.accumulatedInterest.toLocaleString(
                              "en-NG",
                              { maximumFractionDigits: 0 },
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Interest Rate
                          </p>
                          <p className="font-semibold text-primary">
                            {tier?.weeklyInterestRate}%/week
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Balance
                          </p>
                          <p className="font-bold text-lg text-primary">
                            ₦
                            {member.currentBalance.toLocaleString("en-NG", {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      </div>

                      {isCurrentUser && (
                        <Button
                          onClick={() => handleWithdraw(member.id, member.name)}
                          variant="outline"
                          className="w-full text-sm font-semibold hover:bg-destructive/10 hover:text-destructive border-destructive text-destructive"
                        >
                          Withdraw Funds
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
