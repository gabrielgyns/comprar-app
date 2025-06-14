import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "#2C46B1",
		height: 48,
		width: "100%",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	containerDisabled: {
		backgroundColor: "#A1A1A1",
		opacity: 0.5,
	},
	title: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "600",
	},
	titleDisabled: {
		opacity: 0.5,
	},
});
