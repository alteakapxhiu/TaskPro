import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../Components/ThemeProvider'; // Adjust the path as needed
import { useTranslation } from 'react-i18next'; // Correct import


export default function Profile({ navigation }) {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const background = 'https://i.pinimg.com/474x/74/0e/cb/740ecb78aa4c10cb0a2170ea2350c337.jpg';
  
  const editProfileItem = {
    
    text: t("Ndrysho Profilin"),
    action: () => navigation.navigate("EditProfile"),
    style: {
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: '#5DA2A9',
      height: '20%',
      width: '42%',
      borderRadius: 10,
      top: '-16%',
      paddingLeft: 30,
      marginHorizontal: '30%',
    },
    textStyle: {
      
      color: '#FFF',
    }
  };
  
  const securityItem = {
    icon: "security",
    text: t("Siguria"),
    action: () => console.log("Funksion Sigurie"),
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: 'transparent',
      height: 44,
      width: '40%',
      borderRadius: 10,
      padding: 5,
    },
    textStyle: {
      paddingLeft:'10%',
      color: darkMode ? '#F1FCFB' : '#5DA2A9'
    }
  };
  
  const notificationsItem = {
    icon: "notifications-none",
    text: t("Njoftimet"),
    action: () => console.log("Kontrollo Njoftimet"),
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      backgroundColor: 'transparent',
      height: 44,
      width: '40%',
      borderRadius: 10,
      padding: 5,
    },
    textStyle: {
      paddingLeft:'10%',
      color: darkMode ? '#F1FCFB' : '#5DA2A9'
    }
  };
  
  const privacyItem = {
    icon: "lock-outline",
    text: t("Privatesia"),
    action: () => console.log("Kontrollo Privatesine"),
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: 'transparent',
      height: 44,
      width: '40%',
      borderRadius: 10,
      padding: 5,
    },
    textStyle: {
      paddingLeft:'10%',
      color: darkMode ? '#F1FCFB' : '#5DA2A9'
    }
  };
  
  const accountItems = [editProfileItem, securityItem, notificationsItem, privacyItem];

  const renderProfileItem = ({ icon, text, action, style, textStyle }) => (
    <TouchableOpacity style={style} onPress={action}>
      {icon && <MaterialIcons name={icon} size={24} color={darkMode ? '#F1FCFB' : '#5DA2A9' }/>}
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111' : '#F1FCFB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} />
      </View>
      <StatusBar backgroundColor={'#5DA2A9'} />
      

      <ScrollView style={styles.scrollView}><View style={styles.profileSection}><View style={{
         
          backgroundColor : darkMode ? '#C2FEF6' : '#256872', 
          opacity: 0.5,
          width: '100%',
          height: '40%',
          flex: 1,
          justifyContent: 'center',
          position:'absolute',
          alignItems: 'center',
          marginTop:100,
        }}>
      </View>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#eee' : '#333' }]}>{t("Profili")}</Text>
          <View style={{ height: 1, width: '100%', backgroundColor: darkMode ? '#888' : '#5DA2A9', marginVertical: 10 }} /><View style={styles.footer}>
        <Image
          source={{ uri: background }}
          resizeMode='contain'
          style={styles.backgroundImage}
        />
        <Text style={{fontSize:15,fontWeight:'500',marginVertical:8,paddingBottom:10, color: darkMode ? '#eee' : '#5DA2A9'}}>Altea Kapxhiu</Text>
      
        </View>

      </View>
      <View style={styles.profileSection}>
          
          <View style={{backgroundColor: darkMode ? '#333' : '#F1FCFB',borderRadius: 12,marginTop:55}}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderProfileItem(item)}
              </React.Fragment>
            ))}
          </View><View style={{
          backgroundColor: '#CAD8DB',
          opacity: 0.7,
          width: '100%',
          height: '11%',
          flex: 1,
          padding:5,
          position:'absolute',
          alignItems: 'stretch',
          marginTop:50,
        }}><Text style={styles.subtitle}>{t("Perditesoni kredencialet tuaja ketu")}</Text></View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FCFB',
  },
  header: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  profileImageContainer: {
    width: '100%',
    
  },
  profileImage: {
    height: 228,
    width: "100%",
    position:'absolute',
    marginTop : 10,
  },
  scrollView: {
    marginHorizontal: 12,
  },
  profileSection: {
    marginBottom: 12,
    
  },
  sectionTitle: {
    marginVertical: 10,
    fontSize: 32,
    fontWeight: '700',
    paddingLeft: 10,
    paddingTop: 15,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#5DA2A9',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    fontWeight: '500',
    color: '#626161',
  },

  footer: {
    flex: 1,
    alignItems: "center",
  },

  backgroundImage: {
    height: 150,
    width: 150,
    borderRadius: 99,
    borderColor: '#5DA2A9',
    borderWidth: 2,
   justifyContent:'center',
   marginTop : 70,
   
    
  },

});
