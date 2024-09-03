import {StyleSheet} from 'react-native';
import colors from '../assets/colors/Colors';

export default StyleSheet.create({
    flexOne: {
        flex: 1
    },
    productSec: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        fontSize: 16,
        letterSpacing: .6,
        lineHeight: 20
    },
    addBtn: {
        paddingVertical: 10,
        marginVertical: 7.5,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    plusIcon: {
        color: colors.white,
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    paddingHorFifteen: {
        paddingHorizontal: 15
    },
    noDataSec: {
        marginHorizontal: 15,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5
    },
    badge: {
        right: 10,
        position: 'absolute',
        backgroundColor: colors.primary
    },
});