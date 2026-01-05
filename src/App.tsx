import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import GroupTours from './pages/GroupTours';
import PersonalTours from './pages/PersonalTours';
import CustomisedTours from './pages/CustomisedTours';
import Contact from './pages/Contact';
import TourDetails from './pages/TourDetails';
import AdminDashboard  from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group-tours" element={<GroupTours />} />
        <Route path="/personal-tours" element={<PersonalTours />} />
        <Route path="/customised-tours" element={<CustomisedTours />} />
        <Route path="/tour-details/:tourId" element={<TourDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
