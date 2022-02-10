interface TwitterSvgProps {
    invert?: boolean;
    height?: number;
    width?: number;
  }
  
  export default function TwitterSvg({
    invert,
    height = 134,
    width = 134,
  }: TwitterSvgProps) {
    const outerColor = invert ? "#ffffff" : "#181D27";
    const letterWColor = invert ? "#181D27" : "#ffffff";
    const letterTColor = "#457F54";
  
    return (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9.99996" cy="10" r="8.33333" fill="#1DA1F2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.79527C14.6324 6.95859 14.2367 7.06859 13.8217 7.11825C14.2454 6.86427 14.5707 6.46229 14.7237 5.98332C14.3277 6.21864 13.8881 6.38897 13.4211 6.48129C13.0468 6.08265 12.5132 5.83334 11.9235 5.83334C10.7906 5.83334 9.87201 6.75194 9.87201 7.88487C9.87201 8.04552 9.89034 8.20218 9.92534 8.3525C8.22012 8.26717 6.70855 7.45023 5.69662 6.20898C5.51997 6.51196 5.41897 6.86427 5.41897 7.24025C5.41897 7.95186 5.78061 8.57982 6.33158 8.9478C5.99493 8.93713 5.67895 8.8448 5.40197 8.69115V8.71681C5.40197 9.71108 6.10959 10.54 7.04753 10.729C6.87554 10.7757 6.69422 10.801 6.50723 10.801C6.37491 10.801 6.24625 10.788 6.12092 10.764C6.38191 11.579 7.13986 12.1723 8.03746 12.1889C7.33551 12.7389 6.4509 13.0672 5.48963 13.0672C5.32364 13.0672 5.16032 13.0575 5 13.0382C5.90794 13.6202 6.9862 13.9601 8.14479 13.9601C11.9182 13.9601 13.9817 10.834 13.9817 8.12318C13.9817 8.03419 13.9801 7.94553 13.9757 7.85787C14.377 7.56789 14.725 7.20658 15 6.79527Z" fill="white"/>
</svg>
    );
  }
  