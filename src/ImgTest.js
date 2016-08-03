import React, {
  Component,
  PropTypes
} from 'react';
import Gestures from './Gestures';
import './ImgTest.css';
import classNames from 'classnames';

export default class ImgTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pinch : 1,
      angle :0,
      left:0,
      top:0,
      animating:false
    };
    this.pinch = 1;
    this.left = 0;
    this.top = 0;
    this.angle = 0;
    this.doubleTapped = false;
    this.onPinch = this.onPinch.bind(this);
    this.onRotate = this.onRotate.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onDoubleTap = this.onDoubleTap.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
  }

  onPinch(event) {
    this.pinch += event.scale;
    this.setState({
      pinch: this.pinch
    });
  }

  onRotate(event) {
    this.angle += event.angle
    this.setState({
      angle:this.angle
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

  onDoubleTap() {
    if(this.doubleTapped) {
      this.pinch = 1;
      this.setState({
        pinch: this.pinch
      });
    }else {
      this.pinch = 2.5;
      this.setState({
        pinch: this.pinch
      });
    }
    this.doubleTapped = !this.doubleTapped;
  }

  onLongPress() {
    alert('Long Press');
    this.setState({
      animating:true
    });
    setTimeout(()=>{
      this.setState({
        animating:false
      });
    },1000)
  }

  render() {
    let {
      pinch,
      angle,
      left,
      top,
      animating
    } = this.state;
    let imgStyle = {
      transform: `scale(${pinch}) rotateZ(${angle}deg)`,
      WebkitTransform: `scale(${pinch}) rotateZ(${angle}deg)`,
      left: `${left}px`,
      top: `${top}px`
    }
    let imgClasses = classNames('lena','flash',{animated:animating})
    return (
    <div>
      <Gestures onPinch={this.onPinch} onMove={this.onMove} onRotate={this.onRotate} onDoubleTap={this.onDoubleTap} onLongPress={this.onLongPress}>
        <div className="wrapper" >
          <img  className={imgClasses} style={imgStyle} src="http://read.pudn.com/downloads94/sourcecode/graph/texture_mapping/374111/shuzituxiang/len_std.jpg"></img>
        </div>
      </Gestures>
      <div>
          <label>Pinch</label> <span>{this.state.pinch}</span><br/>
          <label>Rotate</label> <span>{this.state.angle}</span>
      </div>
    </div>
    );
  }
}