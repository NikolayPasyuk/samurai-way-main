import {addPostAC, ProfileActionsTypes, updateNewTextAC} from './profile-reducer';
import {DialogsActionsTypes, sendMessageAC, updateNewMessageBodyAC} from './dialogs-reducer';
import {AuthActionsTypes} from './auth-reducer';
import {UsersActionsTypes} from './users-reducer';
import {ThunkAction} from 'redux-thunk';

type PotsType = {
    id: number
    message: string
    likesCount: number
}

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    newMessageBody: string
}

type ProfilePageType = {
    posts: Array<PotsType>
    newPostText: string
}

type SidebarPageType = {}

type StatePropsType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebarPage: SidebarPageType
}

export type StoreType = {
    _state: StatePropsType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => StatePropsType
    dispatch: (action: ActionsTypes) => void
}

type ActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof updateNewTextAC>
    | ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageBodyAC>


const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hi'},
                {id: 3, message: 'Hi'},
                {id: 4, message: 'Hi Nick'},
                {id: 5, message: 'How are you?'},
            ],
            dialogs: [
                {id: 1, name: 'Nick'},
                {id: 2, name: 'Oleg'},
                {id: 3, name: 'Pavel'},
                {id: 4, name: 'Macks'},
                {id: 5, name: 'Masha'},
                {id: 6, name: 'Andrey'},
            ],
            newMessageBody: ''
        },
        sidebarPage: {}
    },
    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    dispatch(action) {

        /*this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action)
*/
        this._callSubscriber()
    }

}

export default store
