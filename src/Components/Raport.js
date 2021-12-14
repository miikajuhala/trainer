import React, {useEffect} from "react";
import axios from "axios";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import _ from "lodash"

export default function Raport() {
    const url = "https://customerrest.herokuapp.com/"
    const [data, setData] = React.useState([]);
    const [loaded, setloaded] = React.useState(false)


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

      const formatter =(resdata)=> {
        const trainings = _.groupBy(resdata, 'activity')
        console.log(trainings);
        //tää oli uus tapa ja tosi hyödyllinen 5/5
        setData(Object.keys(trainings).map((training) => ({
            key: training,
            time: _.sumBy(trainings[training], 'duration')
        })))
        console.log(data)
        setloaded(true)
      }
      
const  returnfunction =()=>{

    return (
        <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
         <XAxis dataKey="key" />
        <YAxis dataKey="time" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="time" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      </LineChart>  

    );
}


    return (
        <>
        {loaded && <div>{returnfunction()}</div>}
        </>
    );
}