import {StyleSheet, TouchableOpacity, TextInput} from 'react-native';

export const styles = StyleSheet.create({

    blueText: {
        color: "#4e54c8"
    },



    wrapper: {
        flex: 1,
    },


    giveTakeWrapper: {
        backgroundColor: "#4e54c8",
        padding: 10,
        paddingHorizontal: 20,
    },

    giveTakeCont: {
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        padding: 10,
    },

    giveTakeAmount: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomColor: '#dedede',
    },

    amountCont: {
        textAlign: 'center',
        justifyContent: "center",
        alignItems: 'center'
    },

    giveTakeAmountWrapper: {
        justifyContent: "center",
        textAlign: "center",
    },

    giveAmountText: {
        color: "#ff4268",
        fontWeight: "bold",
        fontSize: 18,
    },
    takeAmountText: {
        color: "#68bd72",
        fontWeight: "bold",
        fontSize: 18,
    },
    youGiveTake: {
        fontSize: 12,
        color: 'grey',
    },

    buttonContainer: {
        borderTopColor: 'grey',

        //  paddingTop: 10,
        width: "100%",
        marginTop: 12,
        marginBottom: 6,
        alignItems: "center"
    },

    viewReportButton: {
        color: "#4e54c8",
        fontWeight: "bold"
    },

    shopIsOpenWrapper: {
        flexDirection: 'row',
        backgroundColor: "#c7dcff",
        padding: 10,
        paddingLeft: 30
    },

    viewShopOpen: {
        color: "#4e54c8"
    },

    searchFilter: {
        flexDirection: "row", 
        justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center",
        paddingHorizontal: 3,
        marginHorizontal: 10,
        marginTop: 8
    },
    countInfo:{
        // justifyContent: "space-between",
        
        alignItems: "center",
        // paddingHorizontal: 8,
        marginHorizontal: 38,
        marginTop: 1,
        marginBottom:-8
    },

    searchinput: {
        flex: 3,
    },

    iSearchicon: {
        paddingHorizontal: 8
    },

    cContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: "space-between",
        borderBottomWidth: .2,
        borderColor: '#dedede'
    },

    initialsCont: {
        backgroundColor: "#4e54c8",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        height: 40,
        width: 40,
        borderRadius: 50 / 2,
        marginRight: 10,
    },

    initialText: {
        color: "white",
        fontSize: 21
    },

    cNameTimeCont: {
        flex: 4,
    },

    cName: {
        color: "#4e54c8",
        fontSize: 16,
    },

    cTime: {
        color: "grey",
        fontSize: 10
    },

    cAmtTimeCont: {
        textAlign: "right",
    },

    fab: {
        position: 'absolute',
        // width: 56,
        // height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 20,
        backgroundColor: '#a3423b',
        borderRadius: 30,
        elevation: 8,
        padding: 10,
    },

    fabIcon: {
        fontSize: 20,
        color: 'white',
    },

    container: {
        padding: 10
    },

    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,

    },

    rowDCenter: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: "center"
    },

    normalText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    hLine: {
        borderWidth: .2,
    },

    column: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },

    noBackground: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0
    },

    greyTextSm: {
        fontSize: 12,
        color: 'grey',
        paddingHorizontal: 15
    },

    card: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        // padding:10 ,
        // paddingVertical:25,
        backgroundColor: 'white',
        elevation: 1,
        margin: 4,
        borderRadius: 5
    },

    blueTextSm: {
        color: '#4e54c8'
    },

    nInput: {
        // borderWidth:.2,
        width: 300,
        padding: 15,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 25,
        elevation: 1,
    },

    midText: {
        fontSize: 16,
        flexDirection: 'row',
        flex: 1
    },

    boldText: {
        fontWeight: 'bold'
    },

    textLight: {
        color: 'grey'
    },

    textLightBold: {
        color: 'grey',
        fontWeight: 'bold'
    },

    cardGroup: {
        alignItems: 'center',
    },

    sent: {
        color: '#ff4268',
        fontWeight: 'bold'
    },

    received: {
        color: '#68bd72',
        fontWeight: 'bold'
    }

});
