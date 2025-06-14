import { useEffect, useState } from "react";
import {
	Image,
	View,
	TouchableOpacity,
	Text,
	FlatList,
	Alert,
} from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

import { styles } from "./styles";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
	const [input, setInput] = useState("");
	const [items, setItems] = useState<any[]>([]);
	const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);

	useEffect(() => {
		getItemsByStatus();
	}, [filter]);

	async function getItemsByStatus() {
		try {
			const response = await itemsStorage.getByStatus(filter);
			setItems(response);
		} catch (error) {
			console.error(error);
			Alert.alert("Erro", "Não foi possível obter os itens!");
		}
	}

	async function handleAddItem() {
		// The button is disabled in case we don't have an item, the code below is a "make sure".
		if (input.trim().length === 0) {
			return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
		}

		const newItem: ItemStorage = {
			id: Date.now().toString(),
			description: input,
			status: FilterStatus.PENDING,
		};

		await itemsStorage.add(newItem);
		await getItemsByStatus();

		// We already have a visual feedback if the item was included or not! This Alert can make it have a bad UX.
		// Alert.alert(
		// 	"Adicionado",
		// 	`O item "${newItem.description}" foi adicionado na lista.`
		// );
		setInput("");
		setFilter(FilterStatus.PENDING);
	}

	async function handleRemoveItem(id: string) {
		try {
			await itemsStorage.remove(id);
			await getItemsByStatus();
		} catch (error) {
			console.error(error);
			Alert.alert("Remover", "Não foi possível remover o item.");
		}
	}

	function handleRemoveAllItems() {
		Alert.alert(
			"Remover Lista",
			"Tem certeza que desejar remover todos os itens da lista?",
			[
				{
					text: "Não",
					style: "cancel",
				},
				{
					text: "Sim",
					style: "destructive",
					onPress: onRemoveAll,
				},
			]
		);
	}

	async function onRemoveAll() {
		try {
			await itemsStorage.removeAll();
			await getItemsByStatus();
		} catch (error) {
			console.error(error);
			Alert.alert("Remover", "Erro ao remover todos os itens da lista.");
		}
	}

	async function handleStatusChange(id: string) {
		try {
			await itemsStorage.toggleStatus(id);
			await getItemsByStatus();
		} catch (error) {
			console.error(error);
			Alert.alert(
				"Alterar Status",
				"Ocorreu um erro ao alterar o status, tente novamente."
			);
		}
	}

	return (
		<View style={styles.container}>
			<Image source={require("@/assets/logo.png")} style={styles.logo} />

			<View style={styles.form}>
				<Input
					placeholder="O que você precisa comprar?"
					value={input}
					onChangeText={setInput}
				/>
				<Button
					title="Adicionar"
					onPress={handleAddItem}
					disabled={!input.trim()}
				/>
			</View>

			<View style={styles.content}>
				<View style={styles.header}>
					{FILTER_STATUS.map((status) => (
						<Filter
							key={status}
							status={status}
							isActive={filter === status}
							onPress={() => setFilter(status)}
						/>
					))}

					<TouchableOpacity
						style={styles.clearButton}
						onPress={handleRemoveAllItems}
					>
						<Text style={styles.clearText}>Deletar Lista</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					data={items.filter((item) => {
						if (filter === null) return true;
						return item.status === filter;
					})}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<Item
							data={item}
							onRemove={() => handleRemoveItem(item.id)}
							onStatusChange={() => handleStatusChange(item.id)}
						/>
					)}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					ListEmptyComponent={() => (
						<Text style={styles.emptyListText}>Nenhum item encontrado</Text>
					)}
					style={{ paddingBottom: 300 }}
				/>
			</View>
		</View>
	);
}
