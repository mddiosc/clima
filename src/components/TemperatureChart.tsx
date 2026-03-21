import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { format } from "date-fns";
import { ForecastData } from "../types";
import { roundTemperature } from "../utils/weather";

interface TemperatureChartProps {
  forecastData: ForecastData;
}

interface ChartDataPoint {
  time: string;
  temp: number;
  feels_like: number;
  day: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>): React.JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div className="card-glass p-3 text-sm">
        <p className="font-semibold text-white mb-1">{label}</p>
        <p className="text-sky-300">Temperature: {payload[0]?.value}°C</p>
        <p className="text-orange-300">Feels like: {payload[1]?.value}°C</p>
      </div>
    );
  }
  return null;
};

const TemperatureChart = ({ forecastData }: TemperatureChartProps): React.JSX.Element => {
  const chartData: ChartDataPoint[] = forecastData.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "EEE"),
      temp: roundTemperature(item.main.temp),
      feels_like: roundTemperature(item.main.feels_like),
      day: format(new Date(item.dt * 1000), "MMM dd"),
    }));

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Temperature Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
          />
          <Tooltip content={CustomTooltip} />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#7dd3fc"
            strokeWidth={3}
            dot={{ fill: "#7dd3fc", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: "#7dd3fc" }}
          />
          <Line
            type="monotone"
            dataKey="feels_like"
            stroke="#fdba74"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#fdba74", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
