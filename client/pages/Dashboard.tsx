import { Link } from "react-router-dom";
import SavingsDashboard from "@/components/SavingsDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
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
          <h1 className="text-xl font-bold text-foreground">Savings Dashboard</h1>
          <Link to="/register">
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-white font-semibold">
              Add Student
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SavingsDashboard />
      </main>
    </div>
  );
}
