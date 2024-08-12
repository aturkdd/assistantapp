'use client'

import { useSelector, useDispatch } from "react-redux";
import ControlPanel from "@/component/ControlPanel/ControlPanel";

const ControlPanelPage = () => {
  const data = useSelector((state) => state.auth.user);

  return (
    <div>
      <ControlPanel user={data} />
    </div>
  );
};

export default ControlPanelPage;
