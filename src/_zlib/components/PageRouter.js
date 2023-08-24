import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Auth from '../../pages/Auth';
import Profile from '../../pages/Profile';
import EditProfile from '../../pages/EditProfile';

export default function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </Router>
  );
}
