import React from "react";
import Nav from 'react-bootstrap/Nav';


class HeaderItem extends React.Component {
  constructor(props) {
      super(props)
      this.state = {}
  }

  render() {
      return (
          <>
              <Nav.Link href={this.props.href}>{this.props.name}</Nav.Link>   
          </>
      )
  }
}

export default HeaderItem;
