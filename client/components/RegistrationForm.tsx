import { useState } from "react";
import { useSavings } from "@/context/SavingsContext";
import TierSelector from "./TierSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RegistrationForm() {
  const { addStudent } = useSavings();
  const [name, setName] = useState("");
  const [selectedTierId, setSelectedTierId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!selectedTierId) {
      toast.error("Please select a savings tier");
      return;
    }

    try {
      addStudent(name.trim(), selectedTierId);
      toast.success(`Welcome to the savings group, ${name}! 🎉`);
      setName("");
      setSelectedTierId(null);
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Your Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 text-base"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This is how you'll be identified in the savings group
          </p>
        </div>

        <TierSelector selectedTierId={selectedTierId} onSelect={setSelectedTierId} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 text-white"
        >
          {isSubmitting ? "Registering..." : "Join Savings Group"}
        </Button>
      </form>
    </div>
  );
}
