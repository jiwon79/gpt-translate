interface SendIconProps {
  className?: string;
}

const SendIcon = ({ className }: SendIconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M1.53558 6.1979L18.7828 0.448838C20.5074 -0.126051 22.1482 1.51474 21.5733 3.2394L15.8243 20.4866C15.2033 22.3495 12.641 22.5338 11.7598 20.7789L9.8839 17.0431C9.31424 15.9086 9.44378 14.5482 10.2173 13.5417L13.4153 9.38026C13.8086 8.86853 13.1536 8.21362 12.6419 8.60688L8.48052 11.8049C7.47395 12.5784 6.11359 12.7079 4.97912 12.1383L1.24324 10.2624C-0.511593 9.38121 -0.327294 6.81886 1.53558 6.1979Z" fill="white"/>
    </svg>
  );
}

export default SendIcon;
