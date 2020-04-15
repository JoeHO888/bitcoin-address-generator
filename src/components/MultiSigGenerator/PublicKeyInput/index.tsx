import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { generateCompressedPublicKey } from "../../../utils";

export type PublicKeyElementAttributes = {
    valid: boolean;
    Id: number;
    value: string;
    hasError: boolean;
    helperText: string;
}

type publicKeyElementProps = {
    publicKeyElementAttributes: PublicKeyElementAttributes;
    insertPublicKeyElement: (publicKeyElementId: number) => void;
    updatePublicKeyObjArray: (
        publicKeyElementId: number,
        newPublicKeyElement: PublicKeyElementAttributes
    ) => void;
}

const PublicKeyInput: React.FC<publicKeyElementProps> = (publicKeyElementProps) => {
    const publicKeyElementId = publicKeyElementProps.publicKeyElementAttributes.Id
    const value = publicKeyElementProps.publicKeyElementAttributes.value
    const hasError = publicKeyElementProps.publicKeyElementAttributes.hasError
    const helperText = publicKeyElementProps.publicKeyElementAttributes.helperText
    const valid = publicKeyElementProps.publicKeyElementAttributes.valid

    const publicKeyElementAttributes = publicKeyElementProps.publicKeyElementAttributes

    const insertPublicKeyElement = () => {
        publicKeyElementProps.insertPublicKeyElement(publicKeyElementId);
    }

    const beInvalid = () => {
        let newPublicKeyElement = { ...publicKeyElementAttributes };
        if (publicKeyElementId !== 0) {
            newPublicKeyElement.valid = false;
        }

        publicKeyElementProps.updatePublicKeyObjArray(
            publicKeyElementId,
            newPublicKeyElement
        );
    }

    const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newPublicKeyElement = { ...publicKeyElementAttributes };
        newPublicKeyElement.value = event.target.value;
        publicKeyElementProps.updatePublicKeyObjArray(
            publicKeyElementId,
            newPublicKeyElement
        );
    }

    const onGenerate = () => {
        let newPublicKeyElement = { ...publicKeyElementAttributes };
        let publicKey: Buffer;
        while (true) {
            publicKey = generateCompressedPublicKey();

            if (publicKey) {
                break
            }
        }
        newPublicKeyElement.value = publicKey.toString("hex");
        publicKeyElementProps.updatePublicKeyObjArray(
            publicKeyElementId,
            newPublicKeyElement
        );
    }


    if (valid) {
        return (
            <Grid container className="form-field">

                <Grid item xs={11}>
                    <Grid container>

                        <Grid item xs={11}>
                            <TextField
                                error={hasError}
                                fullWidth
                                placeholder="02/03"
                                helperText={helperText}
                                margin="normal"
                                id={publicKeyElementId.toString()}
                                onChange={updateValue}
                                value={value}
                                label="Compressed Public Key" />
                        </Grid>

                        <Grid item>
                            <Button

                                type="button"
                                variant="outlined"
                                color="primary"
                                onClick={onGenerate}>
                                Random Key
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={1}>
                    <IconButton aria-label="add" style={{ color: green[500] }} onClick={insertPublicKeyElement}>
                        <AddIcon />
                    </IconButton>
                    <IconButton aria-label="remove" color="secondary" onClick={beInvalid}>
                        <RemoveIcon />
                    </IconButton>
                </Grid>

            </Grid>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }
}

export { PublicKeyInput }