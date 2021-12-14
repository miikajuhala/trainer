import React, {useEffect} from "react";
import axios from "axios";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import CustomerPopUp from "./CustomerPopUp";
import { confirm } from "react-confirm-box";
import { Button, Grid, Paper } from "@material-ui/core";
import AddCustomer from "./AddCustomer";
import CsvFile from "./CsvFile";
import { AiOutlineUserDelete } from 'react-icons/ai';

export default function Userlist() {

const url = "https://customerrest.herokuapp.com/api"
const [user, setUser] = React.useState([]);
const [loaded, setloaded] = React.useState(false)


    useEffect(() => {
        getUsers();
        console.log("ueffect!")
      }, [])

      // fetches all users
    const getUsers = () => {
        console.log("getusers")
        axios.get(url+"/customers")
        .then(response =>{
            setUser(response.data.content)
            console.log("users: "+response.data.content)
          })
        .then(setloaded(true))
        .catch(err => console.error(err))
    }

   const deleteCustomer = async (CustomerUrl) =>{
    const result = await confirm("Are you sure?");
    if (result) {
          axios.delete(CustomerUrl)  
          .then(res => {
            console.log("deleted: "+ res.data)
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
  
        Cell: row => ( <CustomerPopUp getUsers={getUsers} customer={row.original} /> )
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
{loaded &&
<Grid container  align = "center" justifyContent= "center" alignItems = "center">
 
    
     
  {/* displays component to add new customer */}
          {
            loaded&&
            <Paper  elevation={2}>
              <AddCustomer addCustomer={addCustomer} ></AddCustomer>
            </Paper>
          }
      


{/* displays link to download userdata as a csv file */}
        {
          loaded&&
          <Paper elevation={0}>
            <CsvFile customers={user}/>
          </Paper>
          
        }
          
     
 </Grid>}
{/* displays usertable with given data and columns and buttons to make changes */}
        {
          loaded && 
          <ReactTable filterable={true} defaultPageSize={10} 
          data={user} columns={columns} />
        }
         
        </>
    )
}