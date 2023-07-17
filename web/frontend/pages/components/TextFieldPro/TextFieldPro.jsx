import { TextField } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isBeingMutated } from "../../../redux/slices/mainSlice";

const TextFieldPro = ({ name, label, required, storeReduxFunc, initvalue, ...textFieldProps }) => {
    const [value, setValue] = useState(initvalue);
    const dispatch = useDispatch();

    const handleChange = useCallback((newValue) => {
        dispatch(isBeingMutated());
        setValue(
            newValue.replace(
                /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
                ""
            )
        );
    }, []);

    const handleBlur = useCallback((e) => {
        const temp = e.target.value.trim();
        setValue(temp);
        if (storeReduxFunc)
            storeReduxFunc({
                name: name,
                value: temp,
            });
    }, []);

    return (
        <TextField
            {...textFieldProps}
            {...(required ? { error: value ? false : "This field is required" } : {})}
            name={name}
            label={label}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
        />
    );
};

export default TextFieldPro;
