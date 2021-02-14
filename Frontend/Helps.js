import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Helps({setMessage,setHelpsOpen}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
    const _helps = [
        "Buenos días",
        'Está abierto los fines de semana?',
        "Dónde puedo encontrarlos?",
        "Qué productos venden?",
        "Abren los domingos?",
        "Tienes el menu?"
    ]
    const handleClick = () => {
      setHelpsOpen(!open)
      setOpen(!open);
      
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={open&&classes.root}
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                  {_helps.map(help => (
                      <ListItem button className={classes.nested}>
                      <ListItemText primary={help} onClick={() => {
                          setMessage(help);
                              setOpen(false)
                              setHelpsOpen(false)
                      }}/>
          </ListItem>
                  ))}
          
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
    </List>
  );
}