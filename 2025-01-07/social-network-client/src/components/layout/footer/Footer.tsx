import './Footer.css'

export default function Footer() {
    return (
      <div className="bg-gray-800 text-white text-center py-4">
        <p>Server is {import.meta.env.VITE_REST_SERVER_URL}</p>
      </div>
    );
  }
  