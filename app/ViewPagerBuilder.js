import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

export default class ViewPagerBuilder extends Component {

    props: {
        dataSource: object,   //填充数据
        selectedIndex: number,//选择的tab
        itemWidth: number,    //宽度
        itemHeight: number,   //高度
        renderTab: func,      //tab内容
        itemChange: func,     //tab改变回调
    }

    constructor(props) {
        super(props);


        this.state = ({
            dataSource: this.props.dataSource,
            itemWidth: this.props.itemWidth,
            itemHeight: this.props.itemHeight,
            renderTab: this.props.renderTab,
            selectedIndex: this.props.selectedIndex,
            itemChange: this.props.itemChange,
        });
        console.log('constructor() selectedIndex  = '+this.state.selectedIndex);
        this.viewabilityConfig = {
            itemVisiblePercentThreshold: 50
        };
    }

    componentDidMount() {
        if (this.state.selectedIndex !== 0) {
            this._scrollToItem();
        }
    }

    _scrollToItem=()=>{
        setTimeout(() => {
            this.refs.viewPagerBuilder.scrollToIndex({
                animated: false,
                viewPosition: 0,
                index: this.state.selectedIndex
            });
        }, 200)
    }

    componentWillReceiveProps(nextProp) {
        console.log('nextProp.selectedIndex  = '+nextProp.selectedIndex );
        if (nextProp.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProp.selectedIndex,
            });
            this._scrollToItem();
        }
    }

    render() {
        return (
            <View style={{ width: this.state.itemWidth, height: this.state.itemHeight }}>
                <FlatList
                    ref={"viewPagerBuilder"}
                    getItemLayout={(data, index) => this.getItemLayout(data, index)}
                    pagingEnabled={true}
                    data={this.state.dataSource}
                    renderItem={(item) => this._renderItem(item)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    keyExtractor={this._keyExtractor}
                />
                {this.createCircleMarkView(this.state.dataSource)}
            </View>
        );
    }

    _keyExtractor = (item, index) => { return "View-Pager-Builder-" + index; }

    getItemLayout = (data, index) => {
        return {
            length: this.state.itemHeight,
            offset: this.state.itemWidth * index,
            index
        };
    }


    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems !== undefined) {
            if (viewableItems.length > 0) {
                if(this.state.itemChange) {
                    console.log('onViewableItemsChanged viewableItems = '+JSON.stringify(viewableItems));
                    this.state.itemChange(viewableItems[0].index);
                }
                this.setState({ selectedIndex: viewableItems[0].index })
            }
        }
    }

    _renderItem = ({ item }) => {
        return (
            <View style={{ height: this.state.itemHeight, width: this.state.itemWidth,}}>
                {this.state.renderTab(item)}
            </View>
        )
    }

    createCircleMarkView = (dataSource) => {
        let circles = [];
        let size = dataSource.length;
        for (var i = 0; i < size; i++) {
            let index = i;
            circles.push(
                <TouchableOpacity key={"circles_" + index} onPress={() => {
                    console.info("onPress1:::"+index);
                    if (index !== this.state.selectedIndex) {
                        console.info("onPress2:::"+index);
                        setTimeout(() => {
                            this.refs.viewPagerBuilder.scrollToIndex({
                                animated: true,
                                viewPosition: 0,
                                index: index
                            });
                        }, 200);
                    }
                }}>
                    <View style={this._createCircleStyle(index)} />
                </TouchableOpacity>);
        }
        return <View style={{ position: 'absolute', bottom: 12, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', }}>{circles}</View>;
    }

    _createCircleStyle = (index) => {
        console.log('_createCircleStyle selectedIndex = '+this.state.selectedIndex+', index = '+index);
        return {
            width: 7,
            height: 7,
            borderColor: 'white',
            borderStyle: 'solid',
            marginLeft: 6,
            marginRight: 6,
            borderRadius: 3.5,
            backgroundColor: 'white',
            opacity: index === this.state.selectedIndex ? 1 : 0.2,
        }
    }

}

ViewPagerBuilder.defualtProps = {
    selectedIndex: 0
}