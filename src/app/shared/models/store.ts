export interface LoadingStatus {
  loading: boolean;
  loaded: boolean;
  errors?: GeneralError;
}

export interface GeneralError {
  message: string;
}
