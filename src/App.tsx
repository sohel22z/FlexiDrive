import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;