// ticket.tsx
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ModalBody } from './modalBody';

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
    const scroll = true;
    const backdrop = false;

  return (
    <Offcanvas show={show} onHide={onClose} placement='end' scroll={scroll} backdrop={backdrop}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{content.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* <p><strong>Name:</strong> {content.name}</p> */}
        <p><strong>ETA:</strong> {content.eta}</p>
        {content.details && <p><strong>Details:</strong> {content.details}</p>}
        <ModalBody />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Ticket;


