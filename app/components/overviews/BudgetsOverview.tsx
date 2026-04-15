"use client"

import Link from "next/link"
import Image from "next/image"
import { Pie, PieChart, Label } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Budget } from "@/app/data/types"
import { formatCurrency } from "@/lib/formatCurrencyNoSign"

interface BudgetsOverviewProps {
  budgets: Budget[]
}


const BudgetsOverview = ({ budgets }: BudgetsOverviewProps) => {
  const totalMaximum = budgets.reduce((acc, b) => acc + b.maximum, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)

  const chartData = budgets.map((budget) => ({
    category: budget.category,
    spent: budget.spent,
    fill: budget.theme,
  }))

  const chartConfig = {
    spent: { label: "Spent" },
    ...Object.fromEntries(
      budgets.map((budget) => [
        budget.category,
        { label: budget.category, color: budget.theme },
      ])
    ),
  } satisfies ChartConfig

  return (
    <Card className="bg-white rounded-xl ">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-5 pt-6 px-6 sm:px-8">
        <CardTitle className="text-[20px] font-bold text-grey-900">
          Budgets
        </CardTitle>
        <Link
          href="/budgets"
          className="flex items-center gap-3 text-[14px] text-grey-500 hover:text-grey-900 transition-colors"
        >
          See Details
          <Image
            src="/images/icon-caret-right.svg"
            alt=""
            width={6}
            height={11}
          />
        </Link>
      </CardHeader>

      {/* Content */}
      <CardContent className="grid sm:grid-cols-[2fr_auto] lg:grid-cols-[1fr_1fr] place-items-center gap-6 sm:gap-8 lg:gap-4 px-6 sm:px-4 pb-4">
        {/* Donut Chart */}
        <ChartContainer
          config={chartConfig}
          className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] shrink-0"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="spent"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
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
                          fontSize={22}
                        >
                          {formatCurrency(totalSpent)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
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

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 w-full">
          {budgets.map((budget) => (
            <div key={budget.category} className="flex items-center gap-4">
              <div
                className="w-1 h-[43px] rounded-full shrink-0"
                style={{ backgroundColor: budget.theme }}
              />
              <div className="flex-1">
                <p className="text-[12px] text-grey-500">{budget.category}</p>
                <p className="text-[14px] font-bold">
                  {formatCurrency(budget.spent)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default BudgetsOverview