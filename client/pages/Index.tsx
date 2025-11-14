import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  Wallet,
  Shield,
  ArrowRight,
  LogOut,
} from "lucide-react";

export default function Index() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">SavingsHub</h1>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </a>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-light py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl sm:text-6xl font-bold text-foreground">
                Collective Wealth <span className="text-primary">Building</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Join 12 students in a savings group that invests in Play-to-Earn
                blockchain games with guaranteed weekly returns up to 20%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-white text-base font-semibold py-6 px-8">
                    Join Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-base font-semibold py-6 px-8"
                  >
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="bg-white rounded-2xl p-8 border border-border shadow-lg">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-gradient-light rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                      {i}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        Tier {i} Portfolio
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 && "₦10,000 + 5% weekly"}
                        {i === 2 && "₦20,000 + 10% weekly"}
                        {i === 3 && "₦30,000 + 20% weekly"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Our Savings Group?
            </h3>
            <p className="text-xl text-muted-foreground">
              Transparent, secure, and rewarding collective investing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Community",
                description: "12 students working together towards financial goals",
              },
              {
                icon: TrendingUp,
                title: "Guaranteed Returns",
                description: "5% to 20% weekly interest based on your tier",
              },
              {
                icon: Shield,
                title: "Secure & Transparent",
                description: "Real-time tracking with detailed interest calculations",
              },
              {
                icon: Target,
                title: "Flexible Exit",
                description: "Withdraw anytime with your accumulated interest",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h4 className="font-bold text-lg text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section id="tiers" className="py-20 sm:py-28 bg-gradient-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Tier
            </h3>
            <p className="text-xl text-muted-foreground">
              Select the investment amount that works for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Tier 1",
                amount: "₦10,000",
                interest: "5%",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                name: "Tier 2",
                amount: "₦20,000",
                interest: "10%",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                name: "Tier 3",
                amount: "₦30,000",
                interest: "20%",
                color: "text-primary",
                bg: "bg-gradient-light",
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 border border-border bg-white hover:shadow-xl transition-all ${
                  idx === 2 ? "lg:scale-105" : ""
                }`}
              >
                {idx === 2 && (
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h4 className={`text-2xl font-bold ${tier.color} mb-2`}>
                  {tier.name}
                </h4>
                <p className="text-4xl font-bold text-foreground mb-2">
                  {tier.amount}
                </p>
                <p className="text-muted-foreground mb-6">
                  Weekly Interest: <span className="font-bold text-foreground">{tier.interest}</span>
                </p>

                <div className="space-y-3 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">After 1 week:</span>
                    <span className="font-semibold text-foreground">
                      ₦
                      {(
                        parseInt(tier.amount.replace(/[₦,]/g, "")) *
                        (1 + parseFloat(tier.interest) / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">After 4 weeks:</span>
                    <span className="font-semibold text-foreground">
                      ₦
                      {(
                        parseInt(tier.amount.replace(/[₦,]/g, "")) *
                        Math.pow(1 + parseFloat(tier.interest) / 100, 4)
                      ).toLocaleString("en-NG", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <Link to="/register" className="block">
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold">
                    Choose {tier.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Savings Journey?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join our savings group today and watch your money grow with guaranteed
            weekly returns.
          </p>
          <Link to="/register">
            <Button className="bg-gradient-primary hover:opacity-90 text-white text-base font-semibold py-6 px-8">
              Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Student Savings Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
