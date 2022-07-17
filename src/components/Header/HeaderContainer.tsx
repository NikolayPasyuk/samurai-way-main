import React from 'react';
import Header from './Header';
import {RootStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth-reducer';

type mapStatePropsType = {
    login: string
    isAuth: boolean
}
type mapDispatchPropsType = {
    logout: () => void
}
export type HeaderPropsType = mapStatePropsType & mapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);