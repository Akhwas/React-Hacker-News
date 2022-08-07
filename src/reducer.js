import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state,action) => {
  
  switch (action.type) {
    case SET_LOADING:
      return {...state,isLoading:true}
      break;
    case SET_STORIES:
      return{...state,stories:action.payLoad.stories,page:(action.payLoad.page),nbPages:action.payLoad.nbPages,isLoading:false}
    case REMOVE_STORY:
      const newStories = state.stories.filter((story)=>story.objectID !== action.payLoad)
      console.log(newStories)
      return {...state,stories:newStories}
    case HANDLE_PAGE:
      if(action.payLoad==='dec'){
        let prevPage = state.page -1
        if (prevPage < 0){
          prevPage = state.nbPages-1
        }
        return{...state,page:prevPage}
    
      }
      if(action.payLoad==='inc'){
        let nextPage = state.page + 1
        if(nextPage > state.nbPages-1 ){
          nextPage = 0
        }
        return {...state,page:nextPage}
      }
      case HANDLE_SEARCH:
        return{...state,query:action.payLoad,page:0}
      
    default:
      throw new Error (`no matching ${action.type} action type`)
      break;
  }
  return state
}
export default reducer
