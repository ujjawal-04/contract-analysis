"use client";

import { ContractAnalysis } from "@/interfaces/contract.interface";
import { ReactNode, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import OverallScoreChart from "./chart";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

interface IContractAnalysisResultsProps {
  analysisResults: ContractAnalysis;
  contractId: string;
  isActive?: boolean;
  isPremium?: boolean;
}

export default function ContractAnalysisResults({ 
  analysisResults, 
  contractId, 
  isActive = false,
  isPremium = false
}: IContractAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (!analysisResults) {
     return <div>No Results</div>   
  }

  const getScore = () => {
    const score = Number(analysisResults.overallScore) || 45;
    if (score > 70) 
      return { icon: ArrowUp, color: "text-green-500", text: "Good"};
    if (score > 50) 
      return { icon: Minus, color: "text-yellow-500", text: "Average"};
    return { icon: ArrowDown, color: "text-red-500", text: "Bad"};
  };

  const scoreTrend = getScore();

  const getSeverityColor = (severity: string) => {
    switch(severity?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderRisksAndOpportunities = (
    items: Array<{
      risk?: string;
      opportunity?: string;
      explanation?: string;
      severity?: string;
      impact?: string;
    }>,
    type: "risk" | "opportunity",
  ) => {
    // Always show all items for premium users or just 3 for non-premium
    const displayItems = isPremium ? items : items.slice(0, 3);
    const hasMoreItems = items.length > 3 && !isPremium;

    return (
      <ul className="space-y-4">
        {/* First 3 items (visible to all users) */}
        {displayItems.map((item, index) => {
          const severityOrImpact = type === "risk" ? item.severity : item.impact;
          const colorClass = getSeverityColor(severityOrImpact || "");
          
          return (
            <li key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">
                {type === "risk" ? item.risk : item.opportunity}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.explanation}</p>
              <div className="flex gap-4 text-xs">
                <span className={`px-2 py-1 rounded font-medium ${colorClass}`}>
                  {type === "risk" ? "Severity" : "Impact"}: {severityOrImpact}
                </span>
              </div>
            </li>
          );
        })}
        
        {/* Blurred 4th item for non-premium users */}
        {hasMoreItems && items.length > 3 && (
          <li className="border rounded-lg p-4 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <p className="text-center font-medium text-gray-700">
                <span className="inline mr-1 text-gray-400">+{items.length - 3} more</span>
              </p>
            </div>
            <div className="filter blur-sm">
              <h3 className="font-medium mb-2">
                {type === "risk" ? items[3].risk : items[3].opportunity}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{items[3].explanation}</p>
              <div className="flex gap-4 text-xs">
                <span className={`px-2 py-1 rounded font-medium ${getSeverityColor(type === "risk" ? items[3].severity || "" : items[3].impact || "")}`}>
                  {type === "risk" ? "Severity" : "Impact"}: {type === "risk" ? items[3].severity : items[3].impact}
                </span>
              </div>
            </div>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <div className="flex space-x-2"></div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Contract Score</CardTitle>
          <CardDescription>
            Based on risks and opportunities identified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl font-bold">
                  {analysisResults.overallScore ?? 0}
                </div>
                <div className={`flex items-center ${scoreTrend.color}`}>
                  <scoreTrend.icon className="size-6 mr-1" />
                  <span className="font-semibold">{scoreTrend.text}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risk</span>
                  <span>{100 - Number(analysisResults.overallScore)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Opportunities</span>
                  <span>{analysisResults.overallScore}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This score represents the overall risk and opportunities identified in the contract.
              </p>
            </div>
            <div className="w-1/2 h-48 flex">
              <OverallScoreChart overallScore={Number(analysisResults.overallScore)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Contract Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                {analysisResults.summary}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risks</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRisksAndOpportunities(analysisResults.risks || [], "risk")}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRisksAndOpportunities(
                analysisResults.opportunities || [],
                "opportunity"
              )}  
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Contract Type</h3>
                    <p className="text-gray-700">{analysisResults.contractType || "Not specified"}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Duration</h3>
                    <p className="text-gray-700">{analysisResults.contractDuration || "Not specified"}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Financial Terms</h3>
                    <p className="text-gray-700">{analysisResults.financialTerms?.description || "Not specified"}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Termination Conditions</h3>
                    <p className="text-gray-700">{analysisResults.terminationConditions || "Not specified"}</p>
                  </div>
                </div>
                
                {/* Key Clauses Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Key Clauses</h3>
                  <div className="space-y-3">
                    {analysisResults.keyClauses && Array.isArray(analysisResults.keyClauses) ? (
                      analysisResults.keyClauses.map((clause, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-1">{clause}</h4>
                          <p className="text-sm text-gray-600">
                            {analysisResults.specificClauses && typeof analysisResults.specificClauses === 'string' 
                              ? analysisResults.specificClauses 
                              : "No details provided"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-1">No key clauses available</h4>
                        <p className="text-sm text-gray-600">
                          No key clauses have been identified for this contract.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Legal Compliance Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Legal Compliance</h3>
                  <div className="border rounded-lg p-4">
                    <p className="text-gray-700">
                      {analysisResults.legalCompliance || "No legal compliance information available."}
                    </p>
                  </div>
                </div>
                
                {/* Recommendations Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                  {analysisResults.recommendations && analysisResults.recommendations.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {analysisResults.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-gray-700">{recommendation}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No recommendations available.</p>
                  )}
                </div>
                
                {/* Negotiation Points Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Negotiation Points</h3>
                  {analysisResults.negotiationPoints && analysisResults.negotiationPoints.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {analysisResults.negotiationPoints.map((point, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-gray-50">
                          <p className="text-sm font-medium">{point}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">No negotiation points available.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}