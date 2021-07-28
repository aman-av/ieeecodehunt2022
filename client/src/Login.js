import React,{useState,useEffect} from 'react'
import { Container,Button} from 'react-bootstrap'
function Login() {
    
    const [usn, setusn] = useState(null);
   const handler = () =>{
       localStorage.setItem("usn",usn);
       
       console.log(usn);
       const currentdate = new Date();
    var date = [
      currentdate.getHours(),
      currentdate.getMinutes(),
      currentdate.getSeconds(),
    ];
    
    const data = { usn,date };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/1", options);
   }
    useEffect(() => {
       console.log(usn)
        
    }, [usn])
    return (
        <div>
            <form>
                <label>
                    USN:
                    <input type="text" name="usn" value={usn} onChange={e => setusn(e.target.value)}  />
                </label>
            </form>
            
            <Button variant="dark" href="/Quiz" onClick={handler}>Submit</Button>
        </div>
    )
}

export default Login
