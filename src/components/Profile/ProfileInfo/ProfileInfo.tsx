import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from '../../common/preloader/Preloader';
import AnonymousUserPhoto from '../../../assets/images/user.png'
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import ProfileDataFormReduxForm from './ProfileDataForm';
import ProfileData from '../ProfileData/ProfileData';
import {ProfileType} from '../../../redux/profile-reducer';

type ProfileInfoPropsType = {
    profile: null | ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: ProfileType) => any
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                                profile,
                                                                isOwner,
                                                                status,
                                                                updateStatus,
                                                                savePhoto,
                                                                saveProfile,
                                                            }) => {
    let [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (profile: ProfileType) => {
        saveProfile(profile)
            .then(() => {
                setEditMode(false);
            })
    }

    return (
        <div>
            <div className={s.userInfoSection}>
                <div className={s.userAvatarSection}>
                    <img
                        className={s.userAvatar}
                        src={profile.photos.large || AnonymousUserPhoto}
                        alt={profile.fullName + " user avatar"}
                    />
                    {
                        isOwner &&
                        <div className={s.inputFileButtonContainer}>
                            <input type="file"
                                   name="file"
                                   id="file"
                                   className={s.inputFile}
                                   onChange={onMainPhotoSelected}/>
                            <label htmlFor="file">Change avatar</label>
                        </div>
                    }
                </div>
                <div className={s.editModeContainer}>
                    <div className={s.statusContainer}>
                        <ProfileStatus status={status}
                                       updateStatus={updateStatus}
                                       isOwner={isOwner}
                        />
                    </div>
                    {editMode
                        ? <ProfileDataFormReduxForm onSubmit={onSubmit}
                                                    profile={profile}
                                                    initialValues={profile}
                        />
                        : <ProfileData profile={profile}
                                       isOwner={isOwner}
                                       enableEditMode={() => setEditMode(true)}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo

