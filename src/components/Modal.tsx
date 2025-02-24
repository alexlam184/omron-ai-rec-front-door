'use client';
import React, { useEffect } from 'react';
import { useGeneralStateStore } from '@/store/GeneralStateStore';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AlertDialog() {
  const {
    general_modalIsOpenedState,
    setGeneral_ModalIsOpenedState,
    general_modalContentState,
  } = useGeneralStateStore();

  // Auto-close after 2 seconds when the modal opens
  useEffect(() => {
    if (general_modalIsOpenedState) {
      const timer = setTimeout(() => {
        setGeneral_ModalIsOpenedState(false);
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on unmount or re-render
    }
  }, [general_modalIsOpenedState, setGeneral_ModalIsOpenedState]);

  return (
    <Dialog
      open={general_modalIsOpenedState}
      onOpenChange={setGeneral_ModalIsOpenedState}
    >
      <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-xl border border-gray-200">
        <DialogHeader className="text-left">
          <DialogTitle className="text-4xl font-semibold text-gray-900">
            {general_modalContentState.title}
          </DialogTitle>
          <DialogDescription className="text-xl text-gray-600 mt-2">
            {general_modalContentState.content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-4 py-2 text-gray-800 border-gray-300 hover:bg-gray-100"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
