import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { MonthlyTrend } from '../types/dashboardType'

interface MonthlyTrendChartProps {
  monthlyTrend: MonthlyTrend[]
}

const chartConfig = {
  count: {
    label: 'Applications',
    color: '#6366f1',
  },
} satisfies ChartConfig

export default function MonthlyTrendChart({
  monthlyTrend,
}: MonthlyTrendChartProps) {
  // Calculate trend percentage (current month vs previous month)
  const currentMonth = monthlyTrend[monthlyTrend.length - 1]
  const previousMonth = monthlyTrend[monthlyTrend.length - 2]

  let trendPercentage = 0
  let isTrendingUp = true
  let trendMessage = 'No change this month'

  if (currentMonth && previousMonth) {
    if (previousMonth.count === 0 && currentMonth.count > 0) {
      // From 0 to positive = 100% increase (or infinity, but we show as new applications)
      trendMessage = 'Started tracking this month'
      isTrendingUp = true
    } else if (previousMonth.count > 0) {
      trendPercentage =
        ((currentMonth.count - previousMonth.count) / previousMonth.count) * 100
      isTrendingUp = trendPercentage >= 0

      if (trendPercentage === 0) {
        trendMessage = 'No change this month'
      } else {
        trendMessage = `Trending ${isTrendingUp ? 'up' : 'down'} by ${Math.abs(trendPercentage).toFixed(1)}% this month`
      }
    } else if (currentMonth.count === 0 && previousMonth.count === 0) {
      trendMessage = 'No change this month'
    }
  } else if (currentMonth && currentMonth.count > 0) {
    trendMessage = 'Started tracking this month'
    isTrendingUp = true
  }

  // Get date range
  const firstMonth = monthlyTrend[0]?.month || ''
  const lastMonth = monthlyTrend[monthlyTrend.length - 1]?.month || ''

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Monthly Application Trend</CardTitle>
        <CardDescription>
          Showing total applications for the last months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {monthlyTrend.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <RadarChart
              data={monthlyTrend}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis
                dataKey="month"
                tick={{ fill: '#a1a1aa', fontSize: 12 }}
              />
              <PolarGrid stroke="#27272a" />
              <Radar
                dataKey="count"
                fill="#6366f1"
                fillOpacity={0.6}
                stroke="#6366f1"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                  fill: '#6366f1',
                  stroke: '#6366f1',
                }}
              />
            </RadarChart>
          </ChartContainer>
        ) : (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No trend data available
          </p>
        )}
      </CardContent>
      {monthlyTrend.length > 0 && currentMonth && (
        <CardFooter className="flex-col gap-2 pt-4 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            {trendMessage === 'No change this month' ? (
              <>
                {trendMessage}
                <TrendingUp className="h-4 w-4 rotate-90" />
              </>
            ) : trendMessage === 'Started tracking this month' ? (
              <>
                {trendMessage}
                <TrendingUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {trendMessage}
                <TrendingUp
                  className={`h-4 w-4 ${isTrendingUp ? '' : 'rotate-180'}`}
                />
              </>
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            {firstMonth} - {lastMonth}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
