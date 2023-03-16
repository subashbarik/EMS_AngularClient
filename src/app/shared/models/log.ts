export interface ILog {
  id: number;
  message: string;
  level: string;
  timeStamp: string;
  exception: string;
}
export class Log implements ILog {
  id: number;
  message: string;
  level: string;
  timeStamp: string;
  exception: string;
  properties: IProperties;
  constructor(
    id: number,
    message: string,
    level: string,
    timeStamp: string,
    exception: string,
    properties: IProperties
  ) {
    this.id = id;
    this.message = message;
    this.level = level;
    this.timeStamp = timeStamp;
    this.exception = exception;
    this.properties = properties;
  }
}
export interface IProperties {
  sourceContext: string;
  actionId: string;
  actionName: string;
  requestId: string;
  requestPath: string;
  connectionId: string;
  userId: string;
  machineName: string;
  processId: number;
  threadId: number;
}
