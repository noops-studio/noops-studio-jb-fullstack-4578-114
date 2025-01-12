import Post from '../../../models/posts/Post'
import feed from '../../../services/Feed'
import './Feed.css'
import { useState,useEffect } from 'react'

const Feed = (): JSX.Element => {
    const [post,setPosts] = useState<Post[]>([])
    
    useEffect(() => {
        feed.getFeed().then(setPosts).catch(alert)
    },[])


    return (
        <div className='Feed'>
            {post.map(({id,title}) => <li key={id}>{title}</li>)}
        </div>
    )
}

export default Feed;