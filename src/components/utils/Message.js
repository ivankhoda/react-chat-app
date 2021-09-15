import React, { PureComponent } from "react";

export class Message extends PureComponent {
  render() {
    return (
      <p className="p-2 d-flex justify-content-start">
        <b>{this.props.message.username}</b>,{this.props.message.time}: {this.props.message.text}
      </p>
    );
  }
}
