export enum PaymentTypeEnum {
	ONLINE = 0,
	ON_DELIVERY = 1,
}

export interface IPersonalInfoModel {
  paymentType: PaymentTypeEnum;
	address: string;
	email: string;
	phone: string; 
}
