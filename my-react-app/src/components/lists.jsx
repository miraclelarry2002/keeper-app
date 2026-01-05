import Fab from '@mui/material/Fab';
import DeleteIcon from "@mui/icons-material/Delete"

function List(props){

    return(
        <div className="item">
            <h4>{props.head}</h4>
            <p>{props.content}</p>
            <div className="del-btn" id = {props.id} onClick={()=>{
                props.delFunc(props.id)
            }}><DeleteIcon sx={{color:"rgb(75, 35, 101)", ":hover":{color:"rgba(145, 95, 179, 1)"}}}/></div>
        </div>
    )
}

export default List