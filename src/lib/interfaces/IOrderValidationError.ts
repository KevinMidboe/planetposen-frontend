export default interface IOrderValidationError {
  type: string;
  field: number | string;
  message: string;
}
