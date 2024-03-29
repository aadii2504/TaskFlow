import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([ ])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString  =  localStorage.getItem("todos")
    if(todoString) {

      let  todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLs = (params) => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  
const toggleFinished = (e) => {
  setshowFinished(!showFinished)
}


 
  const handleEdit = (e ,id)=> {
    let t  = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos  = todos.filter(item=> {
      return item.id!== id
    });
    setTodos(newTodos)
    saveToLs()
  }


  const handleDelete = (e ,id)=> {
    let newTodos  = todos.filter(item=> {
      return item.id!== id
    })
    setTodos(newTodos)
    saveToLs()

  }


  const handleAdd = ()=> {
    setTodos([...todos, {id:uuidv4() , todo, isCompleted: false}])
    setTodo("")
    saveToLs()

  }


  const handleChange = (e)=> {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e)=> {
    let id  = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })

    let newTodos  = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()


  }
  

  return (
    <>
    <Navbar/>
      <div className="container mx-auto rounded-lg my-5 bg-violet-100 p-5 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2 rounded-lg'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-500 hover:bg-violet-800 disabled:bg-violet-900 hover:text-opacity-45 p-5 py-1 text-sm font-bold text-black rounded-md mx-6'>Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished Tasks
          <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-semibold text-2xl'> No Todos To Display :(</div>}
          {todos.map(item=>{

         
          return <div key={item.id} className="todo flex my-3 w-1/4 justify-between ">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
                <div className="buttons flex h-full">
                  <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-500 hover:bg-violet-800 hover:text-opacity-45 p-5 py-1 text-sm font-bold text-black rounded-md mx-1'>Edit</button>
                  <button onClick={(e)=>{handleDelete(e ,item.id)}} className='bg-violet-500 hover:bg-violet-800 hover:text-opacity-45 p-5 py-1 text-sm font-bold text-black rounded-md mx-1'>Delete</button>
                </div>
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
