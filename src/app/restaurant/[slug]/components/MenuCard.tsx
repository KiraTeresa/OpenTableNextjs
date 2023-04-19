import {Item} from "@prisma/client";

export default function MenuCard({item}: {item: Item}){
    const {name, description, price} = item

    return (
        <div className=" border rounded p-3 w-[49%] mb-3">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="font-light mt-1 text-sm">
                {description}
            </p>
            <p className="mt-7">{price}</p>
        </div>
    )
}