import { Link } from "react-router-dom";
import RegistrationForm from "@/components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Registration() {
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
            Back
          </Link>
          <h1 className="text-xl font-bold text-foreground">Student Savings Group</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Join Our Savings Group
              </h2>
              <p className="text-lg text-muted-foreground">
                Be part of a collective investment in a Play-to-Earn blockchain game with
                guaranteed weekly returns.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-5 border border-border">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  Secure & Transparent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track your savings in real-time with detailed weekly interest calculations
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border border-border">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  Guaranteed Returns
                </h3>
                <p className="text-sm text-muted-foreground">
                  5% to 20% weekly interest depending on your tier selection
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border border-border">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Community Driven
                </h3>
                <p className="text-sm text-muted-foreground">
                  12 students working together towards shared financial goals
                </p>
              </div>
            </div>

            <Link to="/dashboard">
              <Button variant="outline" className="w-full font-semibold">
                View Savings Dashboard
              </Button>
            </Link>
          </div>

          {/* Right Side - Registration Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <RegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
