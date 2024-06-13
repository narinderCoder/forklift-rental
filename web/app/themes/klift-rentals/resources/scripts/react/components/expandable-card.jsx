import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

const ExpandableCard = ({ title, data }) => {
  const [expanded, setExpanded] = useState(false);
  
console.log(data);
  return (
    <div className={`expandable-card ${expanded ? 'open' : ''} `}>
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-100 d-flex align-items-center text-secondary"
        style={{ gap: '0.75rem' }}
      >
        {expanded ? <Minus size={16} /> : <Plus size={16} />}
        <p className="p1">{title}</p>
      </div>

      {data?.attributes?.length > 0 ? data.attributes.map((item, index) => (
        <div
          key={index}
          className="flex-row gap-5 justify-content-start d-flex align-items-center"
          style={{ gap: '1.25rem' }}
        >
          <div className="flex-row w-100 justify-content-between align-items-center d-flex">
            <p className="flex-1 p1 text-secondary text-opacity-80">
              {item.title}
            </p>
            <p className="p1">:</p>
          </div>
          <p className="info w-100 p1">{item.info}</p>
        </div>
      )): ''}
    </div>
  );
};

export default ExpandableCard;
