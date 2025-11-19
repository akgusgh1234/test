// screens/HomeScreen.jsx
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MoneyContext } from './data/Money';

const DATA = [
    { id: '1', title: '토스뱅크' , image: require('./assets/toss.jpg')},
    { id: '2', title: '주거래 하나 통장', image: require('./assets/hana.jpg') },
    { id: '3', title: '나라사랑카드', image: require('./assets/kb.png') },
];

export default function HomeScreen({ navigation }) {
    // 전체 장부(balances)를 가져옴
    const { balances } = useContext(MoneyContext) || { balances: {} };

    // [보너스 기능] 모든 은행 잔액을 합쳐서 총액 계산
    const safeBalances = balances || {};
    const totalMoney = Object.values(safeBalances).reduce((sum, val) => sum + (parseInt(val) || 0), 0);

    return (
        <View style={styles.container}>
            
            <View style={styles.headerContainer}>
                <Ionicons name="moon" size={28} color='rgba(50, 50, 50, 0.7)' />
                <Text style={styles.headerText}>내 자산</Text>
            </View>

            {/* 상단 파란 박스: 이제 총 합계를 보여줍니다 */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>총 자산 금액</Text>
                <Text style={styles.balanceText}>
                    {totalMoney.toLocaleString()} 원
                </Text>
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const currentMoney = (balances && balances[item.id]) ? balances[item.id] : '0';

                        return (
                            <TouchableOpacity
                                style={styles.itemRow}
                                onPress={() => navigation.navigate('Detail', { item })}
                            >
                                <View style={styles.iconBackground}>
                                    <Image source={item.image} style={styles.customIcon} />
                                </View>

                                {/* 은행 이름과 금액을 양옆으로 배치 */}
                                <View style={styles.textWrapper}>
                                    <Text style={styles.itemText}>{item.title}</Text>
                                    {/* 개별 금액 표시 */}
                                    <Text style={styles.moneyText}>
                                        {Number(currentMoney).toLocaleString()} 원
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, backgroundColor: '#f5f5f5' },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginLeft: 20 },
    headerText: { fontSize: 24, fontWeight: 'bold', marginLeft: 10, color: 'rgba(50, 50, 50, 0.7)' },
    balanceContainer: { backgroundColor: '#2196F3', margin: 20, padding: 20, borderRadius: 15, alignItems: 'center' },
    balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 5 },
    balanceText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
    listContainer: { backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20, paddingVertical: 10 },
    itemRow: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(238, 238, 238, 1)' },
    iconBackground: { backgroundColor: '#f5f5f5', width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    customIcon: { width: 40, height: 40, resizeMode: 'contain' },
    
    // [추가] 텍스트 정렬을 위한 스타일
    textWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    itemText: { fontSize: 16, color: '#333', fontWeight: '500' },
    moneyText: { fontSize: 16, color: '#2196F3', fontWeight: 'bold' },
});