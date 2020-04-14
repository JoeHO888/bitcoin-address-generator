import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { routes } from "../../routes";
import {
    deriveHDSegWitAddress,
    isMasterKeySeedValid,
    isDerivedPathValid
} from "../../utils";

const defaultSeedHelperText = "It should be between 128 and 512 bits"
const defaultPathHelperText = "Format: m/number/number'/..., ' to denoate hardended child key"
const defaultAddressHelperText = "Encoded in P2WPKH, a native SegWit version"

const HDGenerator: React.FC = () => {

    const [seed, setSeed] = useState("");
    const [seedHasError, setSeedHasError] = useState(false);
    const [seedHelperText, setSeedHelperText] = useState(defaultSeedHelperText);

    const [path, setPath] = useState("");
    const [pathHasError, setPathHasError] = useState(false);
    const [pathHelperText, setPathHelperText] = useState(defaultPathHelperText);

    const [address, setAddress] = useState("");
    const [addressHasError, setAddressHasError] = useState(false);
    const [addressHelperText, setAddressHelperText] = useState(defaultAddressHelperText);

    const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(event.target.value);
    };

    const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPath(event.target.value);
    };

    const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const seedValidation = isMasterKeySeedValid(seed);
        const pathValidation = isDerivedPathValid(path);

        // Valid Seed
        if (!seedValidation.valid) {
            setSeedHasError(true);
            setSeedHelperText((seedValidation.error) as string)

        }// Valid Path
        else if (!pathValidation.valid) {
            setPathHasError(true);
            setPathHelperText((pathValidation.error) as string)
        // Try to Derive Child Key
        } else {
            setSeedHasError(false);
            setPathHasError(false);
            setSeedHelperText(defaultSeedHelperText)
            setPathHelperText(defaultPathHelperText)

            const derivedAddress = deriveHDSegWitAddress(seed, path);

            // Invalid Child Key
            if (!derivedAddress.address) {
                setAddressHasError(true)
                setAddressHelperText((derivedAddress.error) as string)
            }

            setAddress((derivedAddress.address) as string);
        }
    }

    return (
        <div className="generator-form">
            <h1>
                {routes.hdSegWit.title}
            </h1>
            <h2>
                {routes.hdSegWit.description}
            </h2>
            <h3>
                <a href={routes.hdSegWit.methodologyURL} target="_blank" rel="noopener noreferrer">
                    How is it generated?
                </a>
            </h3>
            <form autoComplete="off">
                <Grid container className="form-field">
                    <Grid item xs={12}>
                        <TextField
                            error={seedHasError}
                            placeholder="Seed to generate HD address"
                            helperText={seedHelperText}
                            fullWidth
                            value={seed}
                            onChange={handleSeedChange}
                            margin="normal"
                            id="seed"
                            label="Seed" />
                    </Grid>
                </Grid>

                <Grid container className="form-field">
                    <Grid item xs={12}>
                        <TextField
                            error={pathHasError}
                            placeholder="Example: m/123'/456"
                            helperText={pathHelperText}
                            fullWidth
                            value={path}
                            onChange={handlePathChange}
                            margin="normal"
                            id="path"
                            label="Path" />
                    </Grid>
                </Grid>

                <Grid className="form-field" container alignItems="flex-start" justify="flex-end" direction="row">
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
                            error={addressHasError}
                            disabled
                            helperText={addressHelperText}
                            fullWidth
                            value={address}
                            margin="normal" id="address" label="HD P2WPKH Address" />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export { HDGenerator };