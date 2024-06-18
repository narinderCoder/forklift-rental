import Checkbox from '@scripts/react/components/checkbox';
import Filters from '@scripts/react/icons/filters';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import EnvProvider from '../../../EnvVar';
import CategoryTree from './category-filter';

const ProductSideOptions = (props) => {
  const [filter_options, setFilterOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    setSelectedSubOption(parseInt(props.params.parent));
    getFilters();
  }, [props.params.parent]);

  const getFilters = async () => {
    var divElement = document.getElementById('rentProductReact');
    // Check if the element exists
    var parent = 0;
    if (divElement) {
      parent = divElement.getAttribute('data-parent');
    }
    try {
      const response = await fetch(
        `${EnvProvider.baseUrl}get-product-filters?parent=${parent}`
      );
      const jsonData = await response.json();
      const data1 = jsonData.data;

      setCategories(data1.categories);
      setAttributes(data1.attributes);
      // console.log(data1.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [selectedOption, setSelectedOption] = useState('all-categories');
  const handleOption = (option) => {
    setSelectedOption(option == selectedOption ? '' : option);
  };
  const [selectedSubOption, setSelectedSubOption] = useState(16);
  const handleSubOption = (option) => {
    setSelectedSubOption(option == selectedSubOption ? '' : option);
  };

  return (

    <div className="col-12 col-xl-3">
   <div className="gap-4 d-flex flex-column product-side-filters">
    <div className="gap-4 align-items-center justify-content-between d-flex">
      <div className="gap-2 align-items-center d-flex">
        <Filters />
        <p className="text-opacity-50 text-secondary">Filters</p>
      </div>
      <div>
        <button
            className="border-none bg-none text-primary"
            onClick={(e) => props.resetFilter(e)}
          >
            Clear filters
          </button>
        </div>
      </div>
      <div className="position-relative">
        <button
          onClick={() => handleOption('all-categories')}
          className={
            'd-flex align-items-center justify-content-between w-100 bg-5 rounded-top-3'
          }
          style={{ padding: '0.75rem', gap: '0.5rem' }}
        >
          <p className="text-opacity-80 text-secondary">Categories</p>
          {selectedOption === 0 ? (
            <Minus className="text-opacity-80 text-secondary" />
          ) : (
            <Plus className="text-opacity-80 text-secondary" />
          )}
        </button>
        <div
          className={`filter-options ${
            selectedOption === 'all-categories' ? 'open' : ''
          }`}
        >
          {categories.length > 0
            ? categories.map((category, index) => (
                <div className=''>
                  {category?.children && category?.children.length > 0 ? (
                    <>
                     <button
                            onClick={() => handleSubOption(parseInt(category.id))}
                            className={
                              'ps-3 d-flex align-items-center justify-content-between w-100 rounded-0'
                            }
                            style={{ padding: '0.75rem', gap: '0.5rem' }}
                          >
                            <p className="text-opacity-60 text-secondary">
                              {category.name}
                            </p>
                            {selectedSubOption === parseInt(category.id) ? (
                              <Minus className="text-opacity-60 text-secondary" />
                            ) : (
                              <Plus className="text-opacity-60 text-secondary" />
                            )}
                        </button>
                        <div
                            className={`filter-options ps-2 ${
                              selectedSubOption === parseInt(category.id) ? 'open' : ''
                            }`}
                         > 
                         <CategoryTree categories={category.children}  handleSubOptions={props.handleSubOptions} selectedCategories={props.selectedCategories}/>
                       </div>
                        </>
                  ) :  props.selectedCategories !== undefined &&
                  props.selectedCategories.includes(parseInt(category.id)) ? ( 
                    <Checkbox name={'category'} label={category.name} onChange={props.handleSubOptions} val={category.id}  checked={true}/> 
                  ) : ( 
                    <Checkbox name={'category'} label={category.name} onChange={props.handleSubOptions} val={category.id}/>  
                  )}
                </div>
              ))
            : null}
        </div>
      </div>

      {attributes.length > 0
        ? attributes.map((attribute, index) => (
            <div className="position-relative">
              <button
                onClick={() => handleOption(attribute.slug)}
                className={
                  'd-flex align-items-center justify-content-between w-100 bg-5 rounded-3'
                }
                style={{ padding: '0.75rem', gap: '0.5rem' }}
              >
                <p className="text-opacity-80 text-secondary">
                  {attribute.label}
                </p>
                {selectedOption === 0 ? (
                  <Minus className="text-opacity-80 text-secondary" />
                ) : (
                  <Plus className="text-opacity-80 text-secondary" />
                )}
              </button>
              <div
                className={`filter-options ${
                  selectedOption === attribute.slug ? 'open' : ''
                }`}
              >
                {attribute?.options &&
                  attribute?.options.length > 0 &&
                  attribute?.options.map((opt, index) => (
                    <>
                      {props.attributeChecked[attribute.slug] !== undefined &&
                      props.attributeChecked[attribute.slug].includes(opt) ? (
                        <>
                          <Checkbox
                            name={attribute.slug}
                            label={opt}
                            val={opt}
                            onChange={props.handleOptions}
                            checked={true}
                            className={"p2"}
                          />
                        </>
                      ) : (
                        <>
                          <Checkbox
                            name={attribute.slug}
                            label={opt}
                            val={opt}
                            onChange={props.handleOptions}
                            checked={false}
                          />
                        </>
                      )}
                    </>
                  ))}
              </div>
            </div>
          ))
        : ''}
    </div>
    </div>



   
  );
};

export default ProductSideOptions;
