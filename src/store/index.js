import { combineReducers, createStore } from 'redux';

// Actions
export const setQuiz = quiz => ({
  type: 'SET_QUIZ',
  quiz,
});


// Reducers
export const quiz = (state = {}, action) => {
  switch (action.type) {
    case 'SET_QUIZ':
      return action.quiz;
    default:
      return state;
  }
};

export const reducers = combineReducers({
    quiz,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
