import useSound from 'use-sound';
import sounds from '../function/5261.mp3';




import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect, useRef } from 'react';




import { Menu } from '../Components'
import { Synch, Goods, Discounts } from './Section';


import { fetchLogout } from './../redux/actions/auth'


export default function Main() {

  const history = useHistory();
  const [play] = useSound(sounds);



  useEffect(() => {
    // history.push('/discounts');



  }, []);



  function name(params) {

  }

  return (
    <div className="site">
      <Menu logout={fetchLogout} />
      <main>
        <Switch>
          <Route path='/synch' component={Synch} />
          <Route path='/goods' component={Goods} />
          <Route path='/discounts' component={Discounts} />

        </Switch>

      </main>
    </div>
  );
}
