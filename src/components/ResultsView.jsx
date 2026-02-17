import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Droplet, TrendingUp, Zap } from "lucide-react";
import Card from "./Card";
import Stat from "./Stat";

export default function ResultsView({ data }) {
  const [displayedNarrative, setDisplayedNarrative] = useState("");

  // Typewriter effect for AI Narrative
  useEffect(() => {
    const narrativeText = data.ai_narrative.replace(/<strong>|<\/strong>/g, "");
    let index = 0;

    const interval = setInterval(() => {
      if (index < narrativeText.length) {
        setDisplayedNarrative(narrativeText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [data.ai_narrative]);

  const scoreColor = data.score > 75 ? "text-green-400" : "text-red-400";
  const statusColor =
    data.status === "APPROVED"
      ? "bg-green-500/20 border-green-500/50 text-green-400"
      : "bg-red-500/20 border-red-500/50 text-red-400";

  return (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-7xl mx-auto">
      {/* LEFT COLUMN: Panel A (Digital Twin DNA) + Panel D (AI Narrative) */}
      <div className="col-span-1 space-y-6">
        {/* Panel A: Digital Twin DNA */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Digital Twin DNA
            </h3>
            <p className="text-xs text-slate-400">{data.twin_profile.name}</p>
          </div>

          <div className="space-y-4">
            {/* Archetype Badge */}
            <div className="mb-4">
              <p className="text-xs text-slate-500 font-medium mb-2">
                ARCHETYPE
              </p>
              <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-purple-400 text-xs font-medium">
                {data.twin_profile.archetype}
              </div>
            </div>

            {/* Liquidity */}
            <Stat
              label="Liquidity Buffer"
              value={`${data.twin_profile.liquidity_buffer} mo`}
              icon={Droplet}
              color="text-cyan-400"
            />

            {/* Spending Elasticity */}
            <Stat
              label="Spending Elasticity"
              value={`${data.twin_profile.spending_elasticity.toFixed(2)}`}
              icon={TrendingUp}
              color="text-green-400"
            />

            {/* Burn Rate */}
            <Stat
              label="Monthly Burn Rate"
              value={`₹${(data.twin_profile.burn_rate / 1000).toFixed(0)}k`}
              icon={Zap}
              color="text-yellow-400"
            />
          </div>
        </Card>

        {/* Panel D: AI Narrative with Typewriter Effect */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-100 mb-3">
            AI Risk Assessment
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed font-mono">
            {displayedNarrative}
            <span className="animate-pulse">|</span>
          </p>
        </Card>
      </div>

      {/* RIGHT COLUMN (Spans 2 cols): Panel B (Risk Score) + Panel C (Chart) */}
      <div className="col-span-2 space-y-6">
        {/* Panel B: Final Resilience Score */}
        <Card className="p-8 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">
              Credit Resilience Score
            </p>
            <p className={`text-6xl font-bold ${scoreColor}`}>{data.score}</p>
            <p className="text-slate-500 text-sm">/100</p>
            <p className="text-xs text-slate-400 mt-2">
              {data.twin_profile.recommendation}
            </p>
          </div>
          <div
            className={`px-6 py-3 border rounded-lg ${statusColor} font-bold text-lg`}
          >
            {data.status}
          </div>
        </Card>

        {/* Panel C: Stress Test Heatmap */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-100 mb-4">
            Scenario Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.scenarios}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#94a3b8"
                label={{
                  value: "Survival Rate %",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  color: "#cbd5e1",
                }}
              />
              <Bar dataKey="survival_rate" isAnimationActive={true}>
                {data.scenarios.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.survival_rate < 70 ? "#ef4444" : "#3b82f6"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded"></div>
              <span className="text-slate-300">
                Survives Scenario (&gt;70%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-slate-300">Risk Zone (&lt;70%)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
