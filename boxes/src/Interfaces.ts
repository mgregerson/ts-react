export interface BoxInterface {
  id: number;
  width: number;
  height: number;
  backgroundColor: string;
}

export interface BoxProps extends BoxInterface {
  remove: Function;
}

export interface NewBoxFormProps {
  createBox: Function;
}

export interface FormDataInterface {
  height: string;
  width: string;
  backgroundColor: string;
}
