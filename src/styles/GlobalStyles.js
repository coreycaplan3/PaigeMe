/**
 * Created by Corey on 5/28/2017.
 */
import React, {StyleSheet, Platform} from 'react-native';

const globalStyles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#bbdefb',
    },
    primaryColor: {
        color: '#2196f3',
    },
    bgPrimaryColor: {
        backgroundColor: '#2196f3',
    },
    primaryColorDark: {
        color: '#0d47a1',
    },
    bgPrimaryColorDark: {
        backgroundColor: '#0d47a1',
    },
    // Padding
    regularPadding: {
        padding: 16,
    },
    horizontalPadding: {
        paddingHorizontal: 16,
    },
    verticalPadding: {
        paddingVertical: 16,
    },
    regularPaddingSmall: {
        padding: 8,
    },
    horizontalPaddingSmall: {
        paddingHorizontal: 8,
    },
    verticalPaddingSmall: {
        paddingVertical: 8,
    },
    // Margin
    regularMargin: {
        margin: 16,
    },
    horizontalMargin: {
        marginHorizontal: 16,
    },
    verticalMargin: {
        marginVertical: 16,
    },
    regularMarginSmall: {
        margin: 8,
    },
    horizontalMarginSmall: {
        marginHorizontal: 8,
    },
    verticalMarginSmall: {
        marginVertical: 8,
    },
    // Other
    regularShadow: {
        elevation: Platform.select({ios: 0, android: 4}),
        shadowOffset: {
            width: Platform.select({ios: 8, android: 0}),
            height: Platform.select({ios: 8, android: 0}),
        },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    }
});

export default globalStyles;