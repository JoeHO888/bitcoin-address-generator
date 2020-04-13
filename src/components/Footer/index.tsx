import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(6),
    },
}));

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <div>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Created By Joe Ho
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Generate HD SegWit & MultiSig P2SH Bitcoin Address!
                </Typography>
            </footer>
        </div>

    )
}

export { Footer }