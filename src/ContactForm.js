import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactForm.css';
import Modal from 'react-bootstrap/Modal';

const ContactForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://beta.maxipublica.com/testing/leads/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Solicitud enviada con éxito.');
        const formDataWithAdditionalInfo = {
          date: new Date().toISOString(),
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          message: formData.message,
          siteId: 'cto',
          originLead: 'demo.maxipublica.com'
        };

        console.log(formDataWithAdditionalInfo);

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          agreeTerms: false
        });
        handleShow();
      } else {
        console.error('Error al enviar la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control input-custom-placeholder"
                  placeholder="Nombre*"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control input-custom-placeholder"
                  placeholder="Correo*"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control input-custom-placeholder"
                  placeholder="Teléfono*"
                />
              </div>
            </div>
            <div className="form-group">
              <br></br>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control input-custom-placeholder"
                placeholder="Mensaje*"
                required
              />
            </div>
            <br></br>
            <div className="form-group form-check d-flex justify-content-between checkbox-custom-color">
              <div>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="form-check-input checkbox-custom-color"
                  required
                />
                <label className="form-check-label">Acepto la<span> política de privacidad</span></label>
              </div>
              <button type="submit" className="btn btn-primary btn-custom-color">Enviar</button>
            </div>
          </form>
          <br></br>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="d-flex justify-content-between">
              <div className="col-md-8 col-sm-8">
                <div className="card-body">
                  <div>
                    <h5 className="card-title custom-title text-sm">Grupo Mxp</h5>
                    <span className="card-text text-sm">Boulevard Adolfo Lopez Mateos 57</span>
                    <p className="card-text text-sm">El Potrero, Atizapán de Zaragoza, México, México, CP: 52975</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-2 d-flex align-items-center justify-content-end">
                <div style={{ marginRight: '50px' }}>
                  <img
                    src="./images/nissan.jpg"
                    className="img-fluid rounded-circle"
                    alt="Imagen"
                    style={{ maxWidth: '70px', maxHeight: '70px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>¡Gracias por contactarte!</Modal.Title>
          </Modal.Header>
          <Modal.Body>¡Su solicitud fue enviada correctamente!</Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default ContactForm;