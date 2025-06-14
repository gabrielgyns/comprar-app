import { TouchableOpacity, View, Text } from "react-native";
import { Trash2 } from "lucide-react-native";

import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "@/components/StatusIcon";

import { styles } from "./styles";

type ItemData = {
	status: FilterStatus;
	description: string;
};

type Props = {
	data: ItemData;
	onRemove: () => void;
	onStatusChange: (status: FilterStatus) => void;
};

export function Item({ data, onRemove, onStatusChange }: Props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => onStatusChange(data.status)}
			>
				<StatusIcon status={data.status} />
			</TouchableOpacity>

			<Text style={styles.description}>{data.description}</Text>

			<TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
				<Trash2 size={16} color="#828282" />
			</TouchableOpacity>
		</View>
	);
}
