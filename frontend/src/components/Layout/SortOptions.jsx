import React from 'react'
import { useSearchParams} from 'react-router-dom'
const SortOptions = () => {
  const [pararms,setparams]=useSearchParams();
  const handlesort=(e)=>{
    pararms.set('sortby',e.target.value);
    setparams(pararms);
  }
  return (
    <div className='flex justify-end  items-center p-2 '>
       <select id="sort" className='p-1 outline-none rounded-md border' onChange={handlesort} value={pararms.get('sortby')}>
      <option value="">Default</option>
      <option value="priceasd">Price:Low to High</option>
      <option value="priceded">Price:High to Low</option>
      <option value="popular">Popularity</option>
    </select>
    </div>
   
  )
}

export default SortOptions
