import React, { createContext, useContext, useState } from "react";
import { Student, SavingsGroup } from "@shared/savings";
import {
  createStudent,
  progressWeek,
  withdrawStudent,
  calculateGroupTotals,
} from "@shared/savings";

interface SavingsContextType {
  group: SavingsGroup;
  addStudent: (name: string, tierId: number) => void;
  withdrawStudentMember: (studentId: string) => void;
  progressToNextWeek: () => void;
  currentWeek: number;
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

export function SavingsProvider({ children }: { children: React.ReactNode }) {
  const [group, setGroup] = useState<SavingsGroup>({
    members: [],
    totalSaved: 0,
    currentWeek: 0,
  });

  const addStudent = (name: string, tierId: number) => {
    const newStudent = createStudent(`student-${Date.now()}`, name, tierId);
    const updatedMembers = [...group.members, newStudent];
    const newTotal = group.totalSaved + newStudent.currentBalance;
    setGroup({
      members: updatedMembers,
      totalSaved: newTotal,
      currentWeek: group.currentWeek,
    });
  };

  const withdrawStudentMember = (studentId: string) => {
    const { updatedGroup, withdrawnAmount } = withdrawStudent(group, studentId);
    const newTotal = group.totalSaved - withdrawnAmount;
    setGroup({
      ...updatedGroup,
      totalSaved: newTotal,
    });
  };

  const progressToNextWeek = () => {
    const updatedMembers = group.members.map((member) => progressWeek(member));
    const newTotal = updatedMembers.reduce(
      (sum, member) => sum + member.currentBalance,
      0
    );
    setGroup({
      members: updatedMembers,
      totalSaved: newTotal,
      currentWeek: group.currentWeek + 1,
    });
  };

  return (
    <SavingsContext.Provider
      value={{
        group,
        addStudent,
        withdrawStudentMember,
        progressToNextWeek,
        currentWeek: group.currentWeek,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  const context = useContext(SavingsContext);
  if (!context) {
    throw new Error("useSavings must be used within SavingsProvider");
  }
  return context;
}
