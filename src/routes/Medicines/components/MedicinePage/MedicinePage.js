import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getMedicineByName} from './getNHSData';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const doNHSCall = async (drug) => {
  if (!drug){
    return;
  }
  return await getMedicineByName(drug);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const medicineNames =     {
  alogliptin: {
    name: 'Alogliptin',
  },
  cyclizine: {
    name: 'Cyclizine',
  }
};



function MedicinePage() {
  const classes = useStyles();
  const [medicineCache, setMedicineData] = useState({});

  const [open, setOpen] = React.useState(false);
  const [currentDrug, setCurrentDrug] = React.useState(null);

  const handleClickOpen = (drug) => () => {
    setCurrentDrug(drug);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!currentDrug){
      return;
    } 
    if(medicineCache[currentDrug]){
      return;
    }
    doNHSCall(currentDrug).then(result => {
      if (!result){
        return;
      }
    
    setMedicineData(m => {
      const currentDrugData = m[currentDrug] || {};
      const obj = Object.assign({}, result);
      const updatedData = Object.assign({}, currentDrugData, obj, {loaded: true});
      return {[currentDrug]: {...updatedData, loaded: true}, ...m}});
    });
  }, [currentDrug, medicineCache]);
  

  function FormItem(props) {
    return (
    <React.Fragment>
        <Grid item xs={4} onClick={handleClickOpen(props.drug)}>
          <Paper className={classes.paper} style={{
            'paddingTop':'50px', 
            'paddingBottom': '50px', 
            }}>
            {medicineNames[props.drug].name}
          </Paper>
        </Grid>
    </React.Fragment>
    )
  }

  function FormRow() {
    return (
      <React.Fragment>
        <FormItem drug={'alogliptin'} ></FormItem>
        <FormItem drug={'cyclizine'}></FormItem>
        <FormItem drug={'alogliptin'}></FormItem>
      </React.Fragment>
    );
  }

  return (

    <div className={classes.root} style={{'paddingLeft': '1em'}}>
      <div style={{'marginTop': '1em'}}></div>
      My Medicines
      <div style={{'marginTop': '1em'}}></div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h2" className={classes.title}>
            {currentDrug && medicineNames[currentDrug].name} Details
          </Typography>
        </Toolbar>
          {(medicineCache && medicineCache[currentDrug] && medicineCache[currentDrug].loaded) ?
          <div>
          <Typography variant="h6" 
            className={classes.title} 
            dangerouslySetInnerHTML={{__html: medicineCache[currentDrug].mainEntityOfPage[0].mainEntityOfPage[0].text}}
            style={{'marginLeft': '3em'}}
            >
          </Typography>
          <Typography variant="h6" 
          className={classes.title} 
          dangerouslySetInnerHTML={{__html: medicineCache[currentDrug].mainEntityOfPage[1].mainEntityOfPage[0].text}}
          style={{'marginLeft': '3em'}}
          >
        </Typography>
        <Typography variant="h6" 
          className={classes.title} 
          dangerouslySetInnerHTML={{__html: medicineCache[currentDrug].mainEntityOfPage[2].mainEntityOfPage[0].text}}
          style={{'marginLeft': '3em'}}
          >
        </Typography>

        </div>
        
          :
          <div className={classes.root}>
            <div className={classes.progress}>
              <CircularProgress mode="indeterminate" size={80} />
            </div>
            </div>
          }
      </Dialog>

    </div>
  );
}

MedicinePage.propTypes = {
  project: PropTypes.object.isRequired, // from enhancer (connect)
}

export default MedicinePage
