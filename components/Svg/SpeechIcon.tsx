interface SpeechIconProps {
  color: string;
  classname?: string;
}

const SpeechIcon = ({ color, classname }: SpeechIconProps) => {
  return (
    <svg className={classname} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13.5" stroke={color} strokeWidth="2"/>
      <path d="M6 19V13H10L15 8V24L10 19H6Z" fill={color} />
      <mask id="mask0_19_65" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="17" y="10" width="6" height="12">
        <rect x="17" y="10" width="6" height="12" fill={color} />
      </mask>
      <g mask="url(#mask0_19_65)">
        <circle cx="15" cy="16" r="5" fill={color} />
      </g>
      <mask id="mask1_19_65" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="17" y="7" width="8" height="18">
        <rect x="17" y="7" width="8" height="18" fill={color} />
      </mask>
      <g mask="url(#mask1_19_65)">
        <circle cx="15" cy="16" r="8" stroke={color} strokeWidth="2"/>
      </g>
    </svg>
  );
}

export default SpeechIcon;

