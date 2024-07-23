import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from '../Components/task';
import axios from '../assets/axios';
import { useTheme } from '../Components/ThemeProvider'; // Adjust the path as needed
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { darkMode } = useTheme();
    const { t } = useTranslation();
    
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Personale'); // Default category

    const addTodo = () => {
        if (task.trim() === '') return;
        const newTask = { id: Date.now(), text: task, completed: false, category: selectedCategory };
        setTaskItems([...taskItems, newTask]);
        setTask('');
    };

    const completeTask = (id) => {
        const updatedTasks = taskItems.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setTaskItems(updatedTasks);
    };

    const editTask = () => {
        if (!editingId) return;

        const updatedTasks = taskItems.map(item =>
            item.id === editingId ? { ...item, text: task } : item
        );
        setTaskItems(updatedTasks);
        setTask('');
        setEditingId(null);
    };

    const handleToDelete = (id) => {
        setTaskItems(prevState => prevState.filter(item => item.id !== id));
    };

    const filteredTasks = taskItems.filter(item => item.category === selectedCategory);

    return (
        <View style={{ flex: 1, backgroundColor: darkMode ? '#000000' : '#F1FCFB', paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={styles.tasksWrapper}>
                <Text style={{ fontSize: 32, fontWeight: '700', color: darkMode ? '#eee' : '#000000' }}>
                    {t("TaskTittle")}
                </Text>
                <View style={{ height: 1, width: '100%', backgroundColor: darkMode ? '#5DA2A9' : '#5DA2A9', marginVertical: 10 }} />
                <Text style={styles.subtitle}>{t("Subtittle")}</Text>
                
                <View style={styles.categories}>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Pune' && styles.selectedCategoryButton]}
                        onPress={() => setSelectedCategory('Pune')}
                    >
                        <Text style={{ color: darkMode ? '#fff' : '#000000' }}>{t("Work")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Personale' && styles.selectedCategoryButton]}
                        onPress={() => setSelectedCategory('Personale')}
                    >
                        <Text style={{ color: darkMode ? '#fff' : '#000000' }}>{t("Personal")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.categoryButton, selectedCategory === 'Shkolle' && styles.selectedCategoryButton]}
                        onPress={() => setSelectedCategory('Shkolle')}
                    >
                        <Text style={{ color: darkMode ? '#fff' : '#000000' }}>{t("School")}</Text>
                    </TouchableOpacity>
                </View>
                
                <FlatList
                    style={styles.taskList}
                    data={filteredTasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => completeTask(item.id)}>
                            <Task
                                text={item.text}
                                onEdit={() => {
                                    setTask(item.text);
                                    setEditingId(item.id);
                                }}
                                onToggle={() => completeTask(item.id)}
                                onDelete={() => handleToDelete(item.id)}
                                completed={item.completed}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    maxLength={200}
                    style={styles.input}
                    placeholder={t("TaskInputField")}
                    value={task}
                    onChangeText={text => setTask(text)}
                />
                <TouchableOpacity onPress={editingId !== null ? editTask : addTodo}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>{editingId !== null ? '✓' : '+'}</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    tasksWrapper: {
        paddingTop: 20,
        paddingHorizontal: 15,
        flex: 1,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#666',
        paddingBottom: 25,
    },
    taskList: {
        marginTop: 20,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#71E3DD',
    },
    selectedCategoryButton: {
        backgroundColor: '#71E3DD',
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 60,
        borderColor: '#71E3DD',
        borderWidth: 1,
        width: 260,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#71E3DD',
        borderWidth: 1,
    },
    addText: {},
});

export default Home;
