import { OrderItem } from "./orderItem";

export class CreatePurnchaseOrderInput {
    name: string;
    orderItems: OrderItem[];
}
