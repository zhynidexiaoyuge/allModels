import React from 'react';
import './dialog.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
  }

  show() {
    this.setState({
      display: 'block'
    });
  }

  hidden() {
    this.setState({
      display: 'none'
    });
  }

  render() {
    return (
      <div className={'dialog-xf-wrap'} style={{
        display: this.state.display
      }}>
        {this.props.children}
      </div>
    );
  }
};

export default Page;
