
function Login(){
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');
  const [email, setEmail]     = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    console.log(email,password);
    if (!validate(email, 'email'))    return;
    if (!validate(password, 'password')) return;
    let emailIndex = ctx.users.findIndex(x => x.email === email);
    if (emailIndex === -1) {
      setStatus('Error: Email Address not found');
      setTimeout(() => setStatus(''),3000);
      return;
    }
    let passwordIndex = ctx.users.findIndex(x => x.password === password);
    if (passwordIndex === -1) {
      setStatus('Error: Incorrect password');
      setTimeout(() => setStatus(''),3000);
      return;
    }
    
    
    setShow(false);
  }    

  function clearForm(){
    setEmail('');
    setPassword('');
    setShow(true);
  }
  function fieldCheck() {
    const inputField = document.getElementById("password");
    if (!inputField || inputField.value === "") {
      return true;
    } else {
      return false;
    }
  }
  
  return (
    <div>
      
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={show ? (  
          <>
            Email address<br/>
            <input 
            type="input" 
            className="form-control" 
            id="email" 
            placeholder="Enter email" 
            value={email}
             onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password
            <br/>
            
            <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.currentTarget.value)}/><br/>
            
            <button 
            type="submit"  
            disabled={fieldCheck()} 
            className="btn btn-light" 
            onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <h5>Login successful!</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Log in to another account</button>
          </>
        )}
      />
    </div>
  )
}
