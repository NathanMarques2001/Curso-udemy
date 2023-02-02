import P from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import './App.css';

//data.jsx
export const globalState = {
  title: 'Título do contexto',
  body: 'Corpo do contexto',
  counter: 0,
};

//reducer.js
export const reducer = (state, action) => {
  console.log(action);
  return { ...state };
};

//AppContext.jsx
export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

AppContext.propTypes = {
  children: P.node,
};

//H1/index.jsx
export const H1 = () => {
  const context = useContext(Context);

  return (
    <h1 onClick={() => context.dispatch({ type: 'CHANGE_TITLE' })}>
      {context.state.title}
    </h1>
  );
};

//App.jsx
function App() {
  return (
    <AppContext>
      <div>
        <H1 />
      </div>
    </AppContext>
  );
}

export default App;
