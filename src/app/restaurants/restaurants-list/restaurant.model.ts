import { Address } from "./address";

export class Restaurant{
    constructor(public id: number, public name: string, public description: string, public category: string, public hasDelivery: boolean, public contactEmail: string, public address: Address){}
}