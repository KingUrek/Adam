import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTransition, useTrail, animated } from 'react-spring';
import SideBar from '../../components/TODO/SideBar';
import TaskContainer from '../../components/TODO/AllTasks/TaskContainer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  'spacing-xs-5': { paddingBottom: '0!important' },


}));


export default function AllTasks() {
  const classes = useStyles();
  const containers = [{ id: 1, item: 'Hoje' }, { id: 2, item: 'No Futuro' }, { id: 3, item: 'Algum Dia' }];


  const [fade] = useTrail(containers.length, () => ({
    config: { mass: 5, tension: 2000, friction: 200 },
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  }));


  return (
    <Grid alignItems="center" container spacing={0}>

      <Grid classes={{ item: classes['spacing-xs-5'] }} item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>

        <Grid container justify="space-around" classes={{ container: classes.container }}>

          {/* <Grid classes={{ item: classes['spacing-xs-5'] }} item xs={4}>
            <TaskContainer day="Hoje" />
          </Grid>

          <Grid classes={{ item: classes['spacing-xs-5'] }} item xs={4}>
            <TaskContainer day="No Futuro" />
          </Grid>

          <Grid classes={{ item: classes['spacing-xs-5'] }} item xs={4}>
            <TaskContainer day="Algum Dia" />
          </Grid> */}
          {fade.map((props, index) => (
            <Grid key={containers[index].item} classes={{ item: classes['spacing-xs-5'] }} item xs={4}>
              <animated.div style={props}>
                <TaskContainer day={containers[index].item} />
              </animated.div>
            </Grid>
          ))}

        </Grid>
      </Grid>
    </Grid>


  );
}
