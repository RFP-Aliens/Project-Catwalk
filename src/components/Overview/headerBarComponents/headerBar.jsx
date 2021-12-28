import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalState.js'

let headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const HeaderBar = () => {
  return (
    <div
      style={headerStyle}>
      <div
        className="logo">
        Logo
      </div>
      <div
        className="searchBar">
        Search Bar
      </div>
    </div>
  );
}