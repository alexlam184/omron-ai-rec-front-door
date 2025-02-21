import { BodyTemperatureRecordType, BodyTemperatureType } from '@/lib/type';
import { ModalContentType } from '@/types/types';
import { create } from 'zustand';

type GeneralStateStore = {
  general_modalIsOpenedState: boolean; // Host: front, createGame, inGame  |  Client: front, inGame
  general_modalContentState: ModalContentType;
  setGeneral_ModalIsOpenedState: (param: boolean) => void;
  setGeneral_ModalContentState: (title: string, content: string) => void;
  resetgeneral_modalState: () => void;
  bodyTemperatureInTimeState: BodyTemperatureRecordType[];
  appendBodyTemperatureInTimeState: (
    bodyTemp: BodyTemperatureType,
    Time: Date
  ) => void;
};

export const useGeneralStateStore = create<GeneralStateStore>((set) => ({
  general_modalIsOpenedState: false,
  general_modalContentState: {
    title: 'Default title',
    content: 'No content loaded.Something went wrong.',
  },
  setGeneral_ModalIsOpenedState: (isOpened: boolean) =>
    set({ general_modalIsOpenedState: isOpened }),
  setGeneral_ModalContentState: (title: string, content: string) =>
    set({
      general_modalContentState: {
        title: title,
        content: content,
      },
    }),
  resetgeneral_modalState: () =>
    set({
      general_modalIsOpenedState: false,
      general_modalContentState: {
        title: 'Default title',
        content: 'No content loaded.Something went wrong.',
      },
    }),
  bodyTemperatureInTimeState: [],
  appendBodyTemperatureInTimeState: (bodyTemp, time) =>
    set((state) => {
      const newEntries = [
        ...state.bodyTemperatureInTimeState,
        { ambient: bodyTemp.ambient, object: bodyTemp.object, time },
      ];

      // Keep only the last 100 elements
      if (newEntries.length > 100) {
        newEntries.shift(); // Remove the first (oldest) entry
      }

      return { bodyTemperatureInTimeState: newEntries };
    }),
}));
