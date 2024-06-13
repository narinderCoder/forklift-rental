import React from "react";
import { cn } from "../../utils"; 
  export default function ProductButton({
    image,
    title,
    className,
    ...props
  }) {
    return (
      <button
        className={cn(
          "flex flex-col md:flex-row rounded-md gap-2 items-center border px-3 py-1 border-secondary-500 border-opacity-20 active:border-primary-500 active:bg-tertiary-500 text-secondary-500 hover:border-primary-500 hover:bg-tertiary-500",
          className
        )}
        {...props}
      >
        {image ? (
          <img src={image} alt={image} className="w-5 h-5 text-primary-500" />
        ) : null}
        <p className="text-opacity-60 p1 text-secondary-500">{title}</p>
      </button>
    );
  }
  