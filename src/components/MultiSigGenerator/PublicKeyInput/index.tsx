import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

type PublicKeyElementAttributes = {
    Id: number;
    value: string;
    hasError: boolean;
    helperText: string;
}

type publicKeyElementProps = {
    publicKeyElementAttributes: PublicKeyElementAttributes;
    insertPublicKeyElement: (publicKeyElementId: number) => void;
    makePublicKeyElementInvalid: (publicKeyElementId: number) => void;
    updatePublicKeyObjArray: (
        event: React.ChangeEvent<HTMLInputElement>,
        publicKeyElementId: number,
    ) => void;
}

const PublicKeyInput: React.FC<publicKeyElementProps> = (publicKeyElementProps) => {
    const publicKeyElementId = publicKeyElementProps.publicKeyElementAttributes.Id
    const value = publicKeyElementProps.publicKeyElementAttributes.value
    const hasError = publicKeyElementProps.publicKeyElementAttributes.hasError
    const helperText = publicKeyElementProps.publicKeyElementAttributes.helperText

    const insertPublicKeyElement = () => {
        publicKeyElementProps.insertPublicKeyElement(publicKeyElementId);
    }

    const beInvalid = () => {
        publicKeyElementProps.makePublicKeyElementInvalid(publicKeyElementId);
    }

    const updateAttribute = (event: React.ChangeEvent<HTMLInputElement>) => {
        publicKeyElementProps.updatePublicKeyObjArray(event, publicKeyElementId);
    }

    return (
        <Grid container className="form-field">
            <Grid item xs={11}>
                <TextField
                    error={hasError}
                    fullWidth
                    placeholder="02/03"
                    helperText={helperText}
                    margin="normal"
                    id={publicKeyElementId.toString()}
                    onChange={updateAttribute}
                    value={value}
                    label="Compressed Public Key" />
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

export { PublicKeyInput }