import React,{useEffect, useState} from 'react'
import EnvProvider from './EnvContext';
const HeaderContent = () => {
    const [data,setData] = useState('');
    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${EnvProvider.baseUrl}header-footer`
            );
            const jsonData = await response.json();
            const data1 = jsonData.header;
            setData(data1); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);


  return (
    <div
    dangerouslySetInnerHTML={{ __html: data }}>  
    </div>
  )
};
export default HeaderContent;