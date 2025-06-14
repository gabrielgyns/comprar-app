import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { StatusIcon } from "@/components/StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

import { styles } from "./styles";

interface Props extends TouchableOpacityProps {
	status: FilterStatus;
	isActive: boolean;
}

export function Filter({ status, isActive, ...rest }: Props) {
	return (
		<TouchableOpacity
			style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
			activeOpacity={0.8}
			{...rest}
		>
			<StatusIcon status={status} />

			<Text style={styles.text}>
				{status === FilterStatus.PENDING ? "Pendente" : "Comprado"}
			</Text>
		</TouchableOpacity>
	);
}
