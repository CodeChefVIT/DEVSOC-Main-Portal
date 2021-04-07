import { withStyles, TextField } from "@material-ui/core";

const TextInput = withStyles({
  root: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#1c006f",
    "& .MuiInputBase-input": {
      fontFamily: "Montserrat",
      borderRadius: 16,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#cdcdcd !important",
    },
    "& .MuiFormLabel-filled:not(.Mui-focused)": {
      paddingTop: 10,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 14,
        borderColor: "#1c006f",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cdcdcd !important",
      },
    },
  },
})(TextField);

export default TextInput;
