import React from 'react';
import { routes } from "../../routes";

const MultiSigGenerator: React.FC = () => {

    return (
        <>
            <h1>
                {routes.multiSig.title}
            </h1>
            <h2>
                {routes.multiSig.description}
            </h2>
            <h3>
                <a href={routes.multiSig.methodologyURL} target="_blank">
                    How is it generated?
                </a>
            </h3>
        </>
    )
}

export { MultiSigGenerator }