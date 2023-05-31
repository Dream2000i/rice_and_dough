import 'antd/dist/antd.css';
import './App.scss';

import { Site, TopSite, MenuGoods, Pages, GoodsArea, Slider } from './Containers';
import {  Footer } from './Components';

function App() {

  return (
    <>
      <div className="wrapper">
        <Site>
          <TopSite />
          <Slider />
          <MenuGoods />
          <GoodsArea />
          <Pages />
          <Footer />
        </Site>


      </div>
    </>
  );
}

export default App;
