import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
const Searchbar = () => {
    const [term,setterm]=useState("");
    const [open,setopen]=useState(false);
    const handlesearchtoggle=()=>{
        setopen(!open);
    }
    const handlesubmit=()=>{
        // alert(term);
        setterm("");
        setopen(false)
    }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${open?"absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"}`}>
      {open?(<form className='relative flex items-center justify-center w-1/2'>
        <div className='relative w-full'>
            <input type="text" 
            placeholder='Search'
            value={term}
            onChange={(e)=>(setterm(e.target.value))}
            className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full'
            />
            
            <button onClick={()=>(handlesubmit())} type='submit'><HiMagnifyingGlass className='h-6 w-6 hover:text-black transition-all duration-300 transform hover:h-7 hover:w-7 text-gray-700 absolute right-10 top-2'/></button>
           <button type="button" onClick={()=>(handlesearchtoggle())} ><HiMiniXMark className='h-7 w-7 hover:text-black transition-all duration-300 transform hover:h-7 hover:w-7 text-gray-700 absolute right-3 top-1.5'/></button>
        </div>
        
      </form>):<button onClick={()=>(handlesearchtoggle())} ><HiMagnifyingGlass className='hover:text-black text-gray-700 h-6 w-6'/></button>}
    </div>
  )
}

export default Searchbar
