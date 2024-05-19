import axios from "axios"
import { BaseURL } from "../constants"

const TableCommentsBody = ({ data,setAllComments }) => {
    const handleDeleteComment = async(commentId)=>{
       try {
        const token = document.cookie.split(";")[0].split("=")[1];
        await axios.delete(`${BaseURL}/comment/dashComment/${commentId}`,{headers:{Authorization:token}});
        setAllComments((prev)=>prev.filter(comment=>comment?._id !== commentId))
       } catch (error) {
        console.log(error);
       }
    }
    return (<>
        <tr className="px-3 dark:hover:bg-slate-700 hover:bg-slate-300 transition-all">
            <td className="dark:text-slate-400 text-slate-900 p-2">{new Date(data?.updatedAt).toLocaleDateString()}</td>
            <td className="p-2 capitalize text-sm">
                {data?.content}
            </td>
            <td className="font-semibold p-2">
                {data?.numberOfLikes}
            </td>
            <td className="dark:text-slate-400 text-slate-900 p-2"> 
                    {data?.postId} 
            </td>
            <td className="dark:text-slate-400 text-slate-900 p-2"> 
                    {data?.userId} 
            </td>
            <td className="text-red-600 font-medium cursor-pointer p-2 hover:underline" onClick={()=>handleDeleteComment(data?._id)}>Delete</td>
        </tr>

    </>)
}
export default TableCommentsBody