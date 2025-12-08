import { useReducer } from 'react';
import { reducer } from '../../../const/Reducer';
import useSiteTitle from '../../../hook/useSiteTitle';

//
import FormDefault from './components/FormDefault';
import FormEdit from './components/FormEdit';

export default function Preferences() {
    useSiteTitle('preferences');

    const [state, dispatchState] = useReducer(reducer, {
        isEdit: false
    });

    const { isEdit } = state;

    const _onEdit = () => {
        dispatchState({
            isEdit: true
        });
    };

    const _offEdit = () => {
        dispatchState({
            isEdit: false
        });
    };

    return (
        <div className="wrapper-form page-preferences">
            {isEdit ? <FormEdit onClose={_offEdit} /> : <FormDefault onEdit={_onEdit} />}
        </div>
    );
}
