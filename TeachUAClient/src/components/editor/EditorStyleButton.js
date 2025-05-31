import React from "react";

class EditorStyleButton extends React.Component {
    onClick = () => {
        this.props.onToggle(this.props.style);
    };

    render() {
        const className = `toolbar-button ${this.props.active ? "toolbar-active-button" : ""} ${this.props.style}`;
        return (
            <div className={className}
                 onMouseDown={this.onClick}/>
        );
    }
}

export default EditorStyleButton;