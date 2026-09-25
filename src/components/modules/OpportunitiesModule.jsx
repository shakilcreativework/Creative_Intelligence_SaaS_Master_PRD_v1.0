"use client";

import {
  FiCompass,
  FiTrendingUp,
  FiLayers,
  FiTarget,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function OpportunitiesModule({ onStartOpportunity }) {
  const opportunities = [
    {
      id: "OPP-01",
      title: "FinTech 3D Isometric Vectors",
      category: "Business & Finance",
      demand: "High Demand (+38%)",
      competition: "Low",
      reason: "Rising search volume on Adobe Stock for decentralized finance infographics with minimal competition in your asset style.",
      suggestedFormats: ["EPS 10", "SVG", "AI"],
      difficulty: "Medium",
    },
    {
      id: "OPP-02",
      title: "Sustainable Clean Energy Flat Line Icons",
      category: "Technology & Environment",
      demand: "Growing (+24%)",
      competition: "Moderate",
      reason: "Seasonal spike approaching Earth Day & ESG corporate reporting quarter. Complements your existing green tech series.",
      suggestedFormats: ["SVG", "EPS 10"],
      difficulty: "Easy",
    },
    {
      id: "OPP-03",
      title: "Abstract Gradient Cyber Wave Backgrounds",
      category: "Wallpapers & Textures",
      demand: "Very High (+52%)",
      competition: "High",
      reason: "Consistently top trending aesthetic for SaaS landing page hero banners.",
      suggestedFormats: ["AI", "EPS", "High-res JPEG"],
      difficulty: "Easy",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">Marketplace Opportunity Engine</h1>
            <Badge variant="primary">Demand Signals</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Data-backed content opportunities: discover gaps in your portfolio and untapped microstock buyer searches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <Card
            key={opp.id}
            className="flex flex-col justify-between hover:border-brand-500/50 transition-all bg-surface-card/80"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="warning">{opp.demand}</Badge>
                <span className="text-[11px] text-slate-400">
                  Comp: <strong className="text-emerald-400">{opp.competition}</strong>
                </span>
              </div>

              <h3 className="font-bold text-base text-white mb-1.5">{opp.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {opp.reason}
              </p>

              <div className="space-y-2 p-3 rounded-lg bg-surface-darkest border border-surface-border text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-slate-200">{opp.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Formats:</span>
                  <span className="text-slate-200">{opp.suggestedFormats.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Production Effort:</span>
                  <span className="text-slate-200">{opp.difficulty}</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full justify-between"
              onClick={() => onStartOpportunity(opp)}
            >
              <span>Initialize Project</span>
              <FiArrowRight />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
