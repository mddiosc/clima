import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ForecastData } from '../types';

interface TemperatureChartProps {
  forecastData: ForecastData;
}

interface ChartDataPoint {
  time: string;
  temp: number;
  feels_like: number;
  day: string;
}

const TemperatureChart = ({ forecastData }: TemperatureChartProps): JSX.Element => {
  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  // Prepare data for the chart (take every 8th entry to get daily data)
  const chartData: ChartDataPoint[] = forecastData.list
    .filter((_, index) => index % 8 === 0) // Every 8th entry = approximately daily
    .slice(0, 5) // Take only 5 days
    .map((item) => ({
      time: format(new Date(item.dt * 1000), 'EEE'),
      temp: kelvinToCelsius(item.main.temp),
      feels_like: kelvinToCelsius(item.main.feels_like),
      day: format(new Date(item.dt * 1000), 'MMM dd'),
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold text-gray-700">{label}</p>
          <p className="text-sky-600">
            Temperature: {payload[0].value}°C
          </p>
          <p className="text-orange-500">
            Feels like: {payload[1].value}°C
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
        Temperature Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            className="text-gray-600"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-gray-600"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke="#0ea5e9" 
            strokeWidth={3}
            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: '#0ea5e9' }}
          />
          <Line 
            type="monotone" 
            dataKey="feels_like" 
            stroke="#f97316" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
