import React, { useState } from "react";
import axios from "axios";

const Uploader = () => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState("");

  function uploadFile() {
    let url = "http://0.0.0.0:8002/upload_endpoint";

    console.log(file);

    let form = new FormData();
    // This does attach the image, even though ts complains
    // @ts-ignore
    form.append("file", file, fileType+"__"+file?.name);

    if (file && fileType) {
      console.log(form)
      axios.post(url, form).then((res) => {
        console.log(res);
      });
    }
  }

  const attachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value", e.target.value);
    if(e && e.target && e.target.files)
      setFile(e.target.files[0]);
  };

  return (
    <>
      <input type="text" onChange={(e) => setFileType(e.target.value)} />
      <input
        type="file"
        onChange={(e) => attachFile(e)}
        id="file"
        name="myfile"
      />
      <input type="button" onClick={uploadFile} value="Upload" />
    </>
  );
};

export default Uploader;
