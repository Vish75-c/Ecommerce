import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productsSlice';

const Searchbar = () => {
  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => setOpen(!open);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ stop default submit reload
    if (!term.trim()) return; // ignore empty search

    dispatch(setFilters({ search: term }));
    dispatch(fetchProductsByFilters({ search: term }));
    navigate(`/collections/all?search=${term}`); // ✅ consistent path
    setOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        open
          ? 'absolute top-0 left-0 w-full bg-white h-24 z-50'
          : 'w-auto'
      }`}
    >
      {open ? (
        <form onSubmit={handleSubmit} className="relative flex items-center justify-center w-1/2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full"
            />
            <button type="submit">
              <HiMagnifyingGlass className="h-6 w-6 hover:text-black transition-all duration-300 transform hover:h-7 hover:w-7 text-gray-700 absolute right-10 top-2" />
            </button>
            <button type="button" onClick={handleSearchToggle}>
              <HiMiniXMark className="h-7 w-7 hover:text-black transition-all duration-300 transform hover:h-7 hover:w-7 text-gray-700 absolute right-3 top-1.5" />
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="hover:text-black text-gray-700 h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
