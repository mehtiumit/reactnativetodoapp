import * as actionTypes from './actionTypes';

export const initialState = {
  todos: [],
  doneTodos: [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      console.log('Action' + action);
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((f) => f.id !== action.payload),
      };
    case actionTypes.UPDATE_TODO:
      let updatedTodos = state.todos.map((td) => {
        if (td.id === action.payload) {
          td.isComplete = !td.isComplete;
        }
        return td;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    default:
      return state;
  }
};
