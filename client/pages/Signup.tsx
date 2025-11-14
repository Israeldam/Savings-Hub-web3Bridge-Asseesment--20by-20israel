import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSavings } from "@/context/SavingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TIERS } from "@shared/savings";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

export default function Signup() {
  const { signup } = useAuth();
  const { addStudent } = useSavings();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTierId, setSelectedTierId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    if (!selectedTierId) {
      toast.error("Please select a savings tier");
      return;
    }

    setIsLoading(true);

    const result = signup(username, email, password, selectedTierId);

    if (result.success) {
      // Get the newly created user
      const authUsersStr = localStorage.getItem("auth_users") || "[]";
      const authUsers = JSON.parse(authUsersStr);
      const newUser = authUsers[authUsers.length - 1];

      // Add student to savings group
      addStudent(newUser.id, username, selectedTierId);

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } else {
      toast.error(result.error || "Signup failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">SavingsHub</h1>
          </Link>
        </div>
      </div>

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
          </div>

          {/* Right Side - Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Info Section */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Account Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your full name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-11 text-base"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 text-base"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password (min 6 chars)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tier Selection Section */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Select Your Savings Tier
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-200 text-left
                        ${
                          selectedTierId === tier.id
                            ? "border-primary bg-gradient-light shadow-lg"
                            : "border-border hover:border-primary/30 bg-white"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-primary">
                          {tier.name}
                        </h4>
                        {selectedTierId === tier.id && (
                          <span className="text-primary font-bold">✓</span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground font-semibold">
                          ₦{tier.amount.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">
                          {tier.weeklyInterestRate}% weekly interest
                        </p>
                        <p className="text-primary font-semibold pt-2">
                          After 1 week: ₦
                          {(
                            tier.amount +
                            (tier.amount * tier.weeklyInterestRate) / 100
                          ).toLocaleString("en-NG", { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 text-white"
              >
                {isLoading ? "Creating Account..." : "Create Account & Join"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
