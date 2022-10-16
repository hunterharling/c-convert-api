import "./App.css";
import Uploader from "./Uploader";
// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter";
// @ts-ignore
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function App() {
  const str = `
  import axios from "axios";
  const uploadFile = () => {
    // Desired output file type (jpg or png)
    let fileType = "jpg";

    // API URL
    let url = "/upload_endpoint?filetype="+fileType;
    let fileName = "myfile.heic";

    // Get file from HTML
    let file = document.getElemetById("upload").files[0];

    form.append("file", file, fileName);

    if (file && fileType) {
      axios.post(url, form).then((res) => {
        // URL of converted file ex: "https://__domain__/uploads/123847.jpg" where __domain__ = domain name
        console.log(res.data);
      });
    }
  };
  `;

  // @ts-ignore
  return (
    <div className="App">
      <header>
        <div>CVAPI</div>
        <div className="flex">
          <div>
            <a href="#documentation">API Usage</a>
          </div>
          <div>
            <a href="#demo">Demo</a>
          </div>
        </div>
      </header>

      <div className="content">
        <h1>CVAPI</h1>
        <p className="center">
          <span>A fast file to image conversion API written in C++</span>
          <br />
          <br />
          Supports conversion from Jpeg, PNG, Heic, PDF, BMP, Tiff to either
          Jpeg or PNG{" "}
        </p>
        <p className="line"></p>

        <h2 id="documentation">API Usage</h2>
        <p>
          The API can be accessed by making POST requests to{" "}
          <a>{"https://__domain__/upload?filetype={toFileType}"}</a><br />
          <br />
          It will return a URL to the converted image. Example code:
        </p>
        <SyntaxHighlighter language="javascript" style={atomOneDark}>
          {str}
        </SyntaxHighlighter>
        <p className="line"></p>

        <h2 id="demo">Demo</h2>
        <p>Try converting a file using the form below:</p>
      </div>

      <Uploader />
    </div>
  );
}

export default App;
