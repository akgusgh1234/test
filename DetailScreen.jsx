// screens/DetailScreen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailScreen({ route, navigation }) {
	// 홈에서 보낸 { item } 혹은 { name: '홍길동' } 등 받기
	const item = route?.params?.item;

	return (
		<View
			style={{ flex: 1, paddingTop: 60, alignItems: 'center', gap: 12 }}
		>
			<Text style={{ fontSize: 22, fontWeight: '600' }}>
				{`선택한 항목: ${item.title}`}
			</Text>

			{/* 홈에서 name만 보낸 경우 예시: route.params.name */}
			{route?.params?.name && (
				<Text style={{ color: '#555' }}>
					{route.params.name}님 안녕하세요!
				</Text>
			)}

			<Button title="뒤로 가기" onPress={() => navigation.goBack()} />
		</View>
	);
}
