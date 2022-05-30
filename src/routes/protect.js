const protect=()=>
{   const token=localStorage.getItem('token');
    if(token==="admin")
    return true
    else    
    return false
}
export default protect;
