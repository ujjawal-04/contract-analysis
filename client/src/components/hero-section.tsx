import { ArrowRight, Play, Sparkles, Brain, AlertCircle, UsersRound, CircleDollarSign, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { PricingSection } from "./pricing-section";

// Features array with title, description and icon name
const features = [
  {
    title: "AI powered Analysis",
    description: "Leverage intelligence & AI to analyze contracts quickly and accurately",
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
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const animButtonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="container px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href={"/dashboard"}
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4 py-2 mb-6 rounded-full border border-blue-200 flex items-center")}
                        >
                            <span className="mr-2 text-blue-500">
                                <Sparkles className="size-3.5"/>
                            </span>
                            Introducing simple metrics for your contracts
                        </Link>
                    </motion.div>
                    
                    <motion.div 
                        className="text-center mb-12 w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 
                            className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-slate-800 mb-4"
                            variants={itemVariants}
                        >
                            Revolutionize your contract<br />analysis powered by AI
                        </motion.h1>
                        
                        <motion.p 
                            className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            Harness the power of AI to analyze, understand, and optimize your contracts in minutes, not hours
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                            variants={itemVariants}
                        >
                            <motion.div whileHover="hover" variants={animButtonVariants}>
                            <Link
                            href={"/dashboard"}>
                                <Button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white" size={"lg"}>
                                    Get started
                                    <ArrowRight className="ml-2 size-4"/>
                                </Button>
                            </Link>
                            </motion.div>
                            
                            <motion.div whileHover="hover" variants={animButtonVariants}>
                                <Button className="inline-flex items-center justify-center border-blue-200" size={"lg"} variant={"outline"}>
                                    Watch Demo
                                    <Play className="ml-2 size-4 fill-current" />
                                </Button>
                            </motion.div>
                        </motion.div>
                        
                        {/* Dashboard Preview Image */}
                        <motion.div 
                            className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="bg-white rounded-xl shadow-2xl">
                                {/* This would be the dashboard image in the actual implementation */}
                                <img 
                                    src="/api/placeholder/1200/675" 
                                    alt="Dashboard preview" 
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-16 bg-white">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl font-bold text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Features
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            let iconColor;
                            let bgColor;
                            
                            // Assign different colors to each feature card based on index
                            switch(index) {
                                case 0: // AI powered Analysis
                                    iconColor = "text-indigo-600";
                                    bgColor = "bg-indigo-100";
                                    break;
                                case 1: // Risk identification
                                    iconColor = "text-blue-600";
                                    bgColor = "bg-blue-100";
                                    break;
                                case 2: // Streamlined negotiations
                                    iconColor = "text-purple-600";
                                    bgColor = "bg-purple-100";
                                    break;
                                case 3: // Cost reduction
                                    iconColor = "text-pink-600";
                                    bgColor = "bg-pink-100";
                                    break;
                                case 4: // Improved compliance
                                    iconColor = "text-amber-600";
                                    bgColor = "bg-amber-100";
                                    break;
                                case 5: // Faster Turnaround
                                    iconColor = "text-emerald-600";
                                    bgColor = "bg-emerald-100";
                                    break;
                                default:
                                    iconColor = "text-blue-600";
                                    bgColor = "bg-blue-100";
                            }
                            
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    <Card className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                        <CardHeader className="text-center pb-2">
                                            <div className={`mx-auto flex items-center justify-center h-14 w-14 rounded-full ${bgColor} mb-4`}>
                                                <IconComponent className={`h-7 w-7 ${iconColor}`} />
                                            </div>
                                            <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-slate-500 text-center text-sm">{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Analysis Results Section */}
            <section className="w-full py-16 bg-gradient-to-b from-white to-blue-50">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-center mb-8">Contract Analysis result</h2>
                        
                        {/* Analysis image would go here */}
                        <motion.div 
                            className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        >
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100">
                                <div className="p-4">
                                    <img 
                                        src="/api/placeholder/1200/675" 
                                        alt="Contract analysis dashboard" 
                                        className="w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <PricingSection/>

            {/* Footer */}
            <footer className="w-full py-16 bg-slate-50 border-t border-gray-200">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Info */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="font-bold text-lg text-blue-600">Logo</h3>
                            <p className="text-sm text-slate-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div className="flex items-center mt-4">
                                <input type="checkbox" className="mr-2 accent-blue-500" checked readOnly />
                                <span className="text-sm">example@gmail.com</span>
                            </div>
                            <div className="text-sm mt-2">1234567412</div>
                        </motion.div>
                    </div>
                    
                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="font-bold text-lg text-blue-600 mb-4">Links</h3>
                        <ul className="space-y-3">
                            <motion.li 
                                className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            >
                                Home
                            </motion.li>
                            <motion.li 
                                className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            >
                                About Us
                            </motion.li>
                            <motion.li 
                                className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            >
                                Features
                            </motion.li>
                            <motion.li 
                                className="text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            >
                                Pricing
                            </motion.li>
                        </ul>
                    </motion.div>
                    
                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="font-bold text-lg text-blue-600 mb-4">Newsletter</h3>
                        <p className="text-sm text-slate-600 mb-4">Stay Up To Date</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="flex-1 px-4 py-3 border border-blue-200 focus:border-blue-400 rounded-l-md focus:outline-none transition-colors duration-300" 
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white px-6">Subscribe</Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}