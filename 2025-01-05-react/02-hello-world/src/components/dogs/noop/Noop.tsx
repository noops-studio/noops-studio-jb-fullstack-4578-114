import './Noop.css'

export default function Noop(): JSX.Element {
    return (
        <div className='Noop'>
            <div>Noop</div>
            <div>Age: 4</div>
            <div>
                <img src="https://cdn.ozari.co.il/beery/noop.jpeg" />
            </div>
        </div>
    )
}