import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";
import dayjs from "dayjs";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Button, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import { confirm } from "react-confirm-box";
import Addtraining from "./Addtraining";
import EditCustomer from "./EditCustomer";
import { BsFillPersonLinesFill } from 'react-icons/bs';


export default function CustomerPopUp(props) {
   
const [trainings, setTrainings] = React.useState([]);
const [loaded, setloaded] = React.useState(false)

    
// function to get customers trainings
const getCustomerTrainigs = () => {
  axios.get(props.customer.links[2].href)
    .then(response =>{
      setTrainings(response.data.content)
      setloaded(true);
      console.log("user's trainigs: "+response.data.content)
    })
    .catch(err => console.error(err))
} 

//function to delete selected training from customer
const deleteTraining = async (url2) =>{
const result = await confirm("Are you sure?");
  if (result) {
    axios.delete(url2)  
    .then(res => {
      console.log("deleted: "+ res.data)
      props.setMsg("Training deleted!")
      props.setOpen(true)
      getCustomerTrainigs()
    })
  }
}

// function to add new training to a customer
const addTraining = (newTraining) =>{
  let newDate = dayjs(newTraining.date)
  const time = newTraining.time.split(":")
  newDate = newDate.hour(time[0])
  newDate = newDate.minute(time[1])

  axios.post("https://customerrest.herokuapp.com/api/trainings", {
    date: newDate.toISOString(),
    activity: newTraining.activity,
    duration: newTraining.duration,
    customer: props.customer.links[0].href
  })
  .then(res => {
    props.setMsg("Training added!")
    props.setOpen(true)
    getCustomerTrainigs()
    console.log(res.data)
  })
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
  if(propsi.value===undefined){
    return null
  }else{
    console.log(propsi.value)
    const custom_date = dayjs(propsi.value).format('DD.MM.YYYY hh:mm')
    return <span>{custom_date}</span>
  }
}
},
{
  filterable: false,
  sortable: false,
  //Button to delete this training
  Cell: row => (  <Button variant="contained" color="secondary" onClick={() => deleteTraining(row.original.links[0].href)}> delete</Button> )
}
]

return (
<>
<Popup
onClose={()=>setloaded(false)}
modal
nested
trigger={ <Button variant="contained" color="primary"><BsFillPersonLinesFill></BsFillPersonLinesFill> </Button>} position="right center">

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
        <ListItemText primary="Name" secondary={props.customer.firstname +" "+props.customer.lastname } />
    </ListItem>
    <ListItem>
        <ListItemText primary="Address" secondary={props.customer.streetaddress} />
    </ListItem>
    <ListItem>
        <ListItemText primary="Post code" secondary={props.customer.postcode} />
    </ListItem>
    
    {/* customer editing component */}
    <EditCustomer update={props.getUsers} customer={props.customer} setOpen={props.setOpen} setMsg={props.setMsg}></EditCustomer>
    

</Paper>

{/* Paper to show all trainings */}
<Paper  style={{
padding: 10,
margin: 10,
border: "1px solid black"
}}> 

  <Typography variant="overline" display="block" gutterBottom>
    Personal trainings
  </Typography>

  {/* get all trainings */}
  {loaded===false &&
    <Button variant="contained" color="secondary" onClick={getCustomerTrainigs}> get Customer Trainings</Button>
  }

  {/* add new training(s) */}
  {loaded &&
    <Addtraining addTraining={addTraining} getCustomerTrainigs={getCustomerTrainigs}> </Addtraining>
  }

  {/* table to show all trainings of a current customer */}
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