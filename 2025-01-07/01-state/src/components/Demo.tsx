import './Demo.css'

import { useState ,useEffect } from 'react'

export default function Demo():JSX.Element {

// let time = new Date().toLocaleTimeString()

let [time,setTime] = useState<string>(new Date().toLocaleTimeString())


useEffect(() => {
const intervalId = setInterval(() => {
//   time = new Date().toLocaleTimeString()
setTime(new Date().toLocaleTimeString())
}, 1000)

return () => clearInterval(intervalId)

},[])
return(
    <div className="Demo">
        <h1>Current Time: {time}</h1>
    </div>
)
}