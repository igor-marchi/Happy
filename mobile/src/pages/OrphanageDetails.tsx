import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';


import mapMarkerImg from '../images/map-marker.png';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

interface IOrphanageDetailsRouteParams{
  id: number;
}

interface IOrphanage{
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean,
  images: Array<{
    id: number;
    url: string;
  }>;
}

const OrphanagesDetails: React.FC = () => {
  const route = useRoute();
  const [orphanage, setOrphanages] = useState<IOrphanage>();
  const { id } = route.params as IOrphanageDetailsRouteParams;

  useEffect(() => {
    api.get(`orphanages/${id}`).then(response => {
      setOrphanages(response.data);
    })
  }, [id]);

  if (!orphanage) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    )
  }

  function handleOpenGoogleMapsRoutes () {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`)
  }

  return (
    <ScrollView style={ styles.container } >
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled >
          {orphanage.images.map(image => (
            <Image 
              key={image.id}
              style={styles.image} 
              source={{ uri: image.url}} 
            />
          ))}
        </ScrollView>
      </View>

      <View style={ styles.detailsContainer } >
        <Text style={styles.title} >{orphanage.name}</Text>
        <Text style={styles.description} >{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.latitude),
              }}
            />
          </MapView>

          <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
              <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name='clock' size={40} color="#2ab5d1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda a sexta {orphanage.opening_hours}
            </Text>
          </View>
          
          {orphanage.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name='info' size={40} color="#2ab5d1" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Atendemos de fim de semana
              </Text>
            </View>
          ): (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name='info' size={40} color="#ff669d" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não atendemos de fim de semana
              </Text>
            </View>
          )}
        </View>
        
        {/* <RectButton style={styles.contactButton}>
          <FontAwesome name="whatsapp" size={40} color={"#fff"} />
          <Text style={styles.contactTextButton}>Atendemos de fim de semana</Text>
        </RectButton> */}

      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    height: 240,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 24,
  },
  title: {
    color: '#4d6f80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },
  description: {
    color: '#5c8599',
    fontFamily: 'Nunito_600SemiBold',
    lineHeight: 24,
    marginTop: 16,
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#b3dae2',
    marginTop: 40,
    backgroundColor: '#e6f7fb',
  },
  mapStyle: {
    width: '100%',
    height: 150,
  },
  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
  },
  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#d3e2e6',
    marginVertical: 40,
  },
  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleItem: {
    width: '48%',
    padding: 20,
  },
  scheduleItemBlue: {
    backgroundColor: '#e6f7fb',
    borderWidth: 1,
    borderColor: '#b3dae2',
    borderRadius: 20,
  },
  scheduleItemGreen: {
    backgroundColor: '#edfff6',
    borderWidth: 1,
    borderColor: '#A1e9c5',
    borderRadius: 20,
  },
  scheduleItemRed: {
    backgroundColor: '#fef6f9',
    borderWidth: 1,
    borderColor: '#ffbcd4',
    borderRadius: 20,
  },
  scheduleTextGreen: {
    color: '#37c775',
  },
  scheduleTextRed: {
    color: '#ff669d',
  },
  scheduleTextBlue: {
    color: '#5c8599',
  },
  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },
  contactButton: {
    backgroundColor: '#3cdc8c',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },
  contactTextButton: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  
});

export default OrphanagesDetails;