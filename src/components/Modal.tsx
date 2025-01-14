'use client';
import React from 'react';
import { useGeneralStateStore } from '@/store/GeneralStateStore';

export default function AlertDialog() {
  const {
    general_modalIsOpenedState,
    setGeneral_ModalIsOpenedState,
    general_modalContentState,
  } = useGeneralStateStore();

  const handleClose = () => {
    setGeneral_ModalIsOpenedState(false);
  };

  return (
    <>
      {' '}
      {/* Modal to welcome staff */}
      {general_modalIsOpenedState && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <h2>{general_modalContentState.title}</h2>
            <p>{general_modalContentState.content}</p>
            <button
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
    // <Dialog
    //   open={general_modalIsOpenedState}
    //   onClose={handleClose}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    // >
    //   <DialogTitle id="alert-dialog-title">
    //     {general_modalContentState.title}
    //   </DialogTitle>
    //   <DialogContent>
    //     <DialogContentText id="alert-dialog-description">
    //       {general_modalContentState.content}
    //     </DialogContentText>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={handleClose} autoFocus>
    //       Understand
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
}
