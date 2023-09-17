import * as React from 'react';

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Pressable,
    TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { Fetch_Data_Repository } from '../../Redux/Action/Type'

import { SelectList } from 'react-native-dropdown-select-list'
import Modal from "react-native-modal";
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


const selctedDate = [
    {
        id: 1,
        value: 10,
    },
    {
        id: 2,
        value: 50,
    },
    {
        id: 3,
        value: 100,
    },
]



{/* Content of Repo for rendering Data */ }
const DataList = ({ Item, indx, view }) => {

    {/* Covert The Differnt Between Date to Time and get Number of Hours */ }
    let FristDate = Item.updated_at;
    console.log(FristDate);
    let FristDateObj = (new Date(FristDate).getTime()) / 1000;
    let SecondtDate = (new Date().getTime()) / 1000;
    let Hours = Math.round((SecondtDate - FristDateObj) / 60 / 60);
    // console.log(Hours);
    // console.log(myparam)


    if (Item.stargazers_count <= view) {
        return (
            <View style={styles.RepoBox}>
                <View style={styles.RepoHeader}>
                    <Text
                        style={styles.Repotype}>Trending Repository</Text>
                    <View style={styles.Rating}>
                        <IconMaterialCommunityIcons
                            name="star-outline"
                            style={styles.star}
                        />
                        <Text style={styles.startxt}>Star</Text>
                        <View style={styles.ViewRateNum}>

                            <Text style={styles.RateNum}>{Item.stargazers_count}</Text>

                        </View>
                    </View>
                </View>
                <View style={styles.RepoName}>
                    <IconMaterialCommunityIcons
                        name="notebook-outline"
                        style={styles.RepoiconName}
                    />
                    <Text style={styles.name}>
                        {Item.name}
                    </Text>
                </View>
                <View style={styles.RepoDescription}>
                    <Text style={styles.Descript}>
                        {Item.description}
                    </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.RepoDateSkill}>
                    <Text style={styles.UpdateDate}>Update {Hours} Hours ago</Text>
                    <Text style={styles.language}>{Item.language}</Text>
                </View>
            </View>
        )
    }


}


const Explorepopular = () => {

    const [Temp, setTemp] = React.useState([]);

    const [isvisiable, setisvisiable] = React.useState(false);
    const [StoreNum, setStoreNum] = React.useState(0);
    const [UseCheckNum, setUseCheckNum] = React.useState(0);

    {/* useselector for connect Redux with React */ }
    const Reposity = useSelector((state) => state.Reposity);
    const { RepoData, isloading, error } = Reposity
    console.log(RepoData)


    {/* Open Model  */ }
    const Open = () => {
        setisvisiable(true)
    }
    {/* Hide Model */ }
    const Hide = () => {
        setisvisiable(false)
    }

    {/* OnSelect View Num */ }



    {/* Model Content Render */ }

    const ModelRender = () => {
        return (
            <Modal
                isVisible={isvisiable}
            >
                <View style={styles.Model}>
                    <View style={styles.ModelContent}>
                        <View style={styles.Header}>
                            <Text style={styles.head}>Top View</Text>
                            <Pressable onPress={Hide}>
                                <IconMaterialCommunityIcons
                                    name="close-circle"
                                    style={styles.CloseIcon}
                                />
                            </Pressable>

                        </View>
                        {
                            selctedDate.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            setStoreNum(item.value)
                                            setisvisiable(false)
                                        }}
                                        key={index}
                                        style={styles.list}>
                                        <Text style={styles.txtmodl}>{item.value}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </Modal>
        )
    }



    {/* Sort The Rating Desinding of Repository */ }

    const SortedDataDes = () => {
        let sortedData = [...RepoData].sort((a, b) => (b.stargazers_count - a.stargazers_count));
        setTemp(sortedData)
    }


    // console.log(Temp)

    {/* using Dispatch for sending action to reducer for change on state */ }
    const dispatch = useDispatch();


    React.useEffect(() => {
        SortedDataDes();
        dispatch(Fetch_Data_Repository());

    }, [])

    return (
        <View style={styles.container}>

            {/* The Title of Page */}
            <View style={styles.TitleScreen}>
                <Text style={styles.explotxt}>Explore popular</Text>
            </View>
            {/* The dropDown of View */}
            <View style={styles.DropDown}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Title}>view :</Text>
                    <Text style={styles.value}>{StoreNum}</Text>
                </View>
                <Pressable onPress={Open}>
                    <Ionicons
                        name="chevron-down-outline"
                        style={styles.DropIcon}
                    />
                </Pressable>

            </View>
            <ModelRender />
            {
                isloading === true ? (
                    <>
                        {/* Loading... Untile Date Deliveed */}
                        <View style={styles.Loading}>
                            <ActivityIndicator size={40} color={"#68DDBA"} />
                        </View>
                    </>

                ) : (
                    <>
                        {/* Flatlist For rendering Data */}
                        <FlatList
                            data={RepoData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) =>
                                <DataList Item={item} indx={index} view={StoreNum} />}
                        />
                    </>

                )
            }

        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFCFE",
    },
    TitleScreen: {
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    explotxt: {
        fontSize: 20,
        color: "#000",
        fontWeight: "400",
        marginLeft: 28,
    },
    RepoBox: {
        width: 325,
        height: 222,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 10
    },
    RepoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 20
    },
    Repotype: {
        fontSize: 10,
        fontWeight: "400",
        color: "#7B848D",
        marginTop: 3
    },
    Rating: {
        paddingTop: 2,
        flexDirection: "row",
        paddingLeft: 10
    },
    star: {
        fontSize: 16,
        color: "#68DDBA",
        marginTop: 1
    },
    startxt: {
        fontSize: 12,
        color: "#000",
        fontWeight: "400",
        marginRight: 10
    },
    ViewRateNum: {
        width: 47.44,
        height: 25,
        backgroundColor: "#68DDBA1C",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -3
    },
    RateNum: {
        fontSize: 12,
        color: "#68DDBA",
        textAlign: "center",
        fontWeight: "400"
    },
    RepoName: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15
    },
    RepoiconName: {
        fontSize: 30,
        color: "#68DDBA",
        marginLeft: 15
    },
    name: {
        fontSize: 12.5,
        fontWeight: "400",
        color: "#68DDBA",
        marginLeft: 15,
        width: "70%",
        lineHeight: 20
    },
    RepoDescription: {
        width: 285,
        height: 45,
    },
    Descript: {
        fontSize: 11,
        fontWeight: "400",
        color: "#000",
        textAlign: "auto",
        marginLeft: 20,
        lineHeight: 20
    },
    line: {
        width: 291,
        borderWidth: 0.3,
        borderColor: "#CCc",
        marginTop: 15,
        alignSelf: "center"
    },
    RepoDateSkill: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    language: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000000",
        marginLeft: 55
    },
    UpdateDate: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000000",
        marginLeft: 20
    },
    Loading: {
        flex: 1,
        justifyContent: "center"
    },
    DropDown: {
        width: 160,
        height: 50,
        backgroundColor: "#FFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginLeft: 28,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
        marginTop: -8
    },
    DropIcon: {
        fontSize: 20,
        color: "#000",
        marginRight: 15,
        marginTop: 5
    },
    Title: {
        fontSize: 16,
        fontWeight: "400",
        color: "#7B848D",
        marginLeft: 20
    },
    value: {
        fontSize: 13,
        fontWeight: "400",
        color: "#000",
        marginLeft: 20,
        marginTop: 4,
        textAlign: "left"
    },
    Model: {
        flex: 1,
        justifyContent: "center",
    },
    ModelContent: {
        width: "95%",
        height: "30%",
        backgroundColor: "#FFF",
        borderRadius: 15,
        alignSelf: "center"
    },
    Header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    head: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginLeft: 20
    },
    CloseIcon: {
        fontSize: 25,
        color: "#CCD4DD",
        marginRight: 20
    },
    list: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: "#CCD4DD5E",
        justifyContent: "center",
        alignItems: "center"
    },
    txtmodl: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000"
    }



});

export default Explorepopular;
