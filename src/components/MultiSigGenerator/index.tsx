import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { generateMultiSigAddress, generateRedeemScript } from "../../utils";
import { PublicKeyInput, PublicKeyElementAttributes } from "./PublicKeyInput";
import { routes } from "../../routes";
import {
    isAmountSignatureProper,
    validatePublicKeyObjArray
} from "../../utils";
import {
    signatureNumberOptions,
    defaultPublicKeyInputText,
    initialPublicKeyElement,
    defaultSignatureNumberHelperText
} from "../../constant";

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
        setSignatureNumberError(false);
        setSignatureNumberHelperText(defaultSignatureNumberHelperText);
    
        // Validate All Public Key Objects
        const validatedPublicKeyObjArray = validatePublicKeyObjArray(publicKeyObjArray, defaultPublicKeyInputText);
        setPublicKeyObjArray(validatedPublicKeyObjArray);
    
        // Extract using (valid/non-empty) Public Key Objects
        const usedPublicKeyObjArray = validatedPublicKeyObjArray.filter(element => element.valid && element.value)
    
        // Check Error in those using Public Key Objects
        const hasErrorArray = usedPublicKeyObjArray.map((ele) => ele.hasError);
    
        // Terminate Generation if using Public Key Objects have error
        if (hasErrorArray.some((e) => { return e })) {
            return
        }
        
        // Extract Public Key Value from those using Public Key Objects
        let pubKeys = usedPublicKeyObjArray.filter(element => element.valid && element.value).map(
            (element) => {
                return element.value
            }
        )
        
        // Check Number of Signatures is proper
        const signatureNumberValidation = isAmountSignatureProper(parseInt(signatureNumber, 10), pubKeys);
    
        // Terminate Generation if Number of Signatures is improper
        if (!signatureNumberValidation.valid) {
            setSignatureNumberError(true);
            setSignatureNumberHelperText((signatureNumberValidation.error) as string)
            return
        }
    
        // Generate RedeeScript & Address
        const redeemScript = generateRedeemScript(pubKeys, parseInt(signatureNumber));
        const address = generateMultiSigAddress(redeemScript)
        setAddress(address);
        setRedeemScript(redeemScript.toString("hex"));
    }

    const insertPublicKeyElement = (publicKeyElementId: number): void => {
        let newPublicKeyObjArray = [...publicKeyObjArray];
        newPublicKeyObjArray.splice(publicKeyElementId + 1, 0, initialPublicKeyElement);
        setPublicKeyObjArray(newPublicKeyObjArray);
    }

    const updatePublicKeyObjArray = (
        publicKeyElementId: number,
        newPublicKeyElement: PublicKeyElementAttributes
    ) => {

        let newPublicKeyObjArray = [...publicKeyObjArray];
        newPublicKeyObjArray[publicKeyElementId] = newPublicKeyElement;
        setPublicKeyObjArray(newPublicKeyObjArray);
    }

    const publicKeyControls = publicKeyObjArray.map(
        (element, index) => {
            const attributes = {
                Id: index,
                value: element.value,
                hasError: element.hasError,
                helperText: element.helperText,
                valid: element.valid
            }

            return (<PublicKeyInput
                publicKeyElementAttributes={attributes}
                key={index.toString()}
                insertPublicKeyElement={insertPublicKeyElement}
                updatePublicKeyObjArray={updatePublicKeyObjArray}
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
                    {publicKeyControls}
                    <Grid container className="form-field">
                        <Grid item >
                            <TextField
                                error={signatureNumberError}
                                id="signatureNumber"
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