interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart = ({ percentage, size = 60, strokeWidth = 6 }: DonutChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on percentage ranges
  const getColor = (percent: number) => {
    if (percent < 60) return 'text-red-500'; // Red for <60%
    if (percent < 90) return 'text-amber-500'; // Amber for 60-90%
    return 'text-green-500'; // Green for 90%+
  };

  const getStrokeColor = (percent: number) => {
    if (percent < 60) return '#ef4444'; // Red
    if (percent < 90) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor(percentage)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Percentage text in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-semibold ${getColor(percentage)}`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};
