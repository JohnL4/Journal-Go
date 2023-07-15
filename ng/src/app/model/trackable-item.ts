import { TrackableItemTypeEnum } from "./trackable-item-type-enum";

export class TrackableItem {

    public constructor( 
        private _id: string,    // guid?
        private _itemType: TrackableItemTypeEnum,
        private _value: boolean | string,
        private _label: string
    ) { }

    public get id() { return this._id; }
    public get itemType() { return this._itemType; }
    public get value() { return this._value; }
    public get label() { return this._label; }
}
