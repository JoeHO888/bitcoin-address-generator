import React from 'react';
import { routes } from "../../routes";

const HDGenerator: React.FC = () => {

    return (
        <>
            <h1>
                {routes.hdSegWit.title}
            </h1>
            <h2>
                {routes.hdSegWit.description}
            </h2>
            <h3>
                <a href={routes.hdSegWit.methodologyURL} target="_blank">
                    How is it generated?
                </a>
            </h3>
        </>
    )
}

export { HDGenerator }