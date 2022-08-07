import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const{page,nbPages,pageHandle,isLoading}=useGlobalContext()
  return <div className='btn-container'>
    <button disabled = {isLoading}onClick={()=>pageHandle('dec')}>prev</button>
    <p>page {page+1} of {nbPages} </p>
    <button disabled = {isLoading}onClick={()=>pageHandle('inc')}>next</button>

  </div>
}

export default Buttons
