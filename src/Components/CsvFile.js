import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
 

export default function CsvFile(props){
    const [allUsers, setallUsers] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [data, setData] = React.useState([])


   React.useEffect(() => {
       console.log("!!")
    setallUsers(props.customers)

    
    
    }, []) 

// const mappi = (usrs)=>{
//     usrs.map(user => { 
//         delete user.links
//         delete user.content
//         setData(user);
//     });
    
// }
return(
<>

 <CSVLink
data={allUsers} 
filename={"userfile.csv"}
className="btn btn-primary">
Download userdata
</CSVLink> 

</>
);
}




 
