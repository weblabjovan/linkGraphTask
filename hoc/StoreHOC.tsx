import React from 'react';
import { StoreProvider } from '../store';

const StoreHOC = ({children}) => {
  return(
    <StoreProvider>{ children }</StoreProvider>
  )
}

export default StoreHOC;