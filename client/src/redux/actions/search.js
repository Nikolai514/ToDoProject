import { SET_SEARCH_TERM, LOCATION_CHANGED, SET_SEARCH } from './types';

export const setSearchTerm = (term) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: { term }
  });
};

export const setLocationChanged = () => async (dispatch) => {
  dispatch({
    type: LOCATION_CHANGED
  });
};

export const setSearch = (term, data) => async (dispatch) => {
  const filtered = data.filter((todo) => {
    if(term.filter === 'all'){
      let description = todo.text.toLowerCase().includes(term.search.toLowerCase());
      let title = todo.title.toLowerCase().includes(term.search.toLowerCase());  
      return description || title
    }else if(term.filter === 'complete'){
      let completed = todo.completed ? true : false;
      let description = todo.text.toLowerCase().includes(term.search.toLowerCase());
      let title = todo.title.toLowerCase().includes(term.search.toLowerCase()); 
      return completed && ( description || title );
    }else if(term.filter === 'aday'){
      if(todo.due_date) {
        let today = new Date();
        let due_date = new Date(todo.due_date);
        let remainDate = due_date - today;
        const days = Math.floor(remainDate / (1000 * 60 * 60 * 24));
        if(0 < days && days < 1){
          let description = todo.text.toLowerCase().includes(term.search.toLowerCase());
          let title = todo.title.toLowerCase().includes(term.search.toLowerCase());  
          return description || title
        }
      }
    }else if(term.filter === 'over'){
      if(todo.due_date) {
        let today = new Date();
        let due_date = new Date(todo.due_date);
        let remainDate = due_date - today;
        const days = Math.floor(remainDate / (1000 * 60 * 60 * 24));
        if(days < 0){
          let description = todo.text.toLowerCase().includes(term.search.toLowerCase());
          let title = todo.title.toLowerCase().includes(term.search.toLowerCase());  
          return description || title
        }
      }
    }
    return false;
  });
  dispatch({
    type: SET_SEARCH,
    payload: { filtered }
  });
};

export const setStateFilter = (filter, data) => async (dispatch) => {
  const filtered = data.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'complete') {
      var completed = todo.completed ? true : false;
      return completed;
    }
    //if (filter === 'aday') {
    //  // Filter logic for within a day
    //  return /* logic for a day */;
    //}
    //if (filter === 'over') {
    //  // Filter logic for overdue items
    //  return /* logic for overdue */;
    //}
    return false;
  });

  dispatch({
    type: SET_SEARCH,
    payload: { filtered }
  });
};

// export const setStateFilter = (term, data) => async (dispatch) => {
//   const filtered = data.filter((todo) => {
//     var description = todo.text.toLowerCase().includes(term.toLowerCase());
//     var title = todo.title.toLowerCase().includes(term.toLowerCase());  
//     return description || title
//   });

//   dispatch({
//     type: SET_SEARCH,
//     payload: { filtered }
//   });
// };