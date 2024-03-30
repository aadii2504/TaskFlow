import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
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
 
      <div className=" shadow-2xl  border border-opacity-95 border-white mx-3 md:container md:mx-auto rounded-xl my-5 bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>TaskFlow -  Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='rounded-lg w-full px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-500 hover:bg-violet-800 mx-2 disabled:bg-violet-900 hover:text-opacity-45 p-5 py-1 text-sm font-bold text-black rounded-md cursor-pointer'>Add</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className='mx-2' htmlFor="show">Show Finished Tasks</label>
        <div className='h-[1px] bg-black  opacity-15'></div>
          <h2 className='text-2xl font-bold my-4'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-semibold text-2xl'> No Todos To Display :(</div>}
          {todos.map(item=>{

         
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3  justify-between ">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
                <div className="buttons flex h-full">
                  <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-500 hover:bg-violet-800 hover:text-opacity-45 p-5 py-1 text-sm font-bold text-black rounded-md mx-1'><CiEdit /></button>
                  <button onClick={(e)=>{handleDelete(e ,item.id)}} className='bg-violet-500 hover:bg-violet-800 hover:text-opacity-45 p-5 py-1 text-sm font-bold text-black rounded-md mx-1'><MdDeleteSweep /></button>
                </div>
          </div>
           })}
        </div>
      </div>
    </>
  )
}

export default App
