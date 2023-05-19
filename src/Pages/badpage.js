import BadRequest from '../Pages/badRequest.svg';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Badpage() {
    return (
      <div>
        <div class="pt-5">
      <img src={BadRequest} style={{
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%",
}} alt="Bad reques" />
    </div >
    <div className="d-grid mt-3 mb-3">
      <h1>404 - PAGE NOT FOUND</h1>
      <p style={{textAlign:"center"}}>Oops! It seems like you've taken a wrong turn. The page you're looking for cannot be found.<br/>Don't worry, let's navigate you back on track.</p>
     
      <div className="mx-auto mt-3 mb-3"><Button as={NavLink} to="/" class="btn btn-primary">Back to homepage</Button></div>
     
      </div>
      </div>
    );
  }
  
  export default Badpage;