import Post from '../../../models/posts/Post'
import profile from '../../../services/Profile.ts'
import './Profile.css'
import { useState,useEffect } from 'react'

const Profile = (): JSX.Element => {
    const [post,setPosts] = useState<Post[]>([])
    
    useEffect(() => {
        profile.getProfile().then(setPosts).catch(alert)
    },[])


    return (
        <div className='Profile'>
            {post.map(({id,title}) => <li key={id}>{title}</li>)}
        </div>
    )
}

export default Profile;