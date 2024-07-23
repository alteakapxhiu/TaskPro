import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch, Linking, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../Components/ThemeProvider'; // Adjust the path as needed
import { useTranslation } from 'react-i18next'; // Correct import

export default function Settings({ navigation }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t, i18n } = useTranslation(); // Call inside component

  const [form, setForm] = useState({
    language: 'English',
    darkmode: darkMode,
    wifi: false,
  });

  const handlePress = async (itemId) => {
    switch (itemId) {
      case 'contact':
        const url = 'mailto:alteakapxhiu@gmail.com';
        try {
          const canOpen = await Linking.canOpenURL(url);
          if (canOpen) {
            await Linking.openURL(url);
          } else {
            Alert.alert('Error', 'Cannot open email client');
          }
        } catch (error) {
          console.error('Error opening email client:', error);
          Alert.alert('Error', 'Failed to open email client');
        }
        break;
      case 'bug':
        Alert.alert('Sukses !', 'Problemi u raportua');
        break;
      case 'language':
        Alert.alert(
          'Select Language',
          'Choose a language',
          [
            { text: 'Albanian', onPress: () => { i18n.changeLanguage('al'); Alert.alert('Gjuha u ndryshua !', 'Gjuha ndryshoi ne Shqip !'); } },
            { text: 'English', onPress: () => { i18n.changeLanguage('en'); Alert.alert('Language Changed', 'Language switched to English'); } },
            { text: 'French', onPress: () => { i18n.changeLanguage('fr'); Alert.alert('Langue modifiée !', ' La langue est passée au français !'); } },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        break;
      case 'save':
        Alert.alert('Sukses !', 'Ndryshimet u ruajten');
        break;
      case 'download':
        Alert.alert('Sukses !', 'Te dhenat u shkarkuan');
        break;
      default:
        console.log('Dicka e panjohur');
    }
  };

  const getSections = () => [
    {
      header: t('Preferences'),
      items: [
        { id: 'language', icon: 'globe', label: t('Gjuha'), type: 'link' },
        { id: 'darkmode', icon: 'moon', label: t('Ndrysho Sfondin'), type: 'toggle' },
        { id: 'wifi', icon: 'wifi', label: t('Perdor Wi-Fi'), type: 'toggle' },
      ],
    },
    {
      header: t('Help'),
      items: [
        { id: 'bug', icon: 'flag', label: t('Raporto nje problem'), type: 'link' },
        { id: 'contact', icon: 'mail', label: t('Me Kontakto'), type: 'link' },
      ],
    },
    {
      header: t('Content'),
      items: [
        { id: 'save', icon: 'save', label: t('Ruaj'), type: 'link' },
        { id: 'download', icon: 'download', label: t('Shkarko'), type: 'link' },
      ],
    },
  ];

  const SECTIONS = getSections();

  const renderItem = ({ icon, label, id, type }) => (
    <View style={[styles.rowWrapper, { backgroundColor: darkMode ? '#333' : '#F1FCFB', borderColor: darkMode ? '#444' : '#e3e3e3' }]} key={id}>
      <TouchableOpacity onPress={() => handlePress(id)}>
        <View style={styles.row}>
          <FeatherIcon
            name={icon}
            color={darkMode ? '#eee' : '#333'}
            size={22}
            style={{ marginRight: 12 }}
          />
          <Text style={[styles.rowLabel, { color: darkMode ? '#eee' : '#333' }]}>{label}</Text>
          <View style={styles.rowSpacer} />
          {type === 'toggle' && (
            <Switch
              value={form[id]}
              onValueChange={(value) => {
                setForm({ ...form, [id]: value });
                if (id === 'darkmode') {
                  toggleDarkMode();
                }
              }}
            />
          )}
          {['link', 'select'].includes(type) && (
            <FeatherIcon
              name="chevron-right"
              color={darkMode ? '#ababab' : '#333'}
              size={22}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: darkMode ? '#eee' : '#333' }]}>{t("Settings")}</Text>
          <View style={{ height: 1, width: '100%', backgroundColor: darkMode ? '#888' : '#5DA2A9', marginVertical: 10 }} />
          <Text style={[styles.subtitle, { color: darkMode ? '#ccc' : '#666' }]}>{t("SSubtittle")}</Text>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: darkMode ? '#eee' : '#a7a7a7' }]}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map((item) => renderItem(item))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 15,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    backgroundColor: '#F1FCFB',
  },
  rowWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 16,
    flex: 1,
  },
  rowSpacer: {
    width: 16,
  },
});
