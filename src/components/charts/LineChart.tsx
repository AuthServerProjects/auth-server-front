import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import ApexCharts, { type ApexOptions } from "apexcharts";

import type { ChartType } from "./chartType";

const LineChart = ({
  title,
  chartHeight,
  chartName,
  type = "bar",
  series,
  categories,
  color = "#f99c04",
  yFormatter,
}: ChartType) => {
  const [uuId] = useState(uuid());
  const chartRef = useRef<ApexCharts | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const options: ApexOptions = {
    chart: {
      type: type,
      height: chartHeight ?? 380,
      width: "100%",
      toolbar: { show: false },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    series: series,
    colors: [color],
    stroke: { curve: "smooth" },
    dataLabels: {
      enabled: false,
      style: { fontSize: "12px", fontFamily: "PeydaWeb" },
    },
    tooltip: {
      style: { fontSize: "12px", fontFamily: "PeydaWeb" },
      y: { formatter: yFormatter ?? undefined },
    },
    yaxis: {
      labels: {
        formatter: yFormatter ?? undefined,
        style: { fontSize: "12px", fontFamily: "PeydaWeb" },
      },
    },
    legend: {
      fontSize: "12px",
      fontFamily: "PeydaWeb",
      labels: { colors: ["#f99c04"] },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end",
        columnWidth: "18",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        show: true,
        style: { fontSize: "12px", fontFamily: "PeydaWeb" },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    if (series && containerRef.current) {
      const chart = new ApexCharts(containerRef.current, options);
      chart.render();
      chartRef.current = chart;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, categories]);

  const css = `.apexcharts-toolbar { display: none; }`;

  return (
    <>
      <style>{css}</style>
      <div className="line-chart-main min-h-[380px] rounded-lg flex items-center justify-center flex-col w-full bg-white overflow-hidden px-5">
        <div className="font-bold px-4 text-lg w-full">{title}</div>

        {series?.length > 0 && (
          <div
            ref={containerRef}
            id={`chart${chartName}${uuId}`}
            className="w-full"
          ></div>
        )}

        {series?.length === 0 && (
          <div className="flex items-center justify-center h-full relative w-full">
            <div>داده ای برای نمایش وجود ندارد</div>
          </div>
        )}
      </div>
    </>
  );
};

export default LineChart;
