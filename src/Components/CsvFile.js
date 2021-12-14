import { Button } from "@material-ui/core";
import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { FaFileDownload } from 'react-icons/fa';

export default function CsvFile(props){
    const [allUsers, setallUsers] = React.useState(props.customers)
    const [loaded, setLoaded] = React.useState(false)
    const [data, setData] = React.useState([])




const mappi = (usrs)=>{
    usrs.map(user => { 
        delete user.links
        delete user.content
        
    })
    console.log(usrs);
    return(
          <div> 
          <CSVLink
          data={usrs} 
          filename={"userfile.csv"}
          className="btn btn-primary">
          <Button color="primary" size="large"><FaFileDownload/></Button>
          </CSVLink>  
          </div>  
        );
}
return(
<>

 
    <div>{mappi(allUsers)}</div>
 

</>
);
}




 
