import React, { PureComponent } from "react";

export class CustomButton extends PureComponent {
  handleRedirect() {
    const leaveRoom = window.confirm("Are you sure?");

    if (leaveRoom) {
      window.location = "/";
    }
  }
  render() {
    return (
      <button
        type="button"
        className="btn btn-sm btn-primary col-1 justify-self-end"
        id="quit_button"
        onClick={this.handleRedirect}
      >
        {this.props.name}
      </button>
    );
  }
}
