import React from "react";

const ImgViewer: React.FC<{
  img: string;
  imgName: string;
}> = (props) => {
  return (
    <div className="img-viewer">
      <a href={"/uploads/"+props.img+"?force=true"} download={true}>
        {" "}
        <p>{props.imgName}</p>
      </a>
      <img src={"/uploads/" + props.img} />
    </div>
  );
};

export default ImgViewer;
