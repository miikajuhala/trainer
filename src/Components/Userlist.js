import React, {useEffect} from "react";
import axios from "axios";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import CustomerPopUp from "./CustomerPopUp";
import { confirm } from "react-confirm-box";
import { Button } from "@material-ui/core";
import AddCustomer from "./AddCustomer";
import CsvFile from "./CsvFile";

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
            setloaded(true);
            console.log("users: "+response.data.content)
        })
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
  
        Cell: row => (<CustomerPopUp getUsers={getUsers} customer={row.original} /> )
      },
      {
        filterable: false,
        sortable: false,
        minWidth: 90,
  
        Cell: row => (<Button variant="contained" color="secondary"  onClick={() => deleteCustomer(row.original.links[0].href)}>Delete customer</Button>)
      }

    ]

    return (

        
        <>
      
        {/* displays usertable with given data and columns */}

 
          {
            loaded&&
            <AddCustomer addCustomer={addCustomer} ></AddCustomer>
          }

          {
            loaded&&
            <CsvFile customers={user}/>
          }

        {
          loaded && 
          <ReactTable filterable={true} defaultPageSize={10} 
          data={user} columns={columns} />
        }
         
        </>
    )
}