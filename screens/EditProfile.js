import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Modal } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from 'react-native-paper';
import { imagesDataURL } from '../Components/data'; 
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { Dimensions } from 'react-native';
import { useTheme } from '../Components/ThemeProvider'; 
import { useTranslation } from 'react-i18next'; // Correct import



const { width, height } = Dimensions.get('window');



export default function EditProfile({ navigation }) {  
  const { t, i18n } = useTranslation(); // Call inside component
  const { darkMode } = useTheme();
  // Initialize with the default image URL from imagesDataURL
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [name, setName] = useState("Altea Kapxhiu");
  const [email, setEmail] = useState("alteakapxhiu@gmail.com");
  const [password, setPassword] = useState("vendos paskodin");
  const [country, setCountry] = useState("Shqiperi");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(today.setFullYear(today.getFullYear() - 100), "YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1999");
  const [startedDate, setStartedDate] = useState("12/12/2024");

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleImageSelection = async () => {
    // Request permission if needed (optional)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Ndjese, duhet te lejoni aksesin ne galeri qe te vazhdojme!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use Images if you only want images
      allowsEditing: true,
      aspect: [5, 4],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri); // Update to the selected image URI
    }
  };

  function renderDatePicker() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={openStartDatePicker}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{
            margin: 20, backgroundColor: '#5DA2A9', alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 35, width: "90%", shadowColor: '#000', shadowOffset: {
              width: 0, height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: '#5DA2A9',
                textHeaderColor: '#F1FCFB',
                textDefaultColor: '#F1FCFB',
                selectedTextColor: '#5DA2A9',
                mainColor: "#42767B",
                textSecondaryColor: "#42767B",
                borderColor: "#42767B"
              }}
            />

<View>
  <TouchableOpacity onPress={handleOnPressStartDate}>
    <Text style={{fontSize:20,color:'#F1FCFB',borderColor:'#F1FCFB',borderWidth: 0.5,
    borderRadius: 5,padding:5}}>
      Close
    </Text>
  </TouchableOpacity>
</View>

          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ flex: 1, backgroundColor: darkMode ? '#000000' : '#F1FCFB'}}>
        
      </View>
      <View style={styles.header} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color='#5DA2A9' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("Ndrysho Profilin")}</Text>
      </View>
            <View style={ {height: 1, width: '100%',backgroundColor: '#5DA2A9',  marginVertical: 10,}} />

      <ScrollView contentContainerStyle={{bottom: height * 0.08, flexGrow: 1,justifyContent: 'flex-start',paddingVertical: height * 0.06,backgroundColor: darkMode ? '#000000' : '#F1FCFB'}}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <MaterialIcons name="photo-camera" size={32} color='#5DA2A9' />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ paddingLeft:20, flexDirection: 'column', marginBottom: 6 }}>
            <Text style={{ fontSize: 15 ,padding:10, fontWeight:"700",color:"#42767B"}}>{t("Emri")}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={value => setName(value)}
                editable={true}
              />
            </View>
          </View>
          <View style={{ paddingLeft:20,flexDirection: 'column', marginBottom: 6 }}>
            <Text style={{ fontSize: 15 ,padding:10, fontWeight:"700",color:"#42767B"}}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={value => setEmail(value)}
                editable={true}
              />
            </View>
          </View>
          <View style={{ paddingLeft:20, flexDirection: 'column', marginBottom: 6 }}>
            <Text style={{ fontSize: 15 ,padding:10, fontWeight:"700",color:"#42767B"}}>{t("Fjalekalimi")}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={value => setPassword(value)}
                editable={true}
                secureTextEntry
              />
            </View>
          </View>
          <View style={{ paddingLeft:20,flexDirection: 'column', marginBottom: 6 }}>
            <Text style={{ fontSize: 15 ,padding:10, fontWeight:"700",color: "#42767B"}}>{t("Datelindje")}</Text>
            <TouchableOpacity onPress={handleOnPressStartDate} style={styles.inputContainer}>
              <Text  style={styles.textInput1}>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingLeft:20, flexDirection: 'column', marginBottom: 6 }}>
            <Text style={{ fontSize: 15 ,padding:10 ,fontWeight:"700",color:"#42767B"}}>{t("Vendi")}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder='Shqiperi'
                placeholderTextColor={{color:'#fff'}}
                value={country}
                onChangeText={value => setCountry(value)}
                editable={true}
              />
            </View>
          </View><View style={{alignItems:'center',padding:20,
            justifyContent:'center'}}>
          <TouchableOpacity 
          style={{backgroundColor: '#5DA2A9',
            height : 44,
            width:'60%',
            borderRadius: 6,
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text style={{fontWeight:'700',fontsize:20,color:'#F1FCFB'}}>
              {t("Ruaj Ndryshimet")}
            </Text>
          </TouchableOpacity></View>
        {renderDatePicker()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F1FCFB',
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  container: {
   
  },
  header: {
    marginHorizontal:  height * 0.02,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    
    
  },
  backButton: {
    position: "absolute",
    left: 0,
    paddingTop: height * 0.02, 
    
  },
  headerTitle: {
    fontSize: width * 0.06,
    paddingBottom: height * 0.01,
    paddingTop: height * 0.02,
    fontWeight:'500',  // Adjusted for responsiveness
  },
  imageContainer: {
    bottom:0, 
    alignItems: "center",
    marginVertical: height * 0.03, // Responsive margin
  },
  profileImage: {
    height: width * 0.4, // 40% of screen width
    width: width * 0.4,
    borderRadius: width * 0.2,
    borderWidth: 2,
    borderColor: '#5DA2A9',
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  scrollViewContent: {
    bottom: height * 0.08, 
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingVertical: height * 0.06, // Responsive padding
  },
 
  textInput: {
    height: 40,
    width: '95%',
    backgroundColor: 'transparent',
    borderColor: '#5DA2A9',
    borderWidth: 1,
    fontWeight:'200',
    borderRadius: 4,
    paddingLeft: 5,
  },
  textInput1: {
    paddingTop: 10,
    height: 40,
    width: '95%',
    fontWeight:'200',
    backgroundColor: 'transparent',
    borderColor: '#5DA2A9',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 20,
  },
  submitButton: {
    backgroundColor: '#5DA2A9',
    height: 44,
    width: '60%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.03,
  },
  submitButtonText: {
    fontWeight: '700',
    fontSize: width * 0.05, // Responsive font size
  },
});


