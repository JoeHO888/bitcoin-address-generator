import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { routes } from "../../routes";

const signatureNumberOptions = Array.from(Array(21).keys()).slice(1);
const initialPublicKeyElement = { "valid": true, "value": "" };

const MultiSigGenerator: React.FC = () => {
    const [address, setAddress] = useState("");
    const [publicKeyObjArray, setPublicKeyObjArray] = useState([initialPublicKeyElement]);
    const [signatureNumber, setSignatureNumber] = useState("2");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignatureNumber(event.target.value);
    };

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("Submitted")
    }

    return (
        <div className="generator-form">
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
            <form noValidate autoComplete="off">
                <Grid container>
                    <Grid container className="form-field">
                        <Grid item >
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Amount of Signatures"
                                value={signatureNumber}
                                onChange={handleChange}
                                helperText="Amount of signatures required to release the coins">
                                {signatureNumberOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container className="form-field" alignItems="flex-start" justify="flex-end" direction="row">
                        <Grid item>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                onClick={onSubmit}>
                                Submit
                        </Button>
                        </Grid>
                    </Grid>
                    <Grid container className="form-field">
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                helperText="Encoded in P2WPKH, a native SegWit version"
                                fullWidth
                                value={address}
                                margin="normal"
                                id="address"
                                label="P2SH Address" />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export { MultiSigGenerator };