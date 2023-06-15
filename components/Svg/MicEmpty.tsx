interface MicEmptyProps {
  color: string;
  className?: string;
}

const MicEmpty = ({color, className}: MicEmptyProps) => {
  return (
    <svg className={className} width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="1" width="12" height="26" rx="6" stroke={color} strokeWidth="2"/>
      <path d="M13 31L13 37" stroke={color} strokeWidth="2"/>
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

export default MicEmpty;
