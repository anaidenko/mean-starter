export default interface ErrorPayload {
  name: string;
  message: string;
  error?: Error;
  stack?: string;
}
