import './globalStyles.scss';

import {
  RouterProvider,
  } from "react-router-dom";
import router from './routes';
import { withPeerContext } from './HOC/PeerContext';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default withPeerContext(App);
