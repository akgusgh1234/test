import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Homescreen';
import DetailScreen from './DetailScreen';
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* 초기 화면 */}
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: '홈' }}
				/>
				<Stack.Screen
					name="Detail"
					component={DetailScreen}
					options={{ title: '상세' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}