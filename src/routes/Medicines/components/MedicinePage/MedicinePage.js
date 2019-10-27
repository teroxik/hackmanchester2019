import React, { useState, useEffect } from 'react'
import moment from 'moment';
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

const drugList = [
  'atenolol',
  'alogliptin',
  'cyclizine',
  'azithromycin',
  'clobetasone',
  'heparinoid',
  'olmesartan',
  'pravastatin',
  'propranolol',
  'rosuvastatin',
  'venlafaxine',
  'warfarin',
  'sitagliptin',
  'saxagliptin',
  'perindopril'
];

const feelings = {
  "0": "🤮",
  "1": "😐",
  "2": "😁",
};

const doNHSCall = async (drug) => {
  if (!drug){
    return;
  }
  return await getMedicineByName(drug);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const chunk = function(array, size) {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);

  return [head, ...chunk(tail, size)];
};


const generateDrugGrid = (props) => {
  const {patient} = props;
  const pillsArray = Object.keys(patient.pills).sort().map(x => {return patient.pills[x]});
  return chunk(pillsArray, 3);
}

function MedicinePage(project) {
  
  const classes = useStyles();
  const [medicineCache, setMedicineData] = useState({});

  const [open, setOpen] = React.useState(false);
  const [currentDrug, setCurrentDrug] = React.useState(null);
  const drugGrid = generateDrugGrid(project);
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
        <Grid item xs={4} onClick={handleClickOpen(props.drug.name)}>
          <Paper className={classes.paper} style={{
            'paddingTop':'50px', 
            'paddingBottom': '50px', 
            'height': '100%',
            'backgroundColor': (props.drug.correct !== false ? '' : 'red'),
            }}>
            <div>
              <p>{props.drug.name.charAt(0).toUpperCase() + props.drug.name.substring(1)}</p>
              <p>{
                props.drug.taken && 
                <div>
                  <p>I {!props.drug.correct && 'wrongly'} took it {moment(props.drug.taken.toDate()).fromNow()}</p>
                </div>
              }</p>
              <p>{
                props.drug.vote && 
                <div>
                  <p>It made me feel {feelings[props.drug.vote]}</p>
                </div>
              }</p>

            </div>
          </Paper>
        </Grid>
    </React.Fragment>
    )
  }

  function FormRow(props) {
    return (
      <React.Fragment>
        {props.drugData && props.drugData.map(x => {
          return <FormItem 
            drug={x} 
        ></FormItem>
        })}
      </React.Fragment>
    );
  }

  return (

    <div className={classes.root} style={{'paddingLeft': '1em'}}>
      <div style={{'marginTop': '1em'}}></div>
      My Medicines
      <div style={{'marginTop': '1em'}}></div>
      <Grid container spacing={1}>
      {drugGrid.map(x => {
        return <Grid container item xs={12} spacing={3}>
          <FormRow drugData={x}/>
        </Grid>
      })}
      </Grid>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h2" className={classes.title}>
            {currentDrug && (currentDrug.charAt(0).toUpperCase() + currentDrug.substring(1))} Details
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
