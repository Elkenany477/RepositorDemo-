import * as React from 'react';

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    FlatList,
    Pressable,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { Fetch_Data_Repository } from '../../Redux/Action/Type'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";


{/* The Content of Date rendering in Flatlist */ }
const RepoList = ({ Item, indx, language, date }) => {
    // let CovertDate = new Date(date);
    // console.log(CovertDate)
    if (language == "" && date == "") {
        return (
            <View style={styles.Box}>
                <View style={styles.RepoTitleView}>
                    <IconMaterialCommunityIcons
                        name="notebook-outline"
                        style={styles.RepoIcon}
                    />
                    <Text
                        style={styles.RepoName}>
                        {Item.name}
                    </Text>
                </View>
                <View style={styles.DescriptionView}>
                    <Text style={styles.Descrittxt}>
                        {Item.description}
                    </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.Skils}>
                    <Text style={styles.Language}>{Item.language}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                        <IconMaterialCommunityIcons
                            name="star-outline"
                            style={styles.Rate}
                        />
                        <Text style={styles.RateNum}>{Item.stargazers_count}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                        <Ionicons
                            name="git-network-outline"
                            style={styles.lanicon}
                        />
                        <Text style={styles.lanNum}>{Item.forks}</Text>
                    </View>
                </View>
            </View>
        )

    } else if (language == Item.language && date == Item.updated_at) {
        return (
            <View style={styles.Box}>
                <View style={styles.RepoTitleView}>
                    <IconMaterialCommunityIcons
                        name="notebook-outline"
                        style={styles.RepoIcon}
                    />
                    <Text
                        style={styles.RepoName}>
                        {Item.name}
                    </Text>
                </View>
                <View style={styles.DescriptionView}>
                    <Text style={styles.Descrittxt}>
                        {Item.description}
                    </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.Skils}>
                    <Text style={styles.Language}>{Item.language}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                        <IconMaterialCommunityIcons
                            name="star-outline"
                            style={styles.Rate}
                        />
                        <Text style={styles.RateNum}>{Item.stargazers_count}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                        <Ionicons
                            name="git-network-outline"
                            style={styles.lanicon}
                        />
                        <Text style={styles.lanNum}>{Item.forks}</Text>
                    </View>
                </View>
            </View>
        )
    }

}


const Repositories = () => {
    const [Modellangvisable, setModellangvisable] = React.useState(false);
    const [ModelDatevisable, setModelDatevisable] = React.useState(false);
    const [StorLang, setStorLang] = React.useState("");
    const [StorDate, setStorDate] = React.useState("");
    {/* useselector for connect Redux with React */ }
    const Reposity = useSelector((state) => state.Reposity);
    const { RepoData, isloading, error } = Reposity

    const [Searchtxt, setSearchtxt] = React.useState("");
    const [FilterdDate, setFilterdDate] = React.useState(RepoData);
    const [masterData, setmasterData] = React.useState(RepoData);

    console.log(Searchtxt)

    const SearchFilter = (text) => {
        if (text) {
            const newData = [...masterData].filter((item) => {
                const itemData = item.language ? item.language.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1;

            })
            setFilterdDate(newData);
            setSearchtxt(text)
        } else {
            setFilterdDate(masterData);
            setSearchtxt(text)
        }

    }





    {/* using Dispatch for sending action to reducer for change on state */ }
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(Fetch_Data_Repository());
    }, [])

    {/* show langModel */ }
    const show = () => {
        setModellangvisable(true)
    }

    {/* Hide langModel */ }

    const colse = () => {
        setModellangvisable(false)
    }
    {/* Search Function */ }


    {/* Language Filter Model DropDown */ }

    const DropLanguage = () => {
        return (
            <Modal
                isVisible={Modellangvisable}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <View style={styles.langModel}>
                        <View style={styles.headerView}>
                            <Text style={styles.head}>Select Language</Text>
                            <Pressable onPress={colse}>
                                <IconMaterialCommunityIcons
                                    name="close-circle"
                                    style={styles.CloseIcon}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.textinput}>
                            <TextInput
                                placeholder='Filter language'
                                placeholderTextColor={"#7B848D"}
                                style={styles.search}
                                value={Searchtxt}
                                onChangeText={(value) => {
                                    SearchFilter(value)
                                }}

                            />
                            <Ionicons
                                name="search-outline"
                                style={styles.searchAction}
                            />
                        </View>

                        <ScrollView>
                            {
                                [...FilterdDate].map((item, index) => {
                                    return (

                                        (item.language) != null ? (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => {
                                                    setStorLang(item.language)
                                                    setModellangvisable(false)
                                                }}
                                                style={styles.langview}>
                                                <Text style={styles.langtxt}>{item.language}</Text>
                                            </TouchableOpacity>
                                        ) : (null)



                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </View>
            </Modal>
        )
    }


    {/* Date modele DropDown */ }
    const DateModel = () => {
        return (
            <Modal
                isVisible={ModelDatevisable}
            >
                <View style={styles.ModelDate}>
                    <View style={styles.DateContent}>
                        <View style={styles.DateHeader}>
                            <Text style={styles.head}>Slelect Date</Text>
                            <Pressable onPress={() => {
                                setModelDatevisable(false)
                            }}>
                                <IconMaterialCommunityIcons
                                    name="close-circle"
                                    style={styles.CloseIcon}
                                />
                            </Pressable>
                        </View>
                        <ScrollView>
                            {
                                [...RepoData].map((item, index) => {
                                    const date = new Date(item.updated_at).toDateString();
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => {
                                                setStorDate(item.updated_at)
                                                setModelDatevisable(false)
                                            }}
                                            key={index}
                                            style={styles.DataDiplay}>
                                            <Text style={styles.Datetxt}>{date}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

            </Modal>
        )
    }
    return (
        <View style={styles.container}>
            {/* The Title of Page */}
            <View style={styles.TitleScreen}>
                <Text style={styles.Repotxt}>Repositories</Text>
            </View>
            {/* The dropDown of View for to items Date and Language */}

            <View style={styles.DropViewContainer}>
                <View style={styles.DropDownLangu}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Title}>Language :</Text>
                        <Text style={styles.value}>{StorLang}</Text>
                    </View>
                    <Pressable onPress={show}>
                        <Ionicons
                            name="chevron-down-outline"
                            style={styles.DropIcon}
                        />
                    </Pressable>

                </View>
                <View style={styles.DropDownDate}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Title}>Date :</Text>
                        <Text style={styles.value}>{StorDate.slice(0, 10)}</Text>
                    </View>
                    <Pressable onPress={() => {
                        setModelDatevisable(true)
                    }}>
                        <Ionicons
                            name="chevron-down-outline"
                            style={styles.DropIcon}
                        />
                    </Pressable>

                </View>
                {/* Lang Model DropDown */}
                <DropLanguage />
                <DateModel />
            </View>

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
                                <RepoList Item={item} indx={index} language={StorLang} date={StorDate} />}
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
    Repotxt: {
        fontSize: 20,
        color: "#000",
        fontWeight: "400",
        marginLeft: 25,
    },
    Loading: {
        flex: 1,
        justifyContent: "center"
    },
    Box: {
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
    RepoTitleView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25
    },
    RepoIcon: {
        fontSize: 30,
        color: "#68DDBA",
        marginLeft: 15
    },
    RepoName: {
        fontSize: 14,
        fontWeight: "400",
        color: "#68DDBA",
        marginLeft: 15,
        width: "70%",
        lineHeight: 18,
        // letterSpacing: 0.4
    },
    DescriptionView: {
        width: 285,
        height: 45,
    },
    Descrittxt: {
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
        marginTop: 25,
        alignSelf: "center"
    },
    Skils: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    Rate: {
        fontSize: 16,
        color: "#68DDBA",
        marginTop: 1
    },
    RateNum: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000"
    },
    lanicon: {
        fontSize: 16,
        color: "#68DDBA",
        marginTop: 1
    },
    lanNum: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000"

    },
    Language: {
        fontSize: 15,
        fontWeight: "400",
        color: "#000",
        marginLeft: 20
    },
    DropViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    DropDownLangu: {
        width: 150,
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
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
        marginTop: -8,
        marginLeft: 15
    },
    DropDownDate: {
        width: 150,
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
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
        marginTop: -8,
        marginRight: 15
    },
    DropIcon: {
        fontSize: 20,
        color: "#000",
        marginRight: 15,
        marginTop: 5
    },
    Title: {
        fontSize: 12,
        fontWeight: "400",
        color: "#7B848D",
        marginLeft: 15
    },
    value: {
        fontSize: 8,
        fontWeight: "400",
        color: "#000",
        marginLeft: 5,
        textAlign: "left",
        marginTop: 4

    },

    langModel: {
        width: 325,
        height: 340,
        backgroundColor: "#FFFFFF",
        alignSelf: "center",
        borderRadius: 15
    },
    headerView: {
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
    textinput: {
        width: 288,
        height: 45,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CCD4DD",
        borderRadius: 10,
        marginVertical: 30
    },
    search: {
        width: 180,
        height: 40,
        paddingLeft: 20,
        color: "#000",
        fontSize: 12,
        fontWeight: "400"
    },
    searchAction: {
        fontSize: 20,
        color: "#7B848D",
        marginRight: 20
    },
    langview: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: "#CCD4DD5E",
        justifyContent: "center"
    },
    langtxt: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
        marginLeft: 40
    },
    ModelDate: {
        flex: 1,
        justifyContent: "center"
    },
    DateContent: {
        width: 325,
        height: 441,
        backgroundColor: "#FFFFFF",
        alignSelf: "center",
        borderRadius: 15,
        padding: 15
    },
    DateHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    DataDiplay: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: "#CCD4DD5E",
        justifyContent: "center"
    },
    Datetxt: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
        marginLeft: 20
    }

});

export default Repositories;






