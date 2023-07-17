import { Select } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { options } from "../../index";
import { useDispatch } from "react-redux";
import { isBeingMutated } from "../../../redux/slices/mainSlice";

const SelectPro = ({ label, name }) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("today");

    const handleSelectChange = useCallback((value) => {
        dispatch(isBeingMutated());
        setSelected(value);
    }, []);

    return <Select label={label} name={name} options={options} onChange={handleSelectChange} value={selected} />;
};

export default SelectPro;
