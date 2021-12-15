
import React,{useEffect} from "react";
import axios from "axios";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { formatMs } from "@material-ui/core";
import { render } from "@testing-library/react";
import Addtraining from "./Addtraining";
import moment from "moment";

export default function Calendar() {

    
    const [loaded, setloaded] = React.useState(false);
    var data=[];
    const url = "https://customerrest.herokuapp.com/"
    const [trainings, setTrainings] = React.useState([]);
    const [open, setOpen]= React.useState([]);

    useEffect(() =>{
        getTrainings();

      }, [])
  
      // fetches all trainigs with userinformation
    const getTrainings = () => {
    axios.get(url+"/gettrainings")
          .then(response =>{
              setTrainings(response.data)
              console.log(response.data)
              
              
          }).then(()=>{
            if(trainings!==null){
              setloaded(true)
            }
            else getTrainings();
            
            })
        .catch(err => console.error(err))
      }

      //function to format data in a format directyl suitable to calendar component
      //TODO: calendar crashes if someone has pushed broken data, training without customer for example.
      const formatter = ()=>{

           console.log("fdf")
            trainings.forEach(training => {
            data.push({title: training.activity +" ("+ training.customer.firstname +" "+training.customer.lastname+" "+ training.duration+" Min)",
             start: dayjs(training.date).format('YYYY-MM-DD hh:mm'), end: dayjs(moment(training.date).add(training.duration, "minutes")).format('YYYY-MM-DD hh:mm') })
        })



      console.log(data)
    
return(

<FullCalendar

headerToolbar={{
  center: 'dayGridMonth,timeGridWeek,timeGridDay',
}}
  plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin]}
  eventClick={handleDateClick}
  initialView="dayGridMonth"
  weekends={true}
  events={data}    
  />
        
);
      

}

    const handleDateClick = (arg) => { // bind with an arrow function
        alert(
              arg.event.title+" "+
              dayjs(arg.event.start).format('hh:mm') + "-" +
              dayjs(arg.event.end).format('hh:mm')
          )
      }
    

    return (
    <>


      {loaded &&
      <div>{formatter()}</div>
      }

     


  </>

    
    )
}