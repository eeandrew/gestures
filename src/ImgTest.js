import React, {
  Component,
  PropTypes
} from 'react';
import Gestures from './Gestures';
import './ImgTest.css';

export default class ImgTest extends Component {

  constructor(props) {
    super(props);
  }

  onPinch(event) {

  }

  render() {
    return (
    <Gestures >
      <div className="wrapper" onPinch={this.onPinch}>
        <img  className="lena" src="http://read.pudn.com/downloads94/sourcecode/graph/texture_mapping/374111/shuzituxiang/len_std.jpg"></img>
      </div>
    </Gestures>
    );
  }
}