interface BubbleProps {
  color: string;
  classname?: string;
}

const Bubble = ({ color, classname }: BubbleProps) => {
  return (
    <svg className={classname} width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 18.375C46.8462 16.0623 37.9849 10.3651 34.2857 0H0C7.09499 12.3642 42.6017 24.463 60 18.375Z"
        fill={color}
      />
    </svg>
  );
}

export default Bubble;
