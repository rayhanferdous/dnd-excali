'use client'
import store from '@/stores/store'
import { Provider } from 'react-redux'

const ReduxWrapper = ({ children }) => {
    return (
        <Provider store={store}>
            {children}</Provider>
    )
}

export default ReduxWrapper