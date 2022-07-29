import React from "react";

export default function PostComponent(props){

    return (
        <div className="post-component">
            <div className="post-main">
                <div className="post-main-heading">
                    <h3>{props.heading}</h3>
                    <p>{props.subHeading}</p>
                </div>
                <img src={props.img} alt="Test"/>
                <div className="post-quote">
                    <h6>{props.quote.length <= 270 ? props.quote : "Nothing..."}</h6>
                    <p>{props.author}</p>
                </div>
            </div>
            <button onClick={props.handleClick} className="post-button">Generate</button>
        </div>
    );
}