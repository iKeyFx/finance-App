// import Image from "next/image";
// import Link from "next/link";
// import type { BudgetData } from "@/app/data/financeData";

// interface BudgetsOverviewProps {
//   budgets: BudgetData[];
// }

// function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// }

// export default function BudgetsOverview({ budgets }: BudgetsOverviewProps) {
//   const totalMaximum = budgets.reduce((acc, b) => acc + b.maximum, 0);
//   const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);

//   // Build donut chart segments
//   const segments: Array<{ offset: number; length: number; color: string }> = [];
//   let cumulativePercent = 0;
//   budgets.forEach((budget) => {
//     const percent = (budget.spent / totalMaximum) * 100;
//     segments.push({
//       offset: cumulativePercent,
//       length: percent,
//       color: budget.theme,
//     });
//     cumulativePercent += percent;
//   });

//   const circumference = 2 * Math.PI * 70;

//   return (
//     <div className="bg-white rounded-xl p-6 sm:p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-[20px] font-bold text-grey-900">Budgets</h2>
//         <Link
//           href="/budgets"
//           className="flex items-center gap-3 text-[14px] text-grey-500 hover:text-grey-900 transition-colors"
//         >
//           See Details
//           <Image
//             src="/images/icon-caret-right.svg"
//             alt=""
//             width={6}
//             height={11}
//           />
//         </Link>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
//         {/* Donut Chart */}
//         <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] shrink-0">
//           <svg
//             viewBox="0 0 160 160"
//             className="w-full h-full -rotate-90"
//           >
//             {/* Background circle */}
//             <circle
//               cx="80"
//               cy="80"
//               r="70"
//               fill="none"
//               stroke="#F2F2F2"
//               strokeWidth="20"
//             />
//             {/* Segments */}
//             {segments.map((seg, i) => (
//               <circle
//                 key={i}
//                 cx="80"
//                 cy="80"
//                 r="70"
//                 fill="none"
//                 stroke={seg.color}
//                 strokeWidth="20"
//                 strokeDasharray={`${(seg.length / 100) * circumference} ${circumference}`}
//                 strokeDashoffset={`${-(seg.offset / 100) * circumference}`}
//                 strokeLinecap="butt"
//               />
//             ))}
//           </svg>
//           {/* Center text */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <p className="text-[24px] sm:text-[28px] font-bold">
//               {formatCurrency(totalSpent)}
//             </p>
//             <p className="text-[12px] text-grey-500">
//               of {formatCurrency(totalMaximum)} limit
//             </p>
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="flex flex-col gap-4 w-full">
//           {budgets.map((budget) => (
//             <div key={budget.category} className="flex items-center gap-4">
//               <div
//                 className="w-1 h-[43px] rounded-full shrink-0"
//                 style={{ backgroundColor: budget.theme }}
//               />
//               <div className="flex-1">
//                 <p className="text-[12px] text-grey-500">{budget.category}</p>
//                 <p className="text-[14px] font-bold">
//                   {formatCurrency(budget.spent)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }
"use client"

import * as React from "react"
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
import type { BudgetData } from "@/app/data/financeData"

interface BudgetsOverviewProps {
  budgets: BudgetData[]
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function BudgetsOverview({ budgets }: BudgetsOverviewProps) {
  const totalMaximum = budgets.reduce((acc, b) => acc + b.maximum, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)

  // Build chart data and config from budgets
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
    <Card className="bg-white rounded-xl">
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
      <CardContent className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-6 sm:px-8 pb-6 sm:pb-8">
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
        <div className="flex flex-col gap-4 w-full">
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