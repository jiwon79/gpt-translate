interface BubbleSmallProps {
  color: string;
  classname?: string;
}

const BubbleSmall = ({ color, classname }: BubbleSmallProps) => {
  return (
    <svg className={classname} xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
      <path d="M13 0H0C1.48339 10.9531 9.60973 17.563 25 14.5C16.6432 9.82555 14.5503 6.05304 13 0Z" fill={color}/>
    </svg>
  );
}

export default BubbleSmall;
