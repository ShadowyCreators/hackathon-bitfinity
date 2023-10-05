import React from "react";

const Card = (props: any) => {

    return (
        <div className="card">

            <img
                alt=""
                src={
                    props.img ||
                    `https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3`
                }
                className="card-img"
            />

            <div className="card-content p-2">
                <h4 className="break-words">{props.name}</h4>
                <h4 className="break-words">{props.content}</h4>
            </div>

            <div className="card-footer pb-2">
                {props.footer}
            </div>

        </div>
    )

}

export { Card }
