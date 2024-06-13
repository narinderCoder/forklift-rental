import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../utils";


 
export default function FaqsSection({faqs}) {
    const [open, setOpen] = useState(null);
    return (
        <div className="flex flex-col gap-4 cursor-pointer">
          {faqs !== undefined ? faqs.map((item,index) => (
            <div
              key={item.id}
              className={cn(
                "relative w-full h-auto border border-primary-500 border-opacity-20 rounded-xl p-8",
                {
                  "bg-tertiary-500": open == index,
                }
              )}
              onClick={() => {
                if (index === open) {
                  setOpen(null);
                } else {
                  setOpen(index);
                }
              }}
            >
              <div className={cn("flex items-center justify-between")}>
                <p
                  className={cn("font-normal transition-all duration-150", {
                    "font-semibold": open === index,
                  })}
                >
                  {item.question}
                </p>
                <ChevronDown
                  className={cn("transition-transform duration-300 rotate-0", {
                    "-rotate-180": open === index,
                  })}
                />
              </div>
    
              <div
                className={cn(
                  "overflow-hidden transition-all duration-900 ease",
                  index === open ? "max-h-[600px] pt-10" : "max-h-0"
                )}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          )) : ''}
        </div>
      );
}
 