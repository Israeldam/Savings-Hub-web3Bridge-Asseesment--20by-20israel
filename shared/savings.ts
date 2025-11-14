// Tier definitions
export interface Tier {
  id: number;
  name: string;
  amount: number;
  weeklyInterestRate: number;
}

export const TIERS: Tier[] = [
  { id: 1, name: "Tier 1", amount: 10000, weeklyInterestRate: 5 },
  { id: 2, name: "Tier 2", amount: 20000, weeklyInterestRate: 10 },
  { id: 3, name: "Tier 3", amount: 30000, weeklyInterestRate: 20 },
];

// Student and Group types
export interface Student {
  id: string;
  userId: string;
  name: string;
  tierId: number;
  joinedAt: Date;
  currentBalance: number;
  accumulatedInterest: number;
  weeksParticipated: number;
}

export interface SavingsGroup {
  members: Student[];
  totalSaved: number;
  currentWeek: number;
}

// Helper functions
export function getTierById(tierId: number): Tier | undefined {
  return TIERS.find((tier) => tier.id === tierId);
}

export function validateTierAmount(amount: number, tierId: number): boolean {
  const tier = getTierById(tierId);
  if (!tier) return false;
  return amount === tier.amount;
}

export function calculateWeeklyInterest(
  principal: number,
  weeklyInterestRate: number
): number {
  return (principal * weeklyInterestRate) / 100;
}

export function calculateTotalAfterWeek(
  principal: number,
  weeklyInterestRate: number
): number {
  return principal + calculateWeeklyInterest(principal, weeklyInterestRate);
}

export function createStudent(
  id: string,
  userId: string,
  name: string,
  tierId: number
): Student {
  const tier = getTierById(tierId);
  if (!tier) throw new Error("Invalid tier ID");

  return {
    id,
    userId,
    name,
    tierId,
    joinedAt: new Date(),
    currentBalance: tier.amount,
    accumulatedInterest: 0,
    weeksParticipated: 0,
  };
}

export function progressWeek(student: Student): Student {
  const tier = getTierById(student.tierId);
  if (!tier) return student;

  const weeklyInterest = calculateWeeklyInterest(
    student.currentBalance,
    tier.weeklyInterestRate
  );
  const newBalance = student.currentBalance + weeklyInterest;

  return {
    ...student,
    currentBalance: newBalance,
    accumulatedInterest: student.accumulatedInterest + weeklyInterest,
    weeksParticipated: student.weeksParticipated + 1,
  };
}

export function calculateGroupTotals(group: SavingsGroup): {
  totalContributed: number;
  totalInterest: number;
  totalWithdrawable: number;
} {
  const totalContributed = group.members.reduce((sum, member) => {
    const tier = getTierById(member.tierId);
    return sum + (tier?.amount || 0);
  }, 0);

  const totalInterest = group.members.reduce(
    (sum, member) => sum + member.accumulatedInterest,
    0
  );

  const totalWithdrawable = totalContributed + totalInterest;

  return {
    totalContributed,
    totalInterest,
    totalWithdrawable,
  };
}

export function withdrawStudent(
  group: SavingsGroup,
  studentId: string
): { updatedGroup: SavingsGroup; withdrawnAmount: number } {
  const student = group.members.find((m) => m.id === studentId);
  if (!student) return { updatedGroup: group, withdrawnAmount: 0 };

  const withdrawnAmount = student.currentBalance;
  const updatedMembers = group.members.filter((m) => m.id !== studentId);
  const updatedGroup = {
    ...group,
    members: updatedMembers,
    totalSaved:
      group.totalSaved -
      withdrawnAmount +
      (student.accumulatedInterest -
        student.accumulatedInterest), // Just reduce total by what was withdrawn
  };

  return {
    updatedGroup,
    withdrawnAmount,
  };
}
