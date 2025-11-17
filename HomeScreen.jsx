// screens/HomeScreen.jsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const DATA = [
	{ id: '1', title: '사과' },
	{ id: '2', title: '바나나' },
	{ id: '3', title: '포도' },
];

export default function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, paddingTop: 60 }}>
			{/* 3-1. 단순 화면 전환 버튼 */}
			<View style={{ alignItems: 'center', marginBottom: 12 }}>
				<Text style={{ marginBottom: 8 }}>홈 화면</Text>
			</View>

			{/* 3-2. 리스트 → 상세로 데이터 전달 */}
			<FlatList
				data={DATA}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => navigation.navigate('Detail', { item })}
					>
						<Text style={{ padding: 20, fontSize: 18 }}>
							• {item.title}
						</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
