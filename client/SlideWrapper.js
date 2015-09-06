import '!style!css!less!./resources/styles/Slides.less';
import React, { Component, Children, PropTypes  } from 'react/addons';
import { connect } from 'react-redux';
import { Left, Right, Space } from './Constants/KeyCodes';
import { nextSlide, previousSlide, gotoSlide } from './ActionCreators/Slides';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

@connect((state) => state.slides)
class Slides extends Component {
  static propTypes = {
    slideNumber: PropTypes.number
  };

  constructor(props) {
    super();
    this.handleKeyDown = ({ keyCode, shiftKey, ctrlKey }) => {
      if (keyCode === Left) { this.props.dispatch(previousSlide(this.props.slideNumber, shiftKey, ctrlKey)); }
      if (keyCode === Right) { this.props.dispatch(nextSlide(this.props.slideNumber, shiftKey, ctrlKey)); }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { slideNumber, children } = this.props;
    const slideNumberToRender = slideNumber % Children.count(children);

    return (
      <div className="slide-container">
        <ReactCSSTransitionGroup transitionName="fade-in" transitionLeave={false}>
          <div key={slideNumber}>
            {children[slideNumberToRender]}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Slides