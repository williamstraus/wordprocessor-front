import React, { useState, useEffect } from 'react';
import './index.css';
import InputFields from './InputFields';
import Result from './Results';
import {Api} from './services/Api'
import {IState} from './domain/IState'


const InitialState : IState = {
  id: "",
  data: {},
  submitCounter: 0,
  file: null,
  errorMessage: "",
  showFileSubmitButton: false,
  showIdSubmitButton: false
}



const App = () => {
  const [state, setState] = useState(InitialState);

  //-----------------------------------------------------------------------------------------------------
  //handlers
  const uploadHandler = (target: EventTarget & HTMLInputElement) => {

    const t1 = target as HTMLInputElement;

    if (checkThatFileIsText(target.files![0])) {
      if (checkThatFileSizeIsNotOver100MB(target.files![0])) {
        setState({ ...state, file: target.files![0], showFileSubmitButton: true, errorMessage: "" });
      }
      else {
        setState({ ...state, errorMessage: "File size can not exceed 100MB! Please try again." });
      }
    }
    else {
      setState({ ...state, errorMessage: "You can only upload .txt files! Please try again." });
    }

  }

  const idHandler = (target: EventTarget & HTMLInputElement) => {

    if (checkIfValidUuid(target.value)) {
      setState({ ...state, [target.name]: target.value, showIdSubmitButton: true });
    }
    else {
      setState({ ...state, [target.name]: target.value, showIdSubmitButton: false });
    }

  }

 

  const get = async () => {
    setState({ ...state, errorMessage: "" });
    const result = await Api.get(state.id!);
    setState({ ...state, data: result.data});
    if (result.statusCode < 200 || result.statusCode >= 300) {
      setState({ ...state, errorMessage: "Something went wrong. Please try again in a few seconds (push the button under the ID box)."});
    }
  }

  const submit = async () => {
    setState({ ...state, errorMessage: "" });
    try {
      const fileAsString = await fileToString(state.file!);
      if (!checkThatFileNotEmpty(fileAsString as string)) {
        setState({ ...state, errorMessage: "Your file is empty! Please submit another file."});
      }
      else {
        const response = await Api.create({text: fileAsString as string});
        if (response.statusCode < 200 || response.statusCode >= 300) {
          setState({ ...state, errorMessage: "Something went wrong. Please try again in a few seconds (press submit)."});
        }
        else {
          const data = response.data?.toString();
          setState({ ...state, id: data, submitCounter: state.submitCounter + 1, showIdSubmitButton: true});
        }
      }
    }
    catch (e: any) {
      console.warn(e.message)
      setState({ ...state, errorMessage: e.message});
    }  
  }

  //-----------------------------------------------------------------------------------------------------
  //file conversion
  const fileToString = (file: File): Promise<string | null | ArrayBuffer> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsText(file,  "UTF-8");
    });

  }

  //-----------------------------------------------------------------------------------------------------
  //if file has been submitted, get the result

  useEffect(() => {
    if(state.submitCounter > 0) {
      get();
    }
    }, [state.submitCounter]); 



  //-----------------------------------------------------------------------------------------------------
  //validation

  const checkIfValidUuid = (id: string): boolean => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const str = id;
    return regexExp.test(str);
  }
 
  const checkThatFileNotEmpty = (fileAsString: string): boolean => {
    return fileAsString.trim().length > 0;
  }

  const checkThatFileIsText = (file: File): boolean => {
    if (file.type.match("text/*")) {
      return true;
    }
    return false;
  } 

  const checkThatFileSizeIsNotOver100MB = (file: File): boolean => {
    if (file.size <= 1048576) {
      return true;
    }
    return false;
  } 

  


  return (
  <>
    <h1>
      Welcome to my word counter!
      You have two options: 
    </h1>
    <h2 className="error-message">
      {state.errorMessage}
    </h2>
    <br></br>
    <br></br>
    <br></br>
    <InputFields data={state} uploadHandler={uploadHandler} idHandler={idHandler} submit={submit} get={get} />
    {Object.keys(state.data!).length > 0 &&
    <Result data={state.data as {count: Object}}  />
    }
  </>
  );

}


export default App;
