import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            copied: false,
        }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState(){
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    }
    render() {
        const { name, background } = this.props; // unpack props
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox">
                    <div 
                        className={`copy-overlay ${copied && "show"}`} 
                        style={{backgroundColor: background}}>
                    </div>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container" style={{backgroundColor: background}}>
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                        <span className="see-more">More</span>
                    </div>
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox