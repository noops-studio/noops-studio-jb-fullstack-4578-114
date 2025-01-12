import Folowers from '../folowers/Folowers'
import Followings from '../following/Following'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'

export default function Layout() {
    return (
        <div className='Layout'>
            <header>
                <Header />                
            </header>                
            <aside>
                <Followings />
            </aside>
            <aside>
                <Folowers />
            </aside>
            <main>
                <Routing/>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}