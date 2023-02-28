import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { selectImages } from "store/slices";

const ImageChart = () => {
  const images = useSelector(selectImages);

  if (!images.length) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: `Imagenes activas ${images.length}`,
          align: "left",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
        series: [
          {
            name: "Activas",
            colorByPoint: true,
            data: [
              {
                name: "Imagenes",
                y: 70.67,
                sliced: true,
                selected: true,
              },
            ],
          },
        ],
      }}
    />
  );
};

export default ImageChart;
