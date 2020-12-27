import { ColorList } from "./Colors";
import "./piechart.css";

function DonutPieChart(props) {
  const p = props.checkedPercentage;
  const c1 =
    (p * (3.1416 * 180)) / 100; /* (percentage * (pi x 2xradius)) /100 */
  const c2 = 3.1416 * 180; /*pi x 2xradius */
  const text1 = p + "%";
  const text2 = "Checked Off";
  const strokeColor = () => ColorList.filter((c) => c.min <= p && c.max >= p);
  const strokecolor = strokeColor()[0].color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="200"
      height="200"
      position="relative"
      id="donut"
    >
      <circle
        r="90"
        cx="100"
        cy="100"
        stroke="#F8E0D8"
        stroke-width="3%"
        fill="none"
      ></circle>
      <circle
        classname="total"
        r="90"
        cx="100"
        cy="100"
        stroke={strokecolor}
        strokeWidth="4%"
        transform="rotate(-90) translate(-200)"
        strokeDasharray={`${c1}, ${c2}`}
        fill="none"
      ></circle>

      <text
        fill="#616161"
        x="50%"
        y="51%"
        dominant
        position="absolute"
        baseline="middle"
        textAnchor="middle"
        fontSize="3.4rem"
        fontFamily="Montserrat"
        // filter="url(#drop-shadow)"
      >
        {text1}
      </text>
      <text
        fill="#616161"
        x="50%"
        y="62%"
        position="absolute"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1.6rem"
        fontFamily="Montserrat"
      >
        {text2}
      </text>
    </svg>
  );
}

export default DonutPieChart;
