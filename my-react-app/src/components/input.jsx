import React, {useState, useEffect} from "react"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'
import Zoom from '@mui/material/Zoom'
import Axios from "axios"
 
function Input(props){
    const [items, setItems] = useState({heading:"",content:""})
    const[before, setbefore] = useState(false)
    function inputValue(e){
        let value = e.target.value;
        let name = e.target.name;
        
        setItems((prev)=>{
            if(name === "heading"){
                return {
                    heading:value,
                    content:prev.content
                }
            }else if(name==="content"){
                return{
                    heading:prev.heading,
                    content:value
                }
            }
        })

    }

    
 function changeBefore(){
        setbefore(true)
    }

   
    return(
        <div className="big-form">
             <div className="form">
            <textarea name="heading" style={{display:before ? "block":"none", transition:"all .2s ease-out"}} cols="30"  rows="1" placeholder="Title" onChange={inputValue} value={items.heading}></textarea>
            <textarea name="content" cols="30" rows={before? 5:1} placeholder="Content" onChange={inputValue} value = {items.content} onClick={changeBefore}></textarea>
            
        </div>
        <Zoom appear={before?true:false} in = {before?true:false}>
        <Fab size="small" className="add" onClick={()=>{
            props.addFunction(items)
        }} sx={{backgroundColor:"rgba(165, 123, 193, 1)", marginLeft:"auto", my:-2}} ><AddIcon/></Fab></Zoom>
        </div>
       
    )
}

export default Input