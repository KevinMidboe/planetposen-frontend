export default function validOrderId(orderId = '') {
  const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isValidOrderId = String(orderId).match(re);
  return isValidOrderId ? true : false;
}
