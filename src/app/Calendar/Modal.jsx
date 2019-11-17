import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import  MaterialUIPickers  from './TimePicker';

const Modal = ({
  start,
  end,
  openEvent, 
  handleClose, 
  title, 
  setTitle,
  description, 
  setDescription, 
  deleteEvent, 
  updateEvent, 
  handleStartTime,
  handleEndTime,
  setNewEvent,
  openSlot
  }) => {

  const changeTime = (time, name )=> {
    const [hours, minutes] = time.split(':');
    console.log("change time", moment(start).set({ hours, minutes }).format())
    name === 'start' 
    ? handleStartTime(moment(start).set({ hours, minutes }).format())
    : handleEndTime(moment(start).set({ hours, minutes }).format())
  }
  return (
    <form >
      <StyledDialog
        open={openEvent || openSlot || false} 
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <StyledContent>
          <div>
            <TextField
              id="standard-basic"
              onChange={e => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
              margin="normal"
              value={title}
            />
          </div>
          <div>
            <MaterialUIPickers 
              onChange={handleStartTime}
              start={start}
            />
          </div>
          <span>event time</span>
          <div style={{width: '100%', display: "flex"}}>
            <StyledTextField
              type="time"
              name="start"
              defaultValue={moment().format("HH:mm")}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              onChange={(e)=> changeTime(e.target.value, e.target.name)}
            />
            <StyledTextField
              type="time"
              name="end"
              defaultValue={moment(end).format("HH:mm")}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              onChange={(e)=> changeTime(e.target.value, e.target.name)}
            />
          </div>
          <div>
            <TextField
              margin="normal"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <DialogActions>
            <Button 
              onClick={(e) => {
                openEvent ? deleteEvent(e) : handleClose()
                handleClose();
              }} 
              color="primary"
            >
              {openEvent ? "Discard" : "Cancel"}
            </Button>
            <Button 
              onClick={()=> {
                openEvent ? updateEvent() : setNewEvent(); 
                handleClose();
              }} 
              color="primary"
              disabled={!title || !description || description.length>36}
            >
              {openEvent ? "Edit" : "Save"}
            </Button>
          </DialogActions>
        </StyledContent>
      </StyledDialog>
    </form>
  )
}

export default Modal;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    width: 230px;
    height: 280px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 18px #00000029;
    border: 1px solid #43425D;
    border-radius: 10px;
  };
  .MuiFormControl-marginNormal {
    margin-top: 10px;
  }
`;

const StyledContent = styled(DialogContent)`
  .MuiDialogContent-root {
    padding-top: 0;
  }
`;

const StyledTextField = styled(TextField)`
  & input::-webkit-clear-button, 
  & input::-webkit-outer-spin-button, 
  & input::-webkit-inner-spin-button": {
    display: "none"
}
`;