// The "God Object" - Master Mock Data Structure
// This is the exact structure your Python Backend must eventually return

export const MOCK_API_RESPONSE_AARAV = {
  application_id: "APP_8821",
  status: "APPROVED",
  score: 92, // The "Credit Resilience Score"
  twin_profile: {
    name: "Aarav S.",
    archetype: "High Volatility / High Resilience",
    liquidity_buffer: 4.5, // Months
    spending_elasticity: 0.85, // 0.0 to 1.0
    burn_rate: 18000, // Monthly Fixed Costs in ₹
    income_volatility: "High (0.35)",
    recommendation: "Approve with Limit ₹2.5L",
  },
  scenarios: [
    // The Stress Test Results
    { name: "Tech Hiring Freeze", probability: 0.75, survival_rate: 100 },
    { name: "Rent Spike (+20%)", probability: 0.85, survival_rate: 100 },
    { name: "GenAI Gig Drought", probability: 0.4, survival_rate: 60 }, // The Risk Point
    { name: "Urban Stagflation", probability: 0.7, survival_rate: 95 },
    { name: "Medical Emergency", probability: 0.2, survival_rate: 88 },
  ],
  ai_narrative:
    "Applicant shows <strong>strong resilience</strong>. Despite high income volatility (Gig Economy), their high Spending Elasticity (0.85) allows them to absorb the 'Rent Spike' scenario. <strong>Warning:</strong> Vulnerable to extended 'Income Stops' > 4 months.",
};

export const MOCK_API_RESPONSE_VIKRAM = {
  application_id: "APP_5643",
  status: "REJECTED",
  score: 45, // Low score
  twin_profile: {
    name: "Vikram K.",
    archetype: "High Volatility / Low Resilience",
    liquidity_buffer: 1.2, // Very low
    spending_elasticity: 0.25, // Inflexible spending
    burn_rate: 95000, // Very high monthly costs
    income_volatility: "Extreme (0.68)",
    recommendation: "Reject - High Risk Profile",
  },
  scenarios: [
    { name: "Tech Hiring Freeze", probability: 0.75, survival_rate: 15 },
    { name: "Rent Spike (+20%)", probability: 0.85, survival_rate: 8 },
    { name: "GenAI Gig Drought", probability: 0.4, survival_rate: 5 },
    { name: "Urban Stagflation", probability: 0.7, survival_rate: 12 },
    { name: "Medical Emergency", probability: 0.2, survival_rate: 0 },
  ],
  ai_narrative:
    "Applicant presents <strong>critical risk factors</strong>. Limited liquidity buffer (1.2 months) combined with inflexible spending (0.25 elasticity) and extreme income volatility (0.68) creates <strong>immediate default risk</strong>. Medical or job loss scenario would trigger immediate default.",
};
