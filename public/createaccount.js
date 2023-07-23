function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  
  
  const [passwordFilled, setPasswordFilled] = React.useState(false);
  
  
 
 


  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }
  
  async function handleCreate() {
    console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  
    if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return;
    const passwordcheck = document.getElementById("password").value;
    if (passwordcheck.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
  
    const userExists = ctx.users.some(user => user.email === email);
    if (userExists) {
      setStatus('Error: An account with that email already exists, please try again');
      setTimeout(() => setStatus(''), 5000);
      return;
    }
  
    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} 
              onChange={e => {setPassword(e.currentTarget.value);
              setPasswordFilled(e.currentTarget.value.length > 0);}}/>
              <br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} 
              disabled={!passwordFilled} >Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light"  onClick={clearForm} >Add another account</button>
              </>
            )}
    />
  )
}