"use client"

import { Pie, PieChart, Label } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatCurrencyNoSign as formatCurrency } from "@/lib/formatter"
import type { Budget } from "@/app/data/types"

interface BudgetDonutChartProps {
  budgets: Budget[]
}

export default function BudgetDonutChart({ budgets }: BudgetDonutChartProps) {
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)
  const totalMaximum = budgets.reduce((acc, b) => acc + b.maximum, 0)

  const chartData = budgets.map((b) => ({
    category: b.category,
    spent: b.spent,
    fill: b.theme,
  }))

  const chartConfig = {
    spent: { label: "Spent" },
    ...Object.fromEntries(
      budgets.map((b) => [b.category, { label: b.category, color: b.theme }])
    ),
  } satisfies ChartConfig

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8">
      {/* Donut Chart */}
      <ChartContainer config={chartConfig} className="mx-auto w-[240px] h-[240px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="spent"
            nameKey="category"
            innerRadius={80}
            outerRadius={110}
            strokeWidth={0}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground font-bold"
                        fontSize={24}
                      >
                        {formatCurrency(totalSpent)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                        fontSize={12}
                      >
                        of {formatCurrency(totalMaximum)} limit
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Spending Summary */}
      <div className="mt-6">
        <h2 className="text-[20px] font-bold text-grey-900 mb-4">Spending Summary</h2>
        <ul className="flex flex-col divide-y divide-grey-100">
          {budgets.map((b) => (
            <li key={b.category} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div
                className="w-1 h-[43px] rounded-full shrink-0"
                style={{ backgroundColor: b.theme }}
              />
              <span className="flex-1 text-[14px] text-grey-500">{b.category}</span>
              <span className="text-[14px] font-bold text-grey-900">
                {formatCurrency(b.spent)}{" "}
                <span className="text-[12px] font-normal text-grey-500">
                  of {formatCurrency(b.maximum)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
