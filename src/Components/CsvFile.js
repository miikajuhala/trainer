import { Button } from "@material-ui/core";
import React from "react";
import { CSVLink} from "react-csv";
import { FaFileDownload } from 'react-icons/fa';

export default function CsvFile(props){

  


    return(
         <CSVLink
          data={props.data} 
          filename={"userfile.csv"}
          className="btn btn-primary">
          <Button color="primary" size="large"><FaFileDownload/></Button>
          </CSVLink>   
        
        );

}




 
