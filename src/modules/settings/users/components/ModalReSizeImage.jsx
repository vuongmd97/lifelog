import { forwardRef, useImperativeHandle, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AvatarEditor from 'react-avatar-editor';
import ReactModal from 'react-modal';
import { reducer } from '../../../../const/Reducer';
import IconPlus from '../../../../assets/svg/IconPlus';
import IconMinus from '../../../../assets/svg/IconMinus';
import IconClose from '../../../../assets/svg/IconClose';
import { base64ToFile } from '../../../../utils/FileUtils';

const ModalResizeImage = forwardRef(({ onCancel = () => {}, onSave = () => {} }, ref) => {
    const { t } = useTranslation('common');
    const [state, dispatchState] = useReducer(reducer, {
        scale: 1,
        isOpen: false,
        imageFile: ''
    });

    const { scale, isOpen, imageFile } = state;

    const refAvatarEditor = useRef(null);

    const handleOpen = ({ imageFile, fileName, type = 'avatar' }) => {
        dispatchState({ isOpen: true, imageFile, fileName, type });
    };

    const handleClose = () => {
        dispatchState({ isOpen: false, scale: 1 });
        onCancel();
    };

    useImperativeHandle(ref, () => ({
        _open: handleOpen,
        _close: () => dispatchState({ isOpen: false })
    }));

    const handleSave = async () => {
        const base64Image = refAvatarEditor.current.getImage().toDataURL();
        const file = await base64ToFile(base64Image, 'avatars', 'image/png');

        onSave({
            file,
            public_url: base64Image
        });

        handleClose();
    };

    if (!isOpen) return null;
    return (
        <ReactModal isOpen className="modal modal-resize container-modal open">
            <div className="modal__overlay" onClick={handleClose}></div>
            <div className="modal__container --sm">
                <div className="modal-header">
                    <p className="header-title">Resize Avatar</p>
                    <div className="btn-default --icon-lg --transparent" onClick={handleClose}>
                        <IconClose />
                    </div>
                </div>

                <div className="modal-body">
                    <div className="wrap-image">
                        <AvatarEditor
                            ref={refAvatarEditor}
                            disableHiDPIScaling
                            image={imageFile}
                            className="box-image"
                            scale={scale}
                            width={320}
                            height={320}
                            borderRadius={320}
                            color={[0, 0, 0, 0.6]}
                            crossOrigin="anonymous"
                        />
                    </div>

                    <div className="resize-action">
                        <div className="range-slider">
                            <div className="range-slider__wrap">
                                <div className="btn-default --icon-lg --transparent">
                                    <IconMinus />
                                </div>
                                <input type="range" className="range" min="1" max="3" step="0.1" />
                                <div className="btn-default --icon-lg --transparent">
                                    <IconPlus />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="btn-default --transparent" onClick={handleClose}>
                        Cancel
                    </div>
                    <div className="btn-main" onClick={handleSave}>
                        Save
                    </div>
                </div>
            </div>
        </ReactModal>
    );
});

export default ModalResizeImage;
