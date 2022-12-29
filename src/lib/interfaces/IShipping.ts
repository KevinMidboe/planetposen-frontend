export interface IShippingCourier {
  id: string;
  name: string;
  website: string;
  has_api: boolean;
}

export interface IShipment {
  id: string;
  courier_id: string;
  tracking_code: string;
  tracking_link: string;
}

export interface IShipmentEvent {
  event_id: string;
  shipment_id: string;
  description: string;
  status: string;
  location: string;
  event_time: Date;
  updated: Date;
  created: Date;
}

export interface IShipmentResponse {
  shipment_id: string;
  order_id: string;
  courier: string;
  has_api: boolean;
  courier_id: number;
  tracking_code: string;
  tracking_link: string;
  user_notified: boolean;
}

export interface ICourier {
  courier_id: number;
  name: string;
  website: string;
  has_api: boolean;
}
