import React from 'react';
import { Modal, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import {
    BottomSheetBehavior,
    CoordinatorLayout
} from 'react-native-bottom-sheet-behavior'

const getAnId = () => '_' + Math.random().toString(36).substr(2, 9);

const { width } = Dimensions.get('window');

export default class App extends React.Component {
    constructor(props)  {
        super(props);
        this.state = { markers: [
            {
                id: getAnId(),
                coordinate: {
                    latitude: -23.809566,
                    longitude: -46.844695
                },
                title: "Ponto de onibus"
            }
        ]};
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((e) => {
            this.setState({geolocation: {
                coordinate: e.coords,
                title: "Você"
            }})
            navigator.geolocation.watchPosition((e) => {
                this.setState({geolocation: {
                    coordinate: e.coords,
                    title: "Você"
                }})
            },
                                                (error) => console.log(error), { enableHighAccuracy: true });
        },
        (error) => console.log(error));
    }

    handleSlide(e) {
        this.offset = e.nativeEvent.offset
    }

    handleBottomSheetChange(e) {
        this.lastState = e.nativeEvent.state
    }

  // { this.state.geolocation &&
  //   <Marker
  //   coordinate={this.state.geolocation.coordinate}
  //   centerOffset={{x: 0, y: 0}}
  //   title={this.state.geolocation.title}
  //   image={flagPinkImg}
  //   />}
    render() {
        return (
            <CoordinatorLayout style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_DEFAULT}
                    onPress={(e) =>  {
                            this.setState({markers: [...this.state.markers, {
                                id: getAnId(),
                                title: "olar",
                                description: "olarawoidajoj",
                                coordinate: e.nativeEvent.coordinate}]});
                    }}
                    initialRegion={{
                        latitude: -23.809566,
                        longitude: -46.844695,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {this.state.markers.map(marker => (
                        <Marker
                            key={marker.id}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
            <BottomSheetBehavior
            peekHeight={80}
            hideable={false}
            onSlide={this.handleSlide}
            onStateChange={this.handleBottomSheetChange}>
            <View style={styles.bottomSheet}>
                <View style={styles.bottomSheetHeader}>
                    <Text style={styles.label}>BottomSheetBehavior !</Text>
                </View>
                <View style={styles.bottomSheetContent}>
                </View>
            </View>
            </BottomSheetBehavior>
            </CoordinatorLayout>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
