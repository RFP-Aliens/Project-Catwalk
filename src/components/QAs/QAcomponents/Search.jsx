/* eslint-disable react/prop-types */
import React from 'react';

const formStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContents: 'center',
  paddingBottom: '5px'
};

const iconStyle = {
  position: 'absolute',
  right: '2%'
};

const inputStyles = {
  minWidth: '100%',
  minHeight: '50px',
  fontSize: '15px'
};

const Search = (props) => {
  return (
    <form style={formStyle}>
      <input style={inputStyles} type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." name="answer" onChange={props.task}></input>
      <i style={iconStyle} className="fas fa-search"></i>
    </form>
  );
}

export default Search;