import React from 'react';
import Header from './components/Header';
import Tareas from './components/Tareas';

// Redux
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Router>
      <Provider store={store}>
      
          <Header />
          <div className="container mt-5">
              <Switch>
                  <Route exact path="/" component={Tareas} />
              </Switch>
          </div>
      </Provider>
    </Router>
  );
}

export default App;