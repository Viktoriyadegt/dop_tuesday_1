import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";


/*
type TodolistsType = { id: string, title: string, filter: FilterValuesType }
type TasksType = {
    [key: string]: TaskType[]
}
*/

type TodolistType = {
    id: string
    title: string
}
type TasksStateType = {
    [key: string]: {
        data: Array<TaskType>
        filter: FilterValuesType
    }
}

function App() {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'}, //0
    //      {id: todolistID2, title: 'What to buy', filter: 'all'},  //1
    // ])
    //
    // let [tasks, setTasks] = useState({
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists((prevState) => (prevState.filter(el => el.id !== todolistId)))
        delete tasks[todolistId]
        console.log(tasks)
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: {...prevState[todolistId], data: prevState[todolistId].data.filter(el => el.id !== taskId)}
        }))
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: {...prevState[todolistId], data: [newTask, ...prevState[todolistId].data]}
        }))
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        setTasks((prevState) => ({
            ...prevState,
            [todolistId]: {
                ...prevState[todolistId],
                data: prevState[todolistId].data.map(m => m.id === taskId ? {...m, isDone: newIsDone} : m)
            }
        }))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTasks((prevState) => ({...prevState, [todolistId]: {...prevState[todolistId], filter: value}}))
    }

    return (
        <div className="App">

            {todolists.map((el) => {

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasks[el.id].data}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
