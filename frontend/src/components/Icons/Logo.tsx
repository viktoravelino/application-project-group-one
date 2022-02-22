interface LogoSvgProps {
  invert?: boolean;
  height?: string;
  width?: string;
}

export default function LogoSvg({
  invert,
  height = "40",
  width = "40",
}: LogoSvgProps) {
  const outerColor = invert ? "#ffffff" : "#181D27";
  const letterWColor = invert ? "#181D27" : "#ffffff";
  const letterTColor = "#457F54";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 134 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M67 121C97.3757 121 122 96.3757 122 66C122 35.6243 97.3757 11 67 11C36.6243 11 12 35.6243 12 66C12 96.3757 36.6243 121 67 121Z"
        fill={outerColor}
      />
      <path
        d="M67 132C102.899 132 132 102.899 132 67C132 31.1015 102.899 2 67 2C31.1015 2 2 31.1015 2 67C2 102.899 31.1015 132 67 132Z"
        stroke={outerColor}
        strokeWidth="3"
        strokeLinecap="square"
        strokeDasharray="6 6"
      />
      <path
        d="M90.1357 43.986L78.4238 88.914H65.1758L58.0078 59.346L50.5837 88.914H37.3357L25.9437 43.986H37.6557L44.1197 76.69L52.1197 43.986H64.1518L71.8318 76.69L78.3598 43.986H90.1357Z"
        fill={letterWColor}
      />
      <path
        d="M98.631 82.6235L96.237 91.5894L90.8575 90.153C87.0238 89.1293 84.2828 87.4038 82.6346 84.9765C80.9973 82.5079 80.7456 79.1506 81.8793 74.9047L85.5446 61.1776L81.3399 60.0549L83.6844 51.2745L87.8891 52.3972L90.1345 43.9879L100.708 46.8112L98.4627 55.2205L105.388 57.0697L103.044 65.8501L96.1182 64.0009L92.4198 77.8517C92.1447 78.8822 92.1939 79.6903 92.5675 80.2758C92.941 80.8613 93.705 81.3082 94.8592 81.6164L98.631 82.6235Z"
        fill={letterTColor}
      />
    </svg>
  );
}
