import React from "react";


const Card = (props) => {
    return (
        <div className="card" key={props.id} data-id={props.id}>
            <p>{props.name}</p>
            <p>{props.primaryDescription}</p>
        </div>
    )
}

export default Card;