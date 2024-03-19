// ticket.tsx
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

type ContentProps = {
    name: string;
    eta: string;
    details?: string;
  };
  
  type TicketProps = {
    show: boolean;
    onClose: () => void;
    content: ContentProps;
  };
  
  const Ticket = ({ show, onClose, content }: TicketProps) => {
  return (
    <Offcanvas show={show} onHide={onClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{content.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p><strong>Name:</strong> {content.name}</p>
        <p><strong>ETA:</strong> {content.eta}</p>
        {content.details && <p><strong>Details:</strong> {content.details}</p>}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Ticket;


