import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Modal } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useTheme } from '../Components/ThemeProvider'; // Adjust the path as needed
import { useTranslation } from 'react-i18next'; // Correct import
import { Picker } from '@react-native-picker/picker'; // Ensure correct import

export default function Portfolio() {
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const [items, setItems] = useState({
    '2024-07-21': [{ name: 'Seminar' }],
    '2024-07-22': [{ name: 'Takim ne pune' }],
    '2024-07-25': [{ name: 'Workshop' }],
  });

  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [isPickerVisible, setPickerVisibility] = useState(false);

  const handleAddEvent = () => {
    if (newEventName.trim() && newEventDate.trim()) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(newEventDate)) {
        alert('Ju lutem vendosni daten ne formatin YYYY-MM-DD.');
        return;
      }

      const updatedItems = {
        ...items,
        [newEventDate]: [...(items[newEventDate] || []), { name: newEventName }],
      };
      setItems(updatedItems);

      setNewEventName('');
      setNewEventDate('');
    } else {
      alert('Ju lutem vendosni Emrin dhe Daten.');
    }
  };

  const handleConfirmDate = (date) => {
    setNewEventDate(date.toISOString().split('T')[0]);
    setPickerVisibility(false);
  };

  const renderItem = (item) => (
    <TouchableOpacity style={[styles.item, { backgroundColor: darkMode ? '#5DA2A9' : '#5DA2A9' }]}>
      <Text style={[styles.itemText, { color: darkMode ? '#F1FCFB' : '#333' }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const theme = {
    light: {
      agendaDayTextColor: '#5DA2A9',
      agendaDayNumColor: '#5DA2A9',
      agendaTodayColor: '#5DA2A9',
      agendaKnobColor: '#5DA2A9',
      monthTextColor: 'black',
      indicatorColor: '#5DA2A9',
      dotColor: '#F1FCFB',
      selectedDayBackgroundColor: '#5DA2A9',
      arrowColor: '#5DA2A9',
      currentDate: '#5DA2A9',
    },
    dark: {
      agendaDayTextColor: '#5DA2A9',
      agendaDayNumColor: '#5DA2A9',
      agendaTodayColor: '#5DA2A9',
      agendaKnobColor: '#5DA2A9',
      monthTextColor: 'black',
      indicatorColor: '#5DA2A9',
      dotColor: '#333',
      selectedDayBackgroundColor: '#5DA2A9',
      arrowColor: '#ddd',
      currentDate: '#5DA2A9',
    },
  };
  const currentTheme = darkMode ? theme.dark : theme.light;

  // Generate dates for the picker (this is a simplified example)
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 1000; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111' : '#F1FCFB' }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: darkMode ? '#ddd' : '#333' }]}>{t("Kalendari")}</Text>
          <View style={styles.separator} />
          <Text style={[styles.subtitle, { color: darkMode ? '#aaa' : '#666' }]}>
            {t("Perzgjidhni eventet gjate dites suaj ketu")}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { borderColor: darkMode ? '#5DA2A9' : '#5DA2A9', color: darkMode ? '#F1FCFB' : '#333' }]}
              placeholder={t("Emri i eventit")}
              placeholderTextColor={darkMode ? '#888' : '#ccc'}
              value={newEventName}
              onChangeText={setNewEventName}
            />
            <TouchableOpacity
              onPress={() => setPickerVisibility(true)}
              style={[styles.input, { borderColor: darkMode ? '#5DA2A9' : '#5DA2A9', justifyContent: 'center' }]}>
              <Text style={[styles.inputText, { color: darkMode ? '#F1FCFB' : '#333' }]}>
                {newEventDate || t('Zgjidh daten e eventit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddEvent} style={[styles.button, { backgroundColor: darkMode ? '#5DA2A9' : '#5DA2A9' }]}>
              <Text style={styles.buttonText}>{t("SHTO EVENTIN")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.agendaContainer}>
            <Agenda
              theme={currentTheme}
              style={styles.agenda}
              items={items}
              renderItem={renderItem}
              renderEmptyData={() => (
                <View style={styles.emptyData}>
                  <Text>{t("Sot s'ka asnje event te shenuar")}</Text>
                </View>
              )}
            />
          </View>
        </View>
        <Modal
          visible={isPickerVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setPickerVisibility(false)}
        >
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={newEventDate}
              style={styles.picker}
              onValueChange={(itemValue) => setNewEventDate(itemValue)}
            >
              {generateDates().map(date => (
                <Picker.Item key={date} label={date} value={date} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => setPickerVisibility(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>{t("ZGJIDH")}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FCFB',
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  agendaContainer: {
    height: '80%',
  },
  agenda: {
    backgroundColor: 'transparent', // Adjust as needed
  },
  header: {
    marginBottom: 12,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#5DA2A9',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
  },
  item: {
    borderRadius: 5,
    padding: 15,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
  },
  itemText: {
    fontSize: 18,
  },
  title: {
    paddingTop: 20,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  emptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5DA2A9',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F1FCFB',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: 300,
    height: 200,
    backgroundColor: '#FFF',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#5DA2A9',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
