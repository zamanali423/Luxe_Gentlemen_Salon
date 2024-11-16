import React from "react";
import { useParams } from "react-router-dom";

const SingleImage = () => {
  const { link } = useParams();
  const decodedLink = decodeURIComponent(link);

  return (
    <>
      <img style={{width:"100%"}} src={decodedLink} alt="Single" />
    </>
  );
};

export default SingleImage;
