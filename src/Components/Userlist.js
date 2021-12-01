import React, {useEffect} from "react";
import Traininglist from "./Traininglist" 
import axios from "axios";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import CustomerPopUp from "./CustomerPopUp";

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
  
        Cell: row => (<CustomerPopUp customer={row.original} /> )
      }

    ]

    return (

        
        <>
      
        {/* displays usertable with given data and columns */}
        {
          loaded && 
          <ReactTable filterable={true} defaultPageSize={10} 
          data={user} columns={columns} />
        }
         
        </>
    )
}