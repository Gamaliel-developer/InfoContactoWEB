import './App.css';
import ContactForm from './ContactForm';

function App() {
  return (
    <div>
      <header>
      <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Enviar mensaje</h1>
        </div>
      </div>
      </div>
      <ContactForm />
      </header>
    </div>
  );
}

export default App;
