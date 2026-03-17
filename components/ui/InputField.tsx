import colors from "@/constants/colors";
import { StyleSheet, TextInput } from "react-native";

export default function InputField(props: any) {
    return <TextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        marginBottom: 15,
        paddingRight: 45,
    },
});