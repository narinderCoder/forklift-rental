import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

const DescriptionExpandableCard = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false); 
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

     
        <div
          key={0}
          className="flex-row gap-5 justify-content-start d-flex align-items-center"
          style={{ gap: '1.25rem' }}
        >
          <div className="flex-row w-100 justify-content-between align-items-center d-flex" dangerouslySetInnerHTML={{ __html: description }}></div>
            
        </div>
      
    </div>
  );
};

export default DescriptionExpandableCard;
