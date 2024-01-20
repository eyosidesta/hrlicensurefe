module.exports = {
  theme: {
    fontFamily: {
      sans: ["Atkinson-Hyperlegible"],
      serif: ["Atkinson-Hyperlegible"],
      mono: ["Atkinson-Hyperlegible"],
      display: ["Atkinson-Hyperlegible"],
      body: ["Atkinson-Hyperlegible"],
      AtkinsonHyperlegible: ["Atkinson-Hyperlegible"],
      AtkinsonHyperlegibleBold: ["Atkinson-Hyperlegible-Bold"]
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "22px",
      "3xl": "36px",
      display: "48px",
      largeDisplay: "54px"
    },
    colors: {
      white: "#ffffff",
      primary: {
        100: "#F9FAFB",
        200: "#E5E7EB",
        300: "#AFBDD6",
        400: "#4185D0",
        500: "#3674B9",
        600: "#2F639D",
        700: "#285180",
        800: "#224771",
        900: "#1F3F64",
        1000: "#162B43"
      },
      grey: {
        100: "#D1D5DB",
        200: "#9CA3AF",
        300: "#6B7280",
        400: "#4B5563",
        500: "#374151",
        600: "#1F2937",
        700: "#111827"
      },
      red: {
        100: "#FECACA",
        200: "#F87171"
      },
      yellow: {
        100: "#FDE68A",
        200: "#FCD34D",
        300: "#D97706"
      },
      lightBlue: {
        100: "#EFF6FF",
        200: "#DBEAFE",
        300: "#BFDBFE",
        400: "#93C5FD",
        500: "#60A5FA",
        600: "#3B82F6",
        700: "#2563EB",
        800: "#1D4ED8",
        900: "#1E40AF",
        1000: "#1E3A8A"
      },
      lightBlueB:{
        100: "#f3f6f9",
        200: "#eceff5",
        300: "#e2e9f5",
        400: "#a0b0cb",
        500: "#6d91af"
      },
      blue: {
        100: "#3c5d82",
        200: "#3c82f5"
      },
      lightGrey:{
        100: "#f3f4f6"
      }
    },
    extend: {
      spacing: {
        tiny: "5px",
        6: "6px",
        small: "15px",
        16: "16px",
        medium: "30px",
        large: "60px",
        xl: "100px"
      },
      inset: {
        full: "100%"
      },
      opacity: {
        "10": "0.1",
        "90": "0.9"
      }
    }
  },
  variants: {
    appearance: ["responsive"],
    backgroundAttachment: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus"],
    backgroundPosition: ["responsive"],
    backgroundRepeat: ["responsive"],
    backgroundSize: ["responsive"],
    borderCollapse: [],
    borderColor: ["responsive", "hover", "focus"],
    borderRadius: ["responsive"],
    borderStyle: ["responsive"],
    borderWidth: ["responsive"],
    cursor: ["responsive"],
    display: ["responsive", "group-hover"],
    flexDirection: ["responsive"],
    flexWrap: ["responsive"],
    alignItems: ["responsive"],
    alignSelf: ["responsive"],
    justifyContent: ["responsive"],
    alignContent: ["responsive"],
    flex: ["responsive"],
    flexGrow: ["responsive"],
    flexShrink: ["responsive"],
    float: ["responsive"],
    fontFamily: ["responsive"],
    fontWeight: ["responsive", "hover", "focus"],
    height: ["responsive"],
    lineHeight: ["responsive"],
    listStylePosition: ["responsive"],
    listStyleType: ["responsive"],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    negativeMargin: ["responsive"],
    objectFit: ["responsive"],
    objectPosition: ["responsive"],
    opacity: ["responsive"],
    outline: ["focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    pointerEvents: ["responsive"],
    position: ["responsive"],
    inset: ["responsive"],
    resize: ["responsive"],
    boxShadow: ["responsive", "hover", "focus"],
    fill: [],
    stroke: [],
    tableLayout: ["responsive"],
    textAlign: ["responsive"],
    textColor: ["responsive", "hover", "focus"],
    fontSize: ["responsive"],
    fontStyle: ["responsive"],
    textTransform: ["responsive"],
    textDecoration: ["responsive", "hover", "focus"],
    fontSmoothing: ["responsive"],
    letterSpacing: ["responsive"],
    userSelect: ["responsive"],
    verticalAlign: ["responsive"],
    visibility: ["responsive", "hover", "group-hover"],
    whitespace: ["responsive"],
    wordBreak: ["responsive"],
    width: ["responsive"],
    zIndex: ["responsive"]
  },
  corePlugins: {
    container: false
  },
  plugins: [require("@tailwindcss/forms")]
};
