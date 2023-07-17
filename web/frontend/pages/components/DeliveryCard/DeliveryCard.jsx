import { TextField } from "@shopify/polaris";
import TextFieldPro from "../TextFieldPro/TextFieldPro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryDate } from "../../../redux/slices/mainSlice";

const ArrField = ["Title", "Delivery date label", "Delivery date title", "Delivery time title", "Require message text"];

const DeliveryCard = ({ isSelected }) => {
    const data = useSelector((state) => state.mainSlice.deliveryDate);

    const dispatch = useDispatch();
    const storeRedux = (fieldInfo) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData[fieldInfo.name] = fieldInfo.value;
        console.log(newData);
        dispatch(setDeliveryDate(newData));
    };

    return (
        <div
            style={{
                padding: "4px",
                height: isSelected ? "auto" : 0,
                overflow: "hidden",
            }}
        >
            {ArrField.map((item, index) => {
                return (
                    <TextFieldPro
                        key={index}
                        storeReduxFunc={storeRedux}
                        initvalue={data[item] ? data[item] : ""}
                        requiredIndicator
                        required
                        name={item}
                        label={item}
                        autoComplete="off"
                    />
                );
            })}
        </div>
    );
};

export default DeliveryCard;
