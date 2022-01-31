import React, {useEffect} from "react";
import axios from "axios";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import dayjs from "dayjs";
import { Box, Button, LinearProgress } from "@material-ui/core";
import { confirm } from "react-confirm-box";
import { Delete } from "@material-ui/icons";
import Raport from "./Raport";


export default function Traininglist(props) {

    const url = "https://customerrest.herokuapp.com/"
    const [trainings, setTrainings] = React.useState([]);
    const [loaded1, setloaded] = React.useState(false)
    
    //launches getTrainings on start
    useEffect(() =>{
      getTrainings();
    }, [])
    
    // fetches all trainigs with userinformation
    const getTrainings = () => {
      axios.get(url+"/gettrainings")
        .then(response =>{
          setTrainings(response.data)
          setloaded(true);
          })
        .catch(err => console.error(err))
      }

    //Training delete function with confirm
    const deleteTraining = async (id) =>{
    const result = await confirm("Are you sure?");
      if (result) {
        axios.delete(url+"api/trainings/"+id)  
          .then(res => {
            props.setMsg("Training deleted!")
            props.setOpen(true)
            getTrainings()
          })
      }}

    
    // const colums for training table
    // accessor is the "key" in the data!!
    const columns = [
      {
        filterable: false,
        Header: 'Aika', 
        accessor: 'date',
      Cell : (props1)=>{
        //formatting for date columns
        const custom_date = dayjs(props1.value).format('DD.MM.YYYY hh:mm')
        return <span>{custom_date}</span>
      }
      },
      {
        Header: 'Laji',
        accessor: 'activity' // training.activity
      },    
      {
        Header: 'Kesto',
        accessor: 'duration'  // training.duration
      }, 
      {
        Header: 'Etunimi',
        accessor: 'customer.firstname'  // customer.firstname
      }, 
      {
        Header: 'Sukunimi',
        accessor: 'customer.lastname'  // customer.lastname
      },
      {
        accessor: 'customer.lastname',  // customer.lastname
        filterable: false,
        Cell: row => (<Button variant="contained" color="secondary" 
        onClick={() => deleteTraining(row.original.id)}>  <Delete></Delete> </Button> )
      }, 
      ]
    
return (
<>

    {/* Loading bar */}
    {!loaded1 && 
      <Box sx={{ width: '100%' }}>
          <LinearProgress />
      </Box>
    }

    {/* table that displays training data */}
    {loaded1 && 
      <ReactTable filterable={true} defaultPageSize={10} data={trainings} columns={columns} />
    } 

    {/* Visual charts */}
    <Raport userBoolean={false} trainingBoolean={true}></Raport>
    
</>
)
    }