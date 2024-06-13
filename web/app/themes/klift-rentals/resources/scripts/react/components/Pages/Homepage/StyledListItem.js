import React from "react"; 

 

const StyledListItem = ({ title, description, serialNo }) => {
  return (
    <div className={"relative w-full h-full pt-14"}>
      {serialNo ? (
        <p className="text-primary-500 opacity-20 text-[120px] font-bold leading-[100px] absolute top-0">
          {serialNo < 10 ? `0${serialNo}` : serialNo}
        </p>
      ) : null}
      <div>
        <h4 className="font-medium text-4xl leading-[50px]">{title}</h4>
        <p className="text-lg font-normal leading-8">{description}</p>
      </div>
    </div>
  );
};

export default StyledListItem; 