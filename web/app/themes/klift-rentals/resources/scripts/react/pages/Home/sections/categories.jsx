import React, { useState, useEffect } from 'react';
import EnvContext from '../../../EnvVar';
import { Search } from 'lucide-react';
import ReactSelect, { components } from "react-select";

const options = [
  { label: "Lifts for Sale", value: "liftsForSale" },
  { label: "Lifts for Rent", value: "liftsForRent" },
];

const Control = ({ children, ...props }) => (
  <components.Control {...props}>{children}</components.Control>
);

export default function Catagories() {
  const [categories, setCategory] = useState([]);
  const [allcategories, setAllCategory] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 
  
  const [subcategories, setSubcategory] = useState([]);
  const [parent_categories, setParentCategory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${EnvContext.baseUrl}product-categories`
        );
        const jsonData = await response.json();
        setParentCategory(jsonData.parent_categories);
        const cates = jsonData.parent_categories.map(
          (cate) =>  
          cate.slug === jsonData.selectedParent ? cate : [] 
        );
        setActiveTab(jsonData.selectedParent); 
        if(cates.length > 0){ 
           setCategory(cates[0]?.categories);
           setSubcategory(cates[0]?.subcategories);
           setSelectedSubcategory(cates[0]?.subcategories);
           setAllCategory(cates[0]?.categories);  
           
        } 
         
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTabClick = (slug) => {
      setActiveTab(slug);   
      const cates = parent_categories.filter(
        (cate) => cate.slug === slug
      ); 
      if(cates.length > 0){ 

         setCategory(cates[0]?.categories);
         setSubcategory(cates[0]?.subcategories);
         setSelectedSubcategory(cates[0]?.subcategories);
         setAllCategory(cates[0]?.categories);  
        // handleCategorySelect('');
      } 
  };



  const handleCategorySelect = (category) => {
    if (category != '') {
      setSelectedCategory(category.slug);
      const filteredItems = subcategories.filter(
        (cate) => cate.parent === category.slug
      ); 
      setSelectedSubcategory(filteredItems);
    } else {
      setSelectedSubcategory(subcategories);
    }
  };
  console.log(parent_categories.find((item) => item.slug === activeTab), "working")

  return (
    <section className="container mx-auto section-alt px-2 categories-section">
    <div className="my-4">
      <div className="d-md-flex d-none row justify-content-center">
        {parent_categories.map((pc, id) => (<div className="col-3">
          <div
            className="position-relative h-100 overflow-hidden justify-self-center"
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleTabClick(pc.slug)}
          >
            <h4 className="text-center h4">{pc.name}</h4>
            <div
              className="category-line"
              style={{
                left: activeTab === pc.slug ? "25%" : "100%",
                opacity: activeTab === pc.slug ? 1 : 0,
              }}
            />
          </div>
        </div>))}


  
      </div>
      <div className="w-100 d-block d-md-none mb-4">
        <ReactSelect
          unstyled
          classNames={{
            placeholder: () => "text-secondary text-opacity-40",
            singleValue: () => "text-secondary",
            option: () => "bg-white p-2",
            dropdownIndicator: () => "text-secondary text-opacity-40",
            menu: () =>
              "bg-white text-secondary px-4 py-4 border border-top-0 border-opacity-20 rounded-3 rounded-top-0",
            control: (state) =>
              state.menuIsOpen
                ? "select-product-menu-electric p1 rounded-bottom-0"
                : "select-product-menu-electric p1",
          }}
          options={parent_categories.map(pc => ({value:pc.slug, label: pc.name}))}
          placeholder=""
          onChange={(e) => {
            setActiveTab(e.value)
            handleTabClick(e.value)

          }}
          value={{value:activeTab, label: parent_categories.find((item) => item.slug === activeTab)?.name}}
          components={{ Control }}
        />
      </div>
    </div>

    <div
      className="py-4 px-2 my-4 w-100 align-items-start justify-content-start d-flex flex-column align-items-md-center justify-content-md-between flex-md-row"
      style={{ gap: "1rem" }}
    >
      <div>
        <p className="tp1 text-primary">Equipment</p>
        <h4 className="h4 text-secondary">Quality equipment, ready to go</h4>
      </div>
      <div
        className="w-auto border position-relative d-flex align-items-center border-primary"
        style={{
          height: "2.5rem",
          paddingInlineStart: "0.5rem",
          paddingInlineEnd: "2px",
          paddingBlock: "1.25rem",
          borderRadius: "10px",
        }}
      >
        <Search
          size={16}
          opacity={0.5}
          className="d-none text-secondary d-sm-block"
        />
        <input
          placeholder="Search equipment"
          className="bg-transparent"
          style={{ padding: "0.5rem", height: "2.25rem" }}
        />
        <button
          className="text-white bg-primary"
          style={{
            paddingInline: "1rem",
            fontSize: "1rem",
            lineHeight: "2rem",
            borderRadius: "10px",
            height: "2.25rem",
          }}
        >
          Search
        </button>
      </div>
    </div>

    <div className="py-4 px-2 my-4">
      <ul
        className="flex-row flex-wrap justify-content-start d-flex align-items-center p-0"
        style={{ gap: "2.75rem 2rem" }}
      >
        <li
          key="all"
          onClick={() => handleCategorySelect("")}
          className={`category-list-item ${
            selectedCategory === "" ? "selected" : ""
          }`}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategorySelect(category)}
            className={`category-list-item ${
              selectedCategory === category.slug ? "selected" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: category.name }}
          ></li>
        ))}
      </ul>
    </div>

    <div className="py-4 px-2 my-4">
      <div className="row g-4">
        {[...selectedSubcategories, ...selectedSubcategories].map(
          (subcategory, index) => (
            <div key={index} className="col-md-3 col-12">
              <a
                href={`/products?q=${subcategory.id}`}
                className="d-block border border-secondary border-opacity-10 rounded-3 bg-white rounded-lg w-100 h-100 p-4"
              >
                <div className="d-flex w-100 h-100 flex-column justify-content-between">
                  <img
                    src={subcategory.image_url}
                    alt={subcategory.name}
                    className="mx-auto w-100 mb-2"
                  />
                  <p className="text-center text-secondary">
                    {subcategory.name}
                  </p>
                </div>
              </a>
            </div>
          )
        )}
      </div>
    </div>

    <div
      className="flex-md-row flex-column w-100 justify-content-center d-flex align-items-md-center"
      style={{ gap: "2rem" }}
    >
      <button className="w-auto justify-content-center rounded-2 btn-secondary">
        Rental Request
      </button>

      <button className="w-auto justify-content-center rounded-2 btn-secondary">
        Rental Application
      </button>
      <button className="w-auto justify-content-center rounded-2 btn-secondary">
        Lifts For Rent
      </button>
      <button className="w-auto justify-content-center rounded-2 btn-secondary">
        Service Request
      </button>
    </div>
  </section>
    // <section className="bg-white section-alt position-relative categories-section w-100 h-100">
    //   <div
    //     className="container mx-auto d-flex flex-column"
    //     style={{ gap: '4rem' }}
    //   >
        
    //     <div className="mx-auto row col-md-6 text-secondary">
    //       {parent_categories.map((pc,index) => (
    //         <>
    //         <div
    //             className="position-relative h-100 col-6 d-flex align-items-center justify-content-center"
    //             style={{
    //               overflow: 'hidden',
    //               cursor: 'pointer',
    //             }}
    //             onClick={() => handleTabClick(pc.slug)}
    //           >
    //             <h4 className="text-center h4">{pc.name}</h4>
    //             <div
    //               className="category-line"
    //               style={{
    //                 left: activeTab === pc.slug ? '25%' : '100%',
    //                 opacity: activeTab === pc.slug ? 1 : 0,
    //               }}
    //             />
    //           </div>
    //         </>
    //       ))}
          
           
    //     </div>

    //     <div
    //       className="w-100 align-items-start justify-content-start d-flex flex-column align-items-md-center justify-content-md-between flex-md-row"
    //       style={{ gap: '1rem' }}
    //     >
    //       <div>
    //         <p className="tp1 text-primary">Equipment</p>
    //         <h4 className="h4 text-secondary">
    //           Quality equipment, ready to go
    //         </h4>
    //       </div>
    //       <div
    //         className="w-auto border position-relative d-flex align-items-center border-primary"
    //         style={{
    //           height: '2.5rem',
    //           paddingInlineStart: '0.5rem',
    //           paddingInlineEnd: '2px',
    //           paddingBlock: '1.25rem',
    //           borderRadius: '10px',
    //         }}
    //       >
    //         <Search
    //           size={16}
    //           opacity={0.5}
    //           className="d-none text-secondary d-sm-block"
    //         />
    //         <input
    //           placeholder="Search equipment"
    //           className="bg-transparent"
    //           style={{ padding: '0.5rem', height: '2.25rem' }}
    //         />
    //         <button
    //           className="text-white bg-primary"
    //           style={{
    //             paddingInline: '1rem',
    //             fontSize: '1rem',
    //             lineHeight: '2rem',
    //             borderRadius: '10px',
    //             height: '2.25rem',
    //           }}
    //         >
    //           Search
    //         </button>
    //       </div>
    //     </div>

    //     <ul
    //       className="flex-row flex-wrap justify-content-start d-flex align-items-center text-secondary"
    //       style={{ gap: '2.75rem 2rem', opacity: 0.6 }}
    //     >
    //       <li
    //         key="all"
    //         onClick={() => handleCategorySelect('')}
    //         className={`category-list-item text-secondary transition-all duration-300 hover:text-opacity-80 ${
    //           selectedCategory === '' ? 'underline' : ''
    //         }`}
    //         style={{ opacity: selectedCategory === '' ? 1 : 0.6 }}
    //       >
    //         All
    //       </li>
    //       {categories.map((category, index) => (
    //         <li
    //           key={index}
    //           onClick={() => handleCategorySelect(category)}
    //           className={`category-list-item text-secondary text-opacity-60 transition-all duration-300 hover:text-opacity-80
    //             ${
    //               selectedCategory === category.slug
    //                 ? 'text-opacity-100 underline'
    //                 : ''
    //             }`}
    //           style={{ opacity: selectedCategory === category.slug ? 1 : 0.6 }}
    //           dangerouslySetInnerHTML={{ __html: category.name }}
    //         ></li>
    //       ))}
    //     </ul>

    //     <div
    //       className=" row align-items-normal" 
    //     >
    //       {selectedSubcategories.map((subcategory, index) => (
    //          <div className="col-3 subcategory">
    //         <a key={index} href={subcategory.link}>
             
    //             <img
    //               src={subcategory.image_url}
    //               alt={subcategory.name}
    //               width={280}
    //               className="mx-auto"
    //             />
    //             <p className="text-center text-secondary">{subcategory.name}</p>
    //             </a>
    //           </div>
            
    //       ))}
    //     </div>

    //     <div
    //       className="flex-wrap w-100 justify-content-center flex-column d-flex flex-sm-row align-items-md-center"
    //       style={{ gap: '4rem' }}
    //     >
    //       <button className="justify-content-center btn-secondary">
    //         Rental Request
    //       </button>
    //       <button className="justify-content-center btn-secondary">
    //         Rental Application
    //       </button>
    //       <button className="justify-content-center btn-secondary">
    //         Lifts For Rent
    //       </button>
    //       <button className="justify-content-center btn-secondary">
    //         Service Request
    //       </button>
    //     </div>
    //   </div>
    // </section>
    
  );
}
