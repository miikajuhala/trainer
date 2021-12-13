
import React,{useEffect} from "react";
import axios from "axios";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { formatMs } from "@material-ui/core";
import { render } from "@testing-library/react";

export default function Calendar() {

    
    const [loaded, setloaded] = React.useState(false);
    var data=[];
    const url = "https://customerrest.herokuapp.com/"
    const [trainings, setTrainings] = React.useState([]);

    useEffect(() =>{
        getTrainings();

      }, [])
  
      // fetches all trainigs with userinformation
    const getTrainings = () => {
    axios.get(url+"/gettrainings")
          .then(response =>{
              setTrainings(response.data)
              console.log("trainings: "+response.data)
              
              
          }).then(setloaded(true))
        .catch(err => console.error(err))
      }

      //function to format data in a format directyl suitable to calendar component
      const formatter = ()=>{

           console.log("fdf")
            trainings.forEach(training => {
            data.push({title: training.activity +" ("+ training.customer.firstname +" "+training.customer.lastname+")", date: dayjs(training.date).format('YYYY-MM-DD hh:mm') })
        })
      console.log(data)
    
return(

<FullCalendar
  plugins={[ dayGridPlugin, interactionPlugin]}
  dateClick={handleDateClick}
  initialView="dayGridMonth"
  weekends={true}
  events={data}    
  />
        
);
      

}

    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
      }
    

    return (
    <>


      {loaded &&
      <div>{formatter()}</div>
      }
  </>

    
    )
}