import { Button } from "@material-ui/core";
import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { FaFileDownload } from 'react-icons/fa';

export default function CsvFile(props){

    const [loaded, setLoaded] = React.useState(false)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        console.log(props.data)
      }, [])
    


    return(
         <CSVLink
          data={props.data} 
          filename={"userfile.csv"}
          className="btn btn-primary">
          <Button color="primary" size="large"><FaFileDownload/></Button>
          </CSVLink>   
        
        );

}




 
