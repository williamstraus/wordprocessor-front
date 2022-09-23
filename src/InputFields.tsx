import React from 'react';
import './index.css';
import { IInputProps } from './domain/IInputProps';


const InputFields = (props: IInputProps) =>
  <form>
      <br></br>
      <br></br>
      <br></br>
    <div className="row">
      <div className="column">
        <div className="form-group">
          <label htmlFor="fileUpload">Upload file here:</label>
          <br></br>
          <br></br>
          <input id="fileUpload" name="fileUpload" type="file" className="form-control" onChange={(e) => props.uploadHandler(e.target)} />
        </div>
        <br></br>
        {props.data.showFileSubmitButton &&
        <button onClick={(e) => {e.preventDefault(); props.submit()}}>Submit</button>
        }
      </div>
      <div className="column">
        <div className="form-group">
          <label htmlFor="id">Enter the ID of a previous submission:</label>
          <br></br>
          <br></br>
          <input id="id" name="id" type="text" className="form-control" value={props.data.id} onChange={(e) => props.idHandler(e.target)} />
        </div>
        <br></br>
        {props.data.showIdSubmitButton &&
        <button onClick={(e) => {e.preventDefault(); props.get()}}>Submit</button>
        }
      </div>
    </div> 
  </form>;


export default InputFields;
