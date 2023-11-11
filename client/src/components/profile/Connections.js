import React, { useState } from "react";
import ConnectionModal from "./ConnectionModal";
import ConnectionMenu from "./ConnectionMenu";

const Connections = () => {
  const [type, setType] = useState("");

  return (
    <>
      {type !== "" && <ConnectionModal type={type} />}
      <ConnectionMenu setType={setType} />
    </>
  );
};

export default Connections;
