import React, {useEffect} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import {Button, Paper, TextField } from "@material-ui/core";
import { confirm } from "react-confirm-box";


export default function Addtraining(props) {

    //rows customers link to his/hers trainings
    const [newTraining, setNewTrainings] = React.useState({date: Date, duration: '', activity: '', time: ""});
    const [loaded, setloaded] = React.useState(false)

    const inputChanged = (event) => {
        setNewTrainings({...newTraining, [event.target.name]: event.target.value});
      }

      const handleClose = () => {
        console.log(newTraining.time)
        props.addTraining(newTraining);

        // tähän viel et closaa
      }

      function SubmitButton(){
        if (newTraining.activity && newTraining.date && newTraining.duration && newTraining.time){
          return  (
             <Button onClick={handleClose} color="primary">Save</Button>)
        } else {
          return   (
          <Button onClick={handleClose} disabled color="primary">Save</Button>)
        }
      }



    return (
    <>

      

    <Popup
    onClose={()=>setloaded(false)}
    modal
    nested
    trigger={ <Button variant="contained" color="primary">Add new training</Button>} position="right center">
  
  {close => (
    <div className="modal">
    <button className="close" onClick={close}>
      &times;
    </button>
        
  {/* Paper to show personal information */}
  <Paper  style={{
    padding: 10,
    margin: 10,
    border: "1px solid blue"
    }}> 
      <TextField
            autoFocus
            margin="dense"
            id="activity"
            name="activity"
            value={newTraining.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={newTraining.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
         
      
  
          <TextField
            margin="dense"
            id="date"
            name="date"
            type="date"
            value={newTraining.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            id="time"
            name="time"
            type="time"
            value={newTraining.time}
            onChange={inputChanged}
            fullWidth
          />

          
        <Button onClick={close} color="primary">
            Cancel
        </Button>
        {/* submit button that checks all fields are filled */}
      <SubmitButton></SubmitButton>

  
  </Paper>


        


      </div>
    )}
  </Popup>
    </>
    )
}