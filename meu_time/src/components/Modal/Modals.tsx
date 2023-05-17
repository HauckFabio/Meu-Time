
import React from 'react';
import Modal from 'react-bootstrap/Modal';
function Modals(props: any)
{

    return (
        <>

        {    <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            fullscreen={ props.fullscreen }
            centered>
                <Modal.Header style={{ backgroundColor: "#282c34" }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "darkgray"}}>
                        {props.text}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#282c34" }}>
                    {props.footer}
                </Modal.Footer>

            </Modal>}

        </>
    );
}

export default Modals;