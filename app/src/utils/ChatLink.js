import React, { PureComponent } from "react";
// Copy to clipboard component
export class ChatLink extends PureComponent {
  copyText(e) {
    const textToCopy = e.target.innerText;

    navigator.clipboard.writeText(textToCopy);
  }

  render() {
    return (
      <div className="col-3">
        <p className="">Copy this link and invite a friend to join</p>
        <button className="btn btn-secondary" onClick={this.copyText}>
          <i className="bi bi-clipboard" id="clipboard">
            {this.props.link}
          </i>
        </button>
      </div>
    );
  }
}
