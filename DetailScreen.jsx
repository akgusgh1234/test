// screens/DetailScreen.jsx
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet ,Alert} from 'react-native';
import { MoneyContext } from './data/Money';

export default function DetailScreen({ route, navigation }) {
    const item = route?.params?.item; // 여기서 item.id를 가져옵니다.
    
    const context = useContext(MoneyContext);
    const balances = context?.balances || {};      // 없으면 빈 객체
    const updateBalance = context?.updateBalance;

	const [inputText, setInputText] = useState('');
    // 화면이 열릴 때, 기존에 저장된 금액이 있으면 불러오기
    useEffect(() => {
        // balances가 있고, 해당 ID의 값이 있을 때만 실행
        if (balances && balances[item.id]) {
            setInputText(balances[item.id]);
        }
    }, [item.id, balances]);

    const handleSave = () => {
        // updateBalance 함수가 존재하는지 확인 후 실행
        if (!inputText.trim()) {
            Alert.alert('알림', '금액을 입력해주세요.');
            return; // 함수 종료 (저장 안 함)
        }

        // 2. 정수(숫자)인지 확인하는 정규식 (0~9가 아닌 문자가 섞여있으면 false)
        const isInteger = /^-?\d+$/.test(inputText);

        if (!isInteger) {
            Alert.alert('경고', '숫자(정수)만 입력해주세요.\n(소수점, 문자 불가)');
            return; // 함수 종료
        }

        // 3. 통과하면 저장 진행
        if (updateBalance) {
            updateBalance(item.id, inputText); 
            navigation.goBack(); 
        }
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerTitle}>
                {`통장: ${item?.title}`}
            </Text>

            <View style={styles.container}>
                <Text style={styles.title}>현재 잔액을 입력하세요</Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder="입력하세요"
                    keyboardType="numeric"
                    value={inputText}
                    onChangeText={setInputText}
                />

                <Button title="저장하기" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, paddingTop: 60, alignItems: 'center', gap: 12, backgroundColor: 'white' },
    headerTitle: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
    container: { width: '100%', alignItems: 'center', paddingHorizontal: 20 },
    title: { fontSize: 18, marginBottom: 10 },
    input: { width: '80%', borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10, fontSize: 18, marginBottom: 30, textAlign: 'center' }
});