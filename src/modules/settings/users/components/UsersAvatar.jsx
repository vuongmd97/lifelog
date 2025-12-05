import { useRef, useReducer, forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { reducer } from '../../../../const/Reducer';
//
import IconDefaultAvatar from '../../../../assets/svg/IconDefaultAvatar';
import IconTrash from '../../../../assets/svg/IconTrash';
import ModalResizeImage from './ModalReSizeImage';

const IMAGE_TYPE = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg'];
const MAX_UPLOAD_FILE_SIZE = 2097152; // MAX 2Mb

const UsersAvatar = forwardRef(({ urlAvatar, onChangeAvatar }, ref) => {
    const { t } = useTranslation('settings');
    const [state, dispatchState] = useReducer(reducer, {
        url: urlAvatar
    });

    const refUpload = useRef(null);
    const refResize = useRef(null);

    const { url: avatarUrl, file } = state;

    useImperativeHandle(ref, () => ({
        getAvatarUrl: () => avatarUrl
    }));

    const handleClickUpload = () => {
        refUpload.current.value = '';
        refUpload.current.click();
    };

    const handleCancel = () => {
        refUpload.current.value = '';
    };

    const handleAdjustImage = ({ file, public_url }) => {
        dispatchState({
            url: public_url
        });
        onChangeAvatar?.(file, public_url);
    };

    const handleUpload = (e) => {
        if (e.target.files.length < 1) return false;
        const imgSelected = e.target.files[0];
        const fileName = imgSelected.name;

        if (IMAGE_TYPE.includes(imgSelected.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(imgSelected);

            if (imgSelected && imgSelected.size <= MAX_UPLOAD_FILE_SIZE) {
                reader.onloadend = function () {
                    refResize.current._open({ imageFile: reader.result, fileName: fileName });
                };
            } else {
                alert(t('settings:maximum_file_size', { size: 2, unit: 'MB' }));
            }
        } else {
            alert(t('settings:invalid_upload_image', { fileName }));
        }
    };

    return (
        <>
            <div className="form-header flex-betweenitems align-top">
                <div className="avatar-img">
                    {avatarUrl ? (
                        <img className="img" alt="avatar" width={40} height={40} src={avatarUrl} />
                    ) : (
                        <IconDefaultAvatar className="img" />
                    )}
                </div>

                <div className="flexcenter gap-8">
                    <div className="upload-img">
                        <label className="btn-default" onClick={handleClickUpload}>
                            {t('upload_new_avatar')}
                        </label>
                        <input ref={refUpload} className="dp-hide" type="file" onChange={handleUpload} />
                    </div>
                    <div className="btn-default --icon-lg --transparent svg-10 --delete">
                        <IconTrash />
                    </div>
                </div>
            </div>

            <ModalResizeImage ref={refResize} onCancel={handleCancel} onSave={handleAdjustImage} />
        </>
    );
});

export default UsersAvatar;
