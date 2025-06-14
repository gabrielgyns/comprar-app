import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		gap: 7,
		paddingVertical: 18,
	},
	description: {
		flex: 1,
		fontSize: 14,
		fontWeight: "600",
	},
	deleteButton: {
		marginLeft: "auto",
	},
});
