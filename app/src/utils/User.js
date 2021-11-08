import React, { PureComponent } from "react";

export class User extends PureComponent {
  render() {
    return <li className="list-group-item ">{this.props.user.userName}</li>;
  }
}
