import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <View style={styles.textWrapper}>
                    <Text style={[styles.itemText, props.completed && styles.crossedText]}>
                        {props.text}
                    </Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <IconButton
                    icon="pencil"
                    iconColor='#71E3DD'
                    size={24}
                    onPress={props.onEdit} // Call onEdit function when edit button is pressed
                />
                <IconButton
                    icon="trash-can"
                    iconColor='#71E3DD'
                    size={24}
                    onPress={props.onDelete} // Call onDelete function when delete button is pressed
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        // Make sure item has enough space for text and icons
        justifyContent: 'space-between',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Allow the text to use remaining space
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#5DA2A9',
        borderRadius: 5,
        marginRight: 15,
    },
    textWrapper: {
        flex: 1, // Allow text wrapper to use remaining space
    },
    itemText: {
        fontSize: 16,
        flexWrap: 'wrap', // Allow text to wrap into multiple lines
    },
    crossedText: {
        textDecorationLine: 'line-through',
        color: '#A0A0A0',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Task;
