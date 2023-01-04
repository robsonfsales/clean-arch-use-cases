import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/Address";

export default class Customer extends Entity{

    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        super();
        this._id = id;
        this._name = name;
        this.validate();
    }
  
    get name() : string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address() {
        return this._address;
    }

    isActive(): boolean {
        return this._active;
    }
    
    validate(){
        if(this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            });
        }

        if(this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
        }

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    changeName(name: string){
        this._name = name;
    }

    changeAddress(address: Address){
        this._address = address;
    }

    activate(){
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}