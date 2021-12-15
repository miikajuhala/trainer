import React, {useEffect} from "react";
import axios from "axios";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import CustomerPopUp from "./CustomerPopUp";
import { confirm } from "react-confirm-box";
import { Box, Button, Grid, LinearProgress, Paper } from "@material-ui/core";
import AddCustomer from "./AddCustomer";
import CsvFile from "./CsvFile";
import { AiOutlineUserDelete } from 'react-icons/ai';
import Raport from "./Raport";



export default function Userlist(props) {

const url = "https://customerrest.herokuapp.com/api"
const [user, setUser] = React.useState([]);
const [loaded, setloaded] = React.useState(false)


    useEffect(() => {
        getUsers();
        console.log("ueffect!")
      }, [])

      // fetches all users
    const getUsers = () => {
        setloaded(false)
        axios.get(url+"/customers")
        .then(response =>{
            setUser(response.data.content)
            console.log(response.data.content)
          })
        .then(setloaded(true))
        .catch(err => console.error(err))
    }

   const deleteCustomer = async (CustomerUrl) =>{
    const result = await confirm("Are you sure?");
    if (result) {
          axios.delete(CustomerUrl)  
          .then(res => {
            props.setMsg("User deleted!")
            props.setOpen(true);
            getUsers();
          })
          
        } 
        console.log("You click No!");
      }

      const addCustomer=(customer)=>{
        axios.post(url+"/customers",{
            firstname: customer.firstname,
            lastname:customer.lastname ,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
            email: customer.email,
            phone: customer.email,    
      })
      .then(res=>{
        props.setMsg("User Added!")
        props.setOpen(true)
        console.log(res)
        getUsers();
      })
    }


    // consts for user table
    const columns = [
      {
        Header: 'Etunimi',
        accessor: 'firstname' // accessor is the "key" in the data
      },
      {
        Header: 'Sukunimi',
        accessor: 'lastname' // accessor is the "key" in the data
      },    
      {
        Header: 'Puh',
        accessor: 'phone'  // accessor is the "key" in the data
      }, 
      {
        Header: 'Email',
        accessor: 'email'  // accessor is the "key" in the data
      },    
      {
        Header: 'Kaupunki',
        accessor: 'city'  // accessor is the "key" in the data
      },
      {
        filterable: false,
        sortable: false,
        minWidth: 90,
  
        Cell: row => ( <CustomerPopUp getUsers={getUsers} customer={row.original} setMsg={props.setMsg} setOpen={props.setOpen}  /> )
      },
      {
        filterable: false,
        sortable: false,
        minWidth: 90,
  
        Cell: row => (<Button variant="contained" color="secondary"  onClick={() => deleteCustomer(row.original.links[0].href)}><AiOutlineUserDelete></AiOutlineUserDelete></Button>)
      }

    ]

    return (

        
        <>
      
        

 
 {/* grid to cemter stuff horizontally */}

<Grid container  align = "center" justifyContent= "center" alignItems = "center" >
 
{/* loading feature */}
    {
    !loaded && 
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    }
     
  {/* displays component to add new customer */}
          {
            loaded&&
            <Paper  style={{marginTop: 10, marginBottom:10}} elevation={2}>
              <AddCustomer addCustomer={addCustomer} getUsers={getUsers}  ></AddCustomer>
            </Paper>
          }
      


{/* displays link to download userdata as a csv file */}
        {
          loaded &&
          <CsvFile data={user}/>
        }
          
       
 </Grid>
{/* displays usertable with given data and columns and buttons to make changes */}
        {
          loaded && 
          <ReactTable filterable={true} defaultPageSize={10} 
          data={user} columns={columns} />
        }
        {
        loaded && 
        <Raport userBoolean={true} trainingBoolean={false}></Raport>
        }
       
        </>
    )
}