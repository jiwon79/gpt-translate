interface BackIconProps {
  color: string;
  className?: string;
}

const BackIcon = ({ color, className }: BackIconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M28 16H6M6 16L13 9M6 16L13 23"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BackIcon;
