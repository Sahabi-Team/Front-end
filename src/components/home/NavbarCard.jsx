import React, { useState, useRef, useEffect } from 'react';

const NavBar = () => {
  const [movementsMenuOpen, setMovementsMenuOpen] = useState(false);
  const [programsMenuOpen, setProgramsMenuOpen] = useState(false);
  const movementsRef = useRef(null);
  const programsRef = useRef(null);
  
  const toggleMovementsMenu = () => {
    setMovementsMenuOpen(!movementsMenuOpen);
    if (programsMenuOpen) setProgramsMenuOpen(false);
  };
  
  const toggleProgramsMenu = () => {
    setProgramsMenuOpen(!programsMenuOpen);
    if (movementsMenuOpen) setMovementsMenuOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (movementsRef.current && !movementsRef.current.contains(event.target)) {
        setMovementsMenuOpen(false);
      }
      if (programsRef.current && !programsRef.current.contains(event.target)) {
        setProgramsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Right Side Menu Items */}
          <div className="flex items-center justify-end gap-6 flex-grow">
            <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-all font-medium">
              سوالات متداول
            </button>
            
            <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-all font-medium">
              لیست مربی‌ها
            </button>
            
            {/* Movements Dropdown */}
            <div className="relative" ref={movementsRef}>
              <button 
                className={`px-4 py-2 text-gray-700 hover:text-green-600 transition-all font-medium flex items-center gap-1 ${movementsMenuOpen ? 'text-green-600' : ''}`}
                onClick={toggleMovementsMenu}
              >
                بانک حرکات ورزشی
                <svg className={`w-4 h-4 transition-transform ${movementsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {movementsMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                  <div className="py-1">
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">حرکات سینه</button>
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">حرکات شکم و پهلو</button>
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">حرکات پا</button>
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">حرکات سرشانه</button>
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">حرکات پر بغل</button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Programs Dropdown */}
            <div className="relative" ref={programsRef}>
              <button 
                className={`px-4 py-2 text-gray-700 hover:text-green-600 transition-all font-medium flex items-center gap-1 ${programsMenuOpen ? 'text-green-600' : ''}`}
                onClick={toggleProgramsMenu}
              >
                برنامه‌های ورزشی
                <svg className={`w-4 h-4 transition-transform ${programsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {programsMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                  <div className="py-1">
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">برنامه غذایی</button>
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">برنامه شکم و پهلو</button>
                    <button className="w-full text-right px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">برنامه اختصاصی</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-shadow">
              جیمباتو
            </div>
          </div>
          
          {/* Left Side Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all">
              تست رایگان
            </button>
            <button className="px-5 py-2.5 border-2 border-green-500 text-green-600 rounded-full font-medium hover:bg-green-50 transition-all">
              ورود
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;