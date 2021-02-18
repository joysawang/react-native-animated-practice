import React from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image'

export default React.memo(({ uri }) => {
    return (
        <View>
            <Image source={{ uri }} />
        </View>
    )
})