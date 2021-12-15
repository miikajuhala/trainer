import React, {useEffect} from "react";
import {  Box, Grid, LinearProgress, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import _ from "lodash"
import dayjs from "dayjs";



export default function Raport(props) {
  
    const url = "https://customerrest.herokuapp.com/"
    
    const [data, setData] = React.useState([]);
    const [data1, setData1] = React.useState([]);
    const [data2, setData2] = React.useState([]);
    const dataOpt=[];

    const [loaded, setloaded] = React.useState(false)
    
    //months for statistics (dayjs didnt work consistently)
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];
   

    useEffect(() =>{
        getTrainings();
      }, [])
  
      // fetches all trainigs with userinformation
      const getTrainings = () => {
        axios.get(url+"/gettrainings")
          .then(response =>{

              formatter(response.data)
              console.log(response.data)
              
          })
        .catch(err => console.error(err))
      }

      // function to format data and create arrays for statistic components
  const formatter =(resdata)=> {

        _.forEach(resdata, function(value) {
          dataOpt.push(dayjs(value.date).format("M"))
        });

        
          const trainings = _.groupBy(resdata, 'activity')
          const customerHomes = _.groupBy(resdata, "customer.city")
          const month = _.groupBy(dataOpt)
          
          setData(Object.keys(trainings).map((training) => ({
              key: training,
              time: _.sumBy(trainings[training], 'duration')
          })))
          setData1(Object.keys(customerHomes).map((city) => ({
            key2: city,
            amount: customerHomes[city].length
          })))
          setData2(Object.keys(month).map((m) => ({
          key2: months[m-1],
          amount: month[m].length
          })))

          setloaded(true)
      }

    
// return functio to create and render statistics on demand
const  returnfunction =()=>{
 
    return (
<>

  {
  !loaded && 
  <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>    
  }

<Typography variant="h6" gutterBottom style={{marginTop: 23}}>
      Statistics
</Typography>

<Grid  container align = "center" justifyContent= "center" alignItems = "center" style={{marginBottom: 30}}  >
 
  
  {/* Stats about total time per trainings */}
  {(props.trainingBoolean || props.trainingBoolean===undefined)&&
  <Paper elevation={4} style={{ marginTop: 20}}>
  <Typography variant="overline" display="block" gutterBottom>
  Trainings by combined time       
  </Typography>
        <LineChart
            width={600} height={300}
            data={data}
            margin={{ top: 20, right: 100, left: 0, bottom: 5 }}
            >
            <XAxis dataKey="key"/>
            <YAxis dataKey="time" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="time" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart>  
</Paper>}


{/* PAPER TO DISPLAY CHARTS ON TRAININGS BY MONTH */}
{(props.trainingBoolean || props.trainingBoolean===undefined) &&
<Paper elevation={4} style={{ marginTop: 20, marginLeft: 20, marginRight: 20}}>
<Typography variant="overline" display="block" gutterBottom>
Trainings by month       
</Typography>

        <LineChart
            width={600} height={300}
            data={data2}
            margin={{ top: 20, right: 100, left: 0, bottom: 5 }}
            >
            <XAxis dataKey="key2"/>
            <YAxis dataKey="amount" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="amount" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart>  
</Paper>
}

{/* PAPER TO DISPLAY CHARTS ON USERS CITY */}
{(props.userBoolean || props.userBoolean===undefined) &&
<Paper elevation={4} style={{ marginTop: 20, marginLeft: 20, marginRight: 20}}>
<Typography variant="overline" display="block" gutterBottom>
Customers by cities (with currently booked trainings)       
</Typography>

        <LineChart
            width={600} height={300}
            data={data1}
            margin={{ top: 20, right: 100, left: 0, bottom: 5 }}
            >
            <XAxis dataKey="key2"/>
            <YAxis dataKey="amount" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="amount" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart>  
</Paper>}

{/* PAPER TO DISPLAY CHARTS ON USERS TRAINING */}
{(props.userBoolean) &&
  <Paper elevation={4} style={{ marginTop: 20, marginLeft: 20, marginRight: 20}}>
  <Typography variant="overline" display="block" gutterBottom>
  Trainings by month       
  </Typography>

        <LineChart
            width={600} height={300}
            data={data2}
            margin={{ top: 20, right: 100, left: 0, bottom: 5 }}
            >
            <XAxis dataKey="key2"/>
            <YAxis dataKey="amount" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="amount" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart>  
</Paper>
}

</Grid>
  

 

</>

    );
}


    return (
      // function that calls render function
        <>
        {loaded && <div>{returnfunction()}</div>}
        </>
    );
}