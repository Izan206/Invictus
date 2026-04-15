import { Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
