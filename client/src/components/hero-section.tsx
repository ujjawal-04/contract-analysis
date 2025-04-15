import { ArrowRight, Globe, Sparkles, Brain, AlertCircle, UsersRound, CircleDollarSign, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Features array with title, description and icon name
const features = [
  {
    title: "AI powered Analysis",
    description: "Leverage intelligence & AI to analyze contracts",
    icon: Brain
  },
  {
    title: "Risk identification",
    description: "Spot potential risks and opportunities in your contracts",
    icon: AlertCircle
  },
  {
    title: "Streamlined negotiations",
    description: "Accelerate negotiation process with AI-driven insights",
    icon: UsersRound
  },
  {
    title: "Cost reduction",
    description: "Significantly reduce legal costs through automation",
    icon: CircleDollarSign
  },
  {
    title: "Improved compliance",
    description: "Ensure your contracts meet all regulatory requirements",
    icon: ShieldCheck
  },
  {
    title: "Faster Turnaround",
    description: "Complete contract reviews in minutes instead of hours",
    icon: Clock
  }
];

export function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-background/90">
            <div className="container px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
                <Link
                    href={"/dashboard"}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4 py-2 mb-4 rounded-full")}
                >
                    <span className="mr-3">
                        <Sparkles className="size-3.5"/>
                    </span>
                    Introducing Simple Metrics for you team
                </Link>
                <div className="text-center mb-12 w-full">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary">
                        Revoltionzie Your Contracts
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                       Harness the power of AI to analyze,understand, and optimize your contracts in no time
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button className="inline-flex items-center justify-center text-lg" size={"lg"}>
                            Get Started
                            <ArrowRight className="ml-2 size-5"/>
                        </Button>
                        <Button className="inline-flex items-center justify-center text-lg" size={"lg"} variant={"outline"}>
                            Learn More
                            <Globe className="ml-2 size-5"/>
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <Card key={index} className="h-full">
                                <CardHeader className="text-center">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-center">{feature.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                    </div>
                </div>
            </div>
        </section>
    );
}