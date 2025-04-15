"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSubscription } from "@/hooks/use-subscription";
import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CreditCard, AlertTriangle, Check } from "lucide-react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function Settings() {
  const {
    subscriptionStatus,
    isSubscriptionLoading,
    isSubscriptionError,
    setLoading,
  } = useSubscription();
  
  const { user } = useCurrentUser();
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Use this effect to confirm we're on the client side and set initial values
  useEffect(() => {
    setIsClient(true);
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);
  
  // If we haven't confirmed client-side rendering yet, show a loading state
  if (!isClient) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-gray-500">Loading your settings...</p>
      </div>
    );
  }
  
  // Check subscriptionStatus or user.isPremium directly
  const isActive = subscriptionStatus?.status === "active" || user?.isPremium === true;
  
  const handleUpgrade = async () => {
    setLoading(true);
    if (!isActive) {
      try {
        // Using POST instead of GET as shown in the example code
        const response = await api.get("/payments/create-checkout-session");
        const stripe = await stripePromise;
        
        if (response.data && response.data.sessionId) {
          await stripe?.redirectToCheckout({
            sessionId: response.data.sessionId,
          });
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Upgrade error:", error);
        toast.error("Failed to process upgrade. Please try again or contact support.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You are already a premium member");
    }
  };

  console.log("User premium status:", {
    subscriptionStatus: subscriptionStatus?.status,
    userIsPremium: user?.isPremium,
    isActive
  });

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
                Your Personal Information
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                value={user?.displayName || ""}
                id="name"
                readOnly
                className="bg-gray-100">
                </Input>
                <Label>Email</Label>
                <Input
                value={user?.email || ""}
                id="email"
                readOnly
                className="bg-gray-100">
                </Input>
            </div>
            <p>Your account is managed through Google. If you want to change your email, please contact us.</p>
        </CardContent>
      </Card>

      {isActive ? (
          <Card>
           <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Your membership details</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-md bg-green-600/10 p-1 pr-2 text-xs font-medium text-green-600">
                    <div className="m-0.5 rounded-full bg-green-600 p-[3px]">
                    <Check size={16} className="text-foreground"/>
                    </div>
                    Active Membership
                    </div>
                    <p>Lifetime membership granted</p>
                </div>
            </div>
            <Separator/>
            <div className="space-y-2">
              <p>
                Thank you for your support.Enjoy the benefits of premium.
              </p>
            </div>
           </CardContent>
          </Card>
      ) : (
         <Card>
           <CardHeader>
            <CardTitle>Get unlimited access forever</CardTitle>
            <CardDescription>Upgrade to premium and enjoy unlimited access to all features</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
           <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-md bg-yellow-600/10 p-1 pr-2 text-xs font-medium text-yellow-600">
                    <div className="m-0.5 rounded-full bg-yellow-600 p-[3px]">
                    <AlertTriangle size={16} className="text-foreground"/>
                    </div>
                    Free Plan
                    </div>
                </div>
            <ul className="space-y-2">
               <li className="flex items-center gap-2">
                <Check size={16} className="text-foreground" />
                <p>Unlimited access to all features</p>
               </li>
               <li className="flex items-center gap-2">
                <Check size={16} className="text-foreground" />
                <p>Unlimited access to all features</p>
               </li>
               <li className="flex items-center gap-2">
                <Check size={16} className="text-foreground" />
                <p>Unlimited access to all features</p>
               </li>
            </ul>
                <Button className="w-full" onClick={handleUpgrade} variant={"outline"}>
                  Upgrade to premium
                </Button>
           </CardContent>
          </Card>
      )}
          </div>
    </div>
  );
}