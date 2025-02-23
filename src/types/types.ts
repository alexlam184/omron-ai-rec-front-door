export type ModalContentType = {
  title: string;
  content: string;
};

export interface DimensionsType {
  center_x: number;
  center_y: number;
  face_width: number;
  face_height: number;
}

export interface AttendanceResponse {
  dimensions?: DimensionsType;
  attendanceDto?: {
    staffResponseDto?: {
      staffId: number;
      firstName: string;
      lastName: string;
    };
  };
}
