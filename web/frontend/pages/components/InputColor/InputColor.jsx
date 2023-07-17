import { ColorPicker, Popover, TextField } from "@shopify/polaris";
import "./InputColor.scss";
import { useCallback, useState } from "react";
import hsl from "hsl-to-hex";

const InputColor = ({ name, label }) => {
    const [popoverActive, setPopoverActive] = useState(false);
    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });
    const [colorText, setColorText] = useState(
        hslToHex({
            hue: 120,
            brightness: 1,
            saturation: 1,
        })
    );

    const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) => !popoverActive), []);

    const suffix = (
        <div
            onClick={togglePopoverActive}
            style={{
                width: "40px",
                backgroundColor: hslToHex(color),
                height: "34px",
                margin: 0,
                border: "var(--p-border-width-1) solid var(--p-color-border-input)",
                borderRadius: "4px",
            }}
        ></div>
    );

    const getColorVip = (colorStr) => {
        const reg = /^#([0-9a-f]{6})$/i;
        let color = colorStr[0] === "#" ? colorStr : `#${colorStr}`;

        if (!reg.test(color)) {
            color = "#ff0000";
        }

        return color;
    };

    const setColorVip = (color) => {
        setColor(color);
    };

    function hslToHex({ hue: h, saturation: s, brightness: l }) {
        return hsl(h, s * 100, l * 100);
    }

    function hexToHsl(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);

        (r /= 255), (g /= 255), (b /= 255);
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h,
            s,
            l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        h = Math.round(360 * h);

        return {
            hue: h,
            saturation: s,
            brightness: l,
        };
    }
    return (
        <div className="input-color">
            <TextField
                label={label}
                autoComplete="off"
                value={colorText}
                onChange={(e) => {
                    setColorText(e);
                }}
                onBlur={(e) => {
                    setColorVip(hexToHsl(getColorVip(e.target.value)));
                    setColorText(getColorVip(e.target.value));
                }}
                name={name}
                suffix={
                    <Popover
                        preferredPosition="mostSpace"
                        preferredAlignment="right"
                        active={popoverActive}
                        activator={suffix}
                        autofocusTarget="first-node"
                        onClose={togglePopoverActive}
                    >
                        <ColorPicker
                            onChange={(color) => {
                                const { alpha, ...colorFormed } = color;
                                setColor(colorFormed);
                                setColorText(hslToHex(colorFormed));
                            }}
                            color={color}
                        />
                    </Popover>
                }
            />
        </div>
    );
};

export default InputColor;
