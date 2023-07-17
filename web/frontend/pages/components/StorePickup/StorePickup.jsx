import { TextField } from "@shopify/polaris";
import TextFieldPro from "../TextFieldPro/TextFieldPro";
import { useDispatch, useSelector } from "react-redux";
import { setStorePickup } from "../../../redux/slices/mainSlice";

const ArrField = [
    "Store pickup label",
    "Message text to require buyers to choose a pickup location",
    "Store pickup date title",
    "Store pick up timeline",
    "Required message text",
];

const StorePickup = ({ isSelected }) => {
    const data = useSelector((state) => state.mainSlice.storePickup);

    const dispatch = useDispatch();

    const storeRedux = (fieldInfo) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData[fieldInfo.name] = fieldInfo.value;
        dispatch(setStorePickup(newData));
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
                        storeReduxFunc={storeRedux}
                        key={index}
                        initvalue={data[item] ? data[item] : ""}
                        required
                        requiredIndicator
                        name={item}
                        label={item}
                        autoComplete="off"
                    />
                );
            })}
        </div>
    );
};

export default StorePickup;
