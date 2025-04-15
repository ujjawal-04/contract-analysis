import { Label, Pie, PieChart, Cell } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { color } from "framer-motion";

interface OverallScoreChartProps {
    overallScore: number;
}

export default function OverallScoreChart({ overallScore } : OverallScoreChartProps) {
    // Define data without fill property
    const pieChartData = [
        {
            name: "Risks",
            value: 100 - overallScore,
        },
        {
            name: "Opportunities",
            value: overallScore,
        },
    ];
    
    // Define colors separately - using a format Recharts definitely supports
    // These are approximate equivalents of your theme colors
    const COLORS = ["#7c3aed", "#06b6d4"]; // Purple and Teal
    
    const chartConfig = {
        value: {
            label: "value",
        },
        Risks: {
            label: "Risks",
            color: "#7c3aed", // Purple
        },
        Opportunities: {
            label: "Opportunities",
            color: "#06b6d4", // Teal
        }
    } satisfies ChartConfig;
    
return (
<div className="w-full h-48">
<ChartContainer
config={chartConfig}
className="mx-auto aspect-square max-h-[250px]">
    <PieChart>
        <ChartTooltip cursor content={<ChartTooltipContent />} />
        <Pie 
            data={pieChartData} 
            dataKey="value" 
            nameKey="name"
            innerRadius={60}
            paddingAngle={5}
        >
            
            {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
            <Label
                position="center"
                content={({ viewBox }) => {
                    if(viewBox && "cx" in viewBox && "cy" in viewBox ) {
                        return (
                            <text>
                                <tspan>
                                   {overallScore}% 
                                </tspan>
                                <tspan>
                                    Score
                                </tspan>
                            </text>
                        )
                    }
                    return null;
                }}
            />
        </Pie>
    </PieChart>
</ChartContainer>
</div>
    )
}