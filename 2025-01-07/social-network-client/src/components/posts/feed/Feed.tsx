import { useEffect, useState } from 'react'
import PostModel from '../../../models/posts/Post'
import feed from '../../../services/Feed'
import './Feed.css'

export default function Feed() {
    const [posts, setPosts] = useState<PostModel[]>([])

    useEffect(() => {
        feed.getFeed()
            .then(setPosts)
            .catch(alert)
    }, [])

    return (
        <div className="feed-container bg-gray-50 min-h-screen py-10">
            <div className="max-w-4xl mx-auto mt-5 px-4">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Feed</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map(({ id, title, body }) => (
                        <div key={id} className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
                            <div className="text-sm text-gray-600">
                                <div className="prose" dangerouslySetInnerHTML={{ __html: body }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
