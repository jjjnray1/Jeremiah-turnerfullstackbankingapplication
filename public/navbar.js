
function NavBar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <Link to="/" className="navbar-brand" title="BankBank Home Page">Bad Bank</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" >
            <Link to="/CreateAccount" className="nav-link" title="Create an account">Create Account</Link>
          </li>
          <li className="nav-item ">
            <Link to="/login" className="nav-link" title="Enter account details to login">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/deposit" className="nav-link" title="This is where you put money in your account" >Deposit</Link>
          </li>
          <li className="nav-item">
            <Link to="/withdraw" className="nav-link" title="This is where you take money from your account" >Withdraw</Link>
          </li>
          <li className="nav-item">
            <Link to="/alldata" className="nav-link" title="This is where account data is stored" >All Data</Link>
          </li>
        </ul>
        <span className="navbar-text">{props.currentUser ? `Logged in as: ${props.currentUser}` : 'Not logged in'}</span>
        {props.currentUser && <button className="btn btn-link" onClick={props.handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}