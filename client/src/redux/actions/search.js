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
  console.log(term, data, "-------1------")
  const filtered = data.filter((todo) => {
    var description = todo.text.toLowerCase().includes(term.toLowerCase());
    var title = todo.title.toLowerCase().includes(term.toLowerCase());  
    return description || title
  });

  console.log(filtered, "filtered----------")

  dispatch({
    type: SET_SEARCH,
    payload: { filtered }
  });
};
