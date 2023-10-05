import React from "react";

const Card = (props: any) => {

    return (
        <div className="card">

            <img
                alt=""
                src={
                    props.img ||
                    new URL('/src/assets/bitfinity.jpeg', import.meta.url).href
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

export { Card };

