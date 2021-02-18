import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default React.memo(({ ...props }) => {
    return (
        <TouchableOpacity
            style={{ paddingHorizontal: 15 }}
            {...props}
        >
            <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
    )
})