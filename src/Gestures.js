import React, {
  PropTypes,
  Component
} from 'react';

export default class Gestures extends Component {
  constructor(props) {
    super(props);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchCancel = this._onTouchCancel.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._emitEvent = this._emitEvent.bind(this);
    this.startX = this.startY = this.moveX = this.moveY = null;
  }
  _emitEvent(eventType,e) {
    let eventHandler = this.props[eventType];
    if(!eventHandler)return;
    eventHandler.call(this,e);
  }
  _getTime() {
    return new Date().getTime(); 
  }
  _getDistance(xLen,yLen) {
    return Math.sqrt(xLen * xLen,yLen * yLen);
  }
  /**
   * 获取向量的旋转方向
   */
  _getRotateDirection(vector1,vector2) {
    return vector1.x * vector2.y - vector2.x * vector1.y;
  }  
  _getRotateAngle(vector1,vector2) {
    let direction = this._getRotateDirection(vector1,vector2);
    direction = direction > 0 ? -1 : 1;
    let len1 = this._getDistance(vector1);
    let len2 = this._getDistance(vector2);
    let mr = len1 * len2;
    if(mr === 0) return 0;
    let dot = vector1.x * vector2.x + vector1.y * vector2.y;
    let r = dot / mr;
    if(r > 1) r = 1;
    if(r < -1) r = -1;
    return Math.acos(r) * direction * 180 / Math.PI;
  }

  _onTouchStart(e) {
    let point = e.touches ? e.touches[0] : e;
    this.startX = point.pageX;
    this.startY = point.pageY;
    this.startTime = this._getTime();
    //两点接触
    if(e.touches.length > 1) {
      let point2 = e.touches[1];
      let xLen = Math.abs(point2.pageX - this.startX);
      let yLen = Math.abs(point2.pageY - this.startY);
      this.touchDistance = this._getDistance(xLen,yLen); 
      this.touchVector = {
        x: point2.pageX - this.startX,
        y: point2.pageY - this.startY
      };
    }
    if(this.previousTouchPoint) {
      if( Math.abs(this.startX -this.previousTouchPoint.startX) < 10  &&
        Math.abs(this.startY - this.previousTouchPoint.startY) < 10 && 
        Math.abs(this.startTime - this.previousTouchTime) < 300) {
          this._emitEvent('onDoubleTap');
        }
    }
    this.previousTouchTime = this.startTime;
    this.previousTouchPoint = {
      startX : this.startX,
      startY : this.startY
    };
  }
  _onTouchMove(e) {
    let timestamp = this._getTime();
    if(e.touches.length > 1) {
      let xLen = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
      let yLen = Math.abs(e.touches[1].pageY - e.touches[1].pageY);
      let touchDistance = this._getDistance(xLen,yLen);
      if(this.touchDistance) {
        let pinchScale = touchDistance / this.touchDistance;
        this._emitEvent('onPinch',{scale:pinchScale});
      }
      if(this.touchVector) {
        let vector = {
          x: e.touches[1].pageX - e.touches[0].pageX,
          y: e.touches[1].pageY - e.touches[1].pageY
        };
        let angle = this._getRotateAngle(vector,this.touchVector);
        this._emitEvent('onRotate',{
          angle
        });
        this.touchVector.x = vector.x;
        this.touchVector.y = vector.y;
      }
    }else {
      let point = e.touches ? e.touches[0] :e;
      let deltaX = this.moveX === null ? 0 : point.pageX - this.moveX;
      let deltaY = this.moveY === null ? 0 : point.pageY - this.moveY;
      this._emitEvent('onMove',{
        deltaX,
        deltaY
      });
      this.moveX = point.pageX;
      this.moveY = point.pageY;
    }
    e.preventDefault();
  }
  _onTouchCancel(e) {
    this._onTouchEnd();
  }
  _onTouchEnd(e) {
    /**
     * 在X轴或Y轴发生过移动
     */
    let timestamp = this._getTime();
    if(this.moveX !== null && Math.abs(this.moveX - this.startX) > 10 ||
    this.moveY !== null && Math.abs(this.moveY - this.startY) > 10) {
      if(timestamp - this.startTime < 500) {
        this._emitEvent('onSwipe');
      } 
    }else if(timestamp - this.startTime <1000){
      this._emitEvent('onTap');
    }else if(timestamp - this.startTime > 1000){
      this._emitEvent('onLongPress');
    }
    this.startX = this.startY = this.moveX = this.moveY = null;
  }
  render() {
   return React.cloneElement(React.Children.only(this.props.children), {
        onTouchStart: this._onTouchStart.bind(this),
        onTouchMove: this._onTouchMove.bind(this),
        onTouchCancel: this._onTouchCancel.bind(this),
        onTouchEnd: this._onTouchEnd.bind(this)
    });
  }
}

Gestures.propTypes = {
  onMove: PropTypes.func
};