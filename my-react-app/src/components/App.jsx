import React, {useEffect, useState} from "react";
import Head from "./header";
import Input from "./input";
import Footer from "./footer";
import List from "./lists";
import Axios from 'axios';
import "./App.css"

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

function App(){

    const [keeperarray, setkeeperarray] = useState([])

    function add(item){
        //// //////////////////////////// to pass data to the server from the front end ////////////////////////////////
        Axios.post(`${VITE_SERVER_URL}/additem`, item).then((res)=>console.log(res.data))
    }

    ////////////////////// use of useEffect;
    useEffect(()=>{
        Axios.get(`${VITE_SERVER_URL}/getitem`).then((res)=>{
            setkeeperarray(res.data.data)
        })
    },[keeperarray])

    function deleteItem(id){
        console.log(id)
    ////////////////////////////// sending the index of the number to be deleted from the database
        Axios.post(`${VITE_SERVER_URL}/delete`, {index:id}).then((res)=>{
            setkeeperarray(res.data.users)
        })
    }

    return(
        <div className="body">
            <main>
            <Head/>
            <div className="sub-body">
            <Input
            addFunction = {add}
            />
            <div className="list-area">
                {keeperarray.map((list, index)=>{
                    return<List
                    head = {list.heading}
                    content = {list.content}
                    delFunc = {deleteItem}
                    id = {list._id}
                    key = {index}
                    />
                })}
            </div>
            </div>
            </main>
            <Footer/>
        </div>
    )
}

export default App
