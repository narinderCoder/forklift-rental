import React from 'react';

const StyledListItem = ({ title, description, serialNo }) => {
  return (
    <div className={'position-relative w-100 h-100 section'}>
      {serialNo ? (
        <p
          className="text-primary position-absolute"
          style={{
            top: 0,
            opacity: 0.2,
            fontSize: '7.5rem',
            lineHeight: '6.25rem',
            fontWeight: 'bold',
          }}
        >
          {serialNo < 10 ? `0${serialNo}` : serialNo}
        </p>
      ) : null}
      <div>
        <h4 className="h4">{title}</h4>
        <p className="p1">{description}</p>
      </div>
    </div>
  );
};

export default StyledListItem;
