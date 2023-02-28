import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { selectUsers } from "store/slices";

const UserChart = () => {
  const users = useSelector(selectUsers);

  if (!users.length) return null;

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
          text: `Usarios activos ${users.length}`,
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
            name: "Activos",
            colorByPoint: true,
            data: [
              {
                name: "Usuarios",
                y: users.length,
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

export default UserChart;
