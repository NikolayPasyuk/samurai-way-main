import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import Button from '../common/Button/Button';
import AnonymousUserPhoto from '../../assets/images/user.png';
import logo from '../../assets/images/logo.png'

type HeaderType = {
    login: string,
    isAuth: boolean
    logout: () => void
}


const Header = (props: HeaderType) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <img
                    src={logo}
                    alt="social network logo"
                    className={s.logo}
                />
                <div>
                    {/*{props.isAuth ?
                        <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>}*/}
                    {props.isAuth ?
                        <div className={s.infoContainer}>
                            <span className={s.login}>{props.login}</span>
                            <div className={s.avatar}>
                                <img
                                    src={AnonymousUserPhoto}
                                    alt="you small avatar"/>
                            </div>
                            <Button className={s.button}>
                                <NavLink onClick={props.logout} to={'/login'}>Log out</NavLink>
                            </Button>
                        </div>
                        : <Button className={s.button}>
                            <NavLink to={'/login'}>Login</NavLink>
                        </Button>}
                </div>
            </div>
        </header>
    )
}

export default Header