import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

interface Props extends TouchableOpacityProps {
	title: string;
}

export function Button({ title, disabled, ...rest }: Props) {
	return (
		<TouchableOpacity
			style={[styles.container, disabled && styles.containerDisabled]}
			activeOpacity={0.8}
			disabled={disabled}
			{...rest}
		>
			<Text style={[styles.title, disabled && styles.titleDisabled]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
