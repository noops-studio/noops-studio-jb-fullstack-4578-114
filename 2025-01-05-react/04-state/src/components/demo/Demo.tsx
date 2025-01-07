import { useState, useEffect } from 'react';
import './Demo.css';

export default function Demo() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            console.log('Time:', time);
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="Demo-timer">
            <span>Time:</span><span className='Demo-timer-font'>{time}</span> 
        </div>
    );
}