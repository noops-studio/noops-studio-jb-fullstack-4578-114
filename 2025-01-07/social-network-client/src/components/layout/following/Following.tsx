import { useEffect, useState } from 'react';
import './Following.css';
import Following from './FollowingUi';
import User from '../../../models/users/Users';
import followingsService from '../../../services/Following.ts';


export default function Followings(): JSX.Element {
  // const followingsNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];


const [followings,setFollowings] = useState<User[]>([])  

useEffect(() => {
  followingsService.getFollowing()
    .then(setFollowings)
    .catch(error => alert(error.message));
}, []);
const followingsNames = followings.map(({ name }) => name);

  return (
    <div className='Folowers' >
      <h1>followings list</h1>
      <Following names={followingsNames} />
    </div>
  );
}