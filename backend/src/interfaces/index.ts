export class AppError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface UserDetail {
  name: string;
  properties: number;
  lands: number;
  revenue?: number;
}

export interface CityDetail {
  name: string;
  properties: number;
  lands: number;
  revenue: number;
}
