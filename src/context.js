import React, { useContext, useEffect, useReducer, useState } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {isLoading:true,stories:[],page:0,nbPages:0,query:'react'}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  
 
  // const [query,setQuery] = useState('react')
  // const [page,setPage] = useState(0)

  const [state,dispatch] = useReducer(reducer,initialState)
  
  
    const getStories = async()=>{
      dispatch({type:SET_LOADING})
      // if(query){

      // }
      try {
        
        const response = await fetch(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
        const data = await response.json()
        console.log(data)
        dispatch({type:SET_STORIES,payLoad:{stories:data.hits,page:data.page,nbPages:data.nbPages}})
        
        
        return data
      } catch (error) {
        console.log(error)
      }
    }
    const removeStory = (id)=>{
      dispatch({type:REMOVE_STORY,payLoad:id})
    }
    const pageHandle = (value)=>{
      
      dispatch({type:HANDLE_PAGE,payLoad:value})
      console.log(value)
    }

    const searchHandle = (value)=>{
      dispatch({type:HANDLE_SEARCH,payLoad:value})
    }
      
     
    
    useEffect(()=>{getStories()},[state.query,state.page])
  
  return <AppContext.Provider value={{...state,removeStory,pageHandle,searchHandle}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
