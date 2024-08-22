import employees from './database';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([])

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [age, setAge] = useState('')
  const [salary, setSalary] = useState('')
  const [isupdate, setIsupdate] = useState(false)

  useEffect(() => {
    setData(employees)
  }, []);

  const addbtn = (e) => {
    e.preventDefault()
    const dt = [...data]
    const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
    const newobj = {
      id: newId,
      name: name,
      position: position,
      age: age,
      salary: salary
    }
    dt.push(newobj)
    setData(dt)
    setId("")
    setName("")
    setPosition("")
    setAge("")
    setSalary("")

  }

  const updatebtn = () => {
    const index = data.map((i) => {
      return i.id
    }).indexOf(id);

    const dt = [...data]
    dt[index].id = id
    dt[index].name = name
    dt[index].position = position
    dt[index].age = age
    dt[index].salary = salary
    setData(dt)
    clrbtn()
  }

  const clrbtn = () => {
    setId("")
    setName("")
    setPosition("")
    setAge("")
    setSalary("")
    setIsupdate(false)
  }


  const editbtn = (id) => {
    const dt = data.filter((i) => i.id == id)
    if (dt != undefined) {
      setId(id)
      setName(dt[0].name)
      setPosition(dt[0].position)
      setAge(dt[0].age)
      setSalary(dt[0].salary)
      setIsupdate(true)
    }
  }

  const dltbtn = (id) => {
    alert(`are you sure for delete ${id} `)
    if (id > 0) {
      const dlt = data.filter((i) => i.id !== id)
      setData(dlt);
    }

  }

  return (
    <>
      <div className='App'>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>

          <label htmlFor="name">Name
            <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
          </label>
          <label htmlFor="Position">Position
            <input type="text" id='Position' value={position} onChange={(e) => { setPosition(e.target.value) }} />
          </label>
          <label htmlFor="Age">Age
            <input type="number" id='Age' value={age} onChange={(e) => { setAge(e.target.value) }} />
          </label>
          <label htmlFor="Salary">Salary
            <input type="number" id='Salary' value={salary} onChange={(e) => { setSalary(e.target.value) }} />
          </label>

          {
            !isupdate ? <button className='btn btn-success' onClick={(e) => { addbtn(e) }}>Add</button>
              : <button className='btn btn-success' onClick={updatebtn}>Update</button>
          }
          <button className='btn btn-dark' onClick={clrbtn}>Clear</button>


        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <td><b>Sr No.</b></td>
              <td><b>Id</b></td>
              <td><b>Name</b></td>
              <td><b>Position</b></td>
              <td><b>Age</b></td>
              <td><b>Salary Per/Month</b></td>
              <td><b>Action</b></td>
            </tr>
          </thead>
          <tbody className='shadow p-3 mb-5 bg-body-tertiary rounded'>
            {
              data.map((item, index) => {
                return (

                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.position}</td>
                    <td>{item.age}</td>
                    <td>{item.salary}</td>
                    <td >
                      <button className='btn btn-primary' onClick={() => { editbtn(item.id) }}>edit</button>
                      <button className='btn btn-danger' onClick={() => { dltbtn(item.id) }}>delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </table>
      </div>
    </>
  );
}

export default App;
