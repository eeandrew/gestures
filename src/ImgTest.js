import React, {
  Component,
  PropTypes
} from 'react';
import Gestures from './Gestures';
import './ImgTest.css';

export default class ImgTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pinch : 1,
      angle :0,
      left:0,
      top:0
    };
    this.pinch = 1;
    this.left = 0;
    this.top = 0;
    this.onPinch = this.onPinch.bind(this);
    this.onRotate = this.onRotate.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  onPinch(event) {
    this.pinch += event.scale;
    this.setState({
      pinch: this.pinch
    });
  }

  onRotate(event) {
    this.setState({
      angle:event.angle
    });
  }

  onMove(event) {
    this.left += event.deltaX;
    this.top += event.deltaY;
    this.setState({
      left: this.left,
      top: this.top
    });
  }

  render() {
    let {
      pinch,
      angle,
      left,
      top
    } = this.state;
    let imgStyle = {
      transform: `scale(${pinch})`,
      left: `${left}px`,
      top: `${top}px`
    }
    return (
    <div>
      <Gestures onPinch={this.onPinch} onMove={this.onMove}>
        <div className="wrapper" >
          <img  className="lena" style={imgStyle} src="http://read.pudn.com/downloads94/sourcecode/graph/texture_mapping/374111/shuzituxiang/len_std.jpg"></img>
        </div>
      </Gestures>
      <div>
          <label>Pinch</label> <span>{this.state.pinch}</span>
          <label>Rotate</label> <span>{this.state.angle}</span>
      </div>
    </div>
    );
  }
}