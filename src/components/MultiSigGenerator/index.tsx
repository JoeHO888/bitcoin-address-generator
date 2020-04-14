import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { generateMultiSigAddress, generateRedeemScript } from "../../utils";
import { PublicKeyInput } from "./PublicKeyInput";
import { routes } from "../../routes";
import { isValidCompressedPublicKey, isAmountSignatureProper } from "../../utils";

const signatureNumberOptions = Array.from(Array(21).keys()).slice(1);
const defaultPublicKeyInputText = "It starts from 02 or 03";
const initialPublicKeyElement = {
    "valid": true,
    "value": "",
    "hasError": false,
    "helperText": defaultPublicKeyInputText
};

const defaultSignatureNumberHelperText = "Amount of signatures required to release the coins";

const MultiSigGenerator: React.FC = () => {
    const [address, setAddress] = useState("");
    const [redeemScript, setRedeemScript] = useState("");
    const [publicKeyObjArray, setPublicKeyObjArray] = useState([initialPublicKeyElement]);
    const [signatureNumber, setSignatureNumber] = useState("2");
    const [signatureNumberError, setSignatureNumberError] = useState(false);
    const [signatureNumberHelperText, setSignatureNumberHelperText] = useState(defaultSignatureNumberHelperText);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignatureNumber(event.target.value);
    };

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const validatedPublicKeyObjArray = publicKeyObjArray.map(
            (element) => {
                let hasError = false;
                let helperText = defaultPublicKeyInputText;
                if (element.value) {
                    const validationRes = isValidCompressedPublicKey(element.value);
                    hasError = !validationRes.valid;
                    helperText = (validationRes.valid) ? defaultPublicKeyInputText : (validationRes.error) as string
                }
                return (
                    {
                        "valid": element.valid,
                        "value": element.value,
                        "hasError": hasError,
                        "helperText": helperText
                    }
                )
            }
        )
        setPublicKeyObjArray(validatedPublicKeyObjArray);
        const hasErrorArray = validatedPublicKeyObjArray.map((ele) => ele.hasError);

        if (hasErrorArray.some((e) => { return e })) {
            return
        }

        let pubKeys = publicKeyObjArray.filter(element => element.valid && element.value).map(
            (element) => {
                return element.value
            }
        )
        const signatureNumberValidation = isAmountSignatureProper(parseInt(signatureNumber, 10), pubKeys);

        if (! signatureNumberValidation.valid) {
            setSignatureNumberError(true);
            setSignatureNumberHelperText((signatureNumberValidation.error) as string)
            return
        }

        const reedemScript = generateRedeemScript(pubKeys, parseInt(signatureNumber));
        const address = generateMultiSigAddress(reedemScript)
        setAddress(address);
        setRedeemScript(reedemScript.toString("hex"));
    }

    const insertPublicKeyElement = (publicKeyElementId: number): void => {
        let newPublicKeyObjArray = [...publicKeyObjArray];
        newPublicKeyObjArray.splice(publicKeyElementId + 1, 0, initialPublicKeyElement);
        setPublicKeyObjArray(newPublicKeyObjArray);
    }

    const makePublicKeyElementInvalid = (publicKeyElementId: number): void => {
        if (publicKeyElementId === 0) {
            return
        }
        let newPublicKeyObjArray = [...publicKeyObjArray];
        let newPublicKeyElement = { ...newPublicKeyObjArray[publicKeyElementId] };
        newPublicKeyElement.valid = false;
        newPublicKeyObjArray[publicKeyElementId] = newPublicKeyElement;
        setPublicKeyObjArray(newPublicKeyObjArray);
    }

    const updatePublicKeyObjArray = (event: React.ChangeEvent<HTMLInputElement>, publicKeyElementId: number) => {
        let newPublicKeyObjArray = [...publicKeyObjArray];
        let newPublicKeyElement = { ...newPublicKeyObjArray[publicKeyElementId] };
        newPublicKeyElement.value = event.target.value;
        newPublicKeyObjArray[publicKeyElementId] = newPublicKeyElement;
        setPublicKeyObjArray(newPublicKeyObjArray);
    }

    const publicKeyElement = publicKeyObjArray.filter(element => element.valid).map(
        (element, index) => {
            return (
                <PublicKeyInput
                    publicKeyElementId={index}
                    insertPublicKeyElement={insertPublicKeyElement}
                    makePublicKeyElementInvalid={makePublicKeyElementInvalid}
                    key={index.toString()}
                    publicKeyElementValue={element.value}
                    updatePublicKeyObjArray={updatePublicKeyObjArray}
                    hasError={element.hasError}
                    helperText={element.helperText}
                />
            )
        }
    );

    return (
        <div className="generator-form">
            <h1>
                {routes.multiSig.title}
            </h1>
            <h2>
                {routes.multiSig.description}
            </h2>
            <h3>
                <a href={routes.multiSig.methodologyURL} target="_blank" rel="noopener noreferrer">
                    How is it generated?
                </a>
            </h3>
            <form noValidate autoComplete="off">
                <Grid container>
                    {publicKeyElement}
                    <Grid container className="form-field">
                        <Grid item >
                            <TextField
                                error={signatureNumberError}
                                id="standard-select-currency"
                                select
                                label="Amount of Signatures"
                                value={signatureNumber}
                                onChange={handleChange}
                                helperText={signatureNumberHelperText}
                            >
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
                    <Grid container className="form-field">
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                helperText="P2SH Redeem Script"
                                fullWidth
                                value={redeemScript}
                                margin="normal"
                                id="redeemScript"
                                multiline
                                rowsMax={4}
                                label="Redeem Script" />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export { MultiSigGenerator };