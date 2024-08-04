// src/context/SearchContext.js
"use client"
import React, { createContext, useState, useContext } from 'react';

// Tạo context
const SearchContext = createContext();

// Tạo provider
export function SearchProvider({ children }) {
    const [keyword, setKeyword] = useState('');

    return (
        <SearchContext.Provider value={{ keyword, setKeyword }}>
            {children}
        </SearchContext.Provider>
    );
}

// Hook để sử dụng context
export function useSearch() {
    return useContext(SearchContext);
}
