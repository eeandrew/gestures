import ReactDom from 'react-dom';
import React from 'react';
import ImgTest from './ImgTest';

const App = (props) => {
  return (
    <div>
    <ImgTest/>
    <ImgTest/>
    </div>
  );
}

ReactDom.render(<App/>,document.getElementById('app'));