import {useState,useEffect} from 'react';
import './Folowers.css';
import Followers from './FolowersUi';
import followerService from '../../../services/FollowersService.ts'
import User from '../../../models/users/Users.ts';
export default function Folowers(): JSX.Element {
  // const followerNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];


const [follower,setFolowers] = useState<User[]>([])  

useEffect(()=>{
  followerService.getFollowers().then(setFolowers).catch(alert)
},[])
console.log(follower)
// now we will map the follower to get the names as a array of names
const followerNames = follower.map(({name}) => name)
  return (
    <div className='Folowers' >
      <h1>followers list</h1>
      <Followers names={followerNames} />
    </div>
  );
}
