import React from 'react';
import DateFnsUtils from '@date-io/moment';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const MaterialUIPickers = ({ onChange, start}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/DD/YYYY"
          margin="normal"
          id="date-picker-inline"
          disablePast
          value={new Date(start)}
          onChange={date=>onChange(date.format())}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers