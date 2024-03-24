// ticket.tsx
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ModalBody from './modalBody';
import SearchDisplay from './results';

type ContentProps = {
    name: string;
    eta: string;
    details?: string;
  };
  
  type TicketProps = {
    show: boolean;
    onClose: () => void;
    content: ContentProps;
    currentStopName: string;
    destinationStopName: string;
  };

  const Ticket: React.FC<TicketProps> = ({ show, onClose, content, currentStopName, destinationStopName }) => {
    // This is printing undefined
    console.log('Ticket Props:', currentStopName, destinationStopName); // Debugging
    const scroll = true;
    const backdrop = false;

  return (
    <Offcanvas show={show} onHide={onClose} placement='end' scroll={scroll} backdrop={backdrop}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-center w-full">Your Ride</Offcanvas.Title>
    </Offcanvas.Header>
      <Offcanvas.Body>
        <p><strong>Bus:</strong> {content.name}</p>
        <p><strong>Arrives:</strong> {content.eta}</p>
        {/* {content.details && <p><strong>Details:</strong> {content.details}</p>} */}
        <ModalBody currentStopName={currentStopName} destinationStopName={destinationStopName} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Ticket;


