import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

type publicKeyElementProps = {
    publicKeyElementId: number;
    key: string;
    publicKeyElementValue: string;
    insertPublicKeyElement: (publicKeyElementId: number) => void;
    makePublicKeyElementInvalid: (publicKeyElementId: number) => void;
    updatePublicKeyObjArray: (event: React.ChangeEvent<HTMLInputElement>, publicKeyElementId: number) => void;
}

const PublicKeyInput: React.FC<publicKeyElementProps> = (publicKeyElementProps) => {
    const publicKeyElementId = publicKeyElementProps.publicKeyElementId;
    const insertPublicKeyElement = () => {
        publicKeyElementProps.insertPublicKeyElement(publicKeyElementId);
    }

    const beInvalid = () => {
        publicKeyElementProps.makePublicKeyElementInvalid(publicKeyElementId);
    }

    const updatePublicKeyObjArray = (event: React.ChangeEvent<HTMLInputElement>) => {
        publicKeyElementProps.updatePublicKeyObjArray(event, publicKeyElementId);
    }

    const value = publicKeyElementProps.publicKeyElementValue;

    return (
        <Grid container className="form-field">
            <Grid item xs={11}>
                <TextField
                    fullWidth
                    placeholder="02/03"
                    helperText="It starts from 02 or 03"
                    margin="normal"
                    id={publicKeyElementId.toString()}
                    onChange={updatePublicKeyObjArray}
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