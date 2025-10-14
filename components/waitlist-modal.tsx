"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"student" | "tutor">("student");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const pathname = usePathname();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const { error } = await supabase
      .from("waitlist_emails")
      .insert([{ email, name, user_type: userType, source_path: pathname || "/" }]);

    if (error) {
      setStatus("err");
      return;
    }

    setStatus("ok");
    setName("");
    setEmail("");
    setUserType("student");

    // Close after a short beat
    setTimeout(() => {
      onOpenChange(false);
      setStatus("idle");
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg animate-slide-up bg-white">
        {status !== "ok" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Join the waitlist</DialogTitle>
              <DialogDescription className="text-base">
                Join the waitlist to be the first to connect with tutors instantly.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium">I'm interested as a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={userType === "student" ? "default" : "outline"}
                    className={`h-9 text-sm font-medium rounded-lg transition-all ${
                      userType === "student"
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-transparent hover:bg-secondary"
                    }`}
                    onClick={() => setUserType("student")}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "tutor" ? "default" : "outline"}
                    className={`h-9 text-sm font-medium rounded-lg transition-all ${
                      userType === "tutor"
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-transparent hover:bg-secondary"
                    }`}
                    onClick={() => setUserType("tutor")}
                  >
                    Tutor
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                {status === "loading" ? "Adding..." : "Join the Waitlist"}
              </Button>

              {status === "err" && (
                <p className="text-red-600 text-sm">Something went wrong. Try again.</p>
              )}
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-background" />
            </div>
            <DialogTitle className="text-2xl font-semibold mb-2">You’re on the list!</DialogTitle>
            <DialogDescription className="text-base">We’ll reach out soon.</DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
