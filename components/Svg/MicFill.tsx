interface MicFillProps {
  color: string;
  className?: string;
}

const MicFill = ({color, className}: MicFillProps) => {
  return (
    <svg
      className={className}
      width="26"
      height="38"
      viewBox="0 0 26 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" width="14" height="28" rx="7" fill={color}/>
      <path d="M13 32V37" stroke={color} strokeWidth="2"/>
      <path d="M4 37H22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path
        d="M1 14.5C1 14.5 1 15 1 21C1 26 6.5 31 13 31C19.5 31 25 26.5 25 21C25 15.5 25 14.5 25 14.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MicFill;
