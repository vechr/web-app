export interface ILoggingData {
  urlTopic: string;
  data: {
    no: number;
    message: any;
  }[];
  message: string;
  statusConnection: {
    message: string;
    process: string;
  };
}
