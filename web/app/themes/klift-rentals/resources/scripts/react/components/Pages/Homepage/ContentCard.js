import React from "react"; 

 

const ContentCard = ({
  image,
  title,
  description,
  flip = false,
  flipMd = false,
  variant = "default",
}) => {
  return (
    <div className={`flex gap-8 items-center ${flip ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
      <div className="flex-1">
        <div>
          {variant === "sm" ? (
            <h5 className="text-[28px] font-medium leading-10">{title}</h5>
          ) : (
            <h4 className="text-[34px] font-medium leading-[50px]">{title}</h4>
          )}
          <p className="text-lg font-normal leading-8">{description}</p>
        </div>
      </div>
      <div
        className="w-full md:w-1/4 h-full"
      >
        <img src={image} alt={image} className="w-full h-full" />
      </div>
    </div>
  );
};

export default ContentCard; 

