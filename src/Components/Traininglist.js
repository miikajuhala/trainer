import React, {useEffect} from "react";
import axios from "axios";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import dayjs from "dayjs";

export default function Traininglist() {

    const url = "https://customerrest.herokuapp.com/"
    const [trainings, setTrainings] = React.useState([]);
    const [loaded1, setloaded] = React.useState(false)
    
    
    
        useEffect(() =>{
          getTrainings();
        }, [])
    
        // fetches all trainigs with userinformation
        const getTrainings = () => {
          axios.get(url+"/gettrainings")
            .then(response =>{
                setTrainings(response.data)
                console.log("trainings: "+response.data)
                setloaded(true);
                
            })
          .catch(err => console.error(err))
        }
    
        // const colums for training table
        const columns = [
          {
            filterable: false,
            Header: 'Aika',
            accessor: 'date',
             Cell : (props)=>{
              //formatting for date columns
              const custom_date = dayjs(props.value).format('DD.MM.YYYY hh:mm')
              return <span>{custom_date}</span>
          }
           
          },
          {
            Header: 'Laji',
            accessor: 'activity' // accessor is the "key" in the data
          },    
          {
            Header: 'Kesto',
            accessor: 'duration'  // accessor is the "key" in the data
          }, 
          {
            Header: 'Etunimi',
            accessor: 'customer.firstname'  // accessor is the "key" in the data
          }, 
          {
            Header: 'Sukunimi',
            accessor: 'customer.lastname'  // accessor is the "key" in the data
          }, 

        ]
    
        return (
    
            
            <>

            {/* table that displays training data */}
            { 
              loaded1 && 
              <ReactTable filterable={true} defaultPageSize={10} 
              data={trainings} columns={columns} />
            } 


            </>
        )
    }