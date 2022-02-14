interface FacebookSvgProps {
    invert?: boolean;
    height?: number;
    width?: number;
  }
  
  export default function FacebookSvg({
    invert,
    height = 134,
    width = 134,
  }: FacebookSvgProps) {
    const outerColor = invert ? "#ffffff" : "#181D27";
    const letterWColor = invert ? "#181D27" : "#ffffff";
    const letterTColor = "#457F54";
  
    return (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="8.75" fill="url(#paint0_linear_2_51)"/>
<path d="M13.2586 12.676L13.6472 10.2063H11.2158V8.60437C11.2158 7.92856 11.5548 7.26942 12.6438 7.26942H13.75V5.16687C13.75 5.16687 12.7466 5 11.7877 5C9.78427 5 8.47604 6.18309 8.47604 8.32403V10.2063H6.25V12.676H8.47604V18.6466C8.92294 18.715 9.38015 18.75 9.8459 18.75C10.3117 18.75 10.7689 18.715 11.2158 18.6466V12.676H13.2586Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_2_51" x1="10" y1="1.25" x2="10" y2="18.6981" gradientUnits="userSpaceOnUse">
<stop stopColor="#18ACFE"/>
<stop offset="1" stopColor="#0163E0"/>
</linearGradient>
</defs>
</svg>

    );
  }
  