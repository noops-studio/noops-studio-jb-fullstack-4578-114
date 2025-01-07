import './Demo.css'



function sayHi() {
    alert('hi')
}

const dogs = [{
    name: 'cheif',
    age: 3
},{
    name: 'noop',
    age: 4
}

]

export default function Demo(): JSX.Element {
  const name = 'Kfir'
  const age = 30
  const isAdult = true
  const grades = [90, 80, 70]
    return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">Demo Component</h2>
              <div className="Demo p-3 bg-light rounded">
                <p>hello {name} </p>
                <p>age: {age}</p>
                <p>isAdult: {isAdult ? 'yes' : 'no'}</p>
                <p>grades: {grades.join(', ')}</p>
                <ul>
                    {grades.map((grade,index)  => (
                        <li key={index}>{grade}</li>
                    ))}
                </ul>
                    <p>dogs:</p>
                    <table className="border">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dogs.map((dog, index) => (
                                <tr key={index}>
                                    <td>{dog.name}</td>
                                    <td>{dog.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                <button onClick={sayHi}>say hai</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}