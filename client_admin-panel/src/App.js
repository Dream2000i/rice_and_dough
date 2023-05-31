

import './style/App.scss';

import { Auth, Main } from './Containers';
import { useSelector } from 'react-redux';



function App() {
  const { auth } = useSelector(({ auth }) => auth);



  return (
    <div className="App">

      {
        auth ? <Main /> :  <Auth />
      }



    </div>
  );
}

export default App;
