import React, {useEffect} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import dayjs from "dayjs";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Button, Container, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";

export default function CustomerPopUp(props) {
    //rows customers link to his/hers trainings
    const url =props.customer.links[2].href
    const [trainings, setTrainings] = React.useState([]);
    const [loaded, setloaded] = React.useState(false)


      const getCustomerTrainigs = () => {
        console.log("getusers")
        axios.get(url)
          .then(response =>{
              setTrainings(response.data.content)
              setloaded(true);
              console.log("user's trainigs: "+response.data.content)
          })
        .catch(err => console.error(err))
      }

//colums to personal training list popup
      const columns = [
        {
            Header: 'Training',
            accessor: 'activity' // accessor is the "key" in the data
        },
        {
          Header: 'Duration',
          accessor: 'duration' // accessor is the "key" in the data
        },    
        {
            filterable: false,
            Header: 'Time',
            accessor: 'date',
             Cell : (propsi)=>{
              //formatting for date columns
              const custom_date = dayjs(propsi.value).format('DD.MM.YYYY hh:mm')
              return <span>{custom_date}</span>
          }
           
          },
    ]

    return (
    <>
    <Popup
    onClose={()=>setloaded(false)}
    modal
    nested
    trigger={ <Button variant="contained" color="primary">Trainings and info </Button>} position="right center">
  
  {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        
        {/* Paper to show personal information */}
    <Paper  style={{
      padding: 10,
      margin: 10,
      border: "1px solid black"
     }}> 
     <Typography variant="overline" display="block" gutterBottom>
        Additional personal information
      </Typography>
        <ListItem>
            <ListItemText primary="Osoite" secondary={props.customer.streetaddress} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Postinro" secondary={props.customer.postcode} />
        </ListItem>
        
    </Paper>
{/* Paper to show all trainings */}
    <Paper  style={{
      padding: 10,
      margin: 10,
      border: "1px solid black"
     }}> 
    <Typography variant="overline" display="block" gutterBottom>
            Personal trainigs
    </Typography>

{ loaded===false &&
    <Button variant="contained" color="secondary" onClick={getCustomerTrainigs}> get Customer Trainigs</Button>
}

            { 
              loaded && 
              <ReactTable filterable={true} defaultPageSize={3} onClose 
              data={trainings} columns={columns} />
            } 
      

     </Paper>
        


      </div>
    )}
  </Popup>
    </>
    )
}