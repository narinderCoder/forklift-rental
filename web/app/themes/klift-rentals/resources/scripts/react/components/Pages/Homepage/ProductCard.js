import React from 'react'
import ProductSlider from './ProductSlider'
import { ChevronDown, Download } from 'lucide-react'
import ProductButton from './ProductButton'
import { cn } from "../../utils"; 
export default function ProductCard({
    product,
    view = "quick",
    sale = false,
  }) {
  return (
    <div
    className={`flex items-start w-full gap-10 md:24 flex-col md:flex-row`}
  >
    <ProductSlider data={product} />
    <div className="flex items-start w-full gap-2">
      <div className="flex-1 w-full">
        <div className="flex flex-col items-start w-full gap-10">
          <div className="flex-1">
            <h4 className="text-4xl leading-[50px] font-medium">
              {product.name}
            </h4>
            <p className="text-lg font-normal leading-8">
              {product.short_description}
            </p>
          </div>
          {view === "quick" ? (
            <>
              <div className="flex flex-col flex-wrap w-full gap-4 item-center md:flex-row">
                <ProductButton title="More Images" image={'images'} />
                <ProductButton title="Get Quotes" image={'quote'} />
                <ProductButton title="Value Your Trade" image={'trade'} />
                <ProductButton title="View Details" image={'setting'} />
              </div>
              <div className="flex flex-row items-center gap-4">
                
                {product.variations &&
                    product.variations.map((variation, index) => (
                        <>
                        <div>
                            <p className="text-lg font-normal leading-8 opacity-50">
                                {variation?.attributes?.attribute_pa_rental_type}
                            </p>
                            <h6 className="text-2xl font-normal">$ {variation?.price}</h6>
                            </div>
             
                        </>
                    ))}
              </div>

              <button className="flex items-center justify-center gap-1 p-2 font-normal border rounded-md text-secondary-500 border-secondary-500 border-opacity-20">
                <p className="p1">Quick view</p>
                <ChevronDown size={24} />
              </button>
            </>
          ) : (
            <>
              <button className="gap-0 font-medium btn-primary">
                <p>
                  ${product.price}{" "}
                  {!sale ? (
                    <span className="font-normal">/ month</span>
                  ) : null}
                </p>
              </button>
              <ExpandableCard title="Specifications" data={specifications} />
            </>
          )}
        </div>
      </div>
      <div
        className={cn(
          `items-center justify-end hidden gap-4 mt-1 md:flex w-16`,
          {
            "md:hidden": view !== "quick",
          }
        )}
      >
        <Download size={20} className="opacity-50 text-secondary-500" />
        <img src={'share'} alt="share" className="w-5 h-5" />
      </div>
    </div>
  </div>
  )
}
